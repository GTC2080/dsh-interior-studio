/** Conservative support screening and explicit continuous walking corridors. */
import {check} from './scene.js';
import {assetSolid,solidBounds,solidsOverlap,wallSolids} from './solids.js';
import {modelPrism} from './refinement.js';

const union=boxes=>[0,1].map(k=>[0,1,2].map(i=>Math[k?'max':'min'](...boxes.map(b=>b[k][i]))));
const gap=(a,b)=>Math.hypot(...[0,1,2].map(i=>Math.max(0,a[0][i]-b[1][i],b[0][i]-a[1][i])));
const volumes=o=>o.type==='solid'?[o]:o.type==='asset'?[assetSolid(o)]:o.type==='model'?[modelPrism(o)]:o.type==='wall'?wallSolids(o):[];
const identity=o=>({id:o.id,key:o.origin?.key??o.id,label:o.label??o.id});

/** Absence of even envelope connectivity proves a modeled support is missing; connectivity is not proof of support. */
export function supportScreen(scene) {
  const nodes=scene.objects.map(o=>({o,boxes:volumes(o).map(solidBounds)})).filter(n=>n.boxes.length);
  const boxes=nodes.map(n=>union(n.boxes)),seen=new Set(),groups=[];
  for(let start=0;start<nodes.length;start++) {
    if(seen.has(start))continue;
    const cluster=[start];seen.add(start);
    for(let at=0;at<cluster.length;at++)for(let j=0;j<nodes.length;j++) {
      if(!seen.has(j)&&gap(boxes[cluster[at]],boxes[j])<=.001){seen.add(j);cluster.push(j);}
    }
    // Ground is a disclosed screening assumption; no connected group receives a physical pass.
    if(!cluster.some(i=>boxes[i][0][2]<=.001&&boxes[i][1][2]>=-.001))groups.push(cluster);
  }
  return {basis:'possible_world_envelope_connectivity_to_z0; not load capacity or exact contact',
    checked:nodes.length,status:groups.length?'disconnected':'not_proven',disconnectedGroups:groups.slice(0,50).map(g=>({
      objects:g.slice(0,50).map(i=>identity(nodes[i].o)),bounds:union(g.map(i=>boxes[i])),truncated:g.length>50,
    })),truncated:groups.length>50,
    statement:'未连通组缺少已建模的地面连接路径；外包连通不证明真实接触、固定或承载。地面基准假定为Z=0，抬升场地须另核实际支承。'};
}

/** Sweep a declared corridor through actual parametric prisms and conservative imported/catalog envelopes. */
export function reviewCirculation(scene,routes=[]) {
  check(Array.isArray(routes)&&routes.length<=8,'连续通路检查最多8条');
  const items=scene.objects.map(o=>({o,prisms:volumes(o)})).filter(n=>n.prisms.length);
  const results=routes.map(row=>{
    check(typeof row.id==='string'&&row.id.length>0&&row.id.length<=60&&!/[\x00-\x1f]/.test(row.id),'通路编号无效');
    check(typeof row.source==='string'&&row.source.length>0&&row.source.length<=200&&!/[\x00-\x1f]/.test(row.source),'通路来源无效');
    check(['user_request','user_confirmed','design_assumption'].includes(row.basis),'通路依据无效');
    check(Array.isArray(row.points)&&row.points.length>=2&&row.points.length<=32&&row.points.every(p=>Array.isArray(p)&&p.length===2&&p.every(v=>Number.isFinite(v)&&Math.abs(v)<=1000)),'通路须为2–32个米制XY点');
    check(Number.isFinite(row.width)&&row.width>=.3&&row.width<=5,'通路净宽超出范围');
    check(Number.isFinite(row.height)&&row.height>=.5&&row.height<=4,'通路净高超出范围');
    check(Number.isFinite(row.baseZ)&&Math.abs(row.baseZ)<=100,'通路地面标高无效');
    const probes=[],r=row.width/2,base=row.baseZ+.001,height=row.height-.001;
    for(let i=0;i<row.points.length;i++) {
      const p=row.points[i];
      probes.push(assetSolid({position:[...p,base+height/2],size:[row.width,row.width,height],rotation:0}));
      if(!i)continue;
      const a=row.points[i-1],dx=p[0]-a[0],dy=p[1]-a[1],length=Math.hypot(dx,dy);
      check(length>.0001,'通路包含重复点');
      probes.push(assetSolid({position:[(a[0]+p[0])/2,(a[1]+p[1])/2,base+height/2],size:[length,2*r,height],rotation:Math.atan2(dy,dx)}));
    }
    const hits=items.filter(n=>n.prisms.some(p=>probes.some(test=>solidsOverlap(p,test))));
    return {id:row.id,source:row.source,basis:row.basis,width:row.width,height:row.height,baseZ:row.baseZ,points:row.points,
      status:hits.length?'blocked':'clear',blockers:hits.slice(0,50).map(n=>({...identity(n.o),envelope:n.o.type==='model'||n.o.type==='asset'||n.o.shape==='text'})),truncated:hits.length>50};
  });
  check(new Set(results.map(r=>r.id)).size===results.length,'通路编号重复');
  return {basis:'declared swept rectangular corridors with square turn/end regions; conservative for catalog/imported envelopes',
    coverage:routes.length?'declared_routes_only':'not_requested',routes:results,
    statement:'只检查列出的连续体积，不自动寻找最优路径、不证明地面可承载或门已打开，也不是法规、无障碍或消防认证。'};
}
