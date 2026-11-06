/** Shared model envelopes and saved presentation validation. */
const check=(ok,message)=>{if(!ok)throw Error(message);};
export const finite=(n,label,min,max)=>{check(Number.isFinite(n)&&n>=min&&n<=max,label+'超出范围');return n;};
export const vector=(v,label)=>{check(Array.isArray(v)&&v.length===3,'需要三个数值：'+label);return v.map(n=>finite(n,label,-1000,1000));};
export const resourceName=(digest,extension)=>{check(/^[a-f0-9]{64}$/.test(digest)&&['glb','png','jpg'].includes(extension),'资源引用无效');return digest+'.'+extension;};
export const key=value=>{check(typeof value==='string'&&/^[A-Za-z][A-Za-z0-9_-]{0,49}$/.test(value),'编号须为字母开头、最多50字符');return value;};
export const label=(value,max=100)=>{check(typeof value==='string'&&value.trim()&&value.length<=max&&!/[\x00-\x1f]/.test(value),'名称或素材来源无效');return value.trim();};
export const sceneResources=scene=>(scene?.objects??[]).flatMap(o=>[
  ...(o.type==='model'?[resourceName(o.resource,'glb')]:[]),...(o.surface?[resourceName(o.surface.resource,o.surface.extension)]:[]),
]);

/** Imported geometry uses a labelled CAD envelope, never an invented parametric solid. */
export function modelPrism(o) {
  const [w,d,h]=o.size;return {plane:'xy',position:o.position,rotationEuler:o.rotationEuler,
    outline:[[-w/2,-d/2],[w/2,-d/2],[w/2,d/2],[-w/2,d/2]],holes:[],depth:h};
}
export function validateModel(o) {
  key(o.origin?.key);label(o.label);resourceName(o.resource,'glb');label(o.source,500);
  vector(o.position,'模型位置');vector(o.rotationEuler,'模型旋转').forEach(n=>finite(n,'模型旋转',-Math.PI*2,Math.PI*2));
  check(Array.isArray(o.size)&&o.size.length===3,'模型尺寸无效');o.size.forEach(n=>finite(n,'模型尺寸',.00001,100));
  check(o.audit?.vertices>0&&o.audit.vertices<=300000&&o.audit.triangles>0&&o.audit.triangles<=200000,'模型缺少导入检查');
}
export function validateSurface(s) {
  resourceName(s.resource,s.extension);check(['png','jpg'].includes(s.extension),'饰面图片格式无效');label(s.source,500);
  check(['all','x+','x-','y+','y-','z+','z-'].includes(s.face),'饰面方向无效');
  check(Array.isArray(s.repeat)&&s.repeat.length===2,'纹理重复尺寸须为[u,v]米');s.repeat.forEach(n=>finite(n,'纹理重复尺寸',.001,100));
  finite(s.rotation,'纹理旋转',-Math.PI*2,Math.PI*2);finite(s.roughness,'饰面粗糙度',.02,1);finite(s.emission,'饰面发光',0,20);
}
export function validatePresentation(p) {
  check(p&&['studio','custom'].includes(p.mode),'照明模式须为 studio/custom');
  finite(p.worldStrength,'环境光',0,2);
  check(Array.isArray(p.lights)&&p.lights.length<=16&&Array.isArray(p.cameras)&&p.cameras.length<=6,'最多16盏灯和6个自定义相机');
  const ids=new Set();
  for(const row of [...p.lights,...p.cameras]){key(row.key);check(!ids.has(row.key),'灯光或相机编号重复');ids.add(row.key);label(row.label,40);vector(row.position,'位置');vector(row.target,'目标');check(Math.hypot(...row.target.map((n,i)=>n-row.position[i]))>.001,'位置不能与目标重合');}
  for(const light of p.lights) {
    check(['area','spot','point'].includes(light.type),'不支持的灯光类型');finite(light.power,'灯光瓦数',0,10000);finite(light.size,'灯光尺寸',.001,20);finite(light.spotDegrees,'射灯锥角',1,170);
    vector(light.color,'灯光颜色').forEach(n=>finite(n,'灯光颜色',0,1));
  }
  check(p.lights.reduce((n,l)=>n+l.power,0)<=50000,'累计灯光功率超过预算');
  for(const camera of p.cameras){check(!['overview','front','back','left','right','top'].includes(camera.key),'自定义相机不能覆盖标准视角');finite(camera.lens,'相机焦距',10,150);
    check(camera.purpose===undefined||['overview','detail'].includes(camera.purpose),'相机用途须为overview/detail');
    check(camera.subjects===undefined||Array.isArray(camera.subjects)&&camera.subjects.length>=1&&camera.subjects.length<=32&&new Set(camera.subjects).size===camera.subjects.length&&camera.subjects.every(s=>typeof s==='string'&&s.length>0&&s.length<=100),'相机主体需1–32个不同对象key/ID');
    check(camera.focusPoints===undefined||Array.isArray(camera.focusPoints)&&camera.focusPoints.length<=16,'相机必看点最多16个');
    for(const point of camera.focusPoints??[])vector(point,'相机必看点');
  }
}
export function presentationFromInput(input,previous) {
  const p=structuredClone(previous??{mode:'studio',worldStrength:.35,lights:[],cameras:[]});
  if(input.mode!==undefined)p.mode=input.mode;if(input.worldStrength!==undefined)p.worldStrength=input.worldStrength;
  if(input.lights!==undefined)p.lights=input.lights.map(l=>({...l,label:l.label??l.key,color:l.color??[1,.95,.88],size:l.size??.2,spotDegrees:l.spotDegrees??45,target:l.target??l.position.map((n,i)=>n-(i===2?1:0))}));
  if(input.cameras!==undefined)p.cameras=input.cameras.map(c=>({...c,label:c.label??c.key,lens:c.lens??35}));
  validatePresentation(p);return p;
}
