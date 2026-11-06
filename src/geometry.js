/** Metre-based planar geometry for scene validation and furniture placement. */
export const wallPoints = wall => wall.path ?? [wall.a, wall.b];
export const wallLength = wall => wall.arc ? wall.arc.radius*wall.arc.sweep : wallPoints(wall).slice(1)
  .reduce((sum,p,i)=>sum+Math.hypot(p[0]-wallPoints(wall)[i][0],p[1]-wallPoints(wall)[i][1]),0);

export function pointAt(wall,distance) {
  if(wall.arc) {const a=wall.arc,angle=a.start+distance/a.radius;return [a.center[0]+a.radius*Math.cos(angle),a.center[1]+a.radius*Math.sin(angle)];}
  const points=wallPoints(wall);let cursor=0;
  for(let i=1;i<points.length;i++) {const a=points[i-1],b=points[i],length=Math.hypot(b[0]-a[0],b[1]-a[1]);
    if(distance<=cursor+length+1e-8){const t=Math.max(0,distance-cursor)/length;return [a[0]+t*(b[0]-a[0]),a[1]+t*(b[1]-a[1])];}cursor+=length;}
  return points.at(-1);
}

export function arcPoints(arc) {
  const step=Math.min(Math.PI/36,2*Math.acos(Math.max(-1,1-.001/arc.radius)));
  const count=Math.max(2,Math.ceil(arc.sweep/Math.max(step,1e-6)));
  if(count>2048)throw new Error('曲线细分超过当前预算，请拆分图纸');
  return Array.from({length:count+1},(_,i)=>[arc.center[0]+arc.radius*Math.cos(arc.start+arc.sweep*i/count),
    arc.center[1]+arc.radius*Math.sin(arc.start+arc.sweep*i/count)]);
}

export function polygonArea(points) {
  const [x,y]=points[0];
  return points.reduce((sum,a,i)=>{const b=points[(i+1)%points.length];return sum+(a[0]-x)*(b[1]-y)-(b[0]-x)*(a[1]-y);},0)/2;
}

function orientation(a,b,c) {return (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);}
function onSegment(p,a,b) {return Math.abs(orientation(a,b,p))<1e-8 && p[0]>=Math.min(a[0],b[0])-1e-8
  && p[0]<=Math.max(a[0],b[0])+1e-8 && p[1]>=Math.min(a[1],b[1])-1e-8 && p[1]<=Math.max(a[1],b[1])+1e-8;}

export function segmentsIntersect(a,b,c,d) {
  if(Math.max(a[0],b[0])<Math.min(c[0],d[0])-1e-8 || Math.max(c[0],d[0])<Math.min(a[0],b[0])-1e-8
    || Math.max(a[1],b[1])<Math.min(c[1],d[1])-1e-8 || Math.max(c[1],d[1])<Math.min(a[1],b[1])-1e-8)return false;
  const ac=orientation(a,b,c),ad=orientation(a,b,d),ca=orientation(c,d,a),cb=orientation(c,d,b);
  return ac*ad<0 && ca*cb<0 || onSegment(c,a,b) || onSegment(d,a,b) || onSegment(a,c,d) || onSegment(b,c,d);
}

export function pointInRing(point,ring) {
  let inside=false;
  for(let i=0,j=ring.length-1;i<ring.length;j=i++) {
    const a=ring[j],b=ring[i];if(onSegment(point,a,b))return true;
    if((a[1]>point[1])!==(b[1]>point[1]) && point[0]<(b[0]-a[0])*(point[1]-a[1])/(b[1]-a[1])+a[0])inside=!inside;
  }
  return inside;
}

export function simpleRing(points) {
  for(let i=0;i<points.length;i++) {
    const a=points[i],b=points[(i+1)%points.length];
    if(Math.hypot(b[0]-a[0],b[1]-a[1])<1e-6)return false;
    for(let j=i+2;j<points.length;j++) {
      if(i===0 && j===points.length-1)continue;
      if(segmentsIntersect(a,b,points[j],points[(j+1)%points.length]))return false;
    }
  }
  return true;
}

export function ringsIntersect(a,b) {
  return a.some((p,i)=>b.some((q,j)=>segmentsIntersect(p,a[(i+1)%a.length],q,b[(j+1)%b.length])));
}

export function furnitureFootprint(object) {
  const [x,y]=object.position,[w,d]=object.size,angle=object.rotation??0;
  return [[-w/2,-d/2],[w/2,-d/2],[w/2,d/2],[-w/2,d/2]].map(([a,b])=>[
    x+a*Math.cos(angle)-b*Math.sin(angle),y+a*Math.sin(angle)+b*Math.cos(angle)]);
}

/** Use the same hinge and opening direction as the exported CAD door symbol. */
export function doorClearance(wall,door) {
  const a=pointAt(wall,door.start),b=pointAt(wall,door.start+door.width);
  const length=Math.hypot(b[0]-a[0],b[1]-a[1]),angle=Math.atan2(b[1]-a[1],b[0]-a[0]);
  const direction=door.swing==='right'?-1:1,dx=(b[0]-a[0])/length,dy=(b[1]-a[1])/length;
  const approach=wall.thickness/2+.45;
  return [[a,...Array.from({length:37},(_,i)=>{const t=angle+direction*Math.PI/2*i/36;return [a[0]+length*Math.cos(t),a[1]+length*Math.sin(t)];})],
    [[a[0]-dy*approach,a[1]+dx*approach],[b[0]-dy*approach,b[1]+dx*approach],
      [b[0]+dy*approach,b[1]-dx*approach],[a[0]+dy*approach,a[1]-dx*approach]]];
}

export function furnitureBlocksDoor(object,walls) {
  const corners=furnitureFootprint(object);
  return walls.some(wall=>wall.openings.some(door=>['door','passage'].includes(door.kind)&&object.position[2]-object.size[2]/2<door.top&&object.position[2]+object.size[2]/2>door.sill&&doorClearance(wall,door).filter((_,i)=>i>0||door.kind==='door'&&['left','right'].includes(door.swing)).some(area=>
    ringsIntersect(corners,area)||corners.some(p=>pointInRing(p,area))||area.some(p=>pointInRing(p,corners)))));
}

export function furnitureFitsFloor(object,floor) {
  const corners=furnitureFootprint(object);
  return corners.every(p=>pointInRing(p,floor.polygon)) && !ringsIntersect(corners,floor.polygon)
    && (floor.holes??[]).every(hole=>!corners.some(p=>pointInRing(p,hole)) && !hole.some(p=>pointInRing(p,corners)) && !ringsIntersect(corners,hole));
}
