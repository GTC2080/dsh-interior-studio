/** Bounded parametric solids. Profiles and transforms are shared by CAD and Blender. */
import {polygonArea,pointInRing,simpleRing,ringsIntersect,wallPoints,wallLength} from './geometry.js';
import {readingOrientation} from './orientation.js';

const check=(ok,message)=>{if(!ok)throw new Error(message);};
const scalar=(value,name,min,max)=>{check(Number.isFinite(value)&&value>=min&&value<=max,`${name}须在 ${min}–${max} 之间`);return value;};
const vec=(value,name)=>{check(Array.isArray(value)&&value.length===3&&value.every(Number.isFinite),`${name}须为三个有限数值`);return [...value];};
const cross=(a,b)=>a[0]*b[1]-a[1]*b[0];
const eps=1e-6;

/** Fillet individual profile vertices in metres; zero radii preserve sharp corners. */
export function roundedProfile(input) {
  check(Array.isArray(input)&&input.length>=3&&input.length<=2048,'构件轮廓须有 3–2048 个点');
  const points=input.map(p=>{
    check(Array.isArray(p)&&(p.length===2||p.length===3)&&p.every(Number.isFinite),'轮廓点须为 [u,v] 或 [u,v,圆角半径]');
    check(p.slice(0,2).every(n=>Math.abs(n)<=1000),'轮廓坐标超出 ±1000m');
    scalar(p[2]??0,'圆角半径',0,100);return p.slice(0,2);
  });
  check(simpleRing(points)&&Math.abs(polygonArea(points))>1e-8,'构件轮廓自交或退化');
  const corners=points.map((p,i)=>{
    const a=points[(i+points.length-1)%points.length],b=points[(i+1)%points.length],r=input[i][2]??0;
    const la=Math.hypot(a[0]-p[0],a[1]-p[1]),lb=Math.hypot(b[0]-p[0],b[1]-p[1]);
    check(Math.min(la,lb)>eps,'构件轮廓含重复点');
    if(!r)return {distance:0,points:[p]};
    const u=a.map((n,k)=>(n-p[k])/la),v=b.map((n,k)=>(n-p[k])/lb),angle=Math.acos(Math.max(-1,Math.min(1,u[0]*v[0]+u[1]*v[1])));
    check(angle>1e-5&&angle<Math.PI-1e-5,'共线点不能指定圆角');
    const distance=r/Math.tan(angle/2),length=Math.hypot(u[0]+v[0],u[1]+v[1]);
    const center=p.map((n,k)=>n+(u[k]+v[k])/length*r/Math.sin(angle/2));
    const start=p.map((n,k)=>n+u[k]*distance-center[k]),end=p.map((n,k)=>n+v[k]*distance-center[k]);
    const begin=Math.atan2(start[1],start[0]),sweep=Math.atan2(cross(start,end),start[0]*end[0]+start[1]*end[1]);
    const count=Math.max(2,Math.ceil(Math.abs(sweep)/Math.min(Math.PI/24,2*Math.acos(Math.max(-1,1-.0002/r)))));
    check(count<=512,'圆角采样超过预算');
    return {distance,points:Array.from({length:count+1},(_,j)=>[center[0]+r*Math.cos(begin+sweep*j/count),center[1]+r*Math.sin(begin+sweep*j/count)])};
  });
  points.forEach((p,i)=>{
    const next=(i+1)%points.length,travel=corners[i].distance+corners[next].distance,edge=Math.hypot(p[0]-points[next][0],p[1]-points[next][1]);
    if(travel>=edge+eps) {
      const error=new Error(`轮廓边 ${i}–${next} 圆角半径过大，相邻圆角重叠`);
      Object.assign(error,{code:'fillet_overlap',path:`edge[${i}]`,details:{edgeLengthMetres:edge,requestedTangentTravelMetres:travel,adjacentRadiusScaleUpperBound:edge/travel}});throw error;
    }
  });
  const ring=[];
  for(const p of corners.flatMap(c=>c.points))if(!ring.length||Math.hypot(p[0]-ring.at(-1)[0],p[1]-ring.at(-1)[1])>1e-10)ring.push(p);
  if(ring.length>1&&Math.hypot(ring[0][0]-ring.at(-1)[0],ring[0][1]-ring.at(-1)[1])<=1e-10)ring.pop();
  check(ring.length<=2048&&simpleRing(ring),'圆角轮廓自交或采样超过 2048 点');return ring;
}

export function solidFromInput(row,id,origin) {
  check(row&&['box','cylinder','extrusion','text'].includes(row.shape),'构件 shape 须为 box/cylinder/extrusion/text');
  check(typeof row.key==='string'&&/^[A-Za-z][A-Za-z0-9_-]{0,49}$/.test(row.key),'构件编号须为字母开头、最多50字符');
  const label=row.label??row.key;check(typeof label==='string'&&label.length>0&&label.length<=100&&!/[\x00-\x1f]/.test(label),'构件名称无效');
  const position=vec(row.position,'构件原点');position.forEach(n=>scalar(n,'构件坐标',-1000,1000));
  let rotationEuler=vec(row.rotation??[0,0,0],'构件欧拉角').map(n=>scalar(n,'构件角度',-360,360)*Math.PI/180);
  let outline,holes=[],plane=row.plane??'xy',depth;
  if(row.shape==='box') {
    const w=scalar(row.width,'构件宽',.001,100),d=scalar(row.depth,'构件深',.001,100);depth=scalar(row.height,'构件高',.001,100);plane='xy';
    const r=scalar(row.cornerRadius??0,'平面圆角',0,Math.min(w,d)/2);
    outline=roundedProfile([[-w/2,-d/2,r],[w/2,-d/2,r],[w/2,d/2,r],[-w/2,d/2,r]]);
  } else if(row.shape==='cylinder') {
    const r=scalar(row.radius,'圆柱半径',.001,50);depth=scalar(row.height,'圆柱高',.001,100);plane='xy';
    const count=Math.max(64,4*Math.ceil(Math.PI/Math.acos(Math.max(-1,1-.0002/r))/4));
    check(count<=2048,'圆柱采样超过预算');outline=Array.from({length:count},(_,i)=>[r*Math.cos(i*Math.PI*2/count),r*Math.sin(i*Math.PI*2/count)]);
  } else if(row.shape==='text') {
    check(typeof row.text==='string'&&row.text.length>0&&row.text.length<=200&&!/[\x00-\x1f]/.test(row.text),'文字须为1–200个字符，不能含控制符');
    const w=scalar(row.width,'文字外框宽',.005,50),h=scalar(row.height,'文字外框高',.005,20);depth=scalar(row.depth??.01,'文字厚',.001,1);plane=row.plane??'xz';
    outline=[[0,0],[w,0],[w,h],[0,h]];
  } else {
    outline=roundedProfile(row.outline);check(Array.isArray(row.holes??[])&&(row.holes??[]).length<=32,'构件内孔最多32个');
    holes=(row.holes??[]).map(roundedProfile);depth=scalar(row.depth,'拉伸深度',.001,100);
  }
  check(['xy','xz','yz'].includes(plane),'轮廓平面须为 xy/xz/yz');
  let reading;
  if(row.reading!==undefined) {
    check(row.shape==='text'&&row.rotation===undefined,'reading只用于文字，不能同时手填rotation');
    ({rotationEuler,reading}=readingOrientation(plane,row.reading));
  }
  const o={id,type:'solid',shape:row.shape,label,position,rotationEuler,plane,outline,holes,depth,material:row.material??'white',
    ...(row.shape==='text'?{text:row.text,...(reading?{reading}:{})}:{}),...(row.assembly?{assembly:row.assembly}:{}),origin:{...origin,key:row.key}};
  if(['color','roughness','metallic','emission'].some(k=>row[k]!==undefined))o.finish={...(row.color!==undefined?{color:vec(row.color,'RGB颜色')}:{}),roughness:row.roughness??.6,metallic:row.metallic??0,emission:row.emission??0};
  validateSolid(o);return o;
}

export function validateSolid(o) {
  check(['box','cylinder','extrusion','text'].includes(o.shape)&&['xy','xz','yz'].includes(o.plane),'构件类型或平面无效');
  vec(o.position,'构件原点').forEach(n=>scalar(n,'构件原点',-1000,1000));vec(o.rotationEuler,'构件旋转').forEach(n=>scalar(n,'构件旋转弧度',-Math.PI*2,Math.PI*2));scalar(o.depth,'构件拉伸深度',.001,100);
  check(Array.isArray(o.holes)&&o.holes.length<=32,'构件内孔无效');
  for(const ring of [o.outline,...o.holes]) {
    check(Array.isArray(ring)&&ring.length>=3&&ring.length<=2048&&ring.every(p=>Array.isArray(p)&&p.length===2&&p.every(n=>Number.isFinite(n)&&Math.abs(n)<=1000)),'构件轮廓无效');
    check(simpleRing(ring)&&Math.abs(polygonArea(ring))>1e-8,'构件轮廓自交或退化');
  }
  for(const [i,hole] of o.holes.entries()) {
    check(hole.every(p=>pointInRing(p,o.outline))&&!ringsIntersect(hole,o.outline),'构件内孔越界或碰到外轮廓；敞口请画入外轮廓');
    check(o.holes.slice(i+1).every(other=>!ringsIntersect(hole,other)&&!pointInRing(hole[0],other)&&!pointInRing(other[0],hole)),'构件内孔重叠');
  }
  check(o.assembly===undefined||typeof o.assembly==='string'&&/^[A-Za-z][A-Za-z0-9_-]{0,49}$/.test(o.assembly),'组合编号无效');
  if(o.finish) {
    if(o.finish.color!==undefined)vec(o.finish.color,'RGB颜色').forEach(n=>scalar(n,'RGB颜色',0,1));
    scalar(o.finish.roughness,'粗糙度',.02,1);scalar(o.finish.metallic,'金属度',0,1);scalar(o.finish.emission,'发光强度',0,20);
  }
  if(o.shape==='text')check(typeof o.text==='string'&&o.text.length>0&&o.text.length<=200&&!/[\x00-\x1f]/.test(o.text),'文字无效');
  if(o.reading) {
    check(o.shape==='text','阅读方向只用于文字');
    const {rotationEuler}=readingOrientation(o.plane,o.reading);
    for(const axis of [[1,0,0],[0,1,0],[0,0,1]])check(Math.hypot(...rotate3(axis,o.rotationEuler).map((n,i)=>n-rotate3(axis,rotationEuler)[i]))<1e-6,'文字旋转与已声明阅读方向不一致，请重新计算');
  }
  return o;
}

export function rotate3(p,angles,inverse=false) {
  let out=[...p];
  for(const axis of inverse?[2,1,0]:[0,1,2]) {
    const a=angles[axis]*(inverse?-1:1),c=Math.cos(a),s=Math.sin(a),i=(axis+1)%3,j=(axis+2)%3,[x,y]=[out[i],out[j]];
    out[i]=x*c-y*s;out[j]=x*s+y*c;
  }
  return out;
}
const planePoint=(o,[u,v,n])=>o.plane==='xy'?[u,v,n]:o.plane==='xz'?[u,n,v]:[n,u,v];
export const solidWorld=(o,p)=>rotate3(planePoint(o,p),o.rotationEuler).map((n,i)=>n+o.position[i]);
function solidLocal(o,p) {
  const a=rotate3(p.map((n,i)=>n-o.position[i]),o.rotationEuler,true);
  return o.plane==='xy'?a:o.plane==='xz'?[a[0],a[2],a[1]]:[a[1],a[2],a[0]];
}
export const solidVertices=o=>[o.outline,...o.holes].flatMap(r=>r.flatMap(p=>[solidWorld(o,[...p,0]),solidWorld(o,[...p,o.depth])]));
export const solidBounds=o=>{const p=solidVertices(o);return [0,1].map(k=>[0,1,2].map(i=>Math[k?'max':'min'](...p.map(v=>v[i]))));};
export function solidEdges(o) {
  return [o.outline,...o.holes].flatMap(r=>r.flatMap((p,i)=>{
    const q=r[(i+1)%r.length];return [[p.concat(0),q.concat(0)],[p.concat(o.depth),q.concat(o.depth)],[p.concat(0),p.concat(o.depth)]].map(e=>e.map(v=>solidWorld(o,v)));
  }));
}
function boundaryDistance(p,ring) {
  return Math.min(...ring.map((a,i)=>{const b=ring[(i+1)%ring.length],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy)));return Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy);}));
}
/** Signed distance to a transformed prism; negative inside, positive outside. */
export function solidSurfaceDistance(o,worldPoint) {
  const p=solidLocal(o,worldPoint),rings=[o.outline,...o.holes];
  const edge=Math.min(...rings.map(r=>boundaryDistance(p,r)));
  const inside=pointInRing(p,o.outline)&&o.holes.every(h=>!pointInRing(p,h));
  const profile=edge<1e-10?0:inside?-edge:edge;
  const normal=Math.max(-p[2],p[2]-o.depth);
  return Math.hypot(Math.max(profile,0),Math.max(normal,0))+Math.min(Math.max(profile,normal),0);
}
function contains(o,p) {
  return p[2]>eps&&p[2]<o.depth-eps&&pointInRing(p,o.outline)&&boundaryDistance(p,o.outline)>eps&&o.holes.every(h=>!pointInRing(p,h)&&boundaryDistance(p,h)>eps);
}
function segmentPenetrates(o,a,b) {
  const p=solidLocal(o,a),q=solidLocal(o,b),d=q.map((n,i)=>n-p[i]),cuts=[0,1];
  if(Math.abs(d[2])>eps)for(const z of [0,o.depth])cuts.push((z-p[2])/d[2]);
  for(const ring of [o.outline,...o.holes])for(let i=0;i<ring.length;i++) {
    const u=ring[i],v=ring[(i+1)%ring.length],s=[v[0]-u[0],v[1]-u[1]],det=cross(d,s);
    if(Math.abs(det)<1e-12)continue;
    const diff=[u[0]-p[0],u[1]-p[1]],t=cross(diff,s)/det,r=cross(diff,d)/det;
    if(r>=0&&r<=1)cuts.push(t);
  }
  const sorted=cuts.filter(t=>t>=0&&t<=1).sort((a,b)=>a-b);
  return sorted.slice(1).some((t,i)=>t-sorted[i]>eps&&contains(o,p.map((n,k)=>n+d[k]*(t+sorted[i])/2)));
}
export function solidsOverlap(a,b) {
  const [lo,hi]=solidBounds(a),[low,high]=solidBounds(b);
  if(lo.some((n,i)=>hi[i]<=low[i]+eps||high[i]<=n+eps))return false;
  const probes=o=>o.outline.map((p,i)=>{
    const q=o.outline[(i+1)%o.outline.length],dx=q[0]-p[0],dy=q[1]-p[1],sign=Math.sign(polygonArea(o.outline)),length=Math.hypot(dx,dy);
    return [(p[0]+q[0])/2-sign*dy/length*eps*4,(p[1]+q[1])/2+sign*dx/length*eps*4,o.depth/2];
  }).filter(p=>contains(o,p)).map(p=>solidWorld(o,p));
  return solidVertices(a).some(p=>contains(b,solidLocal(b,p)))||solidVertices(b).some(p=>contains(a,solidLocal(a,p)))
    ||probes(a).some(p=>contains(b,solidLocal(b,p)))||probes(b).some(p=>contains(a,solidLocal(a,p)))
    ||solidEdges(a).some(([p,q])=>segmentPenetrates(b,p,q))||solidEdges(b).some(([p,q])=>segmentPenetrates(a,p,q));
}
export function assetSolid(o) {
  const [w,d,h]=o.size;return {plane:'xy',position:[o.position[0],o.position[1],o.position[2]-h/2],rotationEuler:[0,0,o.rotation??0],
    outline:[[-w/2,-d/2],[w/2,-d/2],[w/2,d/2],[-w/2,d/2]],holes:[],depth:h};
}
/** Wall prisms exclude structural door/window/passage voids, including curved paths. */
export function wallSolids(wall) {
  const path=wallPoints(wall),total=wallLength(wall),parts=[];let offset=0;
  for(let i=1;i<path.length;i++) {
    const a=path[i-1],b=path[i],length=Math.hypot(b[0]-a[0],b[1]-a[1]),along=wall.arc?total/(path.length-1):length,ratio=length/along;
    let cursor=0;
    const add=(lo,hi,low,high)=>{if(hi-lo>eps&&high-low>eps)parts.push({plane:'xy',outline:[[lo,-wall.thickness/2],[hi,-wall.thickness/2],[hi,wall.thickness/2],[lo,wall.thickness/2]],holes:[],depth:high-low,position:[...a,low],rotationEuler:[0,0,Math.atan2(b[1]-a[1],b[0]-a[0])]});};
    const openings=wall.openings.flatMap(p=>p.wrap?[p,{...p,start:p.start-total}]:[p]).sort((a,b)=>a.start-b.start);
    for(const opening of openings) {
      const lo=Math.max(0,(opening.start-offset)*ratio),hi=Math.min(length,(opening.start+opening.width-offset)*ratio);
      if(hi<=lo)continue;
      add(cursor,lo,0,wall.height);add(lo,hi,0,opening.sill);add(lo,hi,opening.top,wall.height);cursor=Math.max(cursor,hi);
    }
    add(cursor,length,0,wall.height);offset+=along;
  }
  return parts;
}
/** Derived dimensions and explicit assembly intersections; never claim a whole scene passed. */
export function reviewSolids(scene) {
  const solids=scene.objects.filter(o=>o.type==='solid'),issues=[],intersections=[];
  for(let i=0;i<solids.length;i++)for(let j=i+1;j<solids.length;j++) {
    const a=solids[i],b=solids[j];if(!solidsOverlap(a,b))continue;
    const joined=!!a.assembly&&a.assembly===b.assembly,item={objectIds:[a.id,b.id],keys:[a.origin.key,b.origin.key],labels:[a.label,b.label],declaredAssembly:joined?a.assembly:null};
    intersections.push(item);if(!joined)issues.push({code:'component_intersection',...item,message:`构件 ${a.label} (${a.origin.key}) 与 ${b.label} (${b.origin.key}) 相交；请修正或明确组合关系。`});
  }
  const walls=scene.objects.filter(o=>o.type==='wall').map(o=>({object:o,parts:wallSolids(o)}));
  for(const solid of solids)for(const {object:wall,parts} of walls)if(parts.some(p=>solidsOverlap(solid,p)))issues.push({code:'component_wall_intersection',objectIds:[solid.id,wall.id],message:`构件 ${solid.label} (${solid.origin.key}) 与墙 ${wall.label} (${wall.origin?.key??wall.id}) 相交。`});
  return {basis:'extruded_profiles_and_3d_transforms',scope:'component/component and component/wall prisms; text uses rectangular envelopes; catalog placement checked separately',status:'checked',checked:solids.length,items:solids.map(o=>{
    const bounds=solidBounds(o);return {objectId:o.id,key:o.origin.key,label:o.label,shape:o.shape,plane:o.plane,bounds,dimensions:bounds[1].map((n,i)=>n-bounds[0][i]),depth:o.depth,
      profileArea:Math.abs(polygonArea(o.outline))-o.holes.reduce((sum,h)=>sum+Math.abs(polygonArea(h)),0),...(o.shape==='text'?{collisionBasis:'text_envelope'}:{})};
  }),intersections,issues};
}
