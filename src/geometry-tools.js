/** Bounded, metre-based geometry calculations shared by the model tool and CAD validation. */
import {inflatePathsD,JoinType,EndType} from '../lib/geometry-kernel.js';
import {polygonArea,pointInRing,simpleRing} from './geometry.js';
import {roundedProfile,validateSolid} from './solids.js';
import {readingOrientation} from './orientation.js';

const fail=(code,path,message,details)=>{const error=new Error(message);Object.assign(error,{code,path,...(details?{details}:{})});throw error;};
const requireValue=(ok,code,path,message)=>{if(!ok)fail(code,path,message);};
const finite=(v,path,min=-1000,max=1000)=>{
  requireValue(Number.isFinite(v)&&v>=min&&v<=max,'out_of_range',path,`${path} 须在 ${min}–${max} 之间`);return v;
};
const scaleFor=unit=>{requireValue(['m','mm','cm'].includes(unit),'invalid_unit','unit','单位须为 m/mm/cm');return {m:1,mm:.001,cm:.01}[unit];};
const scaled=(v,scale,path,min=-1000,max=1000)=>{
  requireValue(typeof v==='number','invalid_number',path,`${path} 须为数值`);return finite(v*scale,path,min,max);
};
const length=(a,b)=>Math.hypot(...a.map((v,i)=>v-b[i]));

function ringFromInput(points,scale,path,radius) {
  requireValue(Array.isArray(points)&&points.length>=3&&points.length<=2048,'invalid_profile',path,'闭合轮廓需3–2048点，不重复首点');
  const ring=points.map((p,i)=>{
    requireValue(Array.isArray(p)&&[2,3].includes(p.length),'invalid_point',`${path}[${i}]`,'轮廓点须为[x,y]或[x,y,圆角半径]');
    return p.map((v,j)=>scaled(v,scale,`${path}[${i}][${j}]`,j===2?0:-1000,j===2?100:1000));
  });
  if(radius!==undefined)for(const p of ring)p[2]=scaled(radius,scale,'radius',0,100);
  try{return roundedProfile(ring);}
  catch(error){fail(error.code??'invalid_profile',error.path?path+'.'+error.path:path,error.message,error.details);}
}

/** Reject crossed boundaries and intersecting holes using the same checks as parametric solids. */
export function validateProfile(outline,holes=[]) {
  requireValue(outline.length+holes.reduce((n,h)=>n+h.length,0)<=24000,'profile_budget','outline','全部轮廓采样点不能超过24000');
  validateSolid({shape:'extrusion',plane:'xy',position:[0,0,0],rotationEuler:[0,0,0],outline,holes,depth:1});
  return {area:Math.abs(polygonArea(outline))-holes.reduce((n,h)=>n+Math.abs(polygonArea(h)),0),
    perimeter:[outline,...holes].reduce((n,r)=>n+r.reduce((s,p,i)=>s+length(p,r[(i+1)%r.length]),0),0),
    bounds:[0,1].map(axis=>[Math.min(...outline.map(p=>p[axis])),Math.max(...outline.map(p=>p[axis]))]),
    samples:outline.length+holes.reduce((n,h)=>n+h.length,0)};
}

function profile(input,scale) {
  requireValue(Array.isArray(input.outline)&&Array.isArray(input.holes??[])&&input.outline.length+(input.holes??[]).reduce((n,h)=>n+(Array.isArray(h)?h.length:24001),0)<=24000,'profile_budget','outline','轮廓输入缺失或超过24000点预算');
  const outline=ringFromInput(input.outline,scale,'outline',input.operation==='fillet'?input.radius:undefined);
  requireValue(Array.isArray(input.holes??[])&&(input.holes??[]).length<=32,'invalid_holes','holes','最多32个内孔');
  const holes=(input.holes??[]).map((h,i)=>ringFromInput(h,scale,`holes[${i}]`));
  return {outline,holes,...validateProfile(outline,holes)};
}

function offsetProfile(input,scale) {
  const source=profile(input,scale),distance=scaled(input.distance,scale,'distance',-100,100);
  requireValue(distance!==0,'zero_offset','distance','偏移距离不能为0；正值扩展实物，负值收缩实物');
  const join={miter:JoinType.Miter,round:JoinType.Round,bevel:JoinType.Bevel}[input.join??'miter'];
  requireValue(join!==undefined,'invalid_join','join','接角须为miter/round/bevel');
  const paths=[source.outline,...source.holes].map((ring,i)=>{
    const oriented=(polygonArea(ring)>0)===(i===0)?ring:[...ring].reverse();
    return oriented.map(([x,y])=>({x,y}));
  });
  const result=inflatePathsD(paths,distance,join,EndType.Polygon,2,6,.0002);
  requireValue(result.length>0&&result.length<=64,'offset_collapsed','distance','偏移后轮廓消失或分裂超过64个边界，请调整厚度或拆分');
  const rings=result.map(r=>r.map(p=>[p.x,p.y]));
  requireValue(rings.reduce((n,r)=>n+r.length,0)<=24000&&rings.every(r=>r.length<=2048&&simpleRing(r)),'offset_budget','outline','偏移轮廓自交或超过采样预算');
  // Nested boundaries are assigned by containment, independent of library output order.
  const nodes=rings.map(r=>({ring:r,area:Math.abs(polygonArea(r))})).sort((a,b)=>b.area-a.area);
  const profiles=[];
  for(const n of nodes) {
    const containers=nodes.filter(a=>a.area>n.area&&pointInRing(n.ring[0],a.ring));
    if(containers.length%2===0)profiles.push({outline:n.ring,holes:[]});
    else {
      const owner=profiles.filter(p=>pointInRing(n.ring[0],p.outline)).sort((a,b)=>Math.abs(polygonArea(a.outline))-Math.abs(polygonArea(b.outline)))[0];
      requireValue(owner,'offset_topology','outline','偏移后的孔洞归属不明确');owner.holes.push(n.ring);
    }
  }
  profiles.forEach(p=>Object.assign(p,validateProfile(p.outline,p.holes)));
  return {profiles,...(profiles.length===1?profiles[0]:{}),distance,
    topologyChanged:profiles.length!==1||profiles[0].holes.length!==source.holes.length,
    coordinateGridMetres:.000001,arcChordErrorMetres:join===JoinType.Round?.0002:0,
    instruction:'使用全部profiles；分裂、孔洞消失须核对，不能静默只保留第一块。输出为米，可用于studio_draw.components的outline/holes。'};
}

function arc(input,scale) {
  const radius=scaled(input.radius,scale,'radius',.000001,1000);
  const tolerance=scaled(input.tolerance??(.0002/scale),scale,'tolerance',.000001,.01);
  const center=input.center;
  requireValue(Array.isArray(center)&&center.length===2,'invalid_center','center','圆心须为[x,y]');
  const origin=center.map((v,i)=>scaled(v,scale,`center[${i}]`));
  const start=finite(input.startDegrees??0,'startDegrees',-360,360)*Math.PI/180;
  const sweep=finite(input.sweepDegrees,'sweepDegrees',-360,360)*Math.PI/180;
  requireValue(Math.abs(sweep)>1e-10,'zero_sweep','sweepDegrees','圆弧转角不能为0');
  const step=2*Math.acos(Math.max(-1,Math.min(1,1-tolerance/radius)));
  const count=Math.max(2,Math.ceil(Math.abs(sweep)/Math.min(Math.PI/24,step)));
  requireValue(Number.isFinite(count)&&count<=2047,'arc_budget','tolerance','圆弧超过2048点预算，请调整误差或拆分');
  const points=Array.from({length:count+1},(_,i)=>origin.map((v,axis)=>v+radius*(axis?Math.sin(start+sweep*i/count):Math.cos(start+sweep*i/count))));
  requireValue(points.every(p=>p.every(v=>Math.abs(v)<=1000)),'out_of_range','arc','圆弧超出±1000m坐标范围');
  const closed=Math.abs(Math.abs(sweep)-2*Math.PI)<1e-9;
  return {center:origin,radius,startDegrees:input.startDegrees??0,sweepDegrees:input.sweepDegrees,points,
    ...(closed?{outline:points.slice(0,-1)}:{}),closed,length:radius*Math.abs(sweep),curvaturePerMetre:1/radius,
    arcChordErrorMetres:radius*(1-Math.cos(Math.abs(sweep)/count/2)),
    instruction:closed?'整圆points包含重复末端点用于路径测量；提交CAD或作为孔洞必须使用outline，不用points。':'这是开圆弧。曲墙使用wallArc；拉伸需另行构成闭合外轮廓，offset只接受闭合区域。',
    ...(sweep>0?{wallArc:{center:origin,radius,startDegrees:input.startDegrees??0,sweepDegrees:input.sweepDegrees}}:{})};
}

function measure(input,scale) {
  requireValue(Array.isArray(input.points)&&input.points.length>=2&&input.points.length<=2048,'invalid_points','points','测量需2–2048个同维度点');
  const dims=input.points[0]?.length;
  requireValue([2,3].includes(dims),'invalid_point','points','坐标须为二维或三维');
  const points=input.points.map((p,i)=>{
    requireValue(Array.isArray(p)&&p.length===dims,'invalid_point',`points[${i}]`,'测量坐标维度须一致');
    return p.map((v,j)=>scaled(v,scale,`points[${i}][${j}]`));
  });
  const low=points[0].map((_,axis)=>Math.min(...points.map(p=>p[axis]))),high=low.map((_,axis)=>Math.max(...points.map(p=>p[axis])));
  return {bounds:[low,high],size:low.map((v,i)=>high[i]-v),distance:length(points[0],points.at(-1)),
    pathLength:points.slice(1).reduce((sum,p,i)=>sum+length(p,points[i]),0),
    basis:'provided points in world/local coordinates chosen by caller; not a complete scene envelope'};
}

/** Pure calculation: no project reads, writes, scripts, network or confirmation. */
export function calculateGeometry(input) {
  try {
    requireValue(input&&typeof input==='object','invalid_input','input','几何输入须为对象');
    const scale=scaleFor(input.unit??'m');
    let result;
    if(['fillet','check_profile'].includes(input.operation))result={...profile(input,scale),arcChordErrorMetres:.0002};
    else if(input.operation==='offset')result=offsetProfile(input,scale);
    else if(input.operation==='arc')result=arc(input,scale);
    else if(input.operation==='measure')result=measure(input,scale);
    else if(input.operation==='orientation')result=readingOrientation(input.plane??'xz',{towards:input.towards,up:input.up});
    else fail('unknown_operation','operation','操作须为fillet/arc/check_profile/offset/measure');
    return {valid:true,operation:input.operation,unit:'m',...result};
  } catch(error) {
    return {valid:false,operation:input?.operation,unit:'m',errors:[{code:error.code??'invalid_geometry',path:error.path??'geometry',message:error.message,...(error.details?{details:error.details}:{})}],
      instruction:'未生成可提交几何；修正原因后重算。不能降低客户尺寸要求、静默改半径或丢弃失败轮廓。'};
  }
}
