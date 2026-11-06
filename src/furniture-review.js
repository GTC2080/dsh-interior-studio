/** Explicit asset axes and scene relations; no screenshot or inferred image coordinates. */
import {FURNITURE} from './catalog.js';
import {pointInRing,wallPoints} from './geometry.js';
import {solidBounds} from './solids.js';

const rotate=(v,a)=>[v[0]*Math.cos(a)-v[1]*Math.sin(a),v[0]*Math.sin(a)+v[1]*Math.cos(a)];
const degrees=a=>((a*180/Math.PI)%360+360)%360;
const round=n=>Math.round(n*1e5)/1e5;
const cross=(a,b)=>a[0]*b[1]-a[1]*b[0];

function rayBox(origin,direction,target) {
  const a=-(target.rotation??0),p=rotate([origin[0]-target.position[0],origin[1]-target.position[1]],a),d=rotate(direction,a);
  let near=0,far=Infinity;
  for(let i=0;i<2;i++) {
    const half=target.size[i]/2;
    if(Math.abs(d[i])<1e-8){if(Math.abs(p[i])>half)return null;continue;}
    const x=(-half-p[i])/d[i],y=(half-p[i])/d[i];near=Math.max(near,Math.min(x,y));far=Math.min(far,Math.max(x,y));
    if(near>far)return null;
  }
  return far>=0?near:null;
}

function headWall(scene,object,angle) {
  const back=rotate(FURNITURE[object.asset].orientation.back,angle);
  const head=object.position.slice(0,2).map((v,i)=>v+back[i]*object.size[1]/2);let best=null;
  for(const wall of scene.objects.filter(o=>o.type==='wall')) {
    const points=wallPoints(wall);
    for(let i=1;i<points.length;i++) {
      const a=points[i-1],b=points[i],segment=[b[0]-a[0],b[1]-a[1]],length=Math.hypot(...segment),denom=cross(back,segment);
      const alignment=Math.abs(denom)/length;if(alignment<.9)continue;
      const delta=[a[0]-head[0],a[1]-head[1]],distance=cross(delta,segment)/denom,along=cross(delta,back)/denom;
      if(distance<0||along<0||along>1)continue;
      const gap=Math.max(0,distance-wall.thickness/2/alignment);
      if(!best||gap<best.gap)best={wallId:wall.id,gap,headPoint:head};
    }
  }
  return best;
}

export function reviewFurniture(scene) {
  const report={basis:'declared_scene_and_catalog_axes',checked:0,items:[],issues:[]};if(!scene)return report;
  const assets=scene.objects.filter(o=>o.type==='asset');
  const roomOf=o=>scene.objects.find(f=>f.type==='floor'&&(f.polygon
    ?pointInRing(o.position,f.polygon)&&!(f.holes??[]).some(h=>pointInRing(o.position,h))
    :o.position[0]>=0&&o.position[0]<=f.width&&o.position[1]>=0&&o.position[1]<=f.depth))?.id;
  for(const object of assets) {
    const spec=FURNITURE[object.asset],axis=spec?.orientation;if(!axis)continue;
    const angle=object.rotation??0,front=rotate(axis.front,angle),item={objectId:object.id,asset:object.asset,label:object.label,
      rotationDegrees:round(degrees(angle)),frontWorld:front.map(round),meaning:axis.meaning,status:'not_evaluated'};
    report.items.push(item);
    if(object.asset==='bed'&&!object.faceTarget) {
      const current=headWall(scene,object,angle);item.relation='head_to_wall';item.wallGapMetres=current?round(current.gap):null;
      item.headPoint=current?.headPoint.map(round)??null;item.targetId=current?.wallId??null;report.checked++;
      if(current&&current.gap<=.2){item.status='pass';continue;}
      const choices=[0,Math.PI/2,Math.PI,Math.PI*1.5].map(a=>({angle:a,wall:headWall(scene,object,a)})).filter(x=>x.wall);
      const best=choices.sort((a,b)=>a.wall.gap-b.wall.gap)[0];item.status='review';
      const suggested=best&&best.wall.gap<=.2?round(degrees(best.angle)):null;
      report.issues.push({code:'bed_head_away_from_wall',objectId:object.id,targetId:best?.wall.wallId??null,suggestedRotationDegrees:suggested,
        message:`${object.label}的床头未靠近墙面${suggested===null?'':`，可尝试旋转到 ${suggested}° 后重新检查碰撞`}；独立摆放须明确确认。`});
      continue;
    }
    const kinds=object.asset==='chair'?['table','desk']:object.asset==='sofa'?['coffee-table']:[];
    const room=roomOf(object);if(room===undefined)continue;
    // ponytail: nearest same-room target is a review suggestion; explicit relationships are needed for multi-table seating plans.
    const explicit=object.faceTarget?scene.objects.find(o=>o.origin?.key===object.faceTarget):null;
    const declaredTarget=explicit?.type==='solid'?(()=>{const [lo,hi]=solidBounds(explicit);return {...explicit,position:hi.map((n,i)=>(n+lo[i])/2),size:hi.map((n,i)=>n-lo[i]),rotation:0};})():explicit;
    const targets=declaredTarget?[{object:declaredTarget}]:assets.filter(a=>kinds.includes(a.asset)&&roomOf(a)===room).map(a=>({object:a,distance:Math.hypot(a.position[0]-object.position[0],a.position[1]-object.position[1])})).filter(x=>x.distance<4).sort((a,b)=>a.distance-b.distance);
    if(!targets.length)continue;
    const target=targets[0].object;report.checked++;item.relation=object.asset==='chair'?'face_table':'face_coffee_table';item.targetId=target.id;
    if(declaredTarget)item.relation='face_declared_target';
    item.targetSource=declaredTarget?'explicit_design_relationship':'nearest_compatible_object_in_same_room';const hit=rayBox(object.position,front,target);
    if(hit!==null&&hit<4){item.status='pass';item.frontRayDistanceMetres=round(hit);continue;}
    const base=target.rotation??0,candidates=[base,base+Math.PI/2,base+Math.PI,base+Math.PI*1.5];
    const aligned=candidates.find(a=>{const d=rayBox(object.position,rotate(axis.front,a),target);return d!==null&&d<4;});
    const suggested=round(degrees(aligned??Math.atan2(target.position[1]-object.position[1],target.position[0]-object.position[0])-Math.atan2(axis.front[1],axis.front[0])));
    item.status='review';report.issues.push({code:'furniture_faces_away',objectId:object.id,targetId:target.id,suggestedRotationDegrees:suggested,
      message:`${object.label}的正面未朝向${target.label}（当前 ${item.rotationDegrees}°），可尝试 ${suggested}° 后重新检查碰撞。`});
  }
  return report;
}
