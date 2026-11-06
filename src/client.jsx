/** Native DSH sidebar and early local CAD intake. All geometry remains Host-local. */
import React, { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Button, Menu, Modal, SegmentedControl, Switch,
  IconChevronDownOutlineRegular, IconEllipsisOutlineRegular, IconFolderOpenOutlineRegular,
  IconDownloadOutlineRegular, IconShieldOutlineRegular, IconClockOutlineRegular,
  IconPlusOutlineRegular, IconRefreshOutlineRegular,
  IconBrowseOutlineRegular, IconSparkleRegular, IconLoadingOutlineRegular,
} from '@deepseek-ai/dsh-client-ui-primitives';
import css from './client.css';
import {isCad,installCadIntake} from './cad-intake.js';
import {fitView,setStandardView} from './view-fit.js';
import {disposeModel} from './viewport-resources.js';
import {DESIGN_STAGES,VIEW_LABELS,DRAFT_PREVIEW_VIEWS,DEFAULT_RENDER_VIEWS,ALL_DRAWING_LABELS as DRAWING_LABELS,renderImages,renderGallery} from './design-views.js';
import {ProjectManager} from './projects.jsx';
import {DrawingSheet} from './drawing-sheet.jsx';

export const inject = ['slots', 'locale', 'sidebarRight', 'sidebarRightTabs', 'connection', 'layout', 'sessions', 'workspaces', 'uiWorkspace'];
const ID = 'dsh-interior-studio';
const PROJECTS_PANEL = 'interior-studio-projects';
const listeners = new Set();
let intakeError = '';
const decode = base64 => Uint8Array.from(atob(base64), c => c.charCodeAt(0));
const artifactLabel=(file,task)=>({'plan.dxf':task?.detail.cadAudit?.passed?'CAD 图纸图册 · DXF':'原始参考 CAD · DXF','scene.blend':'Blender 工程','scene.glb':'三维模型 · GLB','render.png':'效果图 · PNG'}[file]??(VIEW_LABELS[file.slice(7,-4)]?`${VIEW_LABELS[file.slice(7,-4)]}效果图 · PNG`:file));


function Viewport({ bytes, selection, onSelect, cameraView }) {
  const host = useRef(null), select = useRef(onSelect), selected = useRef(selection);
  const view = useRef(null), pose = useRef(null);
  const viewportSize = useRef(null);
  const [error, setError] = useState('');
  const [ready,setReady]=useState(false);
  const requestedView=useRef(cameraView);requestedView.current=cameraView;
  select.current = onSelect; selected.current = selection;
  useEffect(() => {
    setReady(false);setError('');
    if (!bytes || !host.current) return;
    let disposed = false, renderer, controls, model, observer, bounds;
    let needsFit = !pose.current;
    const container = host.current;
    const scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, 1, 0.01, 5000);
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.setAttribute('aria-label', '可旋转缩放的三维场景，拖动旋转，点击选择');
      renderer.domElement.tabIndex = 0;
      container.append(renderer.domElement);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x746e63, 2.8));
      const light = new THREE.DirectionalLight(0xffffff, 2.5); light.position.set(4, 9, 6); scene.add(light);
      const draw = () => { if (!disposed) renderer.render(scene, camera); };
      const highlight = () => {
        model?.traverse(o=>{
          if(!o.isMesh)return;
          let node=o;while(node&&!node.userData.studio_id)node=node.parent;
          for(const mat of Array.isArray(o.material)?o.material:[o.material]) {
            mat.emissive?.set(0x000000);
            if(node?.userData.studio_id===selected.current?.objectId && (!selected.current.surfaceId||mat.name.includes('__'+selected.current.surfaceId+'__')))
              mat.emissive?.set('#182c5c');
          }
        });draw();
      };
      view.current={highlight};
      const resize = () => {
        const w = Math.max(container.clientWidth, 1), h = Math.max(container.clientHeight, 1);
        if (viewportSize.current?.w !== w || viewportSize.current?.h !== h) needsFit = true;
        viewportSize.current = {w,h};
        renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
        if (needsFit && bounds && controls) {
          fitView(camera, controls.target, bounds, w / h);
          controls.update(); needsFit = false;
        }
        draw();
      };
      observer = new ResizeObserver(resize); observer.observe(container);
      const loader = new GLTFLoader();
      loader.parse(decode(bytes).buffer, '', gltf => {
        if (disposed) { disposeModel(gltf.scene); return; }
        model = gltf.scene; scene.add(model);
        const box = new THREE.Box3().setFromObject(model), center = box.getCenter(new THREE.Vector3());
        bounds = box;
        const size = box.getSize(new THREE.Vector3()).length();
        if (gltf.cameras[0]) camera = gltf.cameras[0];
        else { camera.position.copy(center).add(new THREE.Vector3(size, size, size)); camera.lookAt(center); }
        controls = new OrbitControls(camera, renderer.domElement);
        controls.target.fromArray(camera.userData.studio_target ?? center.toArray());
        const restored=!!pose.current;
        if(pose.current) {camera.position.fromArray(pose.current.position);controls.target.fromArray(pose.current.target);}
        controls.enableDamping = false; controls.maxDistance = Math.max(20, size * 4); controls.minDistance = 0.3;
        controls.addEventListener('change', ()=>{pose.current={position:camera.position.toArray(),target:controls.target.toArray()};draw();});
        view.current.showView=id=>{
          setStandardView(camera,controls.target,bounds,Math.max(container.clientWidth,1)/Math.max(container.clientHeight,1),id);controls.update();draw();
        };
        controls.listenToKeyEvents(renderer.domElement); controls.update(); resize();highlight();setError('');setReady(true);
        if(!restored&&requestedView.current)view.current.showView(requestedView.current.id);
      }, error => { if (!disposed) setError('三维预览加载失败：' + error.message); });
      let down;
      const onDown = e => { down = e.button===0 ? [e.clientX, e.clientY] : null; };
      const onUp = e => {
        const start=down;down=null;
        if (!model || !start || Math.hypot(e.clientX - start[0], e.clientY - start[1]) > 5) return;
        const rect = renderer.domElement.getBoundingClientRect();
        const ray = new THREE.Raycaster();
        ray.setFromCamera(new THREE.Vector2((e.clientX - rect.left) / rect.width * 2 - 1, -(e.clientY - rect.top) / rect.height * 2 + 1), camera);
        const hit = ray.intersectObject(model, true).find(hit => {
          let obj = hit.object; while (obj && !obj.userData.studio_id) obj = obj.parent; return !!obj;
        });
        if (!hit) return;
        let object = hit.object; while (!object.userData.studio_id) object = object.parent;
        const mat = Array.isArray(hit.object.material) ? hit.object.material[hit.face.materialIndex] : hit.object.material;
        const surfaceId = mat.name.match(/__(side-[ab])__/)?.[1];
        if (object.userData.studio_type === 'wall' && !surfaceId) { setError('请点选墙的一侧，或在对象列表中选择 A/B 面'); return; }
        select.current(object.userData.studio_id, surfaceId);
      };
      renderer.domElement.addEventListener('pointerdown', onDown); renderer.domElement.addEventListener('pointerup', onUp);
      return () => {
        disposed = true; view.current=null;observer?.disconnect(); controls?.dispose();
        disposeModel(scene);
        renderer.dispose(); renderer.forceContextLoss();renderer.domElement.remove();
      };
    } catch (error) {
      setError('此设备未能创建 WebGL 画布，可继续使用对象列表：' + error.message);
      return () => { disposed = true; observer?.disconnect(); controls?.dispose();if(model)disposeModel(model);renderer?.dispose();renderer?.forceContextLoss();renderer?.domElement.remove(); };
    }
  }, [bytes]);
  useEffect(()=>{view.current?.highlight();},[selection?.token]);
  useEffect(()=>{view.current?.showView?.(cameraView.id);},[cameraView]);
  return <div className="is-viewport" ref={host} aria-busy={!ready&&!error}>{error && <p className="is-error" role="alert">{error}</p>}{!ready&&!error && <p className="is-placeholder"><IconLoadingOutlineRegular size={18}/>正在准备三维场景</p>}</div>;
}

function Plan({ report, calibrationIndex, openingOverrides={}, excludedRooms=[] }) {
  const [x0, y0, x1, y1] = report.extents, w = x1 - x0 || 1, h = y1 - y0 || 1, margin = Math.max(w, h) * 0.06;
  const path=points=>points.map((p,i)=>`${i?'L':'M'}${p[0]},${p[1]}`).join(' ');
  const hiddenWalls=new Set(report.openings.flatMap((o,i)=>openingOverrides[i]==='ignore'&&report.walls[o.wallIndex]?.openingBridge?[o.wallIndex]:[]));
  return <svg className="is-plan" viewBox={`${-margin} ${-margin} ${w + margin*2} ${h + margin*2}`} role="img" aria-label={report.generated?'对话生成的 CAD 方案':'本地解析的墙中心线与门窗候选'}>
    <g transform={`translate(${-x0},${y1}) scale(1,-1)`} fill="none" strokeWidth={Math.max(w,h)*0.006}>
      {(report.rooms??[]).map((room,i)=>{
        const net=report.review?.rooms.find(r=>r.id===room.id)?.clear;
        return !excludedRooms.includes(i)&&!room.boundaryWalls.some(w=>hiddenWalls.has(w))&&<g key={`room${i}`}>
        <path d={[room.polygon,...room.holes].map(ring=>path(ring)+'Z').join(' ')} fill="#6596d8" fillOpacity=".09" fillRule="evenodd" stroke="none"/>
        <text transform={`translate(${room.labelPoint[0]},${room.labelPoint[1]}) scale(1,-1)`} textAnchor="middle" fill="currentColor" stroke="none" fontSize={Math.max(w,h)*.026}>{room.label??i+1}
          {net&&<tspan x="0" dy="1.5em" fontSize={Math.max(w,h)*.02} opacity=".7">{net.width.toFixed(2)} × {net.depth.toFixed(2)} m 净</tspan>}
        </text>
      </g>;})}
      <path d={(report.references??[]).map(l=>`M${l.a[0]},${l.a[1]}L${l.b[0]},${l.b[1]}`).join(' ')} stroke="currentColor" opacity=".22" strokeWidth={Math.max(w,h)*.0015}/>
      {report.walls.map((line, i) => !hiddenWalls.has(i)&&<path key={`w${i}`} d={path(line.path??[line.a,line.b])} stroke="currentColor"/>)}
      {report.openings.map((line, i) => openingOverrides[i]!=='ignore'&&<path key={`o${i}`} d={path(line.path??[line.a,line.b])} stroke={(openingOverrides[i]??line.kind)==='door'?'#d68b30':(openingOverrides[i]??line.kind)==='window'?'#4787a2':'#a68dcc'} strokeWidth={Math.max(w,h)*0.015}/>) }
      {report.openings.filter(o=>o.swingPath).map((line,i)=><path key={`swing${i}`} d={path(line.swingPath)+'Z'} stroke="#d68b30" strokeWidth={Math.max(w,h)*.002} fill="#d68b30" fillOpacity=".06"/>)}
      {report.walls[calibrationIndex] && <path d={path(report.walls[calibrationIndex].path??[report.walls[calibrationIndex].a,report.walls[calibrationIndex].b])} stroke="#6596d8" strokeWidth={Math.max(w,h)*.012}/>}
    </g>
  </svg>;
}

function NumberField({ label, value, onChange, min = 0 }) {
  return <label>{label}<input type="number" step="any" min={min} value={value} onChange={e => onChange(e.target.value)} /></label>;
}

function DesignMeasurements({review}) {
  if(!review)return null;
  return <div className="is-form"><p className="is-subtle">尺寸基准：{{outside:'外墙外缘',centerline:'墙中心线',site:'场地',unspecified:'原方案未指定，请核对'}[review.dimensionBasis]}</p>
    {review.rooms.map(room=><p key={room.id}><strong>{room.name}</strong><br/>{room.clear?<>净宽 {room.clear.width.toFixed(3)} m × 净深 {room.clear.depth.toFixed(3)} m · 净面积 {room.clear.area.toFixed(2)} m²</>:<>轮廓面积 {room.centerlineArea.toFixed(2)} m² · 不规则空间的净尺寸需另行核对</>}</p>)}
    {review.issues.map((issue,i)=><p className="is-error" key={i}>{issue.message}</p>)}
    {review.circulation.status==='checked'&&<p className="is-subtle">按 0.60 m 净通道抽查：{review.circulation.roomsReachable}/{review.circulation.roomsTotal} 个房间可从入口到达。此结果不代替施工核验。</p>}
  </div>;
}

function FurnitureReview({review}) {
  if(!review?.items.length)return null;
  return <div className="is-form"><p className="is-subtle">已检查 {review.checked} 件家具朝向。参考椅子对桌、沙发对茶几、床头靠墙；特殊摆法需另行核对。</p>
    {review.issues.map((issue,i)=><p className="is-error" key={i}>{issue.message}</p>)}
  </div>;
}

function ComponentReview({review}) {
  if(!review?.checked)return null;
  return <div className="is-form"><p className="is-subtle">{review.status==='checked'?`已核对 ${review.checked} 件参数构件的尺寸、标高与相交关系。`:'构件布局已变化，需要重新核对。'}组合内部的有意相交仍保留记录。</p>
    {review.issues.map((issue,i)=><p className="is-error" key={i}>{issue.message}</p>)}
  </div>;
}

/** Reuse the Host's menu, keyboard navigation, focus return and theme. */
function PanelMenu({ label, items, onSelect, selectedId, icon, iconOnly = false, className = '', disabled = false, align = 'start' }) {
  const [open, setOpen] = useState(false);
  return <Menu open={open} onClose={() => setOpen(false)} items={items} selectedId={selectedId}
    onSelect={id => { setOpen(false); onSelect(id); }} portal align={align} autoFocus className="is-menu-root"
    anchor={<Button size="sm" className={`${iconOnly ? 'is-icon' : 'is-menu-trigger'} ${className}`}
      disabled={disabled} aria-label={label} title={label} aria-haspopup="menu" aria-expanded={open}
      onClick={() => setOpen(v => !v)} icon={icon}>
      {!iconOnly && <><span className="is-truncate">{label}</span><IconChevronDownOutlineRegular size={12}/></>}
    </Button>}/>;
}

function objectLabel(object, objects) {
  if (object.type !== 'wall') return object.label;
  const named = { 'back 墙': '背墙', 'front 墙': '前墙', 'left 墙': '左侧墙', 'right 墙': '右侧墙' }[object.label];
  return named ?? `墙面 ${objects.filter(o => o.type === 'wall').findIndex(o => o.id === object.id) + 1}`;
}

function constraintValue(row,objects=[]) {
  if(!row)return '未保留';
  const labels=keys=>(keys??[]).slice(0,4).map(key=>objects.find(o=>o.id===key||o.origin?.key===key)?.label??key).join('、')+((keys?.length??0)>4?'…':'');
  const range=row.scope==='scene'?'全场':row.scope==='assembly'?`完整构件组 ${row.assembly}`:`${row.keys?.length??0} 件指定对象（${labels(row.keys)}）`;
  if(row.view)return `${row.view} · ${row.framing==='detail'?'局部视图':'完整范围入镜'} · ${range} · 必见：${labels(row.visibleKeys)||'范围内可见表面'}`;
  if(row.anchorKeys)return `${range} → ${labels(row.anchorKeys)}${row.viaKeys?.length||row.viaAssemblies?.length?'，经 '+[labels(row.viaKeys),...(row.viaAssemblies??[])].filter(Boolean).join('、'):''}`;
  if(row.width!==undefined&&row.points)return `${Math.round(row.width*1000)} mm净宽 · ${Math.round(row.height*1000)} mm净高`;
  if(row.expectedText!==undefined)return row.property==='representation'?({image_surface:'实际图形饰面',model:'精细模型',text:'文字构件',solid:'参数实体'}[row.expectedText]??row.expectedText):row.expectedText;
  if(row.expected!==undefined)return `${{min:'≥',max:'≤',equal:'='}[row.operator??'equal']} ${row.property==='count'?row.expected+' 件':Number((row.expected*1000).toFixed(3))+' mm'} · ${range}${row.tolerance?' · 公差 '+Math.round(row.tolerance*1000)+' mm':''}`;
  return row.kind==='support'?'竖向接触核对':'表面接触核对';
}

function ConstraintList({constraints,checks,objects,expanded=false}) {
  const rows=[...(constraints?.requirements??[]),...(constraints?.relations??[]),...(constraints?.routes??[]),...(constraints?.views??[]),...(constraints?.supports??[])];
  const results=Array.isArray(checks)?checks:[...(checks?.requirements??[]),...(checks?.relations??[]),...(checks?.circulationReview?.routes??[]),...(checks?.views??[]),...(checks?.supports??[])];
  return <details open={expanded||results.some(r=>['fail','blocked'].includes(r.status))}><summary>项目要求 · {rows.length} 项</summary>{rows.length?rows.map(row=><p key={row.id}><strong>{row.source}</strong> · {constraintValue(row,objects)} · {checks?({pass:'已核对',clear:'已核对',fail:'需修正',blocked:'通路受阻',not_evaluated:'尚未检查'}[results.find(r=>r.id===row.id)?.status]??'尚未检查'):'待按此要求设计'}{row.basis==='design_assumption'?' · 暂拟条件':''}</p>):<p className="is-subtle">尚未保存固定要求。可在对话中说明总高、净宽、数量及必须保留的内容，由助手整理后核对。</p>}</details>;
}

function TaskChecks({detail}) {
  const failed={camera_inside_opaque_solid:'机位在实体内部',subject_clipped_or_behind_camera:'主体被裁切或位于镜头后方',subject_occluded:'主体被遮挡',missing_subject:'指定主体缺失',required_subject_invisible:'部分指定主体不可见',required_focus_occluded:'指定细节不可见',missing_fixed_scope:'固定验收对象缺失',fixed_view_requirement_failed:'固定视图范围未满足',fixed_view_requirement_unassessed:'固定视图范围尚未完成检查'};
  return <>{detail.preflight&&<details><summary>取景检查 · {detail.preflight.status==='fail'?'需修正':'已执行，画面仍需核对'}</summary>{detail.preflight.views?.map(v=><p key={v.id}>{v.id} · {v.status==='fail'?(v.failures??[]).map(f=>failed[f]??f).join('、'):v.status==='pass'?'取景范围已核对':'尚未完成检查'}</p>)}</details>}
    {detail.meshContactReview&&<details><summary>实际网格连接检查</summary><p className="is-subtle">检查声明接触点、组合内接触与跨组合至声明基准的路径；未验证固定方式或承载。</p>{detail.meshContactReview.declaredContacts?.map(r=><p key={r.id}>{r.id} · {{pass:'声明点已核对',fail:'声明接触未满足',not_evaluated:'尚未检查'}[r.status]}</p>)}{detail.meshContactReview.declaredSupports?.map(r=><p key={r.id}>{r.source??r.id} · {{pass:'至声明基准的接触路径已核对',fail:'存在未接通的部件',not_evaluated:'范围尚未检查'}[r.status]}{r.graph?.unresolvedObjects?.length?` · ${r.graph.unresolvedObjects.length} 件需核对`:''}</p>)}{detail.meshContactReview.coverage?.unassessedGroups?.length>0&&<p>有 {detail.meshContactReview.coverage.unassessedGroups.length} 个组合尚未检查：{detail.meshContactReview.coverage.unassessedGroups.slice(0,10).join('、')}{detail.meshContactReview.coverage.unassessedGroups.length>10?'…':''}</p>}{detail.meshContactReview.groups?.filter(r=>r.status!=='surface_path_observed').map(r=><p key={r.key}>{r.key} · 连接仍需核对</p>)}{!!detail.meshContactReview.duplicateGeometry?.length&&<p className="is-error">发现重复实体</p>}{(detail.meshContactReview.truncated||detail.meshContactReview.duplicateScreenTruncated)&&<p>检查达到预算上限，部分范围尚未检查。</p>}</details>}</>;
}

function DraftPreview({api,sessionId,drawing}) {
  const [scope,setScope]=useState(''),[view,setView]=useState('overview');
  const [result,setResult]=useState(null),[error,setError]=useState(''),[busy,setBusy]=useState(false);
  const active=useRef(null);
  useEffect(()=>()=>{active.current?.abort();active.current=null;},[]);
  const objects=drawing.scene.objects,groups=new Map();
  for(const object of objects)if(object.assembly) {
    const group=groups.get(object.assembly);
    if(group)group.count++;
    else groups.set(object.assembly,{label:objectLabel(object,objects),count:1});
  }
  const views={...DRAFT_PREVIEW_VIEWS,...Object.fromEntries((drawing.scene.presentation?.cameras??[]).map(c=>[c.key,c.label]))};
  const clear=()=>{setResult(null);setError('');};
  const preview=async e=>{
    e.preventDefault();if(active.current)return;
    const controller=new AbortController();active.current=controller;clear();setBusy(true);
    try {
      const target=scope.startsWith('a:')?{assembly:scope.slice(2)}:scope.startsWith('o:')?{keys:[scope.slice(2)]}:{};
      const value=await api(sessionId,'draft-preview',{expectedRevision:drawing.baseRevision,drawingId:drawing.drawingId,view,...target},undefined,controller.signal);
      if(active.current===controller&&!controller.signal.aborted)setResult(value);
    } catch(e) {
      if(active.current===controller&&!controller.signal.aborted)setError(e.message);
    } finally {
      if(active.current===controller){active.current=null;setBusy(false);}
    }
  };
  const image=result?'data:image/png;base64,'+result.base64:null;
  const contacts=result?[...result.connections.supports,...result.connections.relations]:[];
  const names=new Map(objects.map(o=>[o.origin?.key??o.id,o.label]));
  const status={pass:'已核对',fail:'连接需修正',not_evaluated:'尚未核对'};
  return <form className="is-form" onSubmit={preview}>
    <p className="is-subtle">查看草案的形体和连接。预览只在本机生成，不保存为效果图。</p>
    <div className="is-preview-options">
      <label>范围<select disabled={busy} value={scope} onChange={e=>{setScope(e.target.value);clear();}}>
        <option value="">整个草案</option>
        {groups.size>0&&<optgroup label="构件组">{[...groups].map(([id,g])=><option key={id} value={'a:'+id}>{g.label}{g.count>1?`等 ${g.count} 件`:''}</option>)}</optgroup>}
        <optgroup label="单个构件">{objects.map(o=><option key={o.id} value={'o:'+o.id}>{objectLabel(o,objects)}</option>)}</optgroup>
      </select></label>
      <label>视角<select disabled={busy} value={view} onChange={e=>{setView(e.target.value);clear();}}>
        {Object.entries(views).map(([id,label])=><option key={id} value={id}>{label}</option>)}
      </select></label>
    </div>
    {busy&&<p role="status">正在生成预览并核对连接…</p>}
    {error&&<p className="is-error" role="alert">{error}</p>}
    {result&&<div className="is-draft-preview-result">
      <img src={image} alt={views[result.view]+' · CAD 草案形体预览'}/>
      <p className="is-subtle">查看 {result.selectedCount} 个对象{result.contextCount?` · 同时显示 ${result.contextCount} 个相关构件`:''}。材质与灯光以实际效果图为准。</p>
      {contacts.length?<div aria-label="草案连接检查">
        <p>已声明连接 · {contacts.length} 项</p>
        {contacts.map(row=><p key={row.id} className={row.status==='fail'?'is-error':undefined}>
          {row.source} · {status[row.status]}{row.unresolvedKeys?.length?`：${row.unresolvedKeys.map(key=>names.get(key)??key).join('、')}`:''}
        </p>)}
        <p className="is-subtle">这里核对接触位置与连接路径。固定方式和承载需要另行核对。</p>
      </div>:<p>这个范围还没有声明要核对的连接。可以在对话中说明哪些部件应当相连。</p>}
    </div>}
    <div className="is-dialog-actions">
      {image&&<a className="is-preview-download" href={image} download="CAD草案预览.png">下载预览</a>}
      {busy?<Button type="button" onClick={()=>active.current?.abort()}>取消预览</Button>
        :<Button type="submit" variant="primary">{result?'重新预览':'生成预览'}</Button>}
    </div>
  </form>;
}

function StudioView({ sessionId, api, importFiles, openProjects, useTabInfo }) {
  const { tab } = useTabInfo();
  const [state, setState] = useState(null), [error, setError] = useState(intakeError), [busy, setBusy] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  const [glb, setGlb] = useState(null), [images, setImages] = useState([]),[resultView,setResultView]=useState('overview');
  const [viewMode, setViewMode] = useState('plan'), [sheet, setSheet] = useState(null);
  const [drawingView,setDrawingView]=useState('plan'),[cameraView,setCameraView]=useState({id:'overview'});
  const [renderViews,setRenderViews]=useState([...DEFAULT_RENDER_VIEWS]),[renderQuality,setRenderQuality]=useState('1080p');
  const [name, setName] = useState('未命名设计'), [kind, setKind] = useState('booth');
  const [width, setWidth] = useState('6'), [depth, setDepth] = useState('4'), [height, setHeight] = useState('2.8'), [thickness, setThickness] = useState('0.12');
  const [unit, setUnit] = useState(''), [knownLength, setKnownLength] = useState('');
  const [acceptLines, setAcceptLines] = useState(false), [acceptConflict, setAcceptConflict] = useState(false);
  const [acceptPartial,setAcceptPartial]=useState(false),[calibrationIndex,setCalibrationIndex]=useState('0');
  const [wallMode,setWallMode]=useState('centerlines'),[layerMapping,setLayerMapping]=useState({wallLayers:[],doorLayers:[],windowLayers:[],openingLayers:[]}),[pairLimit,setPairLimit]=useState('.6');
  const [doorHeight,setDoorHeight]=useState('2.1'),[windowSill,setWindowSill]=useState('.9'),[windowTop,setWindowTop]=useState('2.1');
  const [openingOverrides,setOpeningOverrides]=useState({}),[excludedRooms,setExcludedRooms]=useState([]);
  const [reviewedDrawing,setReviewedDrawing]=useState(null),[acceptDrawing,setAcceptDrawing]=useState(false),[shareDrawing,setShareDrawing]=useState(false);
  const [acceptConstraintChanges,setAcceptConstraintChanges]=useState(false);
  const [reviewedBrief,setReviewedBrief]=useState(null),[acceptBrief,setAcceptBrief]=useState(false);
  const [cleanupPreview,setCleanupPreview]=useState(null),[includeHistory,setIncludeHistory]=useState(false),[cleanupRefresh,setCleanupRefresh]=useState(0),[cleanupResult,setCleanupResult]=useState(null);
  const [furnitureId,setFurnitureId]=useState('sofa'),[furniturePreview,setFurniturePreview]=useState(null);
  const [furnitureForm,setFurnitureForm]=useState({x:'',y:'',rotation:'0',width:'',depth:'',height:''});
  const fileInput = useRef(null), loaded = useRef('');
  const snapshotSequence=useRef(0);
  const p = state?.project, report = state?.report, objects = state?.scene?.objects ?? [];
  const drawing=state?.proposal?.type==='drawing'&&!state.proposal.stale?state.proposal:null;
  const brief=state?.proposal?.type==='brief'?state.proposal:null;
  const drawingScene=drawing?.scene??state?.scene;
  const tasks = state?.tasks ?? [], selection = state?.selection;
  const selectedObject = objects.find(o => o.id === selection?.objectId);
  const selectedSurface = selection?.surfaceId ?? 'side-a';
  const renderViewLabels={...VIEW_LABELS,...Object.fromEntries((state?.scene?.presentation?.cameras??[]).map(c=>[c.key,c.label]))};
  const activeTask = tasks.find(t => ['queued','running'].includes(t.state));
  useEffect(()=>{if(state?.recommendedViews)setRenderViews(state.recommendedViews);},[p?.id,p?.revision]);
  const failedTask = ['failed','interrupted'].includes(tasks[0]?.state) ? tasks[0] : null;
  const previewTask = state?.workflow?.modelTask??tasks.find(t => t.state === 'complete' && t.revision === p?.revision && t.detail.files?.['scene.glb']);
  const modelReady=!!state?.workflow?.modelReady&&!drawing;
  const renderTask = tasks.find(t => t.state === 'complete' && t.revision===p?.revision&&renderImages(t).length)??tasks.find(t => renderImages(t).length);
  const gallery=state?.gallery??renderGallery([...tasks].reverse(),renderTask?.revision);
  const galleryKey=gallery.map(v=>`${v.taskId}/${v.file}`).join('|');
  const image=images.find(i=>i.id===resultView)??images[0];
  const exportTask = previewTask ?? tasks.find(t => t.state === 'complete');
  const refresh = async () => { const ticket=++snapshotSequence.current;const result = await api(sessionId, 'snapshot', {}); if(ticket===snapshotSequence.current)setState(result); return result; };
  useEffect(() => {
    const controller = new AbortController(); let active = true;
    const update = () => {const ticket=++snapshotSequence.current;return api(sessionId, 'snapshot', {}, undefined, controller.signal).then(s => {
      if (active && ticket===snapshotSequence.current) { setState(s); setConnectionError(''); }
    }).catch(e => { if (active && ticket===snapshotSequence.current) setConnectionError(e.message); });};
    update();
    const timer = setInterval(() => { if (tab.visible) update(); }, 1500);
    const notice = () => { setError(intakeError); update(); };
    listeners.add(notice);
    return () => { active = false; ++snapshotSequence.current;clearInterval(timer); controller.abort(); listeners.delete(notice); };
  }, [sessionId, tab.visible]);
  useEffect(() => {
    if (report) {
      setUnit(report.settings?.unit ?? report.unit ?? '');setAcceptLines(false);setAcceptConflict(false);setKnownLength('');setAcceptPartial(false);setCalibrationIndex('0');
      setWallMode(report.settings?.wallMode??'centerlines');setPairLimit(String(report.settings?.maxWallThickness??.6));
      setLayerMapping({wallLayers:report.settings?.wallLayers??[],doorLayers:report.settings?.doorLayers??[],windowLayers:report.settings?.windowLayers??[],openingLayers:report.settings?.openingLayers??[]});
      setOpeningOverrides({});setExcludedRooms([]);
    }
    setViewMode('plan');setDrawingView('plan');
  }, [report?.id, p?.id]);
  useEffect(()=>{setSheet(null);},[p?.id]);
  useEffect(()=>{
    if(sheet!=='furniture')return;
    const controller=new AbortController();let active=true;setFurniturePreview(null);
    api(sessionId,'catalog-preview',{asset:furnitureId},undefined,controller.signal).then(value=>{if(active)setFurniturePreview('data:image/png;base64,'+value.base64);})
      .catch(error=>{if(active)setError(error.message);});
    return()=>{active=false;controller.abort();};
  },[sheet,furnitureId,sessionId]);
  useEffect(() => { loaded.current = '';setGlb(null);setImages([]);setCameraView({id:'overview'}); }, [p?.id]);
  const run = async (action, input, after) => {
    setBusy(true); setError('');
    try { const result = await api(sessionId, action, input); if (after) await after(result); await refresh(); return result; }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  };
  useEffect(() => {
    let active = true;
    if (previewTask && loaded.current !== previewTask.id) {
      api(sessionId, 'artifact', { taskId: previewTask.id, file: 'scene.glb' }).then(value => {
        if (active) { setGlb(value.base64); loaded.current = previewTask.id; }
      }).catch(e => { if (active) setError(e.message); });
    }
    return () => { active = false; };
  }, [previewTask?.id, p?.revision]);
  useEffect(() => {
    let active=true;const urls=[],controller=new AbortController();setImages([]);
    Promise.all(gallery.map(async view=>{
      const value=await api(sessionId,'artifact',{taskId:view.taskId,file:view.file},undefined,controller.signal);
      if(!active||controller.signal.aborted)return null;
      const url=URL.createObjectURL(new Blob([decode(value.base64)],{type:'image/png'}));urls.push(url);
      return {...view,url};
    })).then(values=>{if(active){setImages(values.filter(Boolean));setResultView(v=>values.some(i=>i?.id===v)?v:values[0]?.id??'overview');}})
      .catch(e=>{controller.abort();urls.forEach(url=>URL.revokeObjectURL(url));urls.length=0;if(active)setError(e.message);});
    return()=>{active=false;controller.abort();urls.forEach(url=>URL.revokeObjectURL(url));};
  }, [sessionId,p?.id,galleryKey]);
  const revision = { expectedRevision: p?.revision };
  useEffect(()=>{
    if(sheet!=='cleanup'||!p)return;
    const controller=new AbortController();setCleanupPreview(null);
    api(sessionId,'cleanup-preview',{expectedRevision:p.revision,includeHistory},undefined,controller.signal)
      .then(value=>{if(!controller.signal.aborted)setCleanupPreview(value);})
      .catch(e=>{if(!controller.signal.aborted)setError(e.message);});
    return()=>controller.abort();
  },[sheet,p?.id,p?.revision,includeHistory,cleanupRefresh,activeTask?.id]);
  const openDrawing=()=>{setReviewedDrawing({...drawing,report,expectedRevision:p.revision});setAcceptDrawing(false);setAcceptConstraintChanges(false);setShareDrawing(false);setSheet('drawing');};
  const build = result => api(sessionId, 'build', { projectId:result.projectId,expectedRevision: result.revision }, `preview:${result.projectId}:${result.revision}`);
  const select = (objectId, surfaceId = 'side-a') => {
    if (!previewTask) return;
    const wall = objects.find(o => o.id === objectId)?.type === 'wall';
    return run('select', { ...revision, objectId, ...(wall ? {surfaceId} : {}) });
  };
  const download = async (task, file) => {
    try {
      const value = await api(sessionId, 'artifact', { taskId: task.id, file });
      const url = URL.createObjectURL(new Blob([decode(value.base64)]));
      const a = document.createElement('a'); a.href = url; a.download = `${p.name}-v${task.revision}-${file}`; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (e) { setError(e.message); }
  };
  const downloadDrawingSet=async drawingId=>{
    setBusy(true);setError('');
    try {
      const value=await api(sessionId,'drawing-set',{expectedRevision:p.revision,includeSections:true,...(drawingId?{drawingId}:{})});
      const url=URL.createObjectURL(new Blob([decode(value.base64)],{type:'application/dxf'}));
      const link=document.createElement('a');link.href=url;link.download=value.filename;link.click();
      setTimeout(()=>URL.revokeObjectURL(url),5000);
    } catch(error){setError(error.message);}finally{setBusy(false);}
  };
  const downloadSchedule=()=>run('export-design',{...revision,format:'schedule'},value=>{
    const url=URL.createObjectURL(new Blob([value.csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');
    a.href=url;a.download=value.filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);
  });
  const render = (quality,views=renderViews) => run('render', { ...revision, quality,views }, () => {setSheet(null);setViewMode('results');});
  const moreAction = id => {
    if (id === 'refresh') run('build', revision);
    else if (id === 'render') {setRenderQuality('1080p');setViewMode('results');setSheet('render-options');}
    else if (id === 'import') fileInput.current.click();
    else if (id === 'furniture') {setFurnitureForm({x:'',y:'',rotation:'0'});setSheet('furniture');}
    else setSheet(id);
  };
  const editFurniture=()=>{setFurnitureForm({objectId:selectedObject.id,selectionToken:selection.token,expectedRevision:p.revision,x:String(selectedObject.position[0]),y:String(selectedObject.position[1]),rotation:String((selectedObject.rotation??0)*180/Math.PI),width:String(selectedObject.size[0]),depth:String(selectedObject.size[1]),height:String(selectedObject.size[2])});setSheet('furniture-edit');};
  const materialId = selectedObject?.type === 'wall' ? selectedObject.materials[selectedSurface] : selectedObject?.material;
  const modes = DESIGN_STAGES.map(mode=>({...mode,disabled:mode.value!=='plan'&&!p?.revision}));
  const status = {queued:'等待中',running:'处理中',complete:'已生成',failed:'失败',cancelled:'已取消',interrupted:'已中断',cleaning:'清理待完成',removed:'派生文件已清理'};
  const pending = p && !p.revision;
  const modalTitle = {cleanup:'清理可再生成文件',quality:'项目要求与审查',brief:'核对项目需求',new:'新建设计',drawing:'确认 CAD 设计方案','draft-preview':'CAD 草案预览','render-options':'生成效果图',dimensions:'设置空间尺寸',confirm:'确认设计方案',cad:'确认比例与结构',layers:'图层与墙线',furniture:'添加家具','furniture-edit':'调整家具',access:'模型访问',history:'版本与任务',export:'导出工程',report:report?.generated?'CAD 方案详情':'图纸识别详情'}[sheet];
  return <section className="is-studio" data-interior-studio aria-label="设计工作区">
    <input ref={fileInput} data-interior-file type="file" accept=".dxf,.dwg" hidden onChange={async e => {
      if (!e.target.files?.length) return;
      setBusy(true); setError('');
      try { await importFiles(sessionId, [...e.target.files]); await refresh(); }
      catch(e) { setError(e.message); }
      finally { setBusy(false); e.target.value = ''; }
    }}/>
    <header className="is-topbar">
      <div className="is-project-heading">
        <Button size="sm" className="is-project-trigger" title="管理设计工程" aria-label="管理设计工程" disabled={busy} onClick={openProjects}>
          <span className="is-truncate">{p?.name ?? '设计工程'}</span>
        </Button>
        {p && <Button size="sm" className="is-save-state" title="查看项目要求与审查状态" onClick={()=>setSheet('quality')}>{pending ? '待确认' : p.readOnly ? '只读' : '已保存'} · {state.workflow?.quality?.overall==='needs_fix'?'需修正':'待审查'}</Button>}
      </div>
      {p && (!!p.revision || report) && <div className="is-viewbar">
        <SegmentedControl id={`design-${sessionId}`} label="设计视图" options={modes} value={viewMode} onChange={setViewMode}/>
      </div>}
      <div className="is-inline is-topbar-actions">
        {!!p?.revision && <><Button size="sm" disabled={busy || p.readOnly || !p.canUndo} onClick={() => run('undo',revision,build)}>撤销</Button><Button size="sm" disabled={busy || p.readOnly || !p.canRedo} onClick={() => run('redo',revision,build)}>恢复</Button></>}
        <Button size="sm" onClick={() => fileInput.current.click()} icon={<IconFolderOpenOutlineRegular/>} disabled={busy}>导入</Button>
        <PanelMenu label="更多设计操作" iconOnly align="end" icon={<IconEllipsisOutlineRegular/>} onSelect={moreAction} disabled={busy}
          items={[
            {id:'new',label:'新建设计',icon:<IconPlusOutlineRegular/>},
            {id:'export',label:'导出工程',icon:<IconDownloadOutlineRegular/>,disabled:!exportTask},
            {id:'furniture',label:'添加家具',icon:<IconPlusOutlineRegular/>,disabled:!p?.revision || p.readOnly},
            {id:'layers',label:'调整图纸识别',icon:<IconBrowseOutlineRegular/>,disabled:!report || !!p?.revision || p.readOnly},
            {type:'separator',id:'more-separator'},
            {id:'access',label:'模型访问',icon:<IconShieldOutlineRegular/>,disabled:!p},
            {id:'history',label:'版本与任务',icon:<IconClockOutlineRegular/>,disabled:!tasks.length},
            {id:'cleanup',label:'清理可再生成文件',icon:<IconClockOutlineRegular/>,disabled:p?.readOnly||!!activeTask},
            {id:'refresh',label:'更新三维',icon:<IconRefreshOutlineRegular/>,disabled:!p?.revision || busy},
            {id:'render',label:'生成效果图',icon:<IconSparkleRegular/>,disabled:!p?.revision || busy || !!activeTask || !modelReady},
          ]}/>
      </div>
    </header>
    {(error || connectionError) && !sheet && <div className="is-banner is-error" role="alert">{error || connectionError}<Button size="sm" onClick={() => {setError('');setConnectionError('');}}>收起</Button></div>}
    {failedTask && <div className="is-banner is-error" role="alert">{failedTask.detail.render ? '效果图生成未完成' : '三维更新未完成'}<Button size="sm" onClick={() => setSheet('history')}>查看原因</Button></div>}
    {p?.readOnly && <div className="is-banner">此工程正在另一聊天中编辑<Button size="sm" onClick={() => run('open',{projectId:p.id,takeOver:true})}>接管编辑</Button></div>}
    {state?.workflow?.requirementsChanged&&<p className="is-banner" role="status">需求已更新，请先在对话中修改并确认CAD，再生成三维与效果图。</p>}
    <main className={`is-stage ${viewMode === 'plan' ? 'is-stage-plan' : ''}`}
      id={`design-${sessionId}-${viewMode}-panel`} role={p && (!!p.revision || report) ? 'tabpanel' : undefined}
      aria-labelledby={p && (!!p.revision || report) ? `design-${sessionId}-${viewMode}` : undefined}>
      {!state ? <div className="is-empty"><IconLoadingOutlineRegular className="is-spinning" size={24}/><p>正在打开设计</p></div> : !p ? <div className="is-empty">
        <IconBrowseOutlineRegular size={32}/><h2>让想法成为空间</h2><p>在对话中描述需求，DeepSeek 会先绘制 CAD 方案。<br/>核对图纸与三维模型，再渲染出图。</p>
        <div className="is-inline"><Button variant="outline" onClick={() => setSheet('new')}>新建设计</Button><Button variant="outline" onClick={() => fileInput.current.click()}>导入现有 CAD</Button></div>
      </div> : viewMode === 'plan' && (report||drawingScene) ? <div className="is-plan-view">
        {drawingScene?<DrawingSheet scene={drawingScene} geometryKey={`${p.id}:${p.revision}:${drawing?.drawingId??''}`} name={p.name} revision={p.revision} draft={!!drawing}
          view={drawingView} drawingId={drawing?.drawingId} api={api} sessionId={sessionId}
          selector={<PanelMenu label={DRAWING_LABELS[drawingView]} selectedId={drawingView} items={Object.entries(DRAWING_LABELS).map(([id,label])=>({id,label}))} onSelect={setDrawingView}/>}/>
          :<><div className="is-sheet-toolbar"><span className="is-subtle">导入图纸 · 平面识别</span></div><Plan report={report} openingOverrides={state.scene?.cad?.openingOverrides} excludedRooms={state.scene?.cad?.excludedRooms}/></>}
        {report&&<div className="is-plan-summary"><div>{drawingScene?<p>{drawing?'待确认草案 · 核对后生成三维':`当前版本 v${p.revision} · 尺寸来自当前几何`}</p>:<><strong>{report.displayName}</strong><p>{report.walls.length} 段墙线<span>·</span>{report.openings.length} 处门窗</p></>}</div><Button size="sm" onClick={() => drawing?openDrawing():setSheet(pending?'layers':'report')}>{drawing?'核对方案':report.generated?'方案详情':pending?'调整识别':'识别详情'}</Button></div>}
        {!!report?.blocking.length && <p className="is-error" role="alert">这份图纸包含暂不支持的结构，请先查看识别详情。</p>}
        {(pending||drawing) && <p className="is-canvas-note">{drawing?'CAD 草案待确认。核对图纸后先生成三维模型。':'核对比例与高度后，即可生成可编辑的三维模型。'}</p>}
      </div> : pending ? <div className="is-empty">
        <IconBrowseOutlineRegular size={32}/><h2>{brief ? '需求已整理' : state.proposal ? '方案准备好了' : '从空间尺寸开始'}</h2>
        {brief ? <><p>先核对原始要求与暂拟条件，再开始CAD设计。</p><Button variant="primary" onClick={()=>{setReviewedBrief(structuredClone(brief));setAcceptBrief(false);setSheet('brief');}}>核对项目需求</Button></> : state.proposal ? <><p>{state.proposal.width} × {state.proposal.depth} m<span>·</span>高 {state.proposal.height} m</p><p>确认方案后创建模型，展具布局仍可修改。</p><Button variant="primary" onClick={() => setSheet('confirm')}>查看并确认</Button></> : <><p>在对话中描述空间，或直接设置方案尺寸。</p><Button variant="outline" onClick={() => setSheet('dimensions')}>设置尺寸</Button></>}
      </div> : viewMode === 'results' ? <div className="is-result-view">
        {activeTask?.detail.render&&<div className="is-render-progress" role="status"><IconLoadingOutlineRegular className="is-spinning"/>正在生成 {activeTask.detail.requestedViews?.length??1} 个视角</div>}
        {image ? <><img src={image.url} alt={`${image.label}效果图，场景版本 ${image.revision}`}/>
          <div className="is-result-caption"><span>{image.label} · 生成于 v{image.revision} · {image.current&&modelReady&&image.cadVerified?'适用于当前方案 · 画面待核对':'历史参考'} · {images.findIndex(i=>i.id===image.id)+1}/{images.length}</span><Button size="sm" icon={<IconDownloadOutlineRegular/>} onClick={() => download({id:image.taskId,revision:image.revision},image.file)}>下载此视角</Button></div>
          <div className="is-result-thumbnails" role="group" aria-label="效果图视角">{images.map(item=><button type="button" key={item.id} aria-pressed={image.id===item.id} onClick={()=>setResultView(item.id)}><img src={item.url} alt=""/><span>{item.label}</span></button>)}</div>
        </> : <div className="is-empty"><IconSparkleRegular size={28}/><h2>{activeTask?.detail.render?'正在生成效果图':gallery.length?'正在加载效果图':'还没有效果图'}</h2><p>{activeTask?.detail.render?'完成后直接在这里查看和切换图集。':'核对三维模型后，选择视角并生成效果图。'}</p></div>}
      </div> : <>
        <Viewport key={p.id} bytes={glb} selection={selection} onSelect={select} cameraView={cameraView}/>
        <div className="is-model-view-switch"><PanelMenu label={VIEW_LABELS[cameraView.id]} selectedId={cameraView.id} disabled={!glb}
          items={Object.entries(VIEW_LABELS).map(([id,label])=>({id,label}))} onSelect={id=>setCameraView({id})}/></div>
        {(!previewTask||!modelReady) && glb && <div className="is-canvas-status" role="status">{activeTask ? <><IconLoadingOutlineRegular className="is-spinning"/>{activeTask.detail.phase??'正在更新场景'}</> : <>{drawing?'CAD 草案待确认，当前预览尚未更新':'当前预览待完成 CAD 与三维校验'}<Button size="sm" disabled={!!drawing} onClick={() => run('build',revision)}>更新三维</Button></>}</div>}
        <span className="is-orbit-hint">拖动旋转 · 滚轮缩放</span>
      </>}
    </main>
    <div className="is-bottom-tools">
    {!!p?.revision && viewMode === 'model' && <div className="is-contextbar">
      <Button size="sm" className="is-icon" icon={<IconPlusOutlineRegular/>} title="添加家具" aria-label="添加家具" disabled={busy || p.readOnly} onClick={()=>{setFurnitureForm({x:'',y:'',rotation:'0'});setSheet('furniture');}}/>
      <PanelMenu label={selectedObject ? objectLabel(selectedObject,objects) : '选择对象'} icon={<IconBrowseOutlineRegular/>}
        disabled={busy || p.readOnly || !previewTask} selectedId={selectedObject?.id}
        items={objects.map(o => ({id:o.id,label:objectLabel(o,objects)}))} onSelect={id => select(id)}/>
      {selectedObject ? <>
        {selectedObject.type === 'wall' && <PanelMenu label={selectedSurface === 'side-b' ? 'B 面' : 'A 面'} selectedId={selectedSurface}
          disabled={busy || p.readOnly} items={[{id:'side-a',label:'A 面'},{id:'side-b',label:'B 面'}]} onSelect={surface => select(selectedObject.id,surface)}/>}
        <PanelMenu label={state.materials[materialId]?.label ?? '更换材质'} className="is-material-trigger" disabled={busy || p.readOnly || !previewTask}
          selectedId={materialId} items={Object.entries(state.materials).map(([id,m]) => ({id,label:m.label,
            icon:<span className="is-swatch" style={{backgroundColor:`rgb(${(m.swatch??m.color).map(c=>Math.round(c*255)).join(',')})`}}/>}))}
          onSelect={material => run('edit',{...revision,selectionToken:selection.token,action:'material',material},build)}/>
      </> : <p className="is-subtle">点选对象，再用对话修改</p>}
      {selectedObject?.type==='asset' && <Button size="sm" disabled={busy || p.readOnly} onClick={editFurniture}>调整</Button>}
    </div>}
    <footer className="is-statusbar">
      <Button size="sm" className="is-access-trigger" icon={<IconShieldOutlineRegular/>} onClick={() => setSheet('access')} disabled={!p}>
        {p?.consent ? '摘要已授权' : p?.modelRoute ? '仅本地' : '模型访问'}
      </Button>
      {activeTask ? <div className="is-task-status" role="status"><IconLoadingOutlineRegular className="is-spinning"/><span>{activeTask.detail.phase??(activeTask.detail.render ? '正在出图' : '更新三维中')}</span><Button size="sm" onClick={() => run('cancel',{taskId:activeTask.id})}>取消</Button></div> : busy ? <span className="is-subtle" role="status">处理中</span> : brief ? <Button variant="toolbar" size="sm" disabled={p.readOnly} onClick={()=>{setReviewedBrief(structuredClone(brief));setAcceptBrief(false);setSheet("brief");}}>核对项目需求</Button> : drawing ? <div className="is-inline">
        <Button size="sm" onClick={()=>setSheet('draft-preview')}>草案预览</Button>
        <Button variant="toolbar" size="sm" icon={<IconSparkleRegular/>} disabled={p.readOnly} onClick={openDrawing}>确认 CAD 方案</Button>
      </div> : p?.revision > 0 ? (viewMode==='plan'?<Button size="sm" onClick={()=>setViewMode('model')}>查看三维模型</Button>:viewMode==='model'?<Button variant="toolbar" size="sm" onClick={()=>modelReady?setViewMode('results'):run('build',revision)}>{modelReady?'查看效果图':'更新 CAD 并生成三维'}</Button>:viewMode==='results'?<Button size="sm" icon={<IconSparkleRegular/>} onClick={()=>modelReady?setSheet('render-options'):run('build',revision)}>{modelReady?(images.length?'重新生成':'生成效果图'):'先更新 CAD 与三维'}</Button>:null) : pending ? <Button variant="primary" size="sm" disabled={busy || p.readOnly} onClick={() => setSheet(report ? (report.blocking.length?'layers':'cad') : state.proposal ? 'confirm' : 'dimensions')}>{report ? (report.blocking.length?'检查图纸':'确认图纸') : state.proposal ? '确认方案' : '设置尺寸'}</Button> : <span className="is-subtle">本地设计工作区</span>}
    </footer>
    </div>
    <Modal open={sheet !== null} onClose={() => setSheet(null)} title={modalTitle ?? '设计'} closeLabel="关闭对话框" className={`is-dialog${sheet==='draft-preview'?' is-preview-dialog':''}`} contentClassName="is-dialog-content">
      {(error || connectionError) && <p className="is-error" role="alert">{error || connectionError}</p>}
      {sheet==='draft-preview'&&(drawing?<DraftPreview key={`${sessionId}:${p.id}:${drawing.drawingId}`} api={api} sessionId={sessionId} drawing={drawing}/>
        :<p role="status">当前没有待确认的 CAD 草案。</p>)}
      {sheet==='brief'&&reviewedBrief&&p&&<form className="is-form" onSubmit={e=>{e.preventDefault();run('confirm',{expectedRevision:reviewedBrief.baseRevision,briefId:reviewedBrief.briefId,acceptBrief},()=>setSheet(null));}}>
        <p>先核对哪些条件不能变。确认后，图纸会按这份需求卡验收；调整数值或范围会单独提示。</p>
        <ConstraintList constraints={reviewedBrief.constraints} objects={objects} expanded/>
        {!!reviewedBrief.assumptions?.length&&<div><strong>暂拟条件</strong><ul>{reviewedBrief.assumptions.map((item,index)=><li key={index}>{item}</li>)}</ul></div>}
        <p className="is-subtle">这里只确认需求，没有确认CAD、连接或效果图质量。发现原话与验收值不同，请在对话中纠正后重新核对。</p>
        <label className="is-check"><input type="checkbox" checked={acceptBrief} onChange={e=>setAcceptBrief(e.target.checked)}/>原要求和暂拟条件已区分，按此开始设计</label>
        {brief?.briefId!==reviewedBrief.briefId&&<p role="alert">需求卡已更新，请关闭后重新查看。</p>}
        <div className="is-dialog-actions"><Button onClick={()=>setSheet(null)}>稍后核对</Button><Button variant="primary" type="submit" disabled={busy||p.readOnly||!acceptBrief||brief?.briefId!==reviewedBrief.briefId||p.revision!==reviewedBrief.baseRevision}>确认需求</Button></div>
      </form>}
      {sheet==='cleanup'&&<div className="is-form">
        <p>保留原始图纸、全部可编辑源版本、引用素材、当前模型和图集及其依赖。</p>
        <label className="is-check"><input type="checkbox" checked={includeHistory} disabled={busy} onChange={e=>{setIncludeHistory(e.target.checked);setCleanupResult(null);}}/>同时清理其他历史模型与效果图</label>
        <p className="is-subtle">默认只处理已结束的临时副本。勾选后会删除未保留的历史派生文件；可从源版本重新生成，画面可能与原图不同。</p>
        {cleanupPreview?<><p>本批 {cleanupPreview.entries.length} 个目录 · 约 {(cleanupPreview.bytes/1024/1024).toFixed(1)} MiB</p>{!!cleanupPreview.skipped.length&&<p className="is-subtle">{cleanupPreview.skipped.length} 项因内容未知或身份无法核对而保留。</p>}{cleanupPreview.truncated&&<p>本批完成后可再次预览剩余内容。</p>}</>:<p role="status">正在核对引用与文件范围…</p>}
        {cleanupResult&&<p role="status">已清理 {cleanupResult.removed.length} 个目录，释放 {(cleanupResult.bytesRemoved/1024/1024).toFixed(1)} MiB。{cleanupResult.completed?'':'部分未完成，可重新预览后重试。'}</p>}
        <div className="is-dialog-actions"><Button disabled={busy} onClick={()=>setSheet(null)}>关闭</Button><Button disabled={busy||!cleanupPreview?.entries.length||!!activeTask} onClick={()=>run('cleanup',{...revision,token:cleanupPreview.token,includeHistory},value=>{setCleanupResult(value);setCleanupRefresh(n=>n+1);})}>清理本批文件</Button></div>
      </div>}
      {sheet==='quality'&&<div className="is-form">
        <p className="is-subtle">以下为随当前方案保存的验收要求；未检查不能计为通过。取景已核对仍需查看实际画面。</p>
        <p className="is-subtle">已保存 {state.workflow?.quality?.coverage?.required??0} 项；本次临时核对 {Object.values(state.workflow?.quality?.coverage?.temporaryCounts??{}).reduce((a,b)=>a+b,0)} 项，临时核对不替代固定要求。</p>
        <p>{state.workflow?.quality?.overall==='needs_fix'?'存在需要修正的项目':'生成完成与设计验收分别记录'}</p>
        <p className="is-subtle">已确认的项目要求会随每版方案保留并自动重查。图像、连接和未知条件需要各自核对。</p>
        {Object.entries({requirements:'尺寸与必备项',circulation:'连续通路',connections:'指定连接',crossAssembly:'跨组合接触范围',views:'固定视图范围',support:'全场承托提示',visual:'画面质量'}).map(([key,label])=><p key={key}>{label} · {{pass:'已核对',fail:'需修正',not_evaluated:'待核对'}[state.workflow?.quality?.[key]?.status]??'待核对'}</p>)}
        <ConstraintList objects={state.scene?.objects} constraints={drawing?.summary?.constraints??state.scene?.design?.constraints} checks={drawing?.summary?.fixedChecks??state.workflow?.quality?.items}/>
        <details><summary>本版自动检查记录</summary><pre>{JSON.stringify(state.workflow?.quality,null,2)}</pre></details>
      </div>}
      {sheet==='render-options'&&<form className="is-form is-render-options" onSubmit={e=>{e.preventDefault();render(renderQuality);}}>
        <p className="is-subtle">选择需要的视角，生成后会显示在效果图图集中。</p>
        {!!state.galleryCoverage?.required.length&&<p>约定视角 {state.galleryCoverage.available.length}/{state.galleryCoverage.required.length} 已有当前版本图片。{state.galleryCoverage.missing.length?'待补：'+state.galleryCoverage.missing.map(id=>renderViewLabels[id]??id).join('、'):'全部视角已有图片，画面质量仍需逐张核对。'}</p>}
        <fieldset disabled={busy||!!activeTask}><legend>视角 · 最多12个</legend><div className="is-view-options">{Object.entries(renderViewLabels).map(([id,label])=><label key={id}><input type="checkbox" checked={renderViews.includes(id)} onChange={e=>setRenderViews(v=>e.target.checked?[...v,id]:v.filter(i=>i!==id))}/>{label}</label>)}</div></fieldset>
        <label className="is-quality-label">图片质量<select value={renderQuality} disabled={busy||!!activeTask} onChange={e=>setRenderQuality(e.target.value)}><option value="1080p">1080P · 1920×1080</option><option value="preview">快速预览 · 960×720</option></select></label>
        {!modelReady&&<p className="is-subtle">请先完成当前版本的 CAD 图纸与三维模型。</p>}
        <div className="is-dialog-actions"><Button onClick={()=>setSheet(null)}>取消</Button><Button variant="primary" type="submit" disabled={busy||!!activeTask||!modelReady||!renderViews.length||renderViews.length>12||!!drawing}>生成 {renderViews.length} 个视角</Button></div>
      </form>}
      {sheet==='drawing'&&reviewedDrawing&&p&&<form className="is-form" onSubmit={e=>{
        e.preventDefault();run('confirm',{expectedRevision:reviewedDrawing.expectedRevision,drawingId:reviewedDrawing.drawingId,acceptDrawing,acceptConstraintChanges},async result=>{
          await build(result);
          if(shareDrawing)await api(sessionId,'consent',{expectedRevision:result.revision,allow:true});
          setSheet(null);setViewMode('model');
        });
      }}>
        <div className="is-dimension-summary"><strong>{reviewedDrawing.summary.width} × {reviewedDrawing.summary.depth}<small>m</small></strong><span>层高 {reviewedDrawing.summary.height} m · {reviewedDrawing.summary.rooms.length} 个空间</span></div>
        <Plan report={reviewedDrawing.report}/>
        <DesignMeasurements review={reviewedDrawing.summary.measurements}/>
        <FurnitureReview review={reviewedDrawing.summary.furnitureReview}/>
        <ComponentReview review={reviewedDrawing.summary.componentReview}/>
        <ConstraintList objects={reviewedDrawing.scene?.objects??state.scene?.objects} constraints={reviewedDrawing.summary.constraints} checks={reviewedDrawing.summary.fixedChecks}/>
        {!!reviewedDrawing.summary.constraintChanges?.length&&<div><p className="is-error">已有项目要求发生变化，请单独核对。</p>{reviewedDrawing.summary.constraintChanges.map(change=><p key={change.group+change.id}>{change.previous.source}：{constraintValue(change.previous,state.scene?.objects)} → {constraintValue(change.proposed,reviewedDrawing.scene?.objects??state.scene?.objects)}</p>)}<label className="is-check"><input type="checkbox" checked={acceptConstraintChanges} onChange={e=>setAcceptConstraintChanges(e.target.checked)}/>我接受以上项目要求变更</label></div>}
        {!!reviewedDrawing.summary.importedModels&&<p className="is-subtle">精细模型保留原材质，CAD 中显示包络近似。曲面和细节请在三维中核对；包络不代表实体接触或施工节点。</p>}
        <p className="is-subtle">这是对话生成的设计建议。净尺寸由几何计算并扣除墙厚；不规则空间单独标明轮廓面积。</p>
        {!!reviewedDrawing.summary.assumptions.length&&<ul>{reviewedDrawing.summary.assumptions.map((item,i)=><li key={i}>{item}</li>)}</ul>}
        <details><summary>轮廓面积、门窗与对象</summary>{reviewedDrawing.summary.rooms.map((room,i)=><p key={i}>{room.name} · 轮廓面积 {room.area.toFixed(2)} m²</p>)}<p>{reviewedDrawing.summary.doors} 处门 · {reviewedDrawing.summary.windows} 处窗 · {reviewedDrawing.summary.furniture} 件目录物件 · {reviewedDrawing.summary.components??0} 件参数构件 · {reviewedDrawing.summary.importedModels??0} 件精细模型</p></details>
        <label className="is-check"><input type="checkbox" checked={acceptDrawing} onChange={e=>setAcceptDrawing(e.target.checked)}/>我已核对布局和尺寸，确认生成三维模型</label>
        {!p.consent&&p.modelRoute&&<label className="is-check"><input type="checkbox" checked={shareDrawing} onChange={e=>setShareDrawing(e.target.checked)}/>允许当前模型在后续对话中读取此方案的结构摘要</label>}
        {(drawing?.drawingId!==reviewedDrawing.drawingId||p.revision!==reviewedDrawing.expectedRevision)&&<p className="is-error">方案已更新，请关闭后重新核对。</p>}
        <div className="is-dialog-actions"><Button onClick={()=>downloadDrawingSet(reviewedDrawing.drawingId)} disabled={busy||drawing?.drawingId!==reviewedDrawing.drawingId}>下载 CAD 图册</Button><Button variant="primary" type="submit" disabled={busy||p.readOnly||!acceptDrawing||reviewedDrawing.summary.constraintChanges?.length>0&&!acceptConstraintChanges||drawing?.drawingId!==reviewedDrawing.drawingId||p.revision!==reviewedDrawing.expectedRevision}>确认并生成三维</Button></div>
      </form>}
      {sheet === 'new' && <form className="is-form" onSubmit={e => {e.preventDefault();run('create',{name,kind},()=>setSheet(null));}}>
        <label>工程名称<input value={name} maxLength={100} required data-modal-autofocus onChange={e => setName(e.target.value)}/></label>
        <label>设计类型<select value={kind} onChange={e => setKind(e.target.value)}><option value="booth">展台</option><option value="interior">室内空间</option></select></label>
        <p className="is-subtle">也可以直接拖入 CAD，开始一个新工程。</p><div className="is-dialog-actions"><Button onClick={() => setSheet(null)}>取消</Button><Button variant="primary" type="submit" disabled={busy}>创建工程</Button></div>
      </form>}
      {sheet === 'dimensions' && <form className="is-form" onSubmit={e => {e.preventDefault();run('propose',{kind:p.kind,width:+width,depth:+depth,height:+height,thickness:+thickness},()=>setSheet('confirm'));}}>
        <p className="is-subtle">以下是可修改的方案建议，单位为米。</p><div className="is-grid"><NumberField label="宽度" value={width} onChange={setWidth}/><NumberField label="进深" value={depth} onChange={setDepth}/><NumberField label="高度" value={height} onChange={setHeight}/><NumberField label="墙厚" value={thickness} onChange={setThickness}/></div><div className="is-dialog-actions"><Button variant="primary" type="submit" disabled={busy}>查看方案</Button></div>
      </form>}
      {sheet === 'confirm' && state?.proposal && <div className="is-form">
        <div className="is-dimension-summary"><strong>{state.proposal.width} × {state.proposal.depth}<small>m</small></strong><span>高 {state.proposal.height} m · 墙厚 {state.proposal.thickness} m</span></div>
        <p>开放面：{state.proposal.openSides.map(side => ({front:'前方',back:'后方',left:'左侧',right:'右侧'})[side]).join('、') || '无'}。</p>
        <p className="is-subtle">基础展具是可修改的布局建议，屏幕占位不含品牌素材。</p><div className="is-dialog-actions"><Button onClick={() => setSheet('dimensions')}>调整尺寸</Button><Button variant="primary" disabled={busy || p.readOnly} onClick={() => run('confirm',revision,async result => {await build(result);setSheet(null);setViewMode('model');})}>确认并建模</Button></div>
      </div>}
      {sheet === 'layers' && report && <form className="is-form" onSubmit={e=>{e.preventDefault();run('analyze',{importId:report.id,...layerMapping,wallMode,...(unit?{unit}:{}),maxWallThickness:+pairLimit},()=>{setSheet('cad');setViewMode('plan');});}}>
        <p className="is-subtle">选择实际墙线所在图层。图上画出墙的两侧边线时，使用成对墙边线；平行线配对结果仍需核对。</p>
        <label>墙线表示<select value={wallMode} onChange={e=>setWallMode(e.target.value)}><option value="centerlines">墙中心线</option><option value="paired">成对墙边线</option></select></label>
        {[['wallLayers','墙线图层'],['doorLayers','门图层'],['windowLayers','窗图层'],['openingLayers','共用门窗图层（类型待确认）']].map(([key,label])=><label key={key}>{label}<select multiple size={Math.min(4,Math.max(2,report.layers.length))} value={layerMapping[key]} onChange={e=>setLayerMapping({...layerMapping,[key]:Array.from(e.target.selectedOptions,o=>o.value)})}>{report.layers.map(name=><option key={name} value={name}>{name}</option>)}</select></label>)}
        <div className="is-grid"><label>图纸单位<select required value={unit} onChange={e=>setUnit(e.target.value)}><option value="" disabled>请选择单位</option>{['mm','cm','m','inch','foot'].map(u=><option key={u}>{u}</option>)}</select></label>{wallMode==='paired'&&<NumberField label="最大墙厚 m" min={.04} value={pairLimit} onChange={setPairLimit}/>}</div><p className="is-subtle">支持圆弧及带弧段的多段线。成对模式识别平行直线和同心圆弧；门窗符号必须能与墙体对应。</p>
        <div className="is-dialog-actions"><Button onClick={()=>setSheet('report')}>识别详情</Button><Button variant="primary" type="submit" disabled={busy || p.readOnly || !layerMapping.wallLayers.length}>重新识别</Button></div>
      </form>}
      {sheet === 'cad' && report && <form className="is-form" onSubmit={e => {e.preventDefault();run('confirm',{...revision,importId:report.id,unit,height:+height,thickness:+thickness,calibrationIndex:+calibrationIndex,...(knownLength ? {knownLength:+knownLength} : {}),acceptCenterlines:acceptLines,acceptPartial,acceptScaleConflict:acceptConflict,doorHeight:+doorHeight,windowSill:+windowSill,windowTop:+windowTop,openingOverrides,excludedRooms},async result=>{await build(result);setSheet(null);setViewMode('model');});}}>
        <p className="is-subtle">核对已识别墙线与矩形地面范围。层高是方案建议；成对墙线的厚度由边线间距计算。</p>
        <Plan report={report} calibrationIndex={+calibrationIndex} openingOverrides={openingOverrides} excludedRooms={excludedRooms}/>
        <div className="is-grid"><label>图纸单位<select required value={unit} onChange={e => setUnit(e.target.value)}><option value="" disabled>请选择单位</option>{['mm','cm','m','inch','foot'].map(u=><option key={u}>{u}</option>)}</select></label><label>校准墙段（蓝色）<select value={calibrationIndex} onChange={e=>setCalibrationIndex(e.target.value)}>{report.walls.map((line,i)=><option key={i} value={i}>第 {i+1} 段</option>)}</select></label><NumberField label={`该段实际长度 m${report.unit === null ? '（必填）' : '（可选）'}`} value={knownLength} onChange={setKnownLength}/><NumberField label="层高 m（建议）" value={height} onChange={setHeight}/>{report.settings?.wallMode!=='paired' && <NumberField label="墙厚 m（建议）" value={thickness} onChange={setThickness}/>}</div>
        {report.walls[+calibrationIndex]?.path&&<p className="is-subtle">蓝色为曲墙，请填写沿墙路径的实际长度；圆弧使用弧长。</p>}
        {!!report.openings.length&&<><div className="is-grid"><NumberField label="门高 m（建议）" value={doorHeight} onChange={setDoorHeight}/><NumberField label="窗台高 m（建议）" value={windowSill} onChange={setWindowSill}/><NumberField label="窗顶高 m（建议）" value={windowTop} onChange={setWindowTop}/></div>
          <details open={report.openings.some((o,i)=>o.kind==='opening'&&!openingOverrides[i])}><summary>核对 {report.openings.length} 处门窗</summary>{report.openings.map((o,i)=><label key={i}>洞口 {i+1}<select required value={openingOverrides[i]??(o.kind==='opening'?'':o.kind)} onChange={e=>setOpeningOverrides({...openingOverrides,[i]:e.target.value})}><option value="" disabled>请选择类型</option><option value="door">门</option><option value="window">窗</option><option value="ignore">保留为参考，不建洞口</option></select></label>)}</details></>}
        <details><summary>{report.rooms?.length??0} 个闭合房间</summary><p className="is-subtle">编号对应图中轮廓。面积按墙中心线围合，非装修净面积；可取消庭院或空洞的地面。</p>{(report.rooms??[]).map((room,i)=><label className="is-check" key={i}><input type="checkbox" checked={!excludedRooms.includes(i)} onChange={e=>setExcludedRooms(e.target.checked?excludedRooms.filter(n=>n!==i):[...excludedRooms,i])}/>生成房间 {i+1} 的地面</label>)}</details>
        {!report.rooms?.length&&report.topologyVersion===1&&<p className="is-subtle">未找到闭合房间，本次仅生成墙体。请检查缺口或图层后重新识别。</p>}
        <label className="is-check"><input type="checkbox" checked={acceptLines} onChange={e => setAcceptLines(e.target.checked)}/>我已核对墙体、门窗和房间范围，并确认上述高度</label>
        {report.requiresPartialConfirmation && <label className="is-check"><input type="checkbox" checked={acceptPartial} onChange={e=>setAcceptPartial(e.target.checked)}/>仅生成已识别部分；未配对墙线及不明确门窗保留为参考</label>}
        {Object.values(openingOverrides).includes('ignore')&&<p className="is-subtle">忽略跨墙体缺口的门窗时，依赖该处闭合的房间地面也会省略。</p>}
        {!!report.blocking.length && <p className="is-error" role="alert">图纸存在阻断项，请先调整识别或查看详情。</p>}
        <details><summary>比例冲突处理</summary><label className="is-check"><input type="checkbox" checked={acceptConflict} onChange={e => setAcceptConflict(e.target.checked)}/>与图纸元数据冲突时，采用本次选择的单位与校准长度</label></details>
        <div className="is-dialog-actions"><Button onClick={()=>setSheet('layers')}>调整识别</Button><Button variant="primary" type="submit" disabled={busy || p.readOnly || !acceptLines || !unit || (!report.unit && !knownLength) || (report.requiresPartialConfirmation&&!acceptPartial) || report.openings.some((o,i)=>o.kind==='opening'&&!openingOverrides[i]) || !!report.blocking.length}>确认并建模</Button></div>
      </form>}
      {sheet==='furniture' && p?.revision>0 && <form className="is-form" onSubmit={e=>{e.preventDefault();run('furnish',{...revision,asset:furnitureId,rotation:+furnitureForm.rotation,...(furnitureForm.x===''&&furnitureForm.y===''?{}:{x:+furnitureForm.x,y:+furnitureForm.y})},async result=>{await build(result);setSheet(null);setViewMode('model');});}}>
        <label>家具<select value={furnitureId} onChange={e=>setFurnitureId(e.target.value)}>{Object.entries(state.furniture??{}).map(([id,entry])=><option value={id} key={id}>{entry.label}</option>)}</select></label>
        <div className="is-furniture-preview">{furniturePreview?<img src={furniturePreview} alt={state.furniture?.[furnitureId]?.label}/>:<span role="status">正在加载预览</span>}</div>
        <p className="is-subtle">默认尺寸 {state.furniture?.[furnitureId]?.size.join(' × ')} m，是可调整的设计建议。公开模型来自 Kenney，许可 CC0。</p>
        <div className="is-grid"><NumberField label="X 位置 m（可留空）" value={furnitureForm.x} onChange={x=>setFurnitureForm({...furnitureForm,x})}/><NumberField label="Y 位置 m（可留空）" value={furnitureForm.y} onChange={y=>setFurnitureForm({...furnitureForm,y})}/><NumberField label="角度 °" min={-360} value={furnitureForm.rotation} onChange={rotation=>setFurnitureForm({...furnitureForm,rotation})}/></div>
        <p className="is-subtle">位置同时留空时，自动寻找空位。添加后可点选家具，调整尺寸、方向和材质。</p>
        <div className="is-dialog-actions"><Button variant="primary" type="submit" disabled={busy || p.readOnly}>添加到场景</Button></div>
      </form>}
      {sheet==='furniture-edit' && <form className="is-form" onSubmit={e=>{e.preventDefault();const {selectionToken,expectedRevision}=furnitureForm;run('edit',{selectionToken,expectedRevision,action:'transform',x:+furnitureForm.x,y:+furnitureForm.y,rotation:+furnitureForm.rotation,width:+furnitureForm.width,depth:+furnitureForm.depth,height:+furnitureForm.height},async result=>{await build(result);setSheet(null);});}}>
        <p className="is-subtle">以米为单位调整所选家具。修改可撤销，其他对象保持原样。</p>
        <div className="is-grid">{[['x','X 位置 m'],['y','Y 位置 m'],['width','宽度 m'],['depth','进深 m'],['height','高度 m'],['rotation','角度 °']].map(([key,label])=><NumberField key={key} label={label} min={key==='rotation'?-360:0} value={furnitureForm[key]} onChange={value=>setFurnitureForm({...furnitureForm,[key]:value})}/>)}</div>
        {(p?.revision!==furnitureForm.expectedRevision || selection?.token!==furnitureForm.selectionToken) && <p className="is-error" role="alert">场景或选择已变化，请关闭后重新打开调整面板。</p>}
        <div className="is-dialog-actions"><Button disabled={busy || p?.readOnly || p?.revision!==furnitureForm.expectedRevision || selection?.token!==furnitureForm.selectionToken} onClick={()=>run('edit',{expectedRevision:furnitureForm.expectedRevision,selectionToken:furnitureForm.selectionToken,action:'remove'},async result=>{await build(result);setSheet(null);})}>移除家具</Button><Button variant="primary" type="submit" disabled={busy || p?.readOnly || p?.revision!==furnitureForm.expectedRevision || selection?.token!==furnitureForm.selectionToken}>保存调整</Button></div>
      </form>}
      {sheet === 'access' && p && <div className="is-form">
        <div className="is-setting-row"><div><strong>允许模型读取设计摘要</strong><p className="is-subtle">尺寸、当前选择及设计建议</p></div><Switch label="允许当前模型读取设计摘要" checked={p.consent} disabled={busy || p.readOnly || !p.modelRoute} onChange={allow => run('consent',{...revision,allow})}/></div>
        {!p.modelRoute && <p className="is-subtle">先在聊天中发送一条不含图纸资料的消息，连接所选模型后即可调整授权。</p>}
        <p>CAD 原件、图中文字与图片始终留在本地。</p><p className="is-subtle">授权绑定当前聊天所选模型。关闭后停止添加摘要；已经发送的聊天历史无法撤回，该聊天的模型请求会暂停，直到重新授权。本地编辑可以继续。</p>
        <details><summary>开发版支持范围</summary><p className="is-subtle">当前聚焦本机 macOS arm64。DWG 商业导入尚未提供，Windows 暂不开发。</p></details>
      </div>}
      {sheet === 'history' && <div className="is-history">{tasks.map(task => <details key={task.id} className="is-history-item"><summary><span>版本 {task.revision}<small>{task.detail.render ? '效果图' : '三维模型'}</small></span><span className="is-subtle">{status[task.state]}</span></summary>
        {task.detail.message && <p className="is-error">{task.detail.message}</p>}
        <TaskChecks detail={task.detail}/>
        {['queued','running'].includes(task.state) && <Button size="sm" onClick={() => run('cancel',{taskId:task.id})}>取消任务</Button>}
        {task.state === 'complete' && <div className="is-downloads">{Object.keys(task.detail.files).map(file=><Button size="sm" variant="outline" key={file} onClick={() => download(task,file)}>{artifactLabel(file,task)}</Button>)}<Button size="sm" onClick={() => download(task,'scene.json')}>场景数据</Button></div>}
      </details>)}</div>}
      {sheet === 'export' && exportTask && <div className="is-form"><Button variant="outline" icon={<IconDownloadOutlineRegular/>} disabled={busy} onClick={()=>downloadDrawingSet()}>当前版本图纸与剖面 · DXF</Button><Button variant="outline" disabled={busy} onClick={downloadSchedule}>当前设计构件清单 · CSV</Button><p className="is-subtle">以下文件实际生成于版本 {exportTask.revision}。几何相同的模型可复用于当前方案；材质与几何改变后需更新。清单是设计占用尺寸，未替代下料和采购规格。</p><div className="is-export-list">{Object.keys(exportTask.detail.files).map(file=><Button key={file} variant="outline" icon={<IconDownloadOutlineRegular/>} onClick={() => download(exportTask,file)}>{artifactLabel(file,exportTask)}</Button>)}<Button variant="outline" icon={<IconDownloadOutlineRegular/>} onClick={() => download(exportTask,'scene.json')}>来源版本场景数据 · JSON</Button></div></div>}
      {sheet === 'report' && report && <div className="is-form"><DesignMeasurements review={report.review}/><FurnitureReview review={report.furnitureReview}/><p>{report.walls.length} 段墙线，{report.openings.length} 处门窗，{report.rooms?.length??0} 个闭合房间。</p><p className="is-subtle">支持平面曲线、成对直墙和同心圆弧，门窗关联墙体后生成洞口。共用图层的未知门窗需确认类型；未闭合区域不自动铺设地面。</p>{pending && <Button onClick={()=>setSheet('layers')}>调整图层与墙线</Button>}{report.blocking.map(message=><p className="is-error" key={message}>{message}</p>)}<details><summary>实体与诊断信息</summary><pre>{JSON.stringify({counts:report.counts,pairing:report.pairing,topology:report.topology,unresolvedOpenings:report.unresolvedOpenings,warnings:report.warnings,paperSpaceEntitiesExcluded:report.paperSpaceEntitiesExcluded},null,2)}</pre><ul>{report.entities.slice(0,100).map((e,i)=><li key={i}>{e.source.handle} · {e.type} · {e.source.layer} · {e.disposition}</li>)}</ul></details></div>}
    </Modal>
  </section>;
}

function DesignNavigator({screen, ready}) {
  const sessionId = useSyncExternalStore(listener => screen.subscribe(listener), () => screen.getSnapshot());
  useEffect(() => {
    const notify = () => ready(sessionId);
    notify(); listeners.add(notify); return () => listeners.delete(notify);
  }, [sessionId, ready]);
  return null;
}

export function apply(ctx) {
  const request = async (path, payload, signal) => {
    if (!ctx.connection.isLoopback) throw new Error('当前仅支持本机 Host');
    const send = globalThis.__DSH_TRANSPORT__?.fetch ?? globalThis.fetch.bind(globalThis);
    const response = await send(path, { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(payload), signal });
    if (!response.ok) throw new Error(`本地工程连接失败 (${response.status})`);
    const result = await response.json();
    if (!result.ok) throw new Error(result.error.message); return result.value;
  };
  const api = (sessionId, action, input, operationId = crypto.randomUUID(), signal) => request('api/interior-studio', {sessionId,action,input,operationId}, signal);
  const manage = (action, input, operationId = crypto.randomUUID(), signal) => request('api/interior-studio/projects', {action,input,operationId}, signal);
  const openProjects = () => ctx.layout.selectPanel(PROJECTS_PANEL);
  let lastSession = ctx.sidebarRight.mounted.getSnapshot(), pendingSession, creation;
  ctx.effect(() => ctx.sidebarRight.mounted.subscribe(() => { lastSession = ctx.sidebarRight.mounted.getSnapshot() ?? lastSession; }));
  const workspaceFor = session => ctx.workspaces.list.getSnapshot().items.find(workspace => workspace.sessionIds.includes(session))?.workspaceId;
  const defaultWorkspace = () => workspaceFor(lastSession) ?? ctx.workspaces.list.getSnapshot().items[0]?.workspaceId;
  const ready = session => {
    if (!session || pendingSession !== session || ctx.sidebarRight.mounted.getSnapshot() !== session) return;
    pendingSession = undefined;
    ctx.sidebarRight.openTab('interior-studio');
  };
  const navigate = session => {
    pendingSession = session; ctx.uiWorkspace.openSession(session);
    // The arriving Session mints its native rightbar store in the same render.
    requestAnimationFrame(() => { for (const notify of listeners) notify(); });
  };
  const openProject = async project => {
    const navigation = ctx.layout.beginNavigation();
    const sessions = ctx.sessions.list.getSnapshot(), archived = ctx.workspaces.list.getSnapshot().archivedSessionIds;
    const session = [project.writer, ...project.sessionIds].find(id => sessions.byId[id]?.projectionValues?.agentPreset === 'interior-studio'
      && project.sessionIds.includes(id) && !archived.includes(id));
    const target = session ?? await ctx.sessions.create({agentPreset:'interior-studio', workspaceId:workspaceFor(project.writer) ?? defaultWorkspace()});
    if (!session) await api(target, 'open', {projectId:project.id});
    if (!navigation.aborted) navigate(target);
  };
  const createProject = async (input, operation) => {
    const navigation = ctx.layout.beginNavigation();
    // A lost project response must retry in the same Session with the same receipt.
    if (creation?.operation !== operation) creation = {operation};
    const session = creation.session ??= await ctx.sessions.create({agentPreset:'interior-studio', ...(input.workspaceId ? {workspaceId:input.workspaceId} : {})});
    await api(session, 'create', {name:input.name,kind:input.kind}, operation);
    if (!navigation.aborted) navigate(session);
  };
  ctx.effect(() => ctx.slots.inject('main', () => ctx.slots.register({
    name:'main', key:PROJECTS_PANEL, inject:()=>({manage,openProject,createProject,workspaces:ctx.workspaces.list,defaultWorkspace}),
  },ProjectManager)));
  ctx.effect(() => ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
    name:'sidebar.panellist',id:PROJECTS_PANEL,order:20,label:()=> '设计工程',
  },({size})=> <IconFolderOpenOutlineRegular size={size}/>)));
  ctx.effect(() => ctx.slots.inject('shell.overlay', () => ctx.slots.register({
    name:'shell.overlay',id:ID+'-navigation',inject:()=>({screen:ctx.sidebarRight.mounted,ready}),
  },DesignNavigator)));
  const importFiles = async (sessionId, files) => {
    if (!ctx.connection.isLoopback) throw new Error('当前仅支持本机 Host；CAD 未发送到远程 Host');
    if (files.length !== 1 || !isCad(files[0])) throw new Error('请一次单独拖入一份 DWG/DXF，其他文件未添加');
    const file = files[0]; if (file.size > 20 * 1024 * 1024) throw new Error('当前 CAD 大小上限 20 MiB');
    ctx.sidebarRight.openTab('interior-studio');
    const base64 = await new Promise((res, rej) => { const reader = new FileReader(); reader.onload=()=>res(reader.result.split(',')[1]); reader.onerror=()=>rej(reader.error); reader.readAsDataURL(file); });
    const result = await api(sessionId,'import',{ name:file.name,base64 });
    intakeError='';for(const notify of listeners)notify();return result;
  };
  const title = () => '设计';
  ctx.effect(() => ctx.sidebarRightTabs.register({id:ID,kind:'interior-studio',title,keepMounted:true,
    guide:[{id:'open',order:25,title,icon:IconBrowseOutlineRegular,description:()=> '用对话设计空间，导入图纸或查看三维方案'}]}));
  ctx.effect(() => ctx.slots.inject('sidebar.right.pane.tab.title', () => ctx.slots.register({
    name:'sidebar.right.pane.tab.title',key:ID,
  },()=> <span className="is-tab-title"><IconBrowseOutlineRegular size={14}/>设计</span>)));
  ctx.effect(() => ctx.slots.inject('sidebar.right.pane.tab', () => ctx.slots.register({
    name:'sidebar.right.pane.tab',key:ID,inject:sessionId=>({sessionId,api,importFiles,openProjects}),
  },StudioView)));
  ctx.effect(() => ctx.slots.inject('conversation.session.header.utilities', () => ctx.slots.register({
    name:'conversation.session.header.utilities',id:ID,
  },()=> <Button size="sm" className="is-design-entry is-icon" title="打开设计面板" aria-label="打开设计面板"
    onClick={()=>ctx.sidebarRight.openTab('interior-studio')} icon={<IconBrowseOutlineRegular/>}/>)));
  ctx.effect(()=>{
    const style=document.createElement('style');style.textContent=css;style.dataset.interiorStudio='true';document.head.append(style);
    const release=installCadIntake({document,window,getSession:()=>ctx.sidebarRight.mounted.getSnapshot(),intake:importFiles,
      onError:error=>{
        intakeError=error.message??String(error);
        if(ctx.sidebarRight.mounted.getSnapshot())ctx.sidebarRight.openTab('interior-studio');else window.alert(intakeError);
        for(const notify of listeners)notify();
      }});
    return()=>{style.remove();release();};
  });
}
