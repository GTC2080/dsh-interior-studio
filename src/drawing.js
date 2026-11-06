/** Validate an agent-authored CAD design before producing any project file. */
import {randomUUID} from 'node:crypto';
import {check,number,validateScene,MATERIALS} from './scene.js';
import {arcPoints,pointAt,wallLength,doorClearance} from './geometry.js';
import {FURNITURE} from './catalog.js';
import {reviewFurniture} from './furniture-review.js';
import {solidFromInput,solidVertices} from './solids.js';
import {modelPrism,presentationFromInput} from './refinement.js';

function text(value,label,maximum=100) {
  check(typeof value==='string'&&value.trim().length>0&&value.length<=maximum&&!/[\x00-\x1f]/.test(value),`${label}无效`);
  return value.trim();
}

export function drawingScene(input) {
  const name=text(input.name,'方案名称');
  check(['interior','booth'].includes(input.kind),'请选择室内或展台');
  const width=number(input.width,'场地宽度',1,100),depth=number(input.depth,'场地进深',1,100);
  const height=number(input.height,'层高',1,20),thickness=number(input.thickness,'墙厚',.04,.8);
  const floorMaterial=input.floorMaterial??'oak';check(Object.hasOwn(MATERIALS,floorMaterial),'未知地面材质');
  check(Array.isArray(input.walls)&&input.walls.length<=120&&(input.kind==='booth'||input.walls.length>0),'墙体数量须为 1–120');
  check(Array.isArray(input.assumptions)&&input.assumptions.length<=12,'设计假设须为数组，最多12条，每条不超过200字符');
  const assumptions=input.assumptions.map(s=>text(s,'设计假设',200));
  const dimensionBasis=input.dimensionBasis??(input.kind==='booth'?'site':'centerline');
  check((input.kind==='booth'?['site']:['outside','centerline']).includes(dimensionBasis),'室内须明确外墙外缘或墙中心线尺寸；展台使用场地尺寸');
  const point=value=>{
    check(Array.isArray(value)&&value.length===2&&value.every(Number.isFinite),'平面坐标须为 [x,y]，单位为米');
    check(value[0]>=-1e-7&&value[0]<=width+1e-7&&value[1]>=-1e-7&&value[1]<=depth+1e-7,'墙体或标记超出场地尺寸');
    return [...value];
  };
  const origin={category:'design_proposal',actor:'model_tool',status:'awaiting_user_confirmation'};
  const byKey=new Map(),objects=[];
  for(const row of input.walls) {
    check(row&&typeof row==='object','墙体数据无效');
    const key=text(row.key,'墙体编号',50);
    check(/^[A-Za-z][A-Za-z0-9_-]*$/.test(key)&&!byKey.has(key),'墙体编号须唯一，使用字母、数字和下划线');
    check(Boolean(row.points)!==Boolean(row.arc),'每面墙请选择 points 或 arc');
    let path,arc;
    if(row.arc) {
      arc={center:point(row.arc.center),radius:number(row.arc.radius,'曲墙半径',.05,100),
        start:number(row.arc.startDegrees,'起始角度',-360,360)*Math.PI/180,
        sweep:number(row.arc.sweepDegrees,'逆时针转角',.1,360)*Math.PI/180};
      path=arcPoints(arc);path.forEach(point);
    } else {
      check(Array.isArray(row.points)&&row.points.length>=2&&row.points.length<=128,'墙路径须包含 2–128 个坐标');
      path=row.points.map(point);
    }
    const material=row.material??'plaster';check(Object.hasOwn(MATERIALS,material),'未知墙面材质');
    const wall={id:randomUUID(),type:'wall',label:row.label?text(row.label,'墙名称'):key,a:path[0],b:path.at(-1),
      height:row.height===undefined?height:number(row.height,'墙高',1,20),
      thickness:row.thickness===undefined?thickness:number(row.thickness,'墙厚',.04,.8),openings:[],
      materials:{'side-a':material,'side-b':material,edge:material},origin:{...origin,key},
      ...(path.length>2?{path}:{}),...(arc?{arc}:{} )};
    objects.push(wall);byKey.set(key,wall);
  }
  const openings=input.openings??[];
  check(Array.isArray(openings)&&openings.length<=240,'门窗数量超过 240');
  for(const row of openings) {
    const parent=byKey.get(row.wall);check(parent,`门窗引用了不存在的墙：${row.wall}`);
    check(['door','window','passage'].includes(row.kind),'洞口类型须为 door/window/passage；passage 不生成框、玻璃或门扇');
    check(row.swing===undefined||['left','right'].includes(row.swing),'门的开启方向须为 left 或 right');
    check(row.kind!=='door'||!parent.arc||row.width/parent.arc.radius<Math.PI/2,'曲墙门洞转角须小于 90°；请拆分过大的门洞');
    parent.openings.push({id:randomUUID(),kind:row.kind,start:number(row.start,'洞口起点',0,1000),
      width:number(row.width,'洞口宽度',.1,8),sill:number(row.sill??(row.kind==='window'?.9:0),'洞口底高',0,parent.height),
      top:number(row.top,'洞口顶部高度',.1,parent.height),swing:row.swing??'left',
      ...(row.wrap?{wrap:true}:{}),origin:{...origin}});
  }
  const furniture=input.furniture??[];
  check(Array.isArray(furniture)&&furniture.length<=100,'家具数量超过 100');
  for(const [index,row] of furniture.entries()) {
    check(Object.hasOwn(FURNITURE,row.asset),'请使用家具目录中的 asset');const spec=FURNITURE[row.asset];
    const [x,y]=point([row.x,row.y]);
    const size=[row.width??spec.size[0],row.depth??spec.size[1],row.height??spec.size[2]];
    size.forEach(n=>number(n,'家具尺寸',.05,20));
    const material=row.material;check(material===undefined||Object.hasOwn(MATERIALS,material),'未知家具材质');
    const base=number(row.z??0,'家具底部标高',0,100);
    check(row.key===undefined||typeof row.key==='string'&&/^[A-Za-z][A-Za-z0-9_-]{0,49}$/.test(row.key),'对象编号无效');
    objects.push({id:randomUUID(),type:'asset',asset:row.asset,label:row.label?text(row.label,'对象名称'):spec.label,size,position:[x,y,base+size[2]/2],
      rotation:number(row.rotation??0,'家具角度',-360,360)*Math.PI/180,...(material?{material}:{}),
      ...(row.faceTarget?{faceTarget:row.faceTarget}:{}),origin:{...origin,key:row.key??`furniture_${index+1}`,source:spec.source}});
  }
  const solids=input.components??[];check(Array.isArray(solids)&&solids.length<=500,'通用构件最多500件');
  const keys=new Set(objects.map(o=>o.origin.key));
  check(keys.size===objects.length,'墙体与目录物件的编号须唯一');
  for(const row of solids) {
    check(!keys.has(row.key),`对象编号重复：${row.key}`);keys.add(row.key);
    try {objects.push(solidFromInput(row,randomUUID(),origin));}
    catch(error){throw new Error(`构件 ${row.key??'未编号'}：${error.message}`);}
  }
  check(objects.filter(o=>o.type==='solid').reduce((sum,o)=>sum+o.outline.length+o.holes.reduce((n,h)=>n+h.length,0),0)<=24000,'全部构件轮廓总计不得超过24000个采样点');
  for(const o of objects.filter(o=>o.faceTarget))check(keys.has(o.faceTarget),'朝向目标不存在：'+o.faceTarget);
  const rooms=input.rooms??[];check(Array.isArray(rooms)&&rooms.length<=80,'房间标记数量超过 80');
  const roomLabels=rooms.map(r=>{check(r.material===undefined||Object.hasOwn(MATERIALS,r.material),'未知房间材质');return {name:text(r.name,'房间名称',40),point:point(r.point),material:r.material??floorMaterial};});
  return validateScene({schemaVersion:objects.some(o=>o.reading)?8:input.presentation?5:4,unit:'m',kind:input.kind,bounds:[width,depth],objects,
    ...(input.presentation?{presentation:presentationFromInput(input.presentation)}:{}),
    parameters:{kind:input.kind,width,depth,height,thickness,floorMaterial,status:'awaiting_user_confirmation'},
    design:{name,source:'model_design',dimensionBasis,assumptions,roomLabels}});
}

/** Both the pending CAD preview and the confirmed plan reflect the same scene. */
export function drawingReport(scene) {
  const [width,depth]=scene.bounds,walls=scene.objects.filter(o=>o.type==='wall');
  const report={id:scene.design.drawingId,generated:true,displayName:scene.design.name+'.dxf',unit:'m',
    origin:[0,0],extents:[0,0,width,depth],topologyVersion:1,rooms:[],walls:[],openings:[],references:[],
    entities:[],blocking:[],warnings:scene.design.review?.issues?.map(i=>i.message)??[],review:scene.design.review,
    furnitureReview:reviewFurniture(scene),componentReview:scene.design.componentReview,layers:[],settings:{},counts:{walls:walls.length,components:scene.objects.filter(o=>o.type==='solid').length,importedModels:scene.objects.filter(o=>o.type==='model').length},support:'Agent-authored editable CAD design; plan/raw DXF use labelled envelopes; mesh elevations are generated on demand'};
  if(scene.objects.some(o=>o.type==='model'))report.warnings.push('导入模型的平面及原始参考 DXF 仍以包络表示；四向立面读取实际网格，消隐按5mm步长采样。图像饰面未自动描线，施工节点需另行深化。');
  walls.forEach((wall,index)=>{
    const source={handle:wall.origin.key??wall.id,category:'model_design'};
    report.walls.push({...wall,source});
    for(const opening of wall.openings) {
      const item={...opening,source,wallIndex:index,a:pointAt(wall,opening.start),b:pointAt(wall,opening.start+opening.width)};
      if(opening.kind==='door')item.swingPath=doorClearance(wall,opening)[0];
      if(wall.path){const count=Math.max(2,Math.ceil(opening.width/wallLength(wall)*(wall.path.length-1)));item.path=Array.from({length:count+1},(_,i)=>pointAt(wall,opening.start+opening.width*i/count));}
      report.openings.push(item);
    }
  });
  for(const floor of scene.objects.filter(o=>o.type==='floor'&&o.polygon))report.rooms.push({id:floor.id,polygon:floor.polygon,holes:floor.holes,
    area:floor.area,label:floor.label,labelPoint:floor.labelPoint??floor.polygon[0],boundaryWalls:(floor.boundaryWallIds??[]).map(id=>walls.findIndex(w=>w.id===id)).filter(i=>i>=0)});
  for(const asset of scene.objects.filter(o=>o.type==='asset')) {
    const [x,y]=asset.position,[w,d]=asset.size,angle=asset.rotation??0;
    const points=[[-w/2,-d/2],[w/2,-d/2],[w/2,d/2],[-w/2,d/2]].map(([a,b])=>[x+a*Math.cos(angle)-b*Math.sin(angle),y+a*Math.sin(angle)+b*Math.cos(angle)]);
    points.forEach((a,i)=>report.references.push({a,b:points[(i+1)%points.length],layer:'FURNITURE'}));
  }
  for(const object of scene.objects.filter(o=>['solid','model'].includes(o.type))) {
    const solid=object.type==='model'?modelPrism(object):object;
    const vertices=solidVertices(solid);
    // Top-view projections include overhead components; they are not floor occupancy.
    for(let i=0;i<solid.outline.length;i++)report.references.push({a:vertices[i*2].slice(0,2),b:vertices[((i+1)%solid.outline.length)*2].slice(0,2),layer:'COMPONENTS'});
  }
  return report;
}
