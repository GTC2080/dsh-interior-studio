/** Read-only orthographic drafting from the saved metre-based geometry. */
import {assetSolid,solidEdges,solidWorld,wallSolids} from './solids.js';
import {pointInRing,pointAt,wallLength} from './geometry.js';
import {ALL_DRAWING_LABELS as DRAWING_LABELS} from './design-views.js';
import {modelPrism} from './refinement.js';

const EPS=1e-7;
const project=(p,view)=>view==='plan'?[p[0],p[1],p[2]]:view==='front'?[p[0],p[2],-p[1]]:
  view==='back'?[-p[0],p[2],p[1]]:view==='left'?[-p[1],p[2],-p[0]]:[p[1],p[2],p[0]];
const mix=(a,b,t)=>a.map((n,i)=>n+(b[i]-n)*t);
const bounds=points=>points.reduce((b,p)=>[Math.min(b[0],p[0]),Math.min(b[1],p[1]),Math.max(b[2],p[0]),Math.max(b[3],p[1])],[Infinity,Infinity,-Infinity,-Infinity]);
const overlaps=(a,b)=>a[0]<=b[2]+EPS&&a[2]>=b[0]-EPS&&a[1]<=b[3]+EPS&&a[3]>=b[1]-EPS;
const unique=values=>[...new Set(values.map(n=>Math.round(n*1e8)/1e8))].sort((a,b)=>a-b);

function prismFaces(prism) {
  const rings=[prism.outline,...prism.holes],caps=[0,prism.depth].map(z=>rings.map(r=>r.map(p=>solidWorld(prism,[...p,z]))));
  return [...caps,...rings.flatMap(r=>r.map((p,i)=>[[solidWorld(prism,[...p,0]),solidWorld(prism,[...r[(i+1)%r.length],0]),
    solidWorld(prism,[...r[(i+1)%r.length],prism.depth]),solidWorld(prism,[...p,prism.depth])]]))];
}
function drawingEdges(prism,view) {
  const edges=[];
  for(const ring of [prism.outline,...prism.holes])ring.forEach((p,i)=>{
    const previous=ring[(i+ring.length-1)%ring.length],next=ring[(i+1)%ring.length];
    const a=solidWorld(prism,[...p,0]),b=solidWorld(prism,[...next,0]),c=solidWorld(prism,[...p,prism.depth]);
    edges.push([a,b],[c,solidWorld(prism,[...next,prism.depth])]);
    const u=[p[0]-previous[0],p[1]-previous[1]],v=[next[0]-p[0],next[1]-p[1]];
    const smooth=(u[0]*v[0]+u[1]*v[1])/(Math.hypot(...u)*Math.hypot(...v))>Math.cos(Math.PI/15);
    const signed=(x,y,z)=>{const p=project(x,view),q=project(y,view),r=project(z,view);return (q[0]-p[0])*(r[1]-p[1])-(q[1]-p[1])*(r[0]-p[0]);};
    const n1=signed(solidWorld(prism,[...previous,0]),a,c),n2=signed(a,b,solidWorld(prism,[...next,prism.depth]));
    if(!smooth||n1*n2<0||(Math.abs(n1)<EPS)!==(Math.abs(n2)<EPS))edges.push([a,c]);
  });
  return edges;
}
function facePlane(rings,view) {
  const projected=rings.map(r=>r.map(p=>project(p,view))),ring=projected[0],a=ring[0];
  for(let i=1;i<ring.length-1;i++) {
    const b=ring[i],c=ring[i+1],det=(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
    if(Math.abs(det)<1e-10)continue;
    const u=((b[2]-a[2])*(c[1]-a[1])-(c[2]-a[2])*(b[1]-a[1]))/det;
    const v=((b[0]-a[0])*(c[2]-a[2])-(c[0]-a[0])*(b[2]-a[2]))/det;
    return {rings:projected,bounds:bounds(ring),u,v,k:a[2]-u*a[0]-v*a[1],maxDepth:Math.max(...ring.map(p=>p[2]))};
  }
  return null;
}
const inside=(p,face)=>pointInRing(p,face.rings[0])&&!face.rings.slice(1).some(h=>pointInRing(p,h));
function crossing(a,b,c,d) {
  const x=b[0]-a[0],y=b[1]-a[1],u=d[0]-c[0],v=d[1]-c[1],det=x*v-y*u;
  if(Math.abs(det)<1e-12)return null;
  const t=((c[0]-a[0])*v-(c[1]-a[1])*u)/det,s=((c[0]-a[0])*y-(c[1]-a[1])*x)/det;
  return t>EPS&&t<1-EPS&&s>=-EPS&&s<=1+EPS?t:null;
}
function clipBelow(ring,z) {
  const out=[];
  ring.forEach((a,i)=>{const b=ring[(i+1)%ring.length],aIn=a[2]<=z,bIn=b[2]<=z;
    if(aIn)out.push(a);if(aIn!==bIn)out.push(mix(a,b,(z-a[2])/(b[2]-a[2])));
  });
  return out;
}
/** Intersect actual faces, including holes, with the plan cutting plane. */
function sectionRings(faces,z) {
  const segments=[];
  for(const rings of faces) {
    const plane=['plan','front','right'].map(view=>({view,face:facePlane(rings,view)})).find(p=>p.face);
    if(!plane)continue;
    const points=[];
    for(const ring of rings)ring.forEach((a,i)=>{const b=ring[(i+1)%ring.length];
      if((a[2]<z)!==(b[2]<z))points.push(mix(a,b,(z-a[2])/(b[2]-a[2])));
    });
    if(points.length<2)continue;
    const axis=Math.abs(points[0][0]-points[1][0])>=Math.abs(points[0][1]-points[1][1])?0:1;
    points.sort((a,b)=>a[axis]-b[axis]);
    for(let i=1;i<points.length;i++)if(inside(project(mix(points[i-1],points[i],.5),plane.view),plane.face))
      segments.push([points[i-1].slice(0,2),points[i].slice(0,2)]);
  }
  const key=p=>p.map(n=>Math.round(n*1e6)).join(','),edges=new Map();
  for(const [a,b] of segments)if(key(a)!==key(b))edges.set([key(a),key(b)].sort().join(':'),[a,b]);
  const remaining=[...edges.values()],adjacent=new Map();
  remaining.forEach((edge,i)=>edge.forEach(p=>{const k=key(p);if(!adjacent.has(k))adjacent.set(k,[]);adjacent.get(k).push(i);}));
  const used=new Set(),rings=[];
  for(let i=0;i<remaining.length;i++) {
    if(used.has(i))continue;
    const ring=[remaining[i][0]],start=key(ring[0]);let at=remaining[i][1];used.add(i);
    while(key(at)!==start) {
      ring.push(at);const next=adjacent.get(key(at))?.find(j=>!used.has(j));
      if(next===undefined)break;
      used.add(next);const [a,b]=remaining[next];at=key(a)===key(at)?b:a;
    }
    if(key(at)===start&&ring.length>=3)rings.push(ring);
  }
  return rings;
}

/** Face-grid broad phase bounds the cost of exact projected segment/face clipping. */
function hideLines(lines,faces,extents) {
  const n=28,dx=(extents[2]-extents[0]||1)/n,dy=(extents[3]-extents[1]||1)/n,grid=new Map();
  const cells=box=>{
    const clamp=(v,base,step)=>Math.max(0,Math.min(n-1,Math.floor((v-base)/step)));
    return [clamp(box[0],extents[0],dx),clamp(box[1],extents[1],dy),clamp(box[2],extents[0],dx),clamp(box[3],extents[1],dy)];
  };
  faces.forEach((face,i)=>{const [x0,y0,x1,y1]=cells(face.bounds);for(let x=x0;x<=x1;x++)for(let y=y0;y<=y1;y++){
    const key=x*n+y;if(!grid.has(key))grid.set(key,[]);grid.get(key).push(i);
  }});
  const output=[];let checks=0;
  for(const line of lines) {
    const box=bounds([line.a,line.b]),[x0,y0,x1,y1]=cells(box),candidates=new Set(),hidden=[];
    for(let x=x0;x<=x1;x++)for(let y=y0;y<=y1;y++)for(const i of grid.get(x*n+y)??[])candidates.add(i);
    for(const index of candidates) {
      const face=faces[index];if(!overlaps(box,face.bounds)||face.maxDepth<=Math.min(line.a[2],line.b[2])+EPS)continue;
      const depth=p=>face.u*p[0]+face.v*p[1]+face.k-p[2],da=depth(line.a),db=depth(line.b);
      if(Math.max(da,db)<=EPS)continue;
      if(++checks>3_000_000)throw new Error('图纸消隐计算超过预算，请缩小构件数量或拆分工程');
      const cuts=[0,1];if(da*db<0)cuts.push(da/(da-db));
      for(const ring of face.rings)ring.forEach((a,i)=>{const t=crossing(line.a,line.b,a,ring[(i+1)%ring.length]);if(t!==null)cuts.push(t);});
      const sorted=unique(cuts);
      for(let i=1;i<sorted.length;i++) {
        const a=sorted[i-1],b=sorted[i],p=mix(line.a,line.b,(a+b)/2);
        if(b-a>EPS&&depth(p)>EPS&&inside(p,face))hidden.push([a,b]);
      }
    }
    hidden.sort((a,b)=>a[0]-b[0]);let cursor=0;
    for(const [a,b] of hidden){if(a>cursor+EPS)output.push({...line,a:mix(line.a,line.b,cursor),b:mix(line.a,line.b,a)});cursor=Math.max(cursor,b);}
    if(cursor<1-EPS)output.push({...line,a:mix(line.a,line.b,cursor),b:line.b});
  }
  const seen=new Set();return output.filter(line=>{
    const key=[line.a,line.b].map(p=>p.slice(0,2).map(n=>Math.round(n*1e6)).join(',')).sort().join(':');
    if(seen.has(key))return false;seen.add(key);return true;
  });
}

export function draftGeometry(scene,view,{cutHeight=1.2,overhead=false}={}) {
  if(!Object.hasOwn(DRAWING_LABELS,view))throw Error('未知图纸视图');
  const lines=[],faces=[],cuts=[],ghosts=[],objects=[];
  const addEdge=(a,b,object,kind=object.type)=>{
    a=project(a,view);b=project(b,view);if(Math.hypot(a[0]-b[0],a[1]-b[1])>EPS)lines.push({a,b,id:object.id,kind});
  };
  for(const object of scene.objects) {
    if(object.type==='floor') {
      const rings=object.polygon?[object.polygon,...(object.holes??[])]:[[[0,0],[object.width,0],[object.width,object.depth],[0,object.depth]]];
      for(const ring of rings)ring.forEach((a,i)=>addEdge([...a,0],[...ring[(i+1)%ring.length],0],object));
      continue;
    }
    const prisms=object.type==='solid'?[object]:object.type==='model'?[modelPrism(object)]:object.type==='asset'?[assetSolid(object)]:object.type==='wall'?wallSolids(object):[];
    const points=prisms.flatMap(p=>solidEdges(p).flat()),projected=points.map(p=>project(p,view));
    if(!points.length)continue;
    objects.push({id:object.id,label:object.label,key:object.origin?.key??object.id,assembly:object.assembly,type:object.type,shape:object.shape,
      ...(object.type==='model'?{approximation:'imported_model_envelope'}:{}),frontDepth:Math.max(...projected.map(p=>p[2])),
      bounds:bounds(projected),worldBounds:[0,1].map(k=>[0,1,2].map(i=>Math[k?'max':'min'](...points.map(p=>p[i]))))});
    for(const prism of prisms) {
      let rawFaces=prismFaces(prism),edges=drawingEdges(prism,view);
      if(view==='plan') {
        const zs=rawFaces.flat(2).map(p=>p[2]),low=Math.min(...zs),high=Math.max(...zs);
        if(low>=cutHeight-EPS) {
          if(overhead)for(const [a,b] of edges){const p=project(a,view),q=project(b,view);if(Math.hypot(p[0]-q[0],p[1]-q[1])>EPS)ghosts.push({a:p,b:q,id:object.id,kind:'overhead'});}
          continue;
        }
        if(high>cutHeight+EPS) {
          const section=sectionRings(rawFaces,cutHeight+1e-8);
          if(section.length)cuts.push({rings:section,id:object.id,kind:object.type});
          rawFaces=rawFaces.map(rings=>rings.map(ring=>clipBelow(ring,cutHeight)).filter(ring=>ring.length>=3)).filter(r=>r.length);
          if(section.length)rawFaces.push(section.map(r=>r.map(p=>[...p,cutHeight])));
          edges=edges.flatMap(([a,b])=>a[2]>cutHeight&&b[2]>cutHeight?[]:[a[2]<=cutHeight&&b[2]<=cutHeight?[a,b]:a[2]>cutHeight?[mix(a,b,(cutHeight-a[2])/(b[2]-a[2])),b]:[a,mix(a,b,(cutHeight-a[2])/(b[2]-a[2]))]]);
          for(const ring of section)ring.forEach((a,i)=>edges.push([[...a,cutHeight],[...ring[(i+1)%ring.length],cutHeight]]));
        }
      }
      for(const [a,b] of edges)addEdge(a,b,object);
      if(object.shape!=='text')for(const rings of rawFaces){const face=facePlane(rings,view);if(face)faces.push(face);}
    }
  }
  const all=lines.flatMap(l=>[l.a,l.b]),extents=all.length?bounds(all):[0,0,scene.bounds[0],view==='plan'?scene.bounds[1]:scene.parameters?.height??1];
  const visible=hideLines(lines,faces,extents);
  if(view==='plan')for(const wall of scene.objects.filter(o=>o.type==='wall'))for(const opening of wall.openings) {
    if(opening.sill>=cutHeight||opening.top<=cutHeight)continue;
    const start=pointAt(wall,opening.start),end=pointAt(wall,opening.start+opening.width),vector=[end[0]-start[0],end[1]-start[1]],length=Math.hypot(...vector);
    if(opening.kind==='door') {
      const angle=Math.atan2(vector[1],vector[0]),turn=(opening.swing==='right'?-1:1)*Math.PI/2;
      const arc=Array.from({length:25},(_,i)=>[start[0]+length*Math.cos(angle+turn*i/24),start[1]+length*Math.sin(angle+turn*i/24)]);
      visible.push({a:[...start,0],b:[...arc.at(-1),0],kind:'door',id:wall.id});
      for(let i=1;i<arc.length;i++)visible.push({a:[...arc[i-1],0],b:[...arc[i],0],kind:'door',id:wall.id});
    } else if(opening.kind==='window') {
      const count=wall.arc?Math.max(8,Math.ceil(opening.width/.03)):Math.max(1,Math.ceil(opening.width/wallLength(wall)*((wall.path?.length??2)-1)));
      for(const offset of [-wall.thickness/3,0,wall.thickness/3]) {
        let previous;
        for(let i=0;i<=count;i++) {
          const distance=opening.start+opening.width*i/count,p=pointAt(wall,distance);let v;
          if(wall.arc) {
            const angle=wall.arc.start+distance/wall.arc.radius,radius=wall.arc.radius+offset;
            v=[wall.arc.center[0]+radius*Math.cos(angle),wall.arc.center[1]+radius*Math.sin(angle),0];
          } else {
            const before=pointAt(wall,Math.max(0,distance-.001)),after=pointAt(wall,Math.min(wallLength(wall),distance+.001));
            const dx=after[0]-before[0],dy=after[1]-before[1],tangent=Math.hypot(dx,dy);
            v=[p[0]-dy/tangent*offset,p[1]+dx/tangent*offset,0];
          }
          if(previous)visible.push({a:previous,b:v,kind:'window',id:wall.id});previous=v;
        }
      }
    }
  }
  return {view,extents,lines:visible,overhead:ghosts,cuts,objects,cutHeight,basis:'opaque_prism_faces_with_holes',catalogBasis:'envelopes'};
}

const fmt=n=>Math.abs(n)<.0005?'0':String(Math.round(n*1000));
const ink={wall:'#171b20',solid:'#293d44',model:'#293d44',asset:'#326b78',floor:'#a4a8aa',door:'#435e65',window:'#326b78',overhead:'#969da1',dimension:'#238165',extension:'#78a495',frame:'#454c52',note:'#666f76'};
export const needsMeshElevation=(scene,view)=>view.startsWith('section_')||view!=='plan'&&scene.objects.some(o=>o.type==='model'||o.type==='asset'||o.shape==='text');

/** Validate compact Worker geometry before it reaches SVG or DXF serialization. */
export function meshDrawingGeometry(value,scene,view) {
  const check=(condition,message)=>{if(!condition)throw Error('立面网格数据无效：'+message);};
  const vector=(v,n)=>Array.isArray(v)&&v.length===n&&v.every(x=>Number.isFinite(x)&&Math.abs(x)<=2000);
  check(value?.view===view&&Object.hasOwn(DRAWING_LABELS,view)&&view!=='plan','视图');
  check(value.basis==='actual_mesh_feature_edges; sampled_orthographic_visibility','来源');
  check(value.visibilityStepMetres===.005&&vector(value.extents,4)&&value.extents[2]>=value.extents[0]&&value.extents[3]>=value.extents[1],'范围');
  if(view.startsWith('section_'))check(value.cutAxis===view.at(-1)&&Number.isFinite(value.cutAt)&&value.cutAt>0&&value.cutAt<scene.bounds[view==='section_x'?0:1],'剖切基准');
  check(Array.isArray(value.groups)&&value.groups.length<=scene.objects.length,'对象预算');
  const objects=[],lines=[],seen=new Set();
  for(const group of value.groups) {
    const object=scene.objects.find(o=>o.id===group.id);
    check(object&&!seen.has(group.id),'对象身份');seen.add(group.id);
    check(vector(group.bounds,4)&&Array.isArray(group.worldBounds)&&group.worldBounds.length===2&&group.worldBounds.every(b=>vector(b,3))&&Number.isFinite(group.frontDepth),'对象范围');
    check(Array.isArray(group.lines)&&Array.isArray(group.cutLines??[])&&group.lines.length+(group.cutLines?.length??0)+lines.length<=20000,'线条预算');
    objects.push({id:object.id,key:object.origin?.key??object.id,label:object.label,assembly:object.assembly,type:object.type,shape:object.shape,
      bounds:group.bounds,worldBounds:group.worldBounds,frontDepth:group.frontDepth});
    for(const line of group.lines){check(vector(line,4),'线段坐标');lines.push({a:line.slice(0,2),b:line.slice(2),id:object.id,kind:object.type});}
    for(const line of group.cutLines??[]){check(vector(line,4),'剖切线段坐标');lines.push({a:line.slice(0,2),b:line.slice(2),id:object.id,kind:'cut'});}
  }
  check(value.lines===lines.length,'线条计数');
  return {view,extents:value.extents,lines,objects,cuts:[],overhead:[],cutHeight:1.2,cutAt:value.cutAt,cutAxis:value.cutAxis,basis:value.basis,visibilityStepMetres:value.visibilityStepMetres};
}
/** A3 paper coordinates are millimetres; geometry and annotations use the same model. */
export function drawingSheet(scene,view,{name=scene.design?.name??'设计工程',revision=0,draft=false,overhead=false,geometry:suppliedGeometry}={}) {
  const geometry=suppliedGeometry??draftGeometry(scene,view,{overhead}),[x0,y0,x1,y1]=geometry.extents;
  const width=Math.max(x1-x0,.001),height=Math.max(y1-y0,.001),scales=[10,20,25,50,75,100,150,200,250,500,1000,2000,5000,10000];
  const scale=scales.find(s=>width*1000/s<=266&&height*1000/s<=220)??Math.ceil(Math.max(width/266,height/220)*1000);
  const factor=1000/scale,origin=[158-width*factor/2,126+height*factor/2];
  const xy=([x,y])=>[origin[0]+(x-x0)*factor,origin[1]-(y-y0)*factor];
  const sheet={width:420,height:297,name,view,label:DRAWING_LABELS[view],scale,revision,draft,geometry,
    lines:[],paths:[],texts:[],dimensions:[],notes:[]};
  const line=(a,b,kind='frame',extra={})=>sheet.lines.push({a,b,kind,...extra});
  const text=(value,p,size=2.6,kind='note',extra={})=>sheet.texts.push({value:String(value),p,size,kind,...extra});
  const rectangle=(x,y,w,h,kind='frame')=>{line([x,y],[x+w,y],kind);line([x+w,y],[x+w,y+h],kind);line([x+w,y+h],[x,y+h],kind);line([x,y+h],[x,y],kind);};
  rectangle(6,6,408,285);rectangle(10,10,400,277);line([310,10],[310,260]);line([10,260],[410,260]);
  for(const cut of geometry.cuts)sheet.paths.push({rings:cut.rings.map(r=>r.map(xy)),kind:'cut',fill:cut.kind==='wall'?'#9da8ae':'#c4cdd1',id:cut.id});
  for(const l of [...geometry.lines,...geometry.overhead])line(xy(l.a),xy(l.b),l.kind,{id:l.id,dash:l.kind==='overhead'});
  const dim=(a,b,offset,axis,outer=false)=>{
    const p=xy(a),q=xy(b),vertical=axis==='y',s=vertical?[offset,p[1]]:[p[0],offset],e=vertical?[offset,q[1]]:[q[0],offset];
    const value=fmt(Math.abs(b[vertical?1:0]-a[vertical?1:0]));if(value==='0')return;
    const t=vertical?[offset-1.6,(p[1]+q[1])/2]:[(p[0]+q[0])/2,offset-1.6];
    line(p,vertical?[offset+(offset<p[0]?-1.5:1.5),p[1]]:[p[0],offset+(offset<p[1]?-1.5:1.5)],'extension');
    line(q,vertical?[offset+(offset<q[0]?-1.5:1.5),q[1]]:[q[0],offset+(offset<q[1]?-1.5:1.5)],'extension');
    line(s,e,'dimension');
    for(const v of [s,e])line([v[0]-1.1,v[1]+1.1],[v[0]+1.1,v[1]-1.1],'dimension');
    text(value,t,outer?3.5:3.2,'dimension',{anchor:'middle',rotation:vertical?-90:0,mask:true});
    sheet.dimensions.push({axis,a,b,paperA:p,paperB:q,offset,textSize:outer?3.5:3.2,value:Number(value),unit:'mm',basis:'projected_geometry'});
  };
  const reference=scene.design?.review?.referenceExtents??[0,0,...scene.bounds];
  const referencePoints=view==='plan'?[[reference[0],reference[1]],[reference[2],reference[3]]]:[[x0,y0],[x1,y1]];
  const [r0,r1]=referencePoints,base=xy(r0),far=xy(r1);
  dim([r0[0],r0[1]],[r1[0],r0[1]],Math.max(base[1],far[1])+18,'x',true);
  dim([r0[0],r0[1]],[r0[0],r1[1]],Math.min(base[0],far[0])-18,'y',true);
  const chain=(axis,edge)=>{
    const k=axis==='x'?0:1,other=1-k,span=k?height:width,min=referencePoints[0][k],max=referencePoints[1][k];
    const candidates=[min,max];
    const near=Math.max(...geometry.objects.map(o=>o.frontDepth));
    const outlines=view==='plan'?geometry.cuts.flatMap(c=>c.rings.map(r=>bounds(r))):geometry.objects
      .filter(o=>o.type!=='asset'&&o.shape!=='text'&&o.frontDepth>=near-.35&&(o.bounds[2]-o.bounds[0])*(o.bounds[3]-o.bounds[1])>=width*height*.008).map(o=>o.bounds);
    for(const b of outlines) {
      const distance=Math.min(Math.abs(b[other]-edge),Math.abs(b[other+2]-edge));
      if(distance<=Math.max(.35,(other?height:width)*.045))candidates.push(b[k],b[k+2]);
    }
    if(view==='plan')for(const wall of scene.objects.filter(o=>o.type==='wall'))for(const opening of wall.openings) {
      const p=pointAt(wall,opening.start),q=pointAt(wall,opening.start+opening.width);
      if(Math.abs(p[other]-edge)<.4&&Math.abs(q[other]-edge)<.4)candidates.push(p[k],q[k]);
    }
    const points=unique(candidates.filter(n=>n>=min-EPS&&n<=max+EPS)),spacing=Math.max(.22,span*.026,6.6/factor),selected=[points[0]];
    for(const n of points.slice(1,-1))if(n-selected.at(-1)>=spacing&&max-n>=spacing)selected.push(n);
    selected.push(max);if(selected.length<=2)return;
    for(let i=1;i<selected.length;i++) {
      const a=k?[edge,selected[i-1]]:[selected[i-1],edge],b=k?[edge,selected[i]]:[selected[i],edge];
      dim(a,b,k?Math.min(base[0],far[0])-9:Math.max(base[1],far[1])+9,axis);
    }
  };
  chain('x',r0[1]);chain('y',r0[0]);
  if(view!=='plan') {
    const y=xy([x0,0])[1];line([xy([x0,0])[0]-4,y],[xy([x1,0])[0]+4,y],'ground');
    text('±0.000',[xy([x0,0])[0]+2,y-2],2.5,'note');
  } else if(scene.kind==='interior') {
    for(const room of scene.objects.filter(o=>o.type==='floor'&&o.labelPoint)) {
      const p=xy(room.labelPoint),measured=scene.design?.review?.rooms?.find(r=>r.id===room.id),clear=measured?.clear;
      text(room.label,p,3,'frame',{anchor:'middle',mask:true});
      if(Number.isFinite(clear?.area??room.area))text(`${clear?'净面积':'轮廓面积'} ${(clear?.area??room.area).toFixed(2)} m²`,[p[0],p[1]+4.5],2.4,'note',{anchor:'middle',mask:true});
    }
  }
  const focus=bounds(sheet.lines.filter(l=>l.kind!=='frame').flatMap(l=>[l.a,l.b]));
  sheet.focusBounds=[focus[0]-8,focus[1]-8,focus[2]+8,focus[3]+8];
  const groups=new Map();
  for(const object of geometry.objects.filter(o=>o.type==='solid'||o.type==='model')) {
    const id=object.assembly??object.key;if(!groups.has(id))groups.set(id,[]);groups.get(id).push(object);
  }
  const legend=[...groups].map(([key,items])=>{const b=[0,1].map(k=>[0,1,2].map(i=>Math[k?'max':'min'](...items.map(o=>o.worldBounds[k][i]))));
    return {key,items,b,dimensions:b[1].map((n,i)=>n-b[0][i])};});
  const codes=new Map(legend.map((g,i)=>[g.key,`C${String(i+1).padStart(2,'0')}`]));
  text('构件组合索引',[316,20],3.4,'frame');text('组合外包 · 宽 × 深 × 高（mm）',[316,27],2.2);
  const maxRows=15;
  const locatorBoxes=[];let omittedLocators=0;
  legend.slice(0,maxRows).forEach((group,i)=>{
    const y=35+i*11.5,code=codes.get(group.key);text(code,[316,y],2.7,'frame');
    const representative=[...group.items].sort((a,b)=>{
      const volume=o=>o.worldBounds[1].reduce((v,n,i)=>v*(n-o.worldBounds[0][i]),1);return volume(b)-volume(a);
    })[0].label.replace(/[（(].*$/,'');
    const label=Array.from(representative).slice(0,18).join('')+(group.items.length>1?` 等${group.items.length}件`:'');
    text(label,[328,y],2.4,'frame');text(group.dimensions.map(fmt).join(' × '),[328,y+4.2],2.3);
    const projected=group.items.flatMap(o=>[[o.bounds[0],o.bounds[1]],[o.bounds[2],o.bounds[3]]]),b=bounds(projected),center=xy([(b[0]+b[2])/2,(b[1]+b[3])/2]);
    if((b[2]-b[0])*(b[3]-b[1])>width*height*.65)return;
    // One locator per assembly avoids annotating every shelf, screw or repeated mesh.
    const visible=geometry.lines.some(l=>group.items.some(o=>o.id===l.id));
    if(visible) {
      const candidates=[[0,0],...[5,10,15,20,25].flatMap(r=>[[r,0],[-r,0],[0,r],[0,-r],[r,r],[-r,r],[r,-r],[-r,-r]])];
      const spot=candidates.map(([x,y])=>[center[0]+x,center[1]+y]).find(p=>{
        const box=[p[0]-4,p[1]-3,p[0]+4,p[1]+2];
        return box[0]>=12&&box[1]>=12&&box[2]<=307&&box[3]<=257&&!locatorBoxes.some(b=>overlaps(box,b));
      });
      if(spot) {
        locatorBoxes.push([spot[0]-4,spot[1]-3,spot[0]+4,spot[1]+2]);
        if(Math.hypot(spot[0]-center[0],spot[1]-center[1])>1)line(center,spot,'note');
        text(code,spot,2.6,'locator',{anchor:'middle',mask:true});
      } else omittedLocators++;
    }
  });
  const mesh=geometry.basis==='actual_mesh_feature_edges; sampled_orthographic_visibility';
  const notes=[view==='plan'?`平面剖切标高 +${cutHeightLabel(geometry.cutHeight)} m`:view.startsWith('section_')?`${geometry.cutAxis?.toUpperCase()}=${geometry.cutAt?.toFixed(3)} m剖切 · 保留正向侧`:mesh?'实际网格正投影 · 消隐采样≤5mm':'正投影 · 已按实体表面消隐',
    '尺寸数值为毫米；标高为米。','组合外包包含间隔，不是单件下料尺寸。',mesh?'形体、字形来自网格；图像饰面未描线。':'目录及导入模型以包络表示，文字以外框表示。','未建模的节点和工艺不在自动标注范围。',
    ...(legend.length>maxRows?[`组合索引 ${maxRows}/${legend.length}，完整参数见工程。`]:[]),...(omittedLocators?[`过密索引省略${omittedLocators}处，参照组合表。`]:[])];
  notes.forEach((note,i)=>text(note,[316,222+i*5],2.2));sheet.notes=notes;
  const nameLines=Array.from(name).reduce((a,c,i)=>{const j=Math.floor(i/42);a[j]=(a[j]??'')+c;return a;},[]).slice(0,2);
  text('DSH / 设计图纸',[16,270],3.1,'frame');nameLines.forEach((value,i)=>text(value,[16,277+i*4.3],2.8,'frame'));
  line([204,260],[204,287]);line([310,260],[310,287]);line([363,260],[363,287]);
  text(DRAWING_LABELS[view],[210,272],4.2,'frame');text(`比例 1:${scale} · A3`,[210,282],2.6);
  text(draft?'待确认草案':`场景版本 v${revision}`,[316,271],2.7,'frame');text('尺寸来源：当前模型',[316,281],2.3);
  text(`A-${101+Object.keys(DRAWING_LABELS).indexOf(view)}`,[370,272],4.4,'frame');text('CAD / mm',[370,282],2.5);
  const bar=Math.min(5,Math.max(.1,Math.floor(70/factor)),Math.floor(width/2)||1),step=bar*factor/4;
  for(let i=0;i<4;i++)sheet.paths.push({rings:[[[316+i*step,207],[316+(i+1)*step,207],[316+(i+1)*step,209],[316+i*step,209]]],kind:'frame',fill:i%2?'#ffffff':'#20252a'});
  text('0',[316,216],2.1);text(`${bar} m`,[316+bar*factor,216],2.1,'note',{anchor:'end'});
  return sheet;
}
const cutHeightLabel=n=>n.toFixed(3);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
export const lineStyle=kind=>({color:ink[kind]??ink.frame,width:({wall:.5,solid:.3,model:.3,asset:.25,floor:.13,door:.22,window:.22,overhead:.13,extension:.12,dimension:.2,frame:.2,ground:.35,cut:.4})[kind]??.2});
/** Standalone vector output, with escaped user text; also used verbatim by the UI. */
export function sheetSvg(sheet) {
  const paths=sheet.paths.map(p=>`<path d="${p.rings.map(r=>r.map((v,i)=>`${i?'L':'M'}${v.join(',')}`).join('')+'Z').join('')}" fill="${p.fill??'none'}" fill-rule="evenodd" stroke="${lineStyle(p.kind).color}" stroke-width="${lineStyle(p.kind).width}"/>`).join('');
  const grouped=new Map();for(const l of sheet.lines){const key=l.kind+Boolean(l.dash);if(!grouped.has(key))grouped.set(key,[]);grouped.get(key).push(l);}
  const lines=[...grouped.values()].map(items=>{const l=items[0],style=lineStyle(l.kind);return `<path d="${items.map(e=>`M${e.a.join(',')}L${e.b.join(',')}`).join('')}" fill="none" stroke="${style.color}" stroke-width="${style.width}"${l.dash?' stroke-dasharray="2 1"':''}/>`;}).join('');
  const texts=sheet.texts.map(t=>`<text x="${t.p[0]}" y="${t.p[1]}" font-size="${t.size}" fill="${t.kind==='dimension'?'#20252a':t.kind==='locator'?'#234955':ink[t.kind]??ink.note}" text-anchor="${t.anchor??'start'}"${t.rotation?` transform="rotate(${t.rotation} ${t.p.join(' ')})"`:''}${t.mask?' stroke="white" stroke-width="1.4" stroke-linejoin="round" paint-order="stroke"':''}>${esc(t.value)}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="420mm" height="297mm" viewBox="0 0 420 297" role="img" aria-label="${esc(sheet.label+'，毫米标注，比例1:'+sheet.scale)}"><title>${esc(sheet.name+' · '+sheet.label)}</title><rect width="420" height="297" fill="white"/><g font-family="Arial, PingFang SC, sans-serif" stroke-linecap="round" stroke-linejoin="round">${paths}${lines}${texts}</g></svg>`;
}
