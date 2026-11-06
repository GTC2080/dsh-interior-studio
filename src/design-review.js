/** Read-only requirement checks against the exact current scene or CAD draft. */
import {check} from './scene.js';
import {assetSolid,solidBounds,solidSurfaceDistance,solidsOverlap,reviewSolids,wallSolids} from './solids.js';
import {reviewFurniture} from './furniture-review.js';
import {modelPrism} from './refinement.js';
import {supportScreen,reviewCirculation} from './spatial-review.js';
import {reviewScopeDeclarations,applyScopeEvidence} from './acceptance-scope.js';

const numericProperties=['width','depth','height','local_width','local_depth','local_height','base_z','top_z','min_x','max_x','min_y','max_y','radius','count'];
const textProperties=['shape','material','text','representation'];
const text=(v,label,max=200)=>check(typeof v==='string'&&v.length>0&&v.length<=max&&!/[\x00-\x1f]/.test(v),label+'无效');
const bounded=(v,label,min,max)=>check(Number.isFinite(v)&&v>=min&&v<=max,label+'超出范围');
const source=row=>{text(row.id,'检查编号',60);text(row.source,'需求来源');check(['user_request','user_confirmed','design_assumption'].includes(row.basis),'需求依据无效');};

function reviewSelected(scene,input,full=true) {
  check(Array.isArray(input.requirements??[])&&(input.requirements??[]).length<=80,'尺寸/数量检查最多80项');
  check(Array.isArray(input.relations??[])&&(input.relations??[]).length<=80,'连接检查最多80项');
  const used=new Set();
  const identify=row=>{source(row);check(!used.has(row.id),'检查编号重复');used.add(row.id);return {id:row.id,source:row.source,basis:row.basis};};
  const resolve=key=>{
    text(key,'对象编号',100);
    const matches=scene.objects.filter(o=>o.id===key||o.origin?.key===key);
    return matches.length===1?matches[0]:null;
  };
  const bounds=o=>{
    if(o.type==='solid')return solidBounds(o);
    if(o.type==='asset')return solidBounds(assetSolid(o));
    if(o.type==='model')return solidBounds(modelPrism(o));
    if(o.type==='floor')return [[0,0,0],[o.width,o.depth,0]];
    if(o.type==='wall') {const boxes=wallSolids(o).map(solidBounds);return boxes.length?[0,1].map(end=>[0,1,2].map(axis=>(end?Math.max:Math.min)(...boxes.map(b=>b[end][axis])))):null;}
    return null;
  };
  const requirements=(input.requirements??[]).map(row=>{
    const result=identify(row);
    const scope=row.scope??'keys';check(['keys','scene','assembly'].includes(scope),'测量范围须为keys/scene/assembly');
    if(scope==='keys')check(Array.isArray(row.keys)&&row.keys.length>0&&row.keys.length<=500&&new Set(row.keys).size===row.keys.length,'对象编号列表无效或重复');
    if(scope==='assembly')text(row.assembly,'组合编号',50);
    check([...numericProperties,...textProperties].includes(row.property),'检查属性无效');
    const tolerance=row.tolerance??.001;bounded(tolerance,'公差',0,.05);
    if(numericProperties.includes(row.property))bounded(row.expected,'目标数值',-1000,1000);
    else text(row.expectedText,'目标文字');
    if(row.property==='count')check(Number.isInteger(row.expected)&&row.expected>=0&&tolerance===0,'数量须为非负整数，并明确使用 tolerance=0');
    const operator=row.operator??'equal';check(['equal','min','max'].includes(operator),'比较方式须为equal/min/max');
    check(row.stage===undefined||['cad','render'].includes(row.stage),'验收阶段须为cad/render');
    check(row.stage!=='render'||row.property==='representation','尺寸与数量不能推迟到出图阶段校核');
    if(row.property==='representation')check(['image_surface','model','text','solid'].includes(row.expectedText),'表达方式须为image_surface/model/text/solid');
    check(!textProperties.includes(row.property)||operator==='equal','文字属性仅支持equal');
    const objects=scope==='scene'?scene.objects:scope==='assembly'?scene.objects.filter(o=>o.assembly===row.assembly):row.keys.map(resolve);
    const missing=scope==='keys'?row.keys.filter((_,i)=>!objects[i]):objects.length?[]:[row.assembly??'scene'];
    Object.assign(result,{scope,keys:row.keys,assembly:row.assembly,property:row.property,operator,expected:row.expectedText??row.expected,tolerance,stage:row.stage??'cad'});
    if(missing.length)return {...result,status:'fail',reason:'missing_or_ambiguous_objects',missing};
    if(new Set(objects.map(o=>o.id)).size!==objects.length)return {...result,status:'fail',reason:'duplicate_object_aliases'};
    let actual;
    if(row.property==='count')actual=objects.length;
    else if(row.property==='representation') {
      const values=objects.map(o=>o.surface?'image_surface':o.type==='model'?'model':o.shape==='text'?'text':o.type==='solid'?'solid':o.type);
      return {...result,actual:[...new Set(values)].join(','),status:values.every(v=>v===row.expectedText)?'pass':'fail',
        scope:'saved representation and validated resource metadata; artwork content and visual fidelity require image review'};
    } else if(textProperties.includes(row.property)) {
      if(objects.length!==1)return {...result,status:'not_evaluated',reason:'single_object_required'};
      actual=objects[0][row.property];
    } else if(row.property==='radius') {
      if(objects.length!==1||objects[0].shape!=='cylinder')return {...result,status:'not_evaluated',reason:'cylinder_required'};
      actual=Math.max(...objects[0].outline.map(p=>Math.hypot(...p)));
    } else if(row.property.startsWith('local_')) {
      if(objects.length!==1)return {...result,status:'not_evaluated',reason:'single_object_required_for_local_dimensions'};
      const o=objects[0],b=o.type==='solid'?solidBounds({...o,position:[0,0,0],rotationEuler:[0,0,0]}):o.type==='model'?[[0,0,0],o.size]:o.type==='asset'?[[0,0,0],o.size]:null;
      if(!b)return {...result,status:'not_evaluated',reason:'local_dimensions_unavailable'};
      const axis={local_width:0,local_depth:1,local_height:2}[row.property];actual=b[1][axis]-b[0][axis];
    } else {
      const boxes=objects.map(bounds);
      if(boxes.some(b=>!b))return {...result,status:'not_evaluated',reason:'only_component_and_catalog_envelopes_supported'};
      const low=[0,1,2].map(i=>Math.min(...boxes.map(b=>b[0][i]))),high=[0,1,2].map(i=>Math.max(...boxes.map(b=>b[1][i])));
      actual={width:high[0]-low[0],depth:high[1]-low[1],height:high[2]-low[2],base_z:low[2],top_z:high[2],min_x:low[0],max_x:high[0],min_y:low[1],max_y:high[1]}[row.property];
    }
    if(actual===undefined)return {...result,status:'not_evaluated',reason:'property_unavailable'};
    const passed=typeof actual==='number'?(operator==='max'?actual<=row.expected+tolerance+1e-9:operator==='min'?actual>=row.expected-tolerance-1e-9:Math.abs(actual-row.expected)<=tolerance+1e-9):actual===row.expectedText;
    return {...result,actual,...(objects.some(o=>o.type==='model')?{geometryBasis:'imported_model_envelope; not net dimensions or exact contact'}:{}),status:passed?'pass':'fail'};
  });
  const relations=(input.relations??[]).map(row=>{
    const result=identify(row);check(['contact','support'].includes(row.kind),'关系须为 contact/support');
    check(Array.isArray(row.point)&&row.point.length===3&&row.point.every(v=>Number.isFinite(v)&&Math.abs(v)<=1000),'连接点须为米制XYZ');
    const tolerance=row.tolerance??.001;bounded(tolerance,'连接公差',.00001,.01);
    const a=resolve(row.a),b=resolve(row.b);Object.assign(result,{a:row.a,b:row.b,kind:row.kind,point:row.point,tolerance});
    if(!a||!b||a.id===b.id)return {...result,status:'fail',reason:'missing_ambiguous_or_same_object'};
    if([a,b].some(o=>o.type!=='solid'||o.shape==='text'))return {...result,status:'not_evaluated',reason:'exact_nontext_components_required'};
    const distances=[a,b].map(o=>solidSurfaceDistance(o,row.point)),penetration=solidsOverlap(a,b);
    const surfaceContact=distances.every(d=>Math.abs(d)<=tolerance);
    const step=.00001,above=row.point.map((v,i)=>v+(i===2?step:0)),below=row.point.map((v,i)=>v-(i===2?step:0));
    const verticallySupported=solidSurfaceDistance(a,above)<-1e-7&&solidSurfaceDistance(b,below)<-1e-7;
    return {...result,distances,penetration,scope:'declared_point_on_parametric_surfaces; support is vertical contact, not load capacity',
      status:surfaceContact&&!penetration&&(row.kind==='contact'||verticallySupported)?'pass':'fail',
      ...(!surfaceContact?{reason:'point_not_on_both_surfaces'}:penetration?{reason:'interpenetration'}:row.kind==='support'&&!verticallySupported?{reason:'not_vertical_support'}:{})};
  });
  const componentReview=full?reviewSolids(scene):{issues:[],intersections:[]},furnitureReview=full?reviewFurniture(scene):undefined;
  const results=[...requirements,...relations];
  return {scope:'selected requirements and declared connection points only; world envelopes are not net room dimensions; count covers only the named distinct objects',
    site:{width:scene.bounds[0],depth:scene.bounds[1],dimensionBasis:scene.design?.dimensionBasis},
    totals:Object.fromEntries(['pass','fail','not_evaluated'].map(s=>[s,results.filter(r=>r.status===s).length])),requirements,relations,
    componentReview:{basis:componentReview.basis,scope:componentReview.scope,checked:componentReview.checked,
      issueCount:componentReview.issues.length,intersectionCount:componentReview.intersections.length,
      issues:componentReview.issues.slice(0,100),intersections:componentReview.intersections.slice(0,100),
      truncated:componentReview.issues.length>100||componentReview.intersections.length>100},furnitureReview,
    supportReview:full?supportScreen(scene):undefined,circulationReview:reviewCirculation(scene,input.routes),
    statement:'这些检查不证明整套设计还原、视觉质量或施工合规；需求来源由调用方声明，design_assumption 仍待用户核对。'};
}

const section=rows=>({required:rows.length,covered:rows.filter(r=>r.status!=='not_evaluated').length,
  status:!rows.length?'not_evaluated':rows.some(r=>['fail','blocked'].includes(r.status))?'fail':rows.some(r=>r.status==='not_evaluated')?'not_evaluated':'pass'});

/** Saved requirements are always rechecked; ad-hoc totals retain their original limited meaning. */
export function reviewDesign(scene,input={},evidence={}) {
  const selected=reviewSelected(scene,input),constraints=scene.design?.constraints;
  const fixed=constraints?reviewSelected(scene,constraints,false):null;
  const scoped=applyScopeEvidence(reviewScopeDeclarations(scene,constraints),evidence);
  const quality={requirements:section(fixed?.requirements??[]),circulation:section(fixed?.circulationReview.routes??[]),connections:section(fixed?.relations??[]),
    views:section(scoped.views),crossAssembly:section(scoped.supports),
    temporary:{requirements:section(selected.requirements),circulation:section(selected.circulationReview.routes??[]),connections:section(selected.relations)},
    support:{status:selected.supportReview.status==='disconnected'?'fail':'not_evaluated',disconnectedGroups:selected.supportReview.disconnectedGroups.length},
    visual:{status:'not_evaluated'},coverage:{saved:!!constraints,
      required:['requirements','relations','routes','views','supports'].reduce((n,k)=>n+(constraints?.[k]?.length??0),0),
      savedCounts:Object.fromEntries(['requirements','relations','routes','views','supports'].map(k=>[k,constraints?.[k]?.length??0])),
      temporaryCounts:{requirements:selected.requirements.length,relations:selected.relations.length,routes:selected.circulationReview.routes.length},
      statement:constraints?'已保存要求自动重查；本次临时清单不会替代或缩短它。':'尚未建立固定项目要求，不能称整案验收完成。'}};
  quality.items=[...(fixed?.requirements??[]),...(fixed?.relations??[]),...(fixed?.circulationReview.routes??[]),...scoped.views,...scoped.supports].map(({id,source,status,reason,actual,expected})=>({id,source,status,reason,actual,expected}));
  quality.overall=[quality.requirements,quality.circulation,quality.connections,quality.support,quality.views,quality.crossAssembly,...Object.values(quality.temporary)].some(r=>r.status==='fail')||selected.componentReview.issueCount>0||selected.furnitureReview?.issues?.length?'needs_fix':'needs_review';
  return {...selected,...(fixed?{fixedChecks:{requirements:fixed.requirements,relations:fixed.relations,circulationReview:fixed.circulationReview,...scoped}}:{}),quality};
}
