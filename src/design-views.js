/** Named views share the CAD coordinate convention: X right, Y back, Z up. */
import {assetSolid,solidEdges,wallSolids} from './solids.js';
import {modelPrism} from './refinement.js';

export const DESIGN_STAGES=[
  {value:'plan',label:'CAD 图纸'}, {value:'model',label:'三维建模'}, {value:'results',label:'效果图'},
];
export const VIEW_LABELS={overview:'总览',front:'正面',back:'背面',left:'左侧',right:'右侧',top:'俯视'};
export const DRAFT_PREVIEW_VIEWS={overview:'斜视',front:'正视',top:'俯视'};
export const DEFAULT_RENDER_VIEWS=['overview','front','back','left','right','top'];
export const DRAWING_LABELS={plan:'平面图',front:'正立面',back:'后立面',left:'左立面',right:'右立面'};
export const DETAIL_DRAWING_LABELS={section_x:'纵向剖面',section_y:'横向剖面'};
export const ALL_DRAWING_LABELS={...DRAWING_LABELS,...DETAIL_DRAWING_LABELS};

/** Saved client views take precedence over the generic exterior gallery. */
export function recommendedRenderViews(scene) {
  const required=[...new Set((scene?.design?.constraints?.views??[]).map(row=>row.view))];
  return required.length?required:[...DEFAULT_RENDER_VIEWS];
}
export function galleryCoverage(scene,gallery) {
  const required=[...new Set((scene?.design?.constraints?.views??[]).map(row=>row.view))];
  const current=new Set(gallery.filter(row=>row.current===true).map(row=>row.id));
  return {required,available:required.filter(id=>current.has(id)),missing:required.filter(id=>!current.has(id)),complete:required.length>0&&required.every(id=>current.has(id))};
}

/** Orthographic line projections, including holes and elevated components. No hidden-line removal. */
export function projectDrawing(scene,view) {
  if(!Object.hasOwn(DRAWING_LABELS,view))throw Error('未知图纸视图');
  const project=([x,y,z])=>view==='plan'?[x,y]:view==='front'?[x,z]:view==='back'?[-x,z]:view==='left'?[-y,z]:[y,z];
  const seen=new Set(),lines=[];
  const add=(a,b,object)=>{
    a=project(a).map(n=>Math.round(n*1e5)/1e5);b=project(b).map(n=>Math.round(n*1e5)/1e5);
    if(Math.hypot(a[0]-b[0],a[1]-b[1])<1e-5)return;
    const key=[a.join(','),b.join(',')].sort().join(':');if(seen.has(key))return;seen.add(key);
    lines.push({a,b,type:object.type,id:object.id});
  };
  for(const object of scene.objects) {
    const prisms=object.type==='solid'?[object]:object.type==='model'?[modelPrism(object)]:object.type==='asset'?[assetSolid(object)]:object.type==='wall'?wallSolids(object):[];
    for(const prism of prisms)for(const [a,b] of solidEdges(prism))add(a,b,object);
    if(object.type==='floor') {
      const rings=object.polygon?[object.polygon,...(object.holes??[])]:[[[0,0],[object.width,0],[object.width,object.depth],[0,object.depth]]];
      for(const ring of rings)ring.forEach((a,i)=>add([...a,0],[...ring[(i+1)%ring.length],0],object));
    }
  }
  const extents=lines.length?[Infinity,Infinity,-Infinity,-Infinity]:[0,0,...scene.bounds];
  for(const line of lines)for(const point of [line.a,line.b])for(let i=0;i<2;i++){extents[i]=Math.min(extents[i],point[i]);extents[i+2]=Math.max(extents[i+2],point[i]);}
  return {view,label:DRAWING_LABELS[view],lines,extents,basis:'model_orthographic_line_projection'};
}

/** Old render tasks remain readable as a one-image gallery. */
export function renderImages(task) {
  if(!task||task.state!=='complete')return [];
  const detail=task.detail;
  if(Array.isArray(detail.views))return detail.views.filter(v=>/^[A-Za-z][A-Za-z0-9_-]{0,49}$/.test(v.id)&&detail.files?.[v.file]).map(v=>({...v,label:VIEW_LABELS[v.id]??v.label??v.id}));
  return detail.files?.['render.png']?[{id:'overview',label:'历史单视角',file:'render.png'}]:[];
}

/** One revision, oldest task first: keep view order and replace rerendered views. */
export function renderGallery(tasks,revision) {
  const views=new Map();
  for(const task of tasks) {
    if(task.revision!==revision)continue;
    for(const view of renderImages(task))views.set(view.id,{...view,taskId:task.id,revision:task.revision,
      cadVerified:task.detail.cadAudit?.passed===true});
  }
  return [...views.values()];
}
