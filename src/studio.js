/** Project service shared by trusted controls and restricted model tools. */
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile, chmod, readFile, rename, stat, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { ProjectStore, hash } from './store.js';
import { proposal, sceneFromProposal, sceneFromCad, editScene, furnishScene, validateScene, placementConflicts, MATERIALS, AVAILABLE_MATERIALS, check } from './scene.js';
import { FURNITURE, AVAILABLE_FURNITURE, HAS_LOCAL_ASSETS } from './catalog.js';
import {drawingScene,drawingReport} from './drawing.js';
import {reviewFurniture} from './furniture-review.js';
import {reviewSolids} from './solids.js';
import {reviewDesign} from './design-review.js';
import {mergeConstraints,constraintChanges,requireConstraintsReady} from './design-constraints.js';
import {modelFingerprint,cadFingerprint,viewFingerprint,meshScopeFingerprint} from './design-fingerprints.js';
import {requireRenderAcceptance,resolveScope,reviewScopeDeclarations} from './acceptance-scope.js';
import {componentSchedule} from './component-schedule.js';
import {sheetSvg} from './drafting.js';
import {derivativePlan,cleanDerivatives,cleanConfirmedDraft,cleanSupersededDraft} from './derivative-cleanup.js';
import {VIEW_LABELS,DRAFT_PREVIEW_VIEWS,DEFAULT_RENDER_VIEWS,DRAWING_LABELS,ALL_DRAWING_LABELS,renderGallery,recommendedRenderViews,galleryCoverage} from './design-views.js';
import {drawingSheet,lineStyle,meshDrawingGeometry,needsMeshElevation} from './drafting.js';
import {setImmediate as yieldToLoop} from 'node:timers/promises';
import {mkdirSync,writeFileSync,readFileSync,unlinkSync} from 'node:fs';
import {readResource,resourceHash,validateGlb} from './resources.js';
import {key,label,vector,finite,resourceName,validateSurface,presentationFromInput,sceneResources} from './refinement.js';
import {PACKAGE_ROOT} from './engine.js';

const validCadAudit=(detail,sceneHash)=>detail.cadAudit?.passed===true&&detail.cadAudit.sceneHash===sceneHash
  &&Array.isArray(detail.cadAudit.views)&&detail.cadAudit.views.length===5&&new Set(detail.cadAudit.views).size===5
  &&detail.cadAudit.views.every(v=>Object.hasOwn(DRAWING_LABELS,v))
  &&/^[a-f0-9]{64}$/.test(detail.cadAudit.sha256)&&detail.files?.['plan.dxf']?.sha256===detail.cadAudit.sha256;

export class Studio {
  constructor(root, engine, isSessionRunning = () => false, jobs=null) { this.store = new ProjectStore(root); this.engine = engine; this.running = new Map(); this.routes = new Map(); this.drawings=new Set(); this.isSessionRunning = isSessionRunning; this.jobs=jobs; }
  /** Runs before DSH sends any request, including retained project history. */
  beforeModelRequest(options) {
    if (!options.sessionId) return;
    const route = JSON.stringify({ provider: options.provider, model: options.model });
    if (!options.purpose) this.routes.set(options.sessionId, route);
    const disclosed = this.store.db.prepare('SELECT project FROM disclosures WHERE session=?').all(options.sessionId);
    for (const { project } of disclosed) {
      const allowed = this.store.db.prepare('SELECT consent FROM projects WHERE id=?').get(project)?.consent === 1
        && this.store.db.prepare('SELECT 1 FROM route_grants WHERE session=? AND project=? AND route=?').get(options.sessionId, project, route);
      check(allowed, '此聊天包含工程摘要，当前模型或授权已变化。请在右侧重新授权该接收模型，或使用新聊天；本地编辑仍可继续。');
    }
  }
  modelAllowed(session, id) {
    const route = this.routes.get(session);
    return Boolean(route && this.store.project(id).consent && this.store.db.prepare('SELECT 1 FROM route_grants WHERE session=? AND project=? AND route=?').get(session, id, route));
  }
  async dispose() {
    for (const task of this.running.values()) task.controller.abort();
    await Promise.allSettled([...this.running.values()].map(task => task.done));
    await this.engine.dispose();await Promise.allSettled([...this.drawings]); this.store.close();
  }
  acceptedBrief(id) {
    const row=this.store.db.prepare("SELECT id,data FROM confirmations WHERE project=? AND json_extract(data,'$.action')='design_brief' ORDER BY rowid DESC LIMIT 1").get(id);
    return row?{...JSON.parse(row.data),confirmationId:row.id}:null;
  }
  brief(session,input,operation,model=false) {
    check(typeof input.name==='string'&&input.name.trim()&&input.name.length<=100,'请提供工程名称');
    check(['interior','booth'].includes(input.kind),'工程类型无效');
    let id=this.store.bound(session);
    if(!id)id=this.store.create(session,input.name,input.kind,operation+':create').id;
    const project=this.store.assertWriter(session,id,input.expectedRevision);
    check(project.kind===input.kind,'工程类型已变化');
    if(model&&project.revision>0)check(this.modelAllowed(session,id),'请先授权当前模型读取已有工程');
    const constraints=mergeConstraints(input.constraints,this.acceptedBrief(id)?.constraints??this.store.read(id)?.design?.constraints);
    // Validate declarations without pretending geometry exists yet.
    reviewDesign({objects:[],bounds:[1,1],kind:input.kind,design:{constraints}});
    const assumptions=input.assumptions??[];
    check(Array.isArray(assumptions)&&assumptions.length<=12&&assumptions.every(s=>typeof s==='string'&&s.length>0&&s.length<=200&&!/[\x00-\x1f]/.test(s)),'请将暂拟条件单独列出，每项不超过200字');
    return this.store.once(session,operation,{id,...input},()=>{
      const prior=this.store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id);
      check(!prior||JSON.parse(prior.data).type==='brief','请先处理已有CAD草案，不能用需求核对覆盖图纸');
      const pending={type:'brief',briefId:randomUUID(),baseRevision:project.revision,name:input.name,constraints,assumptions};
      this.store.db.prepare('INSERT OR REPLACE INTO proposals VALUES(?,?)').run(id,JSON.stringify(pending));
      return {projectId:id,...pending,state:'awaiting_user_confirmation',instruction:'需求卡已显示在右侧。请用户核对原要求、验收数值与暂拟条件；这一步不生成CAD，也没有替用户确认。确认后再绘图，已确认要求会独立保留。'};
    });
  }
  snapshot(session, id = this.store.bound(session)) {
    if (!id) return { project: null, projects: this.store.list(), materials: AVAILABLE_MATERIALS, furniture: AVAILABLE_FURNITURE };
    const project = this.store.project(id), scene = this.store.read(id);
    const pending = this.store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id);
    const imports = this.store.db.prepare('SELECT report FROM imports WHERE project=? ORDER BY rowid DESC LIMIT 1').get(id);
    const proposed=pending?JSON.parse(pending.data):null;
    if(proposed?.type==='drawing')proposed.stale=proposed.baseRevision!==project.revision;
    const drawing=proposed?.type==='drawing'&&!proposed.stale?proposed.scene:scene?.design?scene:null;
    const sceneHash=scene?hash(JSON.stringify(scene)):null,ready=scene?this.readyModel(id,project.revision,sceneHash):null;
    const brief=this.acceptedBrief(id),requirementsChanged=!!(brief&&scene&&scene.design?.briefId!==brief.briefId);
    const gallery=this.gallery(id,project.revision).map(row=>requirementsChanged?{...row,current:false}:row);
    const viewRequirements=requirementsChanged?{design:{constraints:brief.constraints}}:scene;
    return { project: { id, name: project.name, kind: project.kind, revision: project.revision,
      consent: this.modelAllowed(session, id), modelRoute: this.routes.get(session) ? JSON.parse(this.routes.get(session)) : null,
      readOnly: project.writer !== session,
      canUndo: JSON.parse(project.undo).length > 0, canRedo: JSON.parse(project.redo).length > 0 },
      scene, brief, proposal: proposed,workflow:{revision:project.revision,requirementsChanged,cadConfirmed:project.revision>0&&!requirementsChanged&&!(proposed?.type==='drawing'&&!proposed.stale),cadReady:!!ready&&!requirementsChanged&&!(proposed?.type==='drawing'&&!proposed.stale),modelReady:!!ready&&!requirementsChanged&&!(proposed?.type==='drawing'&&!proposed.stale),hasDraft:proposed?.type==='drawing'&&!proposed.stale,
        modelTask:ready?{id:ready.id,revision:ready.revision,state:ready.state,detail:ready.detail}:null,
        quality:(proposed?.type==='drawing'&&!proposed.stale?proposed.summary?.quality:
          scene?.design?.constraints?.views?.length||scene?.design?.constraints?.supports?.length?reviewDesign(scene,{},this.acceptanceEvidence(id,scene)).quality:scene?.design?.quality)??{overall:'needs_review',coverage:{saved:false},visual:{status:'not_evaluated'}}},
      report: drawing?drawingReport(drawing):imports ? JSON.parse(imports.report) : null,
      tasks: this.store.db.prepare('SELECT * FROM tasks WHERE project=? ORDER BY rowid DESC LIMIT 12').all(id).map(t => ({ ...t, detail: JSON.parse(t.detail) })),
      gallery,galleryCoverage:galleryCoverage(viewRequirements,gallery),recommendedViews:recommendedRenderViews(viewRequirements),
      selection: (() => { try { return this.store.selection(session, id, project.revision); } catch { return null; } })(),
      projects: this.store.list(), materials: AVAILABLE_MATERIALS, furniture: AVAILABLE_FURNITURE };
  }
  gallery(id,revision) {
    const scene=this.store.read(id,revision),current=new Map(),runtime=this.engine.manifest?.blenderVersion??'test';
    if(scene)for(const task of this.store.db.prepare("SELECT * FROM tasks WHERE project=? AND state='complete' ORDER BY rowid").iterate(id)) {
      const detail=JSON.parse(task.detail);
      if(!detail.viewFingerprints)continue;
      for(const view of renderGallery([{...task,detail}],task.revision))if(detail.runtime===runtime&&detail.viewFingerprints[view.id]===viewFingerprint(scene,view.id,MATERIALS,runtime))
        current.set(view.id,{...view,applicableRevision:revision,current:true,resolution:detail.resolution});
    }
    if(current.size)return [...current.values()];
    const source=this.store.db.prepare(`SELECT revision FROM tasks WHERE project=? AND state='complete'
      AND json_type(detail,'$.files."render.png"') IS NOT NULL
      ORDER BY (revision=?) DESC,rowid DESC LIMIT 1`).get(id,revision);
    if(!source)return [];
    // Stream metadata so failed/repeated tasks outside the history window do not hide older views.
    const rows=this.store.db.prepare("SELECT id,revision,state,detail FROM tasks WHERE project=? AND revision=? AND state='complete' ORDER BY rowid").iterate(id,source.revision);
    function* decoded(){for(const row of rows)yield {...row,detail:JSON.parse(row.detail)};}
    return renderGallery(decoded(),source.revision).map(v=>({...v,current:source.revision===revision,applicableRevision:source.revision===revision?revision:null}));
  }
  projectActivity(id) {
    // ponytail: one CAD worker; a short global lock avoids deleting any in-flight CAD input/output.
    if (this.drawings.size) return 'CAD 正在处理，请完成后重试';
    if (this.store.db.prepare("SELECT 1 FROM tasks WHERE project=? AND state IN ('queued','running')").get(id)) return '建模或出图任务正在运行';
    const sessions = this.store.db.prepare('SELECT session FROM bindings WHERE project=? UNION SELECT writer AS session FROM projects WHERE id=?').all(id, id);
    if (sessions.some(({ session }) => this.isSessionRunning(session))) return '关联聊天正在运行';
    return null;
  }
  manage(action, input, operation) {
    if (action === 'list') return { projects: this.store.db.prepare('SELECT id,name,kind,revision,created,writer,deleted FROM projects WHERE deleted<2 ORDER BY created DESC').all().map(p => ({
      ...p, sessionIds: this.store.db.prepare('SELECT session FROM bindings WHERE project=? ORDER BY session').all(p.id).map(row => row.session),
      activity: this.projectActivity(p.id),
    })) };
    check(['rename', 'delete'].includes(action), '未支持的工程管理操作');
    check(!this.projectActivity(input.projectId), '工程正在使用，请等待关联聊天、CAD 或出图任务结束');
    return action === 'rename' ? this.store.rename(input, operation) : this.store.delete(input, operation);
  }
  cleanupPlan(session,input={}) {
    const id=this.store.bound(session);check(id,'请先打开工程');this.store.assertWriter(session,id,input.expectedRevision);
    check(!this.projectActivity(id),'工程正在使用，请完成聊天和后台任务后清理');
    const p=this.store.project(id),scene=this.store.read(id),ready=scene?this.readyModel(id,p.revision,hash(JSON.stringify(scene))):null;
    const protectedIds=[...(ready?[ready.id]:[]),...this.gallery(id,p.revision).map(v=>v.taskId)];
    return derivativePlan(this.store,id,protectedIds,input.includeHistory??false);
  }
  cleanup(session,input,operation) {
    const id=this.store.bound(session);check(id,'请先打开工程');
    const plan=this.cleanupPlan(session,{expectedRevision:this.store.project(id).revision,includeHistory:input.includeHistory});
    return cleanDerivatives(this.store,session,id,input,operation,plan);
  }
  context(session,input={}) {
    check(input.detail===undefined||['summary','full','index','objects'].includes(input.detail),'读取范围须为summary/full/index/objects');
    check(input.target===undefined||['current','draft'].includes(input.target),'读取目标须为current/draft');
    const id = this.store.bound(session);
    const catalog={furniture:Object.entries(AVAILABLE_FURNITURE).map(([id,m])=>({id,label:m.label,size:m.size,orientation:m.orientation})),
      materials:Object.entries(AVAILABLE_MATERIALS).map(([id,m])=>({id,...m})),
      ...(!HAS_LOCAL_ASSETS?{catalogNote:'可用基础材质、参数构件和用户导入的模型；当前未安装可选家具和贴图库。'}:{}),
      modeling:{geometryTool:'studio_geometry',geometryOperations:['fillet','arc','check_profile','offset','measure','orientation'],shapes:['box','cylinder','extrusion','text'],planes:['xy','xz','yz'],minimumComponentThickness:.001,
        position:'component origin XYZ; box/cylinder origin is base centre; extrusion origin offsets profile coordinates',
        color:'components.color is RGB in [0,1]; optional roughness, metallic and emission',
        openingKinds:['door','window','passage'],maxComponents:500,maxProfileSamples:24000,
        refinement:{tool:'studio_refine',...(this.engine.manifest?{blenderExecutable:join(PACKAGE_ROOT,this.engine.manifest.executable)}:{}),models:'embedded static GLB; metre Z-up, origin=bottom centre; plan uses envelopes, elevations use actual mesh feature edges',
          surfaces:'local PNG/JPEG on solid/floor; local-axis face and repeat in metres',presentation:'saved lights and cameras; custom view key accepted by studio_render'}}};
    if (!id) return { project: null,...catalog,
      instruction:'新设计先用studio_brief整理客户硬条件与设计假设，expectedRevision=0，用户在右侧确认需求卡后用studio_draw绘制CAD。需求卡确认不等于CAD确认。' };
    const p = this.store.project(id);
    const pending=this.store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id),pendingProposal=pending?JSON.parse(pending.data):null;
    if(p.revision===0&&pendingProposal?.type==='brief')return {project:{id,kind:p.kind,revision:0,readOnly:p.writer!==session},sharing:'no_existing_design',proposal:pendingProposal,brief:this.acceptedBrief(id),instruction:'请先由用户在右侧确认需求卡；尚未生成CAD。'};
    if(p.revision===0&&!this.store.db.prepare('SELECT 1 FROM proposals WHERE project=?').get(id)
      &&!this.store.db.prepare('SELECT 1 FROM imports WHERE project=?').get(id)) {
      return {project:{id,kind:p.kind,revision:0,readOnly:p.writer!==session},sharing:'no_existing_design',
        permissions:{canDrawNewDesign:p.writer===session,canReadExistingDesign:false},brief:this.acceptedBrief(id),...catalog,
        instruction:p.writer===session?'空工程无需先授权读取。先用studio_brief保存并请用户确认需求卡，再用studio_draw绘制新CAD；原始要求自动保留，不能缩小范围或放宽数值。':'空工程由另一聊天持有写权限，请新建工程或让用户接管编辑。'};
    }
    if (!this.modelAllowed(session,id)) return { projectId: id, sharing: 'disabled',
      instruction: '项目摘要、尺寸与选择未获外发授权。请用户在右侧勾选允许设计摘要用于当前模型对话；也可继续本地操作。' };
    const snap = this.snapshot(session);
    this.store.db.prepare('INSERT OR IGNORE INTO disclosures VALUES(?,?)').run(session,id);
    if(['index','objects'].includes(input.detail)) {
      const draft=input.target==='draft';
      const source=draft?snap.proposal?.type==='drawing'&&!snap.proposal.stale?snap.proposal.scene:null:snap.scene;
      check(source,draft?'没有当前版本的CAD草案':'没有已确认的场景');
      if(draft)check(input.drawingId===snap.proposal.drawingId,'请提供当前drawingId，避免读取已替换草案');
      const header={project:snap.project,target:input.target??'current',...(draft?{drawingId:snap.proposal.drawingId}:{}),objectCount:source.objects.length,brief:snap.brief};
      if(input.detail==='index')return {...header,objects:source.objects.map(o=>({id:o.id,key:o.origin?.key,label:o.label,type:o.type,shape:o.shape,assembly:o.assembly})),instruction:'按key或assembly用detail=objects取本轮需要的几何；key保存在origin.key。'};
      const names=(values,label)=>{check(Array.isArray(values??[])&&(values??[]).length<=32&&new Set(values??[]).size===(values??[]).length&&(values??[]).every(v=>typeof v==='string'&&v.length>0&&v.length<=100),label+'最多32个不同编号');return values??[];};
      const keys=names(input.keys,'对象'),assemblies=names(input.assemblies,'组合');check(keys.length||assemblies.length,'请提供keys或assemblies');
      for(const key of keys)check(source.objects.filter(o=>o.id===key||o.origin?.key===key).length===1,'对象不存在或有歧义：'+key);
      for(const assembly of assemblies)check(source.objects.some(o=>o.assembly===assembly),'组合不存在：'+assembly);
      const selected=source.objects.filter(o=>keys.includes(o.id)||keys.includes(o.origin?.key)||assemblies.includes(o.assembly));
      check(selected.length<=100,'本轮超过100个对象，请缩小组合或按对象分批读取');
      const ids=new Set(selected.flatMap(o=>[o.id,o.origin?.key])),groups=new Set(selected.map(o=>o.assembly).filter(Boolean));
      const relevant=row=>row.scope==='scene'||groups.has(row.assembly)||[...(row.keys??[]),...(row.anchorKeys??[]),...(row.viaKeys??[]),row.a,row.b].some(key=>ids.has(key));
      return {...header,objects:selected,constraints:Object.fromEntries(Object.entries(source.design?.constraints??{}).filter(([,rows])=>Array.isArray(rows)).map(([group,rows])=>[group,rows.filter(relevant)])),
        diagnostics:snap.tasks.slice(0,3).map(t=>({id:t.id,revision:t.revision,state:t.state,supports:t.detail.meshContactReview?.declaredSupports?.filter(r=>r.resolvedIds?.some(id=>ids.has(id)))})),instruction:'objects是选定对象的完整参数。diagnostics保留实际任务版本；与当前几何不符时重新审查，不能沿用旧通过状态。'};
    }
    if(input.detail==='summary')return {project:snap.project,sharing:'allowed',selection:snap.selection,brief:snap.brief,
      objectCount:snap.scene?.objects.length??0,constraints:snap.scene?.design?.constraints,
      workflow:{...snap.workflow,modelTask:snap.workflow.modelTask?{id:snap.workflow.modelTask.id,revision:snap.workflow.modelTask.revision}:null},
      proposal:snap.proposal?{type:snap.proposal.type,drawingId:snap.proposal.drawingId,baseRevision:snap.proposal.baseRevision,stale:snap.proposal.stale,quality:snap.proposal.summary?.quality}:null,
      tasks:snap.tasks.map(t=>({id:t.id,revision:t.revision,state:t.state,jobId:t.detail.jobId,phase:t.detail.phase,message:t.detail.message,render:t.detail.render,views:t.detail.views?.map(v=>({id:v.id,file:v.file}))})),
      gallery:snap.gallery,galleryCoverage:snap.galleryCoverage,recommendedViews:snap.recommendedViews,renderViews:{...VIEW_LABELS,...Object.fromEntries((snap.scene?.presentation?.cameras??[]).map(c=>[c.key,c.label]))},
      modeling:catalog.modeling,instruction:'这是摘要；需要几何、完整诊断或产物路径时用detail=full，在PTC内按对象筛选。'};
    return { project: snap.project, scene: snap.scene, selection: snap.selection,
      furnitureReview:reviewFurniture(snap.scene),
      proposal: snap.proposal,workflow:snap.workflow,gallery:snap.gallery, tasks: snap.tasks.map(t => ({ id: t.id, revision: t.revision, state: t.state,
        render:t.detail.render,views:t.detail.views,requestedViews:t.detail.requestedViews,
        meshAudit:t.detail.meshAudit,cadAudit:t.detail.cadAudit,meshContactReview:t.detail.meshContactReview,preflight:t.detail.preflight,jobId:t.detail.jobId,phase:t.detail.phase,message:t.detail.message,
        ...(t.state==='complete'&&t.detail.relativePath===`${t.detail.render?'renders':'builds'}/${t.id}`&&/^[a-f0-9-]{36}$/.test(t.id)?{
          artifacts:Object.fromEntries(Object.keys(t.detail.files??{})
            .filter(file=>/^(plan\.dxf|scene\.(blend|glb)|render(?:-[A-Za-z][A-Za-z0-9_-]{0,49})?\.png)$/.test(file))
            .map(file=>[file,this.store.dir(id,t.detail.relativePath,file)])),
        }:{}) })),
      renderViews:{...VIEW_LABELS,...Object.fromEntries((snap.scene?.presentation?.cameras??[]).map(c=>[c.key,c.label]))},
      report: snap.report ? { importId: snap.report.id, unit: snap.report.unit, counts: snap.report.counts,
        blocking: snap.report.blocking, support: snap.report.support } : null,
      ...catalog,
      statement: '图纸原件、图中文字与图片未发送。此结构摘要由本次工具结果记录。' };
  }
  review(session,input,model=false) {
    const id=this.store.bound(session);check(id,'请先打开工程');
    if(model) {
      check(this.modelAllowed(session,id),'工程未授权当前模型读取');
      this.store.db.prepare('INSERT OR IGNORE INTO disclosures VALUES(?,?)').run(session,id);
    }
    const project=this.store.project(id);
    check(Number.isInteger(input.expectedRevision)&&input.expectedRevision===project.revision,'场景版本已变化，请重新读取');
    check(['current','draft'].includes(input.target),'审查目标须为 current/draft');
    let scene;
    if(input.target==='draft') {
      const pending=this.store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id);
      const draft=pending?JSON.parse(pending.data):null;
      check(draft?.type==='drawing'&&draft.baseRevision===project.revision&&typeof input.drawingId==='string'&&input.drawingId===draft.drawingId,'CAD 草案不存在、已变化或版本过期');
      scene=draft.scene;
    } else scene=this.store.read(id);
    check(scene,'没有可审查的场景');
    return {projectId:id,revision:project.revision,target:input.target,...(input.target==='draft'?{drawingId:input.drawingId}:{}),
      ...reviewDesign(scene,input,input.target==='current'?this.acceptanceEvidence(id,scene):{})};
  }
  drawingSource(session,input) {
    const id=this.store.bound(session);check(id,'请先打开工程');
    const p=this.store.project(id);check(Number.isInteger(input.expectedRevision)&&input.expectedRevision===p.revision,'工程版本已变化，请刷新图纸后重试');
    let scene;
    if(input.drawingId!==undefined) {
      const row=this.store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id),draft=row?JSON.parse(row.data):null;
      check(typeof input.drawingId==='string'&&draft?.type==='drawing'&&draft.drawingId===input.drawingId&&draft.baseRevision===p.revision,'CAD 草案已变化，请刷新后重试');scene=draft.scene;
    } else scene=this.store.read(id);
    check(scene,'没有可导出的图纸');
    return {id,p,scene};
  }
  draftPreview(session,input,signal,model=false) {
    return this.trackCad(this.prepareDraftPreview(session,input,signal,model));
  }
  async prepareDraftPreview(session,input,signal,model) {
    signal?.throwIfAborted();
    check(typeof input.drawingId==='string','请提供当前 CAD 草案编号');
    const {id,p,scene}=this.drawingSource(session,input);
    const route=this.routes.get(session);
    if(model)check(this.modelAllowed(session,id),'请先授权当前模型读取工程摘要');
    check(input.keys===undefined||input.assembly===undefined,'请只选对象或组合中的一种');
    check(input.keys===undefined||(Array.isArray(input.keys)&&input.keys.length<=32),'单次最多预览32个指定对象');
    const scope=input.assembly!==undefined?{scope:'assembly',assembly:input.assembly}:input.keys!==undefined?{keys:input.keys}:{scope:'scene'};
    const {objects,missing}=resolveScope(scene,scope);
    check(objects.length&&!missing.length,'草案中的预览对象或组合不存在');
    const view=input.view??'overview',camera=scene.presentation?.cameras.find(c=>c.key===view);
    check(typeof view==='string'&&(Object.hasOwn(DRAFT_PREVIEW_VIEWS,view)||camera),'请选择草案的有效预览视角');
    const selected=new Set(objects.map(o=>o.id)),context=new Set(selected);
    const fixed=scene.design?.constraints??{};
    const declarations=reviewScopeDeclarations(scene,fixed);
    const supportIds=new Set();
    for(const row of declarations.supports) {
      const involved=[...row.resolvedIds,...row.anchorIds,...row.viaIds];
      if(involved.some(key=>selected.has(key))) {
        supportIds.add(row.id);
        for(const key of involved)context.add(key);
      }
    }
    const byKey=new Map(scene.objects.flatMap(o=>[[o.id,o.id],...(o.origin?.key?[[o.origin.key,o.id]]:[])]));
    const relations=(fixed.relations??[]).filter(row=>{
      const involved=[byKey.get(row.a),byKey.get(row.b)].filter(Boolean);
      if(!involved.some(key=>selected.has(key)))return false;
      for(const key of involved)context.add(key);
      return true;
    });
    const supports=(fixed.supports??[]).filter(row=>supportIds.has(row.id));
    check(!this.previewing,'正在生成另一份草案预览，请稍后重试');
    const output=model?undefined:this.store.dir(id,'staging','preview-'+randomUUID());
    const deadline=AbortSignal.timeout(30_000),workSignal=signal?AbortSignal.any([signal,deadline]):deadline;
    this.previewing=true;
    try {
      if(output)await mkdir(output,{recursive:true,mode:0o700});
      const result=await this.engine.request({action:'draft-preview',scene,materials:MATERIALS,resourceRoot:this.store.dir(id,'resources'),
        selected:[...selected],context:[...context],view,supports,relations,...(output?{output}:{})},workSignal);
      const bytes=output?await readFile(join(output,'preview.png')):null;
      workSignal.throwIfAborted();
      check(this.drawingSource(session,input).id===id,'活动工程已变化，请重新预览');
      if(model) {
        check(this.routes.get(session)===route&&this.modelAllowed(session,id),'模型或授权已变化，请重新核对后再读取');
        this.store.db.prepare('INSERT OR IGNORE INTO disclosures VALUES(?,?)').run(session,id);
      }
      if(bytes)check(bytes.length>24&&bytes.length<=1024*1024&&bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))
        &&bytes.readUInt32BE(16)===640&&bytes.readUInt32BE(20)===360,'草案预览图片无效');
      return {...result,projectId:id,revision:p.revision,drawingId:input.drawingId,view,selectedCount:selected.size,
        contextCount:context.size-selected.size,scope,...(bytes?{base64:bytes.toString('base64')}:{})};
    } catch(error) {
      if(deadline.aborted&&!signal?.aborted)throw new Error('草案预览超时，请选择更小的范围后重试');
      throw error;
    } finally {
      try {if(output)await rm(output,{recursive:true,force:true});}
      finally {this.previewing=false;}
    }
  }
  async makeDrawingSheet({id,p,scene},view,draft,signal,cutAt) {
    check(Object.hasOwn(ALL_DRAWING_LABELS,view),'未知图纸视图');
    signal?.throwIfAborted();
    const geometry=needsMeshElevation(scene,view)?meshDrawingGeometry(await this.engine.request({action:'drawing-elevation',scene,
      materials:MATERIALS,resourceRoot:this.store.dir(id,'resources'),view,cutAt},signal),scene,view):undefined;
    signal?.throwIfAborted();
    return drawingSheet(scene,view,{name:p.name,revision:p.revision,draft,geometry});
  }
  async drawingPage(session,input,signal) {
    const source=this.drawingSource(session,input);
    const {geometry,...sheet}=await this.makeDrawingSheet(source,input.view,!!input.drawingId,signal,input.cutAt);
    check(this.drawingSource(session,input).id===source.id,'活动工程已变化，请刷新图纸');
    return {sheet,revision:source.p.revision,...(input.drawingId?{drawingId:input.drawingId}:{}),geometryBasis:geometry.basis};
  }
  async drawingSheets(source,draft,signal,includeSections=false) {
    const sheets=[];
    for(const view of Object.keys(includeSections?ALL_DRAWING_LABELS:DRAWING_LABELS)) {
      signal?.throwIfAborted();
      const {geometry,...sheet}=await this.makeDrawingSheet(source,view,draft,signal);
      sheet.styles=Object.fromEntries([...new Set(sheet.lines.map(l=>l.kind).concat(sheet.paths.map(l=>l.kind)))].map(kind=>[kind,lineStyle(kind)]));
      sheets.push(sheet);await yieldToLoop();
    }
    return sheets;
  }
  async drawingSet(session,input,signal) {
    const source=this.drawingSource(session,input),{id,p,scene}=source;
    const output=this.store.dir(id,'staging','drawing-set-'+randomUUID());
    try {
      const sheets=await this.drawingSheets(source,!!input.drawingId,signal,input.includeSections===true);
      await mkdir(output,{recursive:true,mode:0o700});
      await this.engine.request({action:'drawing-sheets',scene,sheets,output},signal);
      signal?.throwIfAborted();
      check(this.drawingSource(session,input).id===id,'活动工程已变化，请刷新图纸');
      const bytes=await readFile(join(output,'drawings.dxf'));check(bytes.length>0&&bytes.length<=20*1024*1024,'图纸图册为空或超过 20 MiB');
      return {base64:bytes.toString('base64'),filename:`${p.name}-v${p.revision}${input.drawingId?'-草案':''}-图纸图册.dxf`,revision:p.revision,views:sheets.map(s=>s.view),sceneHash:hash(JSON.stringify(scene))};
    } finally {await rm(output,{recursive:true,force:true});}
  }
  async exportDesign(session,input,signal,model=false) {
    if(model) {
      const id=this.store.bound(session);check(id,'请先打开工程');
      check(this.modelAllowed(session,id),'工程未授权当前模型读取');
      this.store.db.prepare('INSERT OR IGNORE INTO disclosures VALUES(?,?)').run(session,id);
    }
    const source=this.drawingSource(session,input),{id,p,scene}=source;
    const metadata={projectId:id,revision:p.revision,sceneHash:hash(JSON.stringify(scene)),draft:!!input.drawingId};
    if(input.format==='schedule')return {...metadata,csv:componentSchedule(scene,{name:p.name,revision:p.revision,materials:MATERIALS}),filename:`${p.name}-v${p.revision}-设计构件清单.csv`};
    if(input.format==='svg') {
      const {geometry,...sheet}=await this.makeDrawingSheet(source,input.view??'plan',!!input.drawingId,signal,input.cutAt);
      check(this.drawingSource(session,input).p.name===p.name,'工程已变化，请重新导出');
      return {...metadata,view:sheet.view,svg:sheetSvg(sheet),geometryBasis:geometry.basis,filename:`${p.name}-v${p.revision}-${sheet.label}.svg`};
    }
    check(input.format==='dxf'&&!input.drawingId,'DXF路径导出仅适用于已确认当前工程；草案使用SVG核对');
    const ready=this.readyModel(id,p.revision,metadata.sceneHash);
    check(ready&&((ready.detail.cadFingerprint===cadFingerprint(scene))||validCadAudit(ready.detail,metadata.sceneHash)),'请先完成当前CAD图册，再导出正式DXF');
    const path=this.store.dir(id,ready.detail.relativePath,'plan.dxf'),bytes=await readFile(path);
    check(hash(bytes)===ready.detail.files['plan.dxf'].sha256,'当前CAD文件校验失败');
    this.drawingSource(session,input);
    return {...metadata,path,sha256:hash(bytes),generatedRevision:ready.revision,applicableRevision:p.revision,
      instruction:'引用真实文件与来源版本，不把工作区的早期SVG或独立草稿当作当前图纸。'};
  }
  async propose(session, input, operation, model=false) {
    const plan = proposal(input);
    let id = this.store.bound(session);
    if (!id) id = this.store.create(session, input.name ?? '新设计方案', plan.kind, operation + ':create').id;
    const p = this.store.project(id);
    if(model)check(this.acceptedBrief(id),'新设计请先用studio_brief确认需求卡，再提出空间方案');
    const pending=this.store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id);
    check(!pending||JSON.parse(pending.data).type!=='drawing','已有 CAD 草案，请用绘图工具调整');
    this.store.once(session, operation, { id, plan }, () => {
      this.store.assertWriter(session, id, p.revision);
      check(p.revision === 0, '当前工程已有场景，请新建工程后提出新方案');
      this.store.db.prepare('INSERT OR REPLACE INTO proposals VALUES(?,?)').run(id, JSON.stringify(plan));
      return { projectId: id, state: 'awaiting_user_confirmation' };
    });
    return { projectId: id, state: 'awaiting_user_confirmation', instruction: '请在右侧核对并接受方案。尚未生成或确认几何。' };
  }
  draw(...args) {
    return this.trackCad(this.prepareDrawing(...args));
  }
  trackCad(work) {
    this.drawings.add(work);
    return work.finally(()=>this.drawings.delete(work));
  }
  async prepareDrawing(session,input,operation,signal,model=false,refinement) {
    signal?.throwIfAborted();
    const draft=refinement?.scene??drawingScene(input);
    if(!HAS_LOCAL_ASSETS)check(!draft.objects.some(object=>
      object.type==='asset'&&Object.hasOwn(FURNITURE,object.asset)||
      [object.material,...Object.values(object.materials??{})].some(id=>MATERIALS[id]?.texture)),
    '此方案使用了未安装的家具或贴图，请改用通用构件、导入模型或基础材质');
    let id=this.store.bound(session);
    if(!id)id=this.store.create(session,input.name,input.kind,operation+':create').id;
    const request=refinement?.request??{id,...input};
    const old=this.store.db.prepare('SELECT requestHash,result FROM receipts WHERE session=? AND operation=?').get(session,operation);
    if(old){check(old.requestHash===hash(JSON.stringify(request)),'操作 ID 已用于不同请求');return JSON.parse(old.result);}
    const project=this.store.assertWriter(session,id,input.expectedRevision);
    check(project.kind===input.kind,'设计类型与当前工程不同，请新建对应类型的工程');
    if(model&&project.revision>0)check(this.modelAllowed(session,id),'请先授权当前模型读取已有工程，再调整设计');
    const previous=this.store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id)?.data??null;
    const brief=this.acceptedBrief(id);
    check(!previous||JSON.parse(previous).type!=='brief','需求卡尚未确认，请先由用户核对');
    if(model&&project.revision===0)check(brief,'新设计请先用studio_brief保存需求卡，并由用户在右侧确认');
    if(refinement)check(previous===refinement.previous,'待确认方案已变化，请回读后重新细化');
    const current=this.store.read(id),priorDraft=previous?JSON.parse(previous):null;
    const baseline=brief&&current?.design?.briefId!==brief.briefId?brief.constraints:current?.design?.constraints??brief?.constraints;
    if(brief)draft.design.briefId=brief.briefId;
    draft.design.constraints=mergeConstraints(input.constraints??refinement?.scene.design?.constraints,
      priorDraft?.type==='drawing'&&priorDraft.baseRevision===project.revision?priorDraft.scene.design?.constraints:baseline);
    draft.design.constraintChanges=constraintChanges(baseline,draft.design.constraints);
    draft.schemaVersion=Math.max(7,draft.schemaVersion);
    if(refinement)validateScene(draft);
    reviewDesign(draft,{}); // Validate the saved list before any worker or CAD file is created.
    const drawingId=randomUUID();draft.design.drawingId=drawingId;
    const staging=this.store.dir(id,'staging','drawing-'+drawingId),relativePath='drafts/'+drawingId;
    const output=this.store.dir(id,relativePath);let saved=false;const createdResources=[];
    try {
      await mkdir(staging,{recursive:true,mode:0o700});
      const prepared=await this.engine.request({action:refinement?'refine':'draw',scene:draft,drawingId,output:staging},signal);
      signal?.throwIfAborted();validateScene(prepared.scene);
      for(const item of prepared.scene.objects.filter(o=>o.type==='asset')) {
        const conflicts=placementConflicts(prepared.scene,item);
        check(!conflicts.length,`${item.label} (${item.origin.key??item.id}，中心 ${item.position.join(',')}) 与以下对象/空间重叠：${conflicts.join('；')}。请调整布置，保留门扇开启范围和门前 0.45 m 空位。`);
      }
      prepared.scene.design.componentReview=reviewSolids(prepared.scene);
      const requirementReview=reviewDesign(prepared.scene,{});
      prepared.scene.design.quality=requirementReview.quality;
      const bytes=await readFile(join(staging,'plan.dxf'));check(bytes.length>0&&bytes.length<=20*1024*1024,'CAD 草案文件无效');
      prepared.scene.design.draftCadHash=hash(bytes);
      const summary={name:input.name,width:input.width,depth:input.depth,height:input.height,
        rooms:prepared.scene.objects.filter(o=>o.type==='floor').map(o=>({name:o.label,area:o.area,areaBasis:o.origin.areaBasis})),
        doors:prepared.scene.objects.flatMap(o=>o.openings??[]).filter(o=>o.kind==='door').length,
        windows:prepared.scene.objects.flatMap(o=>o.openings??[]).filter(o=>o.kind==='window').length,
        furniture:prepared.scene.objects.filter(o=>o.type==='asset').length,components:prepared.scene.objects.filter(o=>o.type==='solid').length,
        importedModels:prepared.scene.objects.filter(o=>o.type==='model').length,assumptions:prepared.scene.design.assumptions,
        measurements:prepared.scene.design.review,furnitureReview:reviewFurniture(prepared.scene),componentReview:prepared.scene.design.componentReview,
        constraints:prepared.scene.design.constraints,constraintChanges:prepared.scene.design.constraintChanges,quality:requirementReview.quality,
        fixedChecks:requirementReview.fixedChecks};
      const draftSource=JSON.stringify(prepared.scene),draftSourceHash=hash(draftSource);
      const pending={type:'drawing',drawingId,baseRevision:project.revision,relativePath,sha256:hash(bytes),draftSourceHash,scene:prepared.scene,summary};
      await writeFile(join(staging,'scene.json'),draftSource,{flag:'wx',mode:0o600});
      await mkdir(this.store.dir(id,'drafts'),{recursive:true,mode:0o700});await rename(staging,output);
      const result=this.store.once(session,operation,request,()=>{
        this.store.assertWriter(session,id,project.revision);
        check(this.store.bound(session)===id,'活动工程已变化，请重新提交设计');
        check((this.store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id)?.data??null)===previous,'待确认方案已变化，请重新绘制');
        for(const resource of refinement?.resources??[]) {
          const path=this.store.dir(id,'resources',resourceName(resourceHash(resource.bytes),resource.extension));
          mkdirSync(this.store.dir(id,'resources'),{recursive:true,mode:0o700});
          try {writeFileSync(path,resource.bytes,{flag:'wx',mode:0o600});createdResources.push(path);}
          catch(error){if(error.code!=='EEXIST')throw error;check(resourceHash(readFileSync(path))===resourceHash(resource.bytes),'工程资源已损坏，请保留工程并检查');}
        }
        this.store.db.prepare('INSERT OR REPLACE INTO proposals VALUES(?,?)').run(id,JSON.stringify(pending));
        return {projectId:id,drawingId,draftSourceHash,state:'awaiting_user_confirmation',summary,
          instruction:'CAD 草案已在右侧显示，可下载 DXF。只按 measurements 引用实算尺寸，不要自行估算净面积。检查 measurements.issues 与 furnitureReview.issues；朝向建议须重新通过碰撞校核，特殊摆放须说明。优先修正并重新绘图，不能修正时说明待核对项。请用户核对并确认；尚未替换当前三维模型，尚未渲染。'};
      });
      saved=result.drawingId===drawingId;
      if(!saved)return result;
      const prior=previous?JSON.parse(previous):null;
      if(prior?.type==='drawing'&&/^drafts\/[a-f0-9-]{36}$/.test(prior.relativePath)) {
        let retired=false;
        try {cleanSupersededDraft(this.store,id,prior);retired=true;}
        catch(error){result.warning='新草案已保存，旧草案临时文件未能清理：'+error.message;}
        if(retired&&this.drawings.size<=1) {
          try {
            const retained=new Set(sceneResources(prepared.scene));
            for(const row of this.store.db.prepare('SELECT revision FROM revisions WHERE project=?').all(id))for(const file of sceneResources(this.store.read(id,row.revision)))retained.add(file);
            for(const file of new Set(sceneResources(prior.scene)))if(!retained.has(file)) {
              const path=this.store.dir(id,'resources',file);
              check(resourceHash(readFileSync(path))===file.split('.')[0],'旧草案资源已变化，已保留');unlinkSync(path);
            }
          } catch(error){result.warning=(result.warning??'')+'；未引用的旧草案资源清理未完成：'+error.message;}
        }
      }
      return result;
    } catch(error) {
      for(const path of createdResources)unlinkSync(path);
      throw error;
    } finally {
      await rm(staging,{recursive:true,force:true});
      if(!saved)await rm(output,{recursive:true,force:true});
    }
  }
  refine(session,input,operation,signal,model=false) {
    return this.trackCad(this.prepareRefinement(session,input,operation,signal,model));
  }
  async prepareRefinement(session,input,operation,signal,model) {
    signal?.throwIfAborted();
    const id=this.store.bound(session);check(id,'请先绘制并确认一个设计工程');
    const p=this.store.assertWriter(session,id,input.expectedRevision);check(p.revision>0,'请先确认 CAD 尺寸，再细化模型');
    if(model)check(this.modelAllowed(session,id),'请先授权当前模型读取已有工程');
    const request={id,...input},receipt=this.store.db.prepare('SELECT requestHash,result FROM receipts WHERE session=? AND operation=?').get(session,operation);
    if(receipt){check(receipt.requestHash===hash(JSON.stringify(request)),'操作 ID 已用于不同请求');return JSON.parse(receipt.result);}
    const pending=this.store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id),prior=pending?JSON.parse(pending.data):null;
    check(!prior||input.drawingId===prior.drawingId&&prior.baseRevision===p.revision,'已有待确认草案，请带最新 drawingId 继续细化或由用户处理');
    const scene=structuredClone(prior?.scene??this.store.read(id));
    check(scene,'没有可细化的场景');scene.schemaVersion=Math.max(5,scene.schemaVersion);
    scene.design??={name:p.name,dimensionBasis:scene.kind==='booth'?'site':'centerline',assumptions:[],roomLabels:[]};
    const models=input.models??[],surfaces=input.surfaces??[],remove=input.removeKeys??[];
    check(Array.isArray(models)&&models.length<=8&&Array.isArray(surfaces)&&surfaces.length<=30&&Array.isArray(remove)&&remove.length<=100,'单次最多8个模型、30个饰面和100个移除对象');
    check(models.length||surfaces.length||remove.length||input.presentation||input.constraints,'请提供本轮细化内容');
    const find=key=>{const rows=scene.objects.filter(o=>o.origin?.key===key||o.id===key);check(rows.length===1,'对象不存在或编号不唯一：'+key);return rows[0];};
    const previousByKey=new Map(scene.objects.map(o=>[o.origin?.key,o]));
    for(const name of new Set(remove)) {const object=find(name);check(['model','solid','asset'].includes(object.type),'不能通过细化工具删除墙体或地面');scene.objects=scene.objects.filter(o=>o.id!==object.id);}
    const staging=this.store.dir(id,'staging','refinement-'+randomUUID()),resources=[];let totalBytes=0;
    const read=async(path,kind)=>{const r=await readResource(path,kind,signal);totalBytes+=r.bytes.length;check(totalBytes<=64*1024*1024,'本轮导入累计超过64 MiB');return r;};
    try {
      await mkdir(staging,{recursive:true,mode:0o700});
      const touched=new Set();
      for(const row of models) {
        key(row.key);check(!touched.has(row.key),'本轮模型编号重复');touched.add(row.key);
        label(row.source,500);const position=vector(row.position,'模型底面中心'),rotationEuler=vector(row.rotation??[0,0,0],'模型角度').map(n=>finite(n,'模型角度',-360,360)*Math.PI/180);
        const source=await read(row.path,'model'),folder=join(staging,row.key);await mkdir(folder,{mode:0o700});
        const path=join(folder,'input.glb');await writeFile(path,source.bytes,{flag:'wx',mode:0o600});
        const imported=await this.engine.request({action:'import-model',path,output:folder,scale:finite(row.scale??1,'单位换算',.001,1000)},signal);
        const bytes=await readFile(join(folder,'model.glb'));check(bytes.length>0&&bytes.length<=20*1024*1024,'标准化模型超过20 MiB');
        const audit=validateGlb(bytes);const previous=previousByKey.get(row.key);
        check(!previous||['model','solid','asset'].includes(previous.type),'不能用模型替换墙体或地面');
        const item={id:previous?.id??randomUUID(),type:'model',label:label(row.label??row.key),resource:resourceHash(bytes),size:imported.size,
          position,rotationEuler,source:row.source,audit,...(previous?.assembly?{assembly:previous.assembly}:{}),
          origin:{category:'design_proposal',actor:model?'model_tool':'local_user',status:'awaiting_user_confirmation',key:row.key}};
        scene.objects=scene.objects.filter(o=>o.id!==item.id);scene.objects.push(item);resources.push({bytes,extension:'glb'});
      }
      for(const row of surfaces) {
        check(Array.isArray(row.keys)&&row.keys.length>0&&row.keys.length<=100,'饰面需指定1–100个对象编号');label(row.source,500);
        const resource=await read(row.path,'surface');
        const surface={resource:resourceHash(resource.bytes),extension:resource.extension,source:row.source,face:row.face??'all',repeat:row.repeat,rotation:finite(row.rotation??0,'纹理角度',-360,360)*Math.PI/180,roughness:row.roughness??.6,emission:row.emission??0};
        validateSurface(surface);
        for(const name of row.keys){const item=find(name);check(['solid','floor'].includes(item.type),'图像饰面需应用于参数构件或地面；精细模型请保留源GLB材质');item.surface=structuredClone(surface);}
        resources.push(resource);
      }
      if(input.presentation)scene.presentation=presentationFromInput(input.presentation,scene.presentation);
      signal?.throwIfAborted();
      const onlyCameras=!input.constraints&&!models.length&&!surfaces.length&&!remove.length&&input.presentation&&Object.keys(input.presentation).every(k=>k==='cameras');
      if(onlyCameras&&!prior) {
        validateScene(scene);
        requireConstraintsReady(reviewDesign(scene,{}));
        const before=this.store.read(id);
        check(modelFingerprint(before,MATERIALS)===modelFingerprint(scene,MATERIALS)&&cadFingerprint(before)===cadFingerprint(scene),'机位更新包含几何或外观变化，请走CAD草案');
        const keys=new Set([...(before.presentation?.cameras??[]),...(scene.presentation?.cameras??[])].map(c=>c.key));
        const changedViews=[...keys].filter(view=>viewFingerprint(before,view,MATERIALS,'')!==viewFingerprint(scene,view,MATERIALS,''));
        return this.store.once(session,operation,request,()=>{
          this.store.assertWriter(session,id,p.revision);check(this.store.bound(session)===id&&!this.store.db.prepare('SELECT 1 FROM proposals WHERE project=?').get(id),'工程或CAD草案已变化，请重新读取');
          const result=this.store.commit(session,id,p.revision,scene,operation);
          return {...result,state:'presentation_saved',changedViews,geometryChanged:false,cadGeometryExported:false,
            instruction:'机位已版本化保存，已确认几何未变；无需再次确认CAD或重建模型。只渲染changedViews中仍存在的视图，其他有效图片保留真实来源。'};
        });
      }
      const summaryInput={...input,name:scene.design.name,kind:scene.kind,width:scene.bounds[0],depth:scene.bounds[1],height:scene.parameters.height};
      // Preserve the public request for idempotence, including local source paths only in its hash.
      return await this.prepareDrawing(session,summaryInput,operation,signal,model,{scene,resources,request,previous:pending?.data??null});
    } finally {await rm(staging,{recursive:true,force:true});}
  }
  async importCad(session, input, operation, signal) {
    check(typeof input.name === 'string' && /^[^/\\\x00-\x1f]{1,180}\.(dxf|dwg)$/i.test(input.name), '请选择 DWG 或 DXF 文件');
    if (/\.dwg$/i.test(input.name)) throw new Error('DWG_NOT_LICENSED：当前开发包尚无获商业分发授权的 DWG 引擎，直接 DWG 导入未通过。可验证 DXF 受限流程；不会在线转换或静默改名。');
    check(typeof input.base64 === 'string' && input.base64.length <= 28 * 1024 * 1024
      && /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(input.base64), 'CAD 数据无效或超过 20 MiB');
    const bytes = Buffer.from(input.base64, 'base64');
    check(bytes.length > 0 && bytes.length <= 20 * 1024 * 1024, 'CAD 为空或超过 20 MiB');
    let id = this.store.bound(session);
    if (!id) id = this.store.create(session, input.name.replace(/\.[^.]+$/, ''), 'interior', operation + ':project').id;
    this.store.assertWriter(session, id, this.store.project(id).revision);
    check(this.store.project(id).revision === 0, '请为新的 CAD 新建工程，避免替换已有设计');
    const fileHash = hash(bytes), importId = randomUUID();
    const request = { id, name: input.name, fileHash };
    const old = this.store.db.prepare('SELECT requestHash,result FROM receipts WHERE session=? AND operation=?').get(session,operation);
    if (old) { check(old.requestHash === hash(JSON.stringify(request)), '操作 ID 已用于不同请求'); return JSON.parse(old.result); }
    const sourceDir = this.store.dir(id, 'source', 'original');
    await mkdir(sourceDir, { recursive: true, mode: 0o700 });
    const source = this.store.dir(id, 'source', 'original', `${fileHash}.dxf`);
    try { await writeFile(source, bytes, { flag: 'wx', mode: 0o400 }); }
    catch (error) {
      if (error.code !== 'EEXIST') throw error;
      check(hash(await readFile(source)) === fileHash, '原件保全校验失败');
    }
    if (process.platform !== 'win32') await chmod(source, 0o400);
    const report = await this.engine.request({ action: 'parse', path: source, fileHash, importId }, signal);
    report.displayName = input.name;
    const importDir = this.store.dir(id, 'imports');
    await mkdir(importDir, { recursive: true, mode: 0o700 });
    await writeFile(this.store.dir(id, 'imports', `${importId}.json`), JSON.stringify(report, null, 2), { flag: 'wx', mode: 0o600 });
    return this.store.once(session,operation,request,()=>{
      this.store.assertWriter(session,id,0);
      this.store.db.prepare('INSERT INTO imports VALUES(?,?,?)').run(importId, id, JSON.stringify(report));
      return { projectId: id, importId, state: 'awaiting_user_confirmation' };
    });
  }
  async analyzeCad(session, input, operation, signal) {
    const id=this.store.bound(session);check(id,'没有活动工程');
    this.store.assertWriter(session,id,0);
    const row=this.store.db.prepare('SELECT report FROM imports WHERE id=? AND project=?').get(input.importId,id);
    check(row,'导入报告不属于当前工程');
    const original=JSON.parse(row.report);
    check(/^[a-f0-9]{64}$/.test(original.fileHash),'原件摘要无效');
    const options={};
    for(const key of ['wallLayers','doorLayers','windowLayers','openingLayers','wallMode','unit','maxWallThickness']) {
      if(input[key]!==undefined)options[key]=input[key];
    }
    const request={id,importId:input.importId,options};
    const old=this.store.db.prepare('SELECT requestHash,result FROM receipts WHERE session=? AND operation=?').get(session,operation);
    if(old){check(old.requestHash===hash(JSON.stringify(request)),'操作 ID 已用于不同请求');return JSON.parse(old.result);}
    const source=this.store.dir(id,'source','original',original.fileHash+'.dxf');
    check(hash(await readFile(source))===original.fileHash,'原件校验失败');
    const importId=randomUUID();
    const report=await this.engine.request({action:'parse',path:source,fileHash:original.fileHash,importId,options},signal);
    report.displayName=original.displayName;
    await writeFile(this.store.dir(id,'imports',importId+'.json'),JSON.stringify(report,null,2),{flag:'wx',mode:0o600});
    return this.store.once(session,operation,request,()=>{
      this.store.assertWriter(session,id,0);
      this.store.db.prepare('INSERT INTO imports VALUES(?,?,?)').run(importId,id,JSON.stringify(report));
      return {projectId:id,importId,state:'awaiting_user_confirmation'};
    });
  }
  furnish(session, input, operation, model=false) {
    const id=this.store.bound(session);check(id,'没有活动工程');
    if(model)check(this.modelAllowed(session,id),'项目数据未获当前模型外发授权');
    check(HAS_LOCAL_ASSETS,'当前未安装可选家具库，请使用通用构件或导入模型');
    return this.store.once(session,operation,{id,...input},()=>{
      const p=this.store.assertWriter(session,id,input.expectedRevision);
      check(p.revision>0,'请先确认空间尺寸并建模');
      const scene=this.store.read(id),result=furnishScene(scene,input,scene.parameters?.confirmationId);
      result.scene.objects.find(o=>o.id===result.objectId).origin.actor=model?'model_tool':'local_user';
      const saved=this.store.commit(session,id,p.revision,result.scene,operation);
      this.store.select(session,id,saved.revision,result.objectId);
      return {...saved,objectId:result.objectId,changedIds:result.changedIds};
    });
  }
  confirm(session, input, operation) {
    const id = this.store.bound(session); check(id, '请先建立工程');
    const accepted=this.store.once(session, operation, { id, ...input }, () => {
      const p = this.store.assertWriter(session, id, input.expectedRevision);
      if(input.briefId!==undefined) {
        const row=this.store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id),brief=row?JSON.parse(row.data):null;
        check(brief?.type==='brief'&&brief.briefId===input.briefId&&brief.baseRevision===p.revision,'需求卡已变化，请重新核对');
        check(input.acceptBrief===true,'请先核对需求卡中的原要求与暂拟条件');
        const confirmationId=this.store.confirmation(id,{...brief,action:'design_brief'});
        this.store.db.prepare('DELETE FROM proposals WHERE project=?').run(id);
        return {projectId:id,revision:p.revision,briefId:brief.briefId,confirmationId,state:'requirements_confirmed'};
      }
      let scene;
      const confirmationId = this.store.confirmation(id, input);
      if(input.drawingId) {
        const row=this.store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id);
        const draft=row?JSON.parse(row.data):null;
        check(draft?.type==='drawing'&&draft.drawingId===input.drawingId&&draft.baseRevision===p.revision,'CAD 草案已变化，请重新查看并确认');
        check(input.acceptDrawing===true,'请核对 CAD 方案和尺寸后确认');
        check(!draft.scene.design.constraintChanges?.length||input.acceptConstraintChanges===true,'项目要求有变更，请在确认窗口逐项核对并接受');
        requireConstraintsReady(reviewDesign(draft.scene,{}));
        scene=structuredClone(draft.scene);
        scene.parameters={...scene.parameters,status:'user_confirmed',confirmationId};
        scene.design.confirmationId=confirmationId;
        if(scene.design.constraints)scene.design.constraints.confirmationId=confirmationId;
        for(const object of scene.objects) {
          object.origin={...object.origin,status:'user_confirmed',confirmationId,acceptedBy:'user'};
          for(const opening of object.openings??[])opening.origin={...opening.origin,status:'user_confirmed',confirmationId,acceptedBy:'user'};
        }
      } else if (input.importId) {
        check(p.revision===0,'工程已有确认场景');
        const row = this.store.db.prepare('SELECT report FROM imports WHERE id=? AND project=?').get(input.importId, id);
        check(row, '导入报告不属于当前工程');
        check(input.acceptCenterlines === true, '请确认当前墙中心线识别范围');
        scene = sceneFromCad(JSON.parse(row.report), input, confirmationId);
      } else {
        check(p.revision===0,'工程已有确认场景');
        const row = this.store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id);
        check(row, '没有待确认的方案');
        scene = sceneFromProposal(JSON.parse(row.data), confirmationId);
      }
      const brief=this.acceptedBrief(id);
      if(!input.drawingId&&brief) {
        scene.schemaVersion=Math.max(7,scene.schemaVersion);
        scene.design??={name:p.name,dimensionBasis:p.kind==='booth'?'site':'centerline',assumptions:brief.assumptions,roomLabels:[]};
        scene.design.briefId=brief.briefId;
        scene.design.constraints=mergeConstraints(undefined,brief.constraints);
        requireConstraintsReady(reviewDesign(scene,{}));
      }
      const result = this.store.commit(session, id, input.expectedRevision, scene, operation, confirmationId);
      this.store.db.prepare('DELETE FROM proposals WHERE project=?').run(id);
      return result;
    });
    if(input.drawingId)try {cleanConfirmedDraft(this.store,id,input.drawingId);}
    catch(error){accepted.warning='已保存源版本；临时CAD副本清理未完成：'+error.message;}
    return accepted;
  }
  edit(session, input, operation, model = false) {
    const id = this.store.bound(session); check(id, '没有活动工程');
    if (model) check(this.modelAllowed(session,id), '项目数据未获当前模型外发授权');
    return this.store.once(session, operation, { id, ...input }, () => {
      const p = this.store.assertWriter(session, id, input.expectedRevision);
      const selection = this.store.selection(session, id, p.revision, input.selectionToken);
      check(selection, '请先点选对象或墙面');
      const result = editScene(this.store.read(id), selection, input);
      const saved=this.store.commit(session,id,p.revision,result.scene,operation);
      if(result.scene.objects.some(o=>o.id===selection.objectId))this.store.select(session,id,saved.revision,selection.objectId,selection.surfaceId);
      return { ...saved, changedIds: result.changedIds,
        selectionSnapshot: selection };
    });
  }
  /** A task publishes its immutable output only after all files and hashes are present. */
  acceptanceEvidence(id,scene) {
    const evidence={views:[],supports:[]},seen={views:new Set(),supports:new Set()};
    const modelHash=modelFingerprint(scene,MATERIALS),meshScopeHash=meshScopeFingerprint(scene),runtime=this.engine.manifest?.blenderVersion??'test';
    for(const task of this.store.db.prepare("SELECT detail FROM tasks WHERE project=? AND state IN ('complete','failed') ORDER BY rowid DESC").iterate(id)) {
      const detail=JSON.parse(task.detail);
      if(detail.modelHash!==modelHash||detail.runtime!==runtime)continue;
      const append=(group,row)=>{if(!seen[group].has(row.id)){seen[group].add(row.id);evidence[group].push(row);}};
      if(detail.meshScopeHash===meshScopeHash)for(const row of detail.meshContactReview?.declaredSupports??[])append('supports',row);
      for(const view of detail.preflight?.views??[])if(detail.viewFingerprints?.[view.id]===viewFingerprint(scene,view.id,MATERIALS,runtime))
        for(const row of view.fixedChecks??[])append('views',row);
    }
    return evidence;
  }
  readyModel(id,revision,sceneHash) {
    const scene=this.store.read(id,revision),fingerprint=modelFingerprint(scene,MATERIALS);
    for(const task of this.store.db.prepare("SELECT * FROM tasks WHERE project=? AND state='complete' AND json_type(detail,'$.files.\"scene.glb\"') IS NOT NULL ORDER BY rowid DESC").iterate(id)) {
      const detail=JSON.parse(task.detail);
      if(!detail.files?.['scene.glb']||!detail.files?.['scene.blend']||!detail.meshAudit?.passed)continue;
      const same=task.revision===revision&&validCadAudit(detail,sceneHash);
      const reused=detail.modelHash===fingerprint&&detail.runtime===(this.engine.manifest?.blenderVersion??'test')&&validCadAudit(detail,detail.cadAudit?.sceneHash);
      if(same||reused)return {...task,detail};
    }
    return null;
  }
  assertCurrentCad(id,revision,sceneHash) {
    check(this.store.project(id).revision===revision&&hash(JSON.stringify(this.store.read(id,revision)))===sceneHash,'CAD 版本已变化，请重新生成三维');
    const pending=this.store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id),draft=pending?JSON.parse(pending.data):null;
    check(draft?.type!=='drawing'||draft.baseRevision!==revision,'当前 CAD 草案尚未确认，请先核对方案再建模或出图');
  }
  startBuild(session, input, operation, render = false, execution) {
    const jobs=typeof this.jobs==='function'?this.jobs():this.jobs;
    check(!execution?.agent||jobs,'原生后台任务服务未加载，无法启动设计任务');
    const id = this.store.bound(session); check(id, '没有活动工程');
    const p = this.store.project(id);
    check(input.projectId===undefined || input.projectId===id,'活动工程已变化，请重新操作');
    check(p.revision > 0 && p.revision === input.expectedRevision, '场景版本已变化');
    const pending=this.store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id);
    const draft=pending?JSON.parse(pending.data):null;
    check(draft?.type!=='drawing'||draft.baseRevision!==p.revision,'当前 CAD 草案尚未确认，请先核对方案再建模或出图');
    check(input.quality === undefined || ['preview','1080p','4k'].includes(input.quality), '不支持的渲染档位');
    const frozen=this.store.read(id,p.revision),viewLabels={...VIEW_LABELS,...Object.fromEntries((frozen.presentation?.cameras??[]).map(c=>[c.key,c.label]))};
    const brief=this.acceptedBrief(id);
    check(!brief||frozen.design?.briefId===brief.briefId,'需求卡已更新，请先按最新需求修改并确认CAD，再建模或出图');
    check(draft?.type!=='brief','需求卡尚未确认，请先处理当前需求');
    const views=render?(input.views??recommendedRenderViews(frozen)):[];
    requireConstraintsReady(reviewDesign(frozen,{}),render?'render':'cad');
    check(Array.isArray(views)&&(!render||views.length>=1)&&views.length<=12&&new Set(views).size===views.length&&views.every(v=>Object.hasOwn(viewLabels,v)),'请选择1–12个不同的有效渲染视角');
    const sceneHash=hash(JSON.stringify(frozen)),ready=render?this.readyModel(id,p.revision,sceneHash):null;
    if(render)check(ready,'请先生成当前版本的三维模型并核对（须先完成 CAD 图纸），再开始渲染');
    const receipt = this.store.once(session, operation, { id, ...input, render }, () => {
      check(![...this.running.values()].some(t => render && t.render), '已有高清渲染任务，请完成或取消后重试');
      const taskId = randomUUID();
      this.store.db.prepare('INSERT INTO tasks VALUES(?,?,?,?,?)').run(taskId, id, p.revision, 'queued', JSON.stringify({ render,requestedViews:views }));
      return { taskId, projectId: id, revision: p.revision, state: 'queued' };
    });
    if (this.running.has(receipt.taskId) || this.store.db.prepare('SELECT state FROM tasks WHERE id=?').get(receipt.taskId).state !== 'queued') {
      const detail=JSON.parse(this.store.db.prepare('SELECT detail FROM tasks WHERE id=?').get(receipt.taskId).detail);
      return {...receipt,...(detail.jobId?{jobId:detail.jobId}:{})};
    }
    const controller = new AbortController();
    const scene = frozen;
    const staging = this.store.dir(id, 'staging', receipt.taskId);
    const output = this.store.dir(id, render ? 'renders' : 'builds', receipt.taskId);
    let jobHandle;
    const set = (state, detail) => {
      if(jobHandle&&detail.phase)jobHandle.updateProgress(detail.phase);
      this.store.db.prepare('UPDATE tasks SET state=?,detail=? WHERE id=?').run(state, JSON.stringify({...detail,...(jobHandle?{jobId:jobHandle.id}:{})}), receipt.taskId);
    };
    const execute = async () => {
      let moved=false;
      try {
        set('running', { render,requestedViews:views, phase: render?'核对 CAD 与三维版本':'更新 CAD 图纸', started: new Date().toISOString() });
        await mkdir(staging, { recursive: true, mode: 0o700 });
        let cadAudit,cadPath,ownsCad=false;
        if(render&&(ready.detail.cadFingerprint===cadFingerprint(scene)||validCadAudit(ready.detail,sceneHash))) {
          const bytes=await readFile(this.store.dir(id,ready.detail.relativePath,'plan.dxf'));
          check(hash(bytes)===ready.detail.cadAudit.sha256,'CAD 图册校验失败，请重新生成三维');
          cadPath=this.store.dir(id,ready.detail.relativePath,'plan.dxf');cadAudit=ready.detail.cadAudit;
        } else {
          const sheets=await this.drawingSheets({id,p,scene},false,controller.signal);
          await this.engine.request({action:'drawing-sheets',scene,sheets,output:staging},controller.signal);
          await rename(join(staging,'drawings.dxf'),join(staging,'plan.dxf'));
          const bytes=await readFile(join(staging,'plan.dxf'));check(bytes.length>0&&bytes.length<=20*1024*1024,'CAD 图册为空或超过预算');
          cadAudit={passed:true,sceneHash,views:Object.keys(DRAWING_LABELS),sha256:hash(bytes),sheetsHash:hash(JSON.stringify(sheets))};
          ownsCad=true;cadPath=join(staging,'plan.dxf');
        }
        controller.signal.throwIfAborted();this.assertCurrentCad(id,p.revision,sceneHash);
        set('running',{render,requestedViews:views,cadAudit,phase:render?'渲染效果图':'生成三维模型'});
        const resolution = !render || input.quality === 'preview' ? [960, 720] : input.quality === '4k' ? [3840, 2160] : [1920, 1080];
        let blendPath;
        if(render) {
          blendPath=this.store.dir(id,ready.detail.relativePath,'scene.blend');
          check(hash(await readFile(blendPath))===ready.detail.files['scene.blend'].sha256,'三维源文件校验失败，请重新生成三维');
        }
        const result = await this.engine.request({ action: render?'render-existing':'build', scene, materials: MATERIALS, revision: p.revision,
          ...(render?{blendPath,blendHash:ready.detail.files['scene.blend'].sha256}:{}),
          output: staging,cadPath,cadHash:cadAudit.sha256,resourceRoot:this.store.dir(id,'resources'),render, views, resolution, samples: render && input.quality === '4k' ? 96 : 48 }, controller.signal, render,phase=>set('running',{render,requestedViews:views,cadAudit,phase}));
        if(render)requireRenderAcceptance(scene,result,views);
        if(result.meshContactReview?.declaredContacts?.some(r=>r.status==='fail')||result.meshContactReview?.duplicateGeometry?.length) {
          const error=new Error('实际网格存在未满足的指定接触或重复实体，请先修正CAD/模型：'+(result.meshContactReview.declaredContacts??[]).filter(r=>r.status==='fail').map(r=>r.id).join('、'));
          error.meshContactReview=result.meshContactReview;throw error;
        }
        if(result.preflight?.status==='fail') {
          const error=new Error('出图前检查未通过：'+result.preflight.views.filter(v=>v.status==='fail').map(v=>v.id+' '+v.failures.join('/')).join('；'));
          error.preflight=result.preflight;throw error;
        }
        controller.signal.throwIfAborted();
        this.assertCurrentCad(id,p.revision,sceneHash);
        const images=views.map((view,i)=>({id:view,file:i===0?'render.png':`render-${view}.png`}));
        check(!render||Array.isArray(result.views)&&result.views.length===images.length&&images.every((v,i)=>result.views[i].id===v.id&&result.views[i].file===v.file),'引擎未返回完整的视角集合');
        const files = {};
        for (const filename of [...(render?ownsCad?['plan.dxf']:[]:['plan.dxf','scene.blend','scene.glb']), ...images.map(v=>v.file)]) {
          const path = this.store.dir(id, 'staging', receipt.taskId, filename);
          const file = await stat(path); check(file.isFile() && file.size > 0, '引擎产物不完整');
          files[filename] = { bytes: file.size, sha256: hash(await readFile(path)) };
        }
        check(!files['plan.dxf']||files['plan.dxf'].sha256===cadAudit.sha256,'CAD 图册与建模记录不一致，未发布产物');
        await writeFile(join(staging, 'manifest.json'), JSON.stringify({ ...result, files,cadAudit,sceneHash }, null, 2), { flag: 'wx', mode: 0o600 });
        await mkdir(this.store.dir(id, render ? 'renders' : 'builds'), { recursive: true, mode: 0o700 });
        controller.signal.throwIfAborted();this.assertCurrentCad(id,p.revision,sceneHash);
        await rename(staging, output);
        moved=true;controller.signal.throwIfAborted();this.assertCurrentCad(id,p.revision,sceneHash);
        set('complete', { render,requestedViews:views,views:result.views?.map(v=>({...v,label:viewLabels[v.id]})), files, relativePath: `${render ? 'renders' : 'builds'}/${receipt.taskId}`,
          resolution,cadAudit,backend: result.backend,presentation:result.presentation,
          preflight:result.preflight,meshContactReview:result.meshContactReview??ready?.detail.meshContactReview,
          sceneHash,modelHash:modelFingerprint(scene,MATERIALS),meshScopeHash:meshScopeFingerprint(scene),cadFingerprint:cadFingerprint(scene),runtime:this.engine.manifest?.blenderVersion??'test',
          ...(render?{sourceModelTask:ready.id,sourceModelRevision:ready.revision,cadSourceTask:ownsCad?receipt.taskId:ready.id,
            viewFingerprints:Object.fromEntries(views.map(view=>[view,viewFingerprint(scene,view,MATERIALS,this.engine.manifest?.blenderVersion??'test')]))}:{}),
          meshAudit:result.poseAudit?{basis:result.poseAudit.basis,passed:result.poseAudit.passed&&(result.componentAudit?.passed??true)&&(result.importedAudit?.passed??!scene.objects.some(o=>o.type==='model')),
            checked:result.poseAudit.objects.length+(result.componentAudit?.objects.length??0)+(result.importedAudit?.objects.length??0),assetsChecked:result.poseAudit.objects.length,
            componentsChecked:result.componentAudit?.objects.length??0,importedChecked:result.importedAudit?.objects.length??0}:undefined,
          completed: new Date().toISOString() });
      } catch (error) {
        const state=controller.signal.aborted?'cancelled':'failed';
        try {await rm(moved?output:staging,{recursive:true,force:true});}
        catch(cleanupError){set('failed',{render,message:error.message+'；未完成产物清理失败：'+cleanupError.message});return;}
        set(state,{render,requestedViews:views,message:error.message,modelHash:modelFingerprint(scene,MATERIALS),meshScopeHash:meshScopeFingerprint(scene),runtime:this.engine.manifest?.blenderVersion??'test',
          viewFingerprints:Object.fromEntries(views.map(view=>[view,viewFingerprint(scene,view,MATERIALS,this.engine.manifest?.blenderVersion??'test')])),
          ...(error.preflight?{preflight:error.preflight}:{}),...(error.meshContactReview?{meshContactReview:error.meshContactReview}:{})});
      }
      finally { this.running.delete(receipt.taskId); }
    };
    const start=()=>{const done=execute();this.running.set(receipt.taskId,{controller,done,render});return done;};
    if(jobs&&execution?.agent) {
      try {
        const jobId=jobs.start({kind:'studio',owner:session,label:render?'生成设计效果图':'生成设计三维模型',outputLimitBytes:4096,
          toolCall:{callId:execution.callId,rootCallId:execution.rootCallId??execution.callId},run:handle=>{
            jobHandle=handle;
            return {cancel:()=>controller.abort(),done:start().then(()=>{
              const row=this.store.db.prepare('SELECT state,detail FROM tasks WHERE id=?').get(receipt.taskId),detail=JSON.parse(row.detail);
              return {status:row.state==='complete'?'completed':row.state==='cancelled'?'killed':'failed',detail:detail.message,
                result:JSON.stringify({taskId:receipt.taskId,revision:p.revision,state:row.state,views:detail.views?.map(v=>({id:v.id,file:v.file})),message:detail.message,
                  instruction:'生成状态不等于质量验收；读取相关检查和实际图片，修复后再交付。'})};
            })};
          }});
        return {...receipt,jobId};
      } catch(error){set('failed',{render,message:'后台任务未启动：'+error.message});throw error;}
    }
    start();return receipt;
  }
  async artifact(session, input) {
    const id = this.store.bound(session); check(id, '没有活动工程');
    const task = this.store.db.prepare('SELECT * FROM tasks WHERE id=? AND project=?').get(input.taskId, id);
    check(!['cleaning','removed'].includes(task?.state),'该派生文件已清理或正在清理；可编辑源版本仍保留，可重新生成');
    check(task?.state === 'complete', '任务尚未完成');
    const detail = JSON.parse(task.detail);
    check(typeof input.file==='string'&&(/^(plan\.dxf|scene\.(glb|blend|json)|manifest\.json|render(?:-[A-Za-z][A-Za-z0-9_-]{0,49})?\.png)$/.test(input.file)), '不支持的工程输出');
    check(['manifest.json','scene.json'].includes(input.file)||Object.hasOwn(detail.files??{},input.file),'该任务没有此视角或文件');
    if (input.file === 'scene.json') return Buffer.from(JSON.stringify(this.store.read(id, task.revision), null, 2));
    const bytes = await readFile(this.store.dir(id, detail.relativePath, input.file));
    if (input.file !== 'manifest.json') check(hash(bytes) === detail.files[input.file]?.sha256, '产物哈希校验失败');
    return bytes;
  }
  async ui(session, action, input, operation, signal) {
    switch (action) {
      case 'snapshot': return this.snapshot(session);
      case 'cleanup-preview': return this.cleanupPlan(session,input);
      case 'cleanup': return this.cleanup(session,input,operation);
      case 'create':
        check(!this.isSessionRunning(session), '聊天正在运行，请结束后再新建工程');
        return this.store.create(session, input.name, input.kind, operation);
      case 'open': return this.store.once(session,operation,input,()=>{
        check(this.store.bound(session) === input.projectId || !this.isSessionRunning(session), '聊天正在运行，请结束后再切换工程');
        if(input.takeOver === true) this.store.confirmation(input.projectId,{action:'writer_takeover',
          previousWriter:this.store.project(input.projectId).writer,nextWriter:session});
        return this.store.bind(session,input.projectId,input.takeOver === true);
      });
      case 'propose': return this.propose(session, input, operation);
      case 'draw': return this.draw(session,input,operation,signal);
      case 'brief': return this.brief(session,input,operation);
      case 'refine': return this.refine(session,input,operation,signal);
      case 'review': return this.review(session,input);
      case 'draft-preview': return this.draftPreview(session,input,signal);
      case 'drawing-sheet': return this.trackCad(this.drawingPage(session,input,signal));
      case 'drawing-set': return this.trackCad(this.drawingSet(session,input,signal));
      case 'export-design': return this.trackCad(this.exportDesign(session,input,signal));
      case 'drawing-artifact': {
        const id=this.store.bound(session);check(id,'没有活动工程');
        const row=this.store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id);const draft=row?JSON.parse(row.data):null;
        check(draft?.type==='drawing'&&draft.drawingId===input.drawingId,'CAD 草案已变化');
        const bytes=await readFile(this.store.dir(id,draft.relativePath,'plan.dxf'));
        check(hash(bytes)===draft.sha256,'CAD 草案校验失败');return {base64:bytes.toString('base64')};
      }
      case 'import': return this.trackCad(this.importCad(session, input, operation, signal));
      case 'analyze': return this.trackCad(this.analyzeCad(session,input,operation,signal));
      case 'furnish': return this.furnish(session,input,operation);
      case 'catalog-preview': {
        check(Object.hasOwn(AVAILABLE_FURNITURE,input.asset),'家具未安装或不可用');
        const path=new URL('../assets/'+AVAILABLE_FURNITURE[input.asset].preview,import.meta.url);
        return {base64:(await readFile(path)).toString('base64')};
      }
      case 'confirm': return this.confirm(session, input, operation);
      case 'select': return this.store.select(session, this.store.bound(session), input.expectedRevision, input.objectId, input.surfaceId);
      case 'consent': {
        const id = this.store.bound(session);
        const p = this.store.assertWriter(session, id, input.expectedRevision);
        check(typeof input.allow === 'boolean', '外发授权值无效');
        const route = this.routes.get(session);
        if (input.allow) check(route, '尚未确定接收模型。请先在聊天发送一条不含图纸资料的消息，再授权摘要。');
        const confirmationId = this.store.confirmation(id, { categories: ['dimensions', 'scene_summary', 'selection'],
          recipient: route ? JSON.parse(route) : null, purpose: 'interactive design', allow: input.allow });
        this.store.db.prepare('UPDATE projects SET consent=? WHERE id=?').run(input.allow ? 1 : 0, p.id);
        if (input.allow) this.store.db.prepare('INSERT OR IGNORE INTO route_grants VALUES(?,?,?)').run(session,id,route);
        else this.store.db.prepare('DELETE FROM route_grants WHERE project=?').run(id);
        return { allowed: input.allow, confirmationId };
      }
      case 'edit': return this.edit(session, input, operation);
      case 'undo': case 'redo': return this.store.history(session, this.store.bound(session), input.expectedRevision, action, operation);
      case 'build': return this.startBuild(session, input, operation);
      case 'render': return this.startBuild(session, input, operation, true);
      case 'cancel': {
        const task = this.store.db.prepare('SELECT project FROM tasks WHERE id=?').get(input.taskId);
        check(task?.project === this.store.bound(session), '任务不属于活动工程');
        this.running.get(input.taskId)?.controller.abort(); return { cancelling: input.taskId };
      }
      case 'artifact': return { base64: (await this.artifact(session, input)).toString('base64') };
      default: throw new Error('未支持的本地操作');
    }
  }
}
