/** Right-handed text frames keep glyphs readable from the declared audience direction. */
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const unit=(v,name)=>{
  if(!Array.isArray(v)||v.length!==3||!v.every(Number.isFinite)||Math.hypot(...v)<1e-8)throw Error(name+'须为非零XYZ方向');
  const length=Math.hypot(...v);return v.map(n=>n/length);
};
export function readingOrientation(plane,reading) {
  if(!['xy','xz','yz'].includes(plane)||!reading||typeof reading!=='object')throw Error('请指定文字平面和阅读方向');
  const towards=unit(reading.towards,'朝读者方向'),hint=unit(reading.up??(Math.abs(towards[2])>.999?[0,1,0]:[0,0,1]),'文字上方');
  const right=unit(cross(hint,towards),'阅读方向与上方不能平行'),up=cross(towards,right);
  const columns=plane==='xy'?[right,up,towards]:plane==='xz'?[right,towards.map(n=>-n),up]:[towards,right,up];
  const m=(row,column)=>columns[column][row],y=Math.asin(Math.max(-1,Math.min(1,-m(2,0))));
  const rotationEuler=Math.abs(m(2,0))<.9999999?[Math.atan2(m(2,1),m(2,2)),y,Math.atan2(m(1,0),m(0,0))]:[Math.atan2(-m(1,2),m(1,1)),y,0];
  return {reading:{towards,up},rotationEuler,rotation:rotationEuler.map(n=>n*180/Math.PI),right};
}
