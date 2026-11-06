/** Metre-based, Z-up scene operations shared by the Host and deterministic checks. */
import { randomUUID } from 'node:crypto';
import { FURNITURE } from './catalog.js';
import {wallPoints,wallLength,arcPoints,polygonArea,pointInRing,simpleRing,ringsIntersect,furnitureFitsFloor,furnitureBlocksDoor} from './geometry.js';
import {validateSolid,solidBounds,solidsOverlap,assetSolid,wallSolids} from './solids.js';
import {validateModel,modelPrism,validateSurface,validatePresentation} from './refinement.js';
import {reviewScopeDeclarations} from './acceptance-scope.js';

export const MATERIALS = Object.freeze({
  plaster: { label: '暖白墙面', color: [0.82, 0.80, 0.74], roughness: 0.8 },
  oak: { label: '浅色橡木', color: [0.52, 0.31, 0.13], roughness: 0.6 },
  concrete: { label: '浅灰混凝土', color: [0.40, 0.43, 0.46], roughness: 0.85 },
  blue: { label: '品牌蓝', color: [0.025, 0.16, 0.42], roughness: 0.45 },
  white: { label: '哑光白', color: [0.86, 0.88, 0.9], roughness: 0.55 },
  dark: { label: '深灰', color: [0.025, 0.035, 0.05], roughness: 0.5 },
  'wood-floor': { label: '实木地板', color: [1, 1, 1], swatch:[.67,.52,.35], roughness: 0.6, texture: 'wood-floor' },
  'concrete-fine': { label: '细纹混凝土', color: [1, 1, 1], swatch:[.48,.49,.47], roughness: 0.85, texture: 'concrete-fine' },
});

export function check(condition, message) {
  if (!condition) throw new Error(message);
}

export function number(value, label, min = 0.01, max = 100) {
  check(typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max,
    `${label}须在 ${min}–${max} 之间`);
  return value;
}

export function proposal(input) {
  check(['interior', 'booth'].includes(input.kind), '请选择室内或展台');
  const width = number(input.width, '宽度', 1, 100);
  const depth = number(input.depth, '进深', 1, 100);
  const height = number(input.height, '高度', 1, 20);
  const thickness = number(input.thickness, '墙厚', 0.04, 0.8);
  const openSides = input.openSides ?? (input.kind === 'booth' ? ['front', 'left', 'right'] : []);
  check(Array.isArray(openSides) && openSides.every(v => ['front', 'back', 'left', 'right'].includes(v)), '开放面无效');
  return { kind: input.kind, width, depth, height, thickness, openSides: [...new Set(openSides)],
    origin: 'design_proposal', status: 'awaiting_user_confirmation' };
}

function wall(id, label, a, b, height, thickness, origin) {
  return { id, type: 'wall', label, a, b, height, thickness, openings: [],
    materials: { 'side-a': 'plaster', 'side-b': 'plaster', edge: 'plaster' }, origin };
}

/** Create a scene only after the Host has retained a trusted UI confirmation. */
export function sceneFromProposal(plan, confirmationId) {
  const p = proposal(plan);
  const origin = { category: 'design_proposal', confirmationId, acceptedBy: 'user' };
  const objects = [{ id: randomUUID(), type: 'floor', label: '地台', width: p.width, depth: p.depth,
    material: 'concrete', origin }];
  const sides = [
    ['front', [0, 0], [p.width, 0]], ['right', [p.width, 0], [p.width, p.depth]],
    ['back', [p.width, p.depth], [0, p.depth]], ['left', [0, p.depth], [0, 0]],
  ];
  for (const [side, a, b] of sides) {
    if (!p.openSides.includes(side)) objects.push(wall(randomUUID(), `${side} 墙`, a, b, p.height, p.thickness, origin));
  }
  if (p.kind === 'booth') {
    for (const [label, asset, x, y, w, d, h, material] of [
      ['接待台', 'counter', p.width * 0.23, p.depth * 0.2, 1.3, 0.55, 1.05, 'white'],
      ['展示台', 'plinth', p.width * 0.72, p.depth * 0.45, 0.7, 0.7, 0.85, 'blue'],
      ['展示屏', 'screen', p.width * 0.5, p.depth * 0.86, 1.4, 0.16, 1.9, 'dark'],
    ]) objects.push({ id: randomUUID(), type: 'asset', asset, label, position: [x, y, h / 2],
      size: [Math.min(w, p.width * 0.4), Math.min(d, p.depth * 0.3), Math.min(h, p.height * 0.9)],
      rotation: 0, material, origin: { ...origin, category: 'default_suggestion' } });
  }
  return validateScene({ schemaVersion: 1, unit: 'm', kind: p.kind, bounds: [p.width, p.depth],
    parameters: { ...p, status: 'user_confirmed', confirmationId }, objects });
}

/** Convert reviewed wall paths, openings and enclosed contours; preserve old reports. */
export function sceneFromCad(report, input, confirmationId) {
  check(report.walls.length > 0, '没有可确认的墙体');
  check(report.blocking.length === 0, `图纸存在阻断项：${report.blocking.join('；')}`);
  check(!report.requiresPartialConfirmation || input.acceptPartial === true, '部分墙边线尚未识别，请明确确认仅生成已识别部分');
  const units = { mm: 0.001, cm: 0.01, m: 1, inch: 0.0254, foot: 0.3048 };
  check(Object.hasOwn(units, input.unit), '请确认图纸单位');
  let scale = units[input.unit];
  let calibration;
  if (input.knownLength !== undefined) {
    const line = report.walls[input.calibrationIndex ?? 0];
    check(line, '校准线不存在');
    const length = wallLength(line);
    calibration = { entity: line.source, knownLength: number(input.knownLength, '已知长度', 0.05, 1000),
      metadataScale: scale, discrepancy: Math.abs(input.knownLength / (length * scale) - 1) };
    if (calibration.discrepancy > 0.01) check(input.acceptScaleConflict === true, '已知长度与图纸单位冲突，请明确确认采用校准比例');
    scale = input.knownLength / length;
  }
  check(report.unit !== null || calibration !== undefined, '无单位图纸必须提供一段已知长度');
  if (report.unit && report.unit !== input.unit) check(input.acceptScaleConflict === true, '选择的单位与图纸元数据冲突，请确认');
  const height = number(input.height, '层高', 1, 20);
  const thickness = number(input.thickness, '墙厚', 0.04, 0.8);
  const origin = report.origin;
  const point = p => [(p[0] - origin[0]) * scale, (p[1] - origin[1]) * scale];
  const width = (report.extents[2] - origin[0]) * scale;
  const depth = (report.extents[3] - origin[1]) * scale;
  number(width, '图纸宽度', 0.1, 1000); number(depth, '图纸进深', 0.1, 1000);
  const objects = report.walls.map(line => wall(randomUUID(), `${line.path?'曲墙':'墙'} ${line.source.handle}`, point(line.a), point(line.b), height,
    line.thickness === undefined ? thickness : number(line.thickness * scale, '图纸墙厚', .04, .8),
    { category: line.thickness === undefined ? 'cad_geometry' : 'calculated_wall_pair', source: line.source,
      height: { category: 'user_input', confirmationId }, thickness: { category: line.thickness === undefined ? 'user_input' : 'calculated_wall_pair', confirmationId }, confirmationId }));
  report.walls.forEach((line,index)=>{
    if(line.arc) {
      const arc={...line.arc,center:point(line.arc.center),radius:line.arc.radius*scale};
      objects[index].arc=arc;objects[index].path=arcPoints(arc);
      objects[index].a=objects[index].path[0];objects[index].b=objects[index].path.at(-1);
    } else if(line.path)objects[index].path=line.path.map(point);
    if(line.openingBridge)objects[index].origin.category='inferred_opening_bridge';
  });
  const overrides=input.openingOverrides??{};
  check(overrides && typeof overrides==='object' && !Array.isArray(overrides),'门窗确认数据无效');
  for(const [key,value] of Object.entries(overrides))check(/^(0|[1-9]\d*)$/.test(key) && +key<report.openings.length
    && ['door','window','ignore'].includes(value),'门窗类型或编号无效');
  const ignoredBridges=new Set();
  for (const [index,opening] of report.openings.entries()) {
    const kind=overrides[index]??opening.kind;
    if(kind==='ignore') {
      if(report.walls[opening.wallIndex]?.openingBridge)ignoredBridges.add(opening.wallIndex);
      continue;
    }
    check(['door','window'].includes(kind),`请确认第 ${index+1} 处洞口是门、窗，或保留为参考`);
    const a = point(opening.a), b = point(opening.b);
    const parent = Number.isInteger(opening.wallIndex) ? objects[opening.wallIndex] : objects.find(w => {
      const dx = w.b[0] - w.a[0], dy = w.b[1] - w.a[1], length = Math.hypot(dx, dy);
      const along = p => ((p[0] - w.a[0]) * dx + (p[1] - w.a[1]) * dy) / length;
      return Math.abs((a[0] - w.a[0]) * dy - (a[1] - w.a[1]) * dx) / length < 0.001
        && Math.abs((b[0] - w.a[0]) * dy - (b[1] - w.a[1]) * dx) / length < 0.001
        && Math.min(along(a), along(b)) >= 0.02 && Math.max(along(a), along(b)) <= length - 0.02;
    });
    check(parent?.type==='wall', `门窗 ${opening.source.handle} 无法关联墙体，请先修正图纸`);
    const length = Math.hypot(parent.b[0] - parent.a[0], parent.b[1] - parent.a[1]);
    const along = p => ((p[0] - parent.a[0]) * (parent.b[0] - parent.a[0]) + (p[1] - parent.a[1]) * (parent.b[1] - parent.a[1])) / length;
    const sill = kind === 'door' ? 0 : number(input.windowSill, '窗台高度', 0, height);
    const top = kind === 'door' ? number(input.doorHeight, '门高', 0.5, height) : number(input.windowTop, '窗顶高度', 0.5, height);
    parent.openings.push({ id: randomUUID(), kind,
      start: Number.isInteger(opening.wallIndex) ? opening.start*scale : Math.min(along(a),along(b)),
      width: Number.isInteger(opening.wallIndex) ? opening.width*scale : Math.abs(along(b)-along(a)), sill, top,
      ...(opening.wrap?{wrap:true}:{}),
      origin: { category: 'semantic_inference', source: opening.source, confirmationId, height: 'user_input' } });
  }
  const roomFloors=[];
  const excludedRooms=input.excludedRooms??[];
  check(Array.isArray(excludedRooms)&&excludedRooms.every(i=>Number.isInteger(i)&&i>=0&&i<(report.rooms??[]).length),'房间选择无效');
  if(report.topologyVersion===1) {
    for(const [index,room] of report.rooms.entries()) {
      if(excludedRooms.includes(index)||room.boundaryWalls.some(w=>ignoredBridges.has(w)))continue;
      const polygon=room.polygon.map(point),holes=room.holes.map(ring=>ring.map(point));
      roomFloors.push({id:randomUUID(),type:'floor',label:`房间 ${index+1}`,width,depth,polygon,holes,
        area:room.area*scale**2,material:'oak',boundaryWallIds:room.boundaryWalls.map(i=>objects[i].id),
        origin:{category:'calculated_room_contour',areaBasis:'wall_centerlines',confirmationId}});
    }
  } else roomFloors.push({ id: randomUUID(), type: 'floor', label: '地面', width, depth, material: 'oak',
    origin: { category: 'design_proposal', note: '矩形范围地面，未自动识别房间拓扑', confirmationId } });
  return validateScene({ schemaVersion: report.topologyVersion===1?3:1, unit: 'm', kind: 'interior', bounds: [width, depth],
    objects:[...objects.filter((_,i)=>!ignoredBridges.has(i)),...roomFloors],
    parameters: { height, thickness, confirmationId },
    cad: { hash: report.fileHash, scale, origin, calibration, unit: input.unit, confirmationId,
      scope: report.topologyVersion===1 ? 'user_reviewed_curves_openings_rooms' : report.settings?.wallMode === 'paired' ? 'user_confirmed_straight_wall_pairs' : 'user_confirmed_straight_wall_centerlines',
      roomCount:roomFloors.filter(f=>f.polygon).length,openingOverrides:overrides,excludedRooms,reportId: report.id } });
}

export function validateScene(scene) {
  check([1,2,3,4,5,6,7,8].includes(scene.schemaVersion) && scene.unit === 'm', '不支持的场景版本或单位');
  check(scene.schemaVersion>=8||!scene.objects?.some(o=>o.reading),'声明文字阅读方向需要场景版本8');
  check(scene.schemaVersion>=6||!scene.design?.constraints,'固定项目要求需要场景版本6');
  check(scene.schemaVersion>=7||!scene.design?.constraints?.views?.length&&!scene.design?.constraints?.supports?.length,'固定视图与跨组合连接需要场景版本7');
  check(scene.schemaVersion>=5||!scene.presentation&&!scene.objects?.some(o=>o.type==='model'||o.surface),'精细模型与饰面需要场景版本5');
  if(scene.presentation)validatePresentation(scene.presentation);
  check(Array.isArray(scene.bounds) && scene.bounds.length === 2, '场地范围无效');
  scene.bounds.forEach(n => number(n, '场地范围', .1, 1000));
  check(Array.isArray(scene.objects) && scene.objects.length <= 5000, '场景超过当前 5000 对象限制');
  if(scene.design?.constraints)reviewScopeDeclarations(scene,scene.design.constraints);
  const components=scene.objects.filter(o=>o.type==='solid');
  const models=scene.objects.filter(o=>o.type==='model');
  check(models.length<=100&&models.reduce((sum,o)=>sum+(o.audit?.vertices??0),0)<=600000&&models.reduce((sum,o)=>sum+(o.audit?.triangles??0),0)<=400000,'精细模型累计超过60万顶点或40万三角面预算');
  check(models.reduce((sum,o)=>sum+(o.audit?.pixels??0),0)<=67_108_864,'精细模型累计贴图超过64 MP预算');
  check(components.length<=500&&components.reduce((sum,o)=>sum+(o.outline?.length??0)+(o.holes??[]).reduce((n,h)=>n+h.length,0),0)<=24000,'通用构件超过500件或24000采样点限制');
  const ids = new Set();
  for (const o of scene.objects) {
    const textureMaterial=Object.values(o.materials??{}).some(m=>MATERIALS[m]?.texture) || MATERIALS[o.material]?.texture;
    check(scene.schemaVersion>=2 || !textureMaterial && !(o.type==='asset' && Object.hasOwn(FURNITURE,o.asset)), '新家具或纹理需要场景版本 2');
    check(scene.schemaVersion>=3 || !o.path && !o.arc && !o.polygon && !o.holes,'曲墙与房间需要场景版本 3');
    check(scene.schemaVersion>=4 || o.type!=='solid'&&!o.openings?.some(p=>p.kind==='passage'),'通用构件与敞口需要场景版本 4');
    check(typeof o.id === 'string' && !ids.has(o.id), '对象 ID 重复'); ids.add(o.id);
    if (o.type === 'wall') {
      for (const p of [o.a, o.b]) check(Array.isArray(p) && p.length === 2 && p.every(n => Number.isFinite(n) && Math.abs(n) <= 1000), '墙坐标无效');
      if(o.path) {
        check(Array.isArray(o.path) && o.path.length>=2 && o.path.length<=2049,'曲墙路径无效');
        check(o.path.every(p=>Array.isArray(p)&&p.length===2&&p.every(n=>Number.isFinite(n)&&Math.abs(n)<=1000)),'曲墙坐标无效');
        check(Math.hypot(...o.path[0].map((n,i)=>n-o.a[i]))<1e-7 && Math.hypot(...o.path.at(-1).map((n,i)=>n-o.b[i]))<1e-7,'曲墙端点不一致');
        check(o.path.slice(1).every((p,i)=>Math.hypot(p[0]-o.path[i][0],p[1]-o.path[i][1])>1e-7),'曲墙含重复点');
      }
      if(o.arc) {
        check(o.path && Array.isArray(o.arc.center) && o.arc.center.length===2 && o.arc.center.every(Number.isFinite),'圆弧无效');
        number(o.arc.radius,'圆弧半径',.03,1000);number(o.arc.sweep,'圆弧转角',1e-7,Math.PI*2+1e-8);
        check(Number.isFinite(o.arc.start) && o.arc.radius>o.thickness/2,'圆弧半径须大于半墙厚');
        const expected=arcPoints(o.arc);
        check(expected.length===o.path.length && expected.every((p,i)=>Math.hypot(p[0]-o.path[i][0],p[1]-o.path[i][1])<1e-7),'圆弧与路径不一致');
      }
      const length = wallLength(o);
      number(length, '墙长度', 0.04, o.path?10000:1000); number(o.height, '墙高', 1, 20); number(o.thickness, '墙厚', 0.04, 0.8);
      check(Array.isArray(o.openings),'洞口列表无效');
      for(const p of o.openings) {
        number(p.width,'洞口宽度',.1,length);
        if(p.wrap)check(scene.schemaVersion>=3 && o.arc?.sweep>=Math.PI*2-1e-7 && p.start>=0 && p.start<length
          && p.start+p.width>length,'跨起点洞口仅适用于整圆墙体');
      }
      const openings = o.openings.flatMap(p=>p.wrap?[{...p,width:length-p.start},{...p,start:0,width:p.start+p.width-length}]:[p]).sort((a, b) => a.start - b.start);
      let end = 0;
      for (const p of openings) {
        number(p.width, '洞口宽度', p.wrap?1e-8:.1, length);
        const margin=scene.schemaVersion>=3?0:.02;
        check(['door','window','passage'].includes(p.kind),'洞口类型无效');
        check(Number.isFinite(p.start) && p.start >= Math.max(margin,end)-1e-7 && p.start + p.width <= length - margin+1e-7, '洞口越界或重叠');
        check(Number.isFinite(p.sill)&&Number.isFinite(p.top)&&p.sill >= 0 && p.top > p.sill && p.top <= o.height, '洞口高度无效'); end = p.start + p.width;
      }
      check(openings.some(p=>p.sill>0 || p.top<o.height) || openings.reduce((sum,p)=>sum+p.width,0)<length-1e-7,'洞口移除了整面墙，请核对洞口高度');
      check(Object.values(o.materials).every(m => Object.hasOwn(MATERIALS, m)), '未知墙面材质');
    } else if (o.type === 'floor') {
      number(o.width, '地面宽度', 0.1, 1000); number(o.depth, '地面进深', 0.1, 1000);
      if(o.polygon) {
        check(Array.isArray(o.holes)&&o.holes.length<=100,'房间内环无效');
        for(const ring of [o.polygon,...o.holes]) {
          check(Array.isArray(ring)&&ring.length>=3&&ring.length<=4096,'房间轮廓无效');
          check(ring.every(p=>Array.isArray(p)&&p.length===2&&p.every(n=>Number.isFinite(n)&&Math.abs(n)<=1000)),'房间坐标无效');
          check(simpleRing(ring)&&Math.abs(polygonArea(ring))>.0001,'房间轮廓自交或退化');
        }
        for(const [i,hole] of o.holes.entries()) {
          check(hole.every(p=>pointInRing(p,o.polygon))&&!ringsIntersect(hole,o.polygon),'房间内环越界');
          check(o.holes.slice(i+1).every(other=>!ringsIntersect(hole,other)&&!pointInRing(hole[0],other)&&!pointInRing(other[0],hole)),'房间内环重叠');
        }
        const area=Math.abs(polygonArea(o.polygon))-o.holes.reduce((sum,h)=>sum+Math.abs(polygonArea(h)),0);
        check(Number.isFinite(o.area)&&o.area>0&&Math.abs(o.area-area)<Math.max(.0001,area*1e-6),'房间面积与轮廓不一致');
      }
    } else if (o.type === 'asset') {
      check(['counter', 'plinth', 'screen'].includes(o.asset) || Object.hasOwn(FURNITURE, o.asset), '未知家具或展具');
      check(Array.isArray(o.size) && Array.isArray(o.position) && o.size.length === 3 && o.position.length === 3 && o.position.every(Number.isFinite), '家具变换无效');
      check(o.rotation === undefined || Number.isFinite(o.rotation), '家具角度无效');
      o.size.forEach(n => number(n, '展具尺寸', 0.01, 100));
      const [x, y] = o.position, [w, d] = o.size;
      const c = Math.abs(Math.cos(o.rotation ?? 0)), s = Math.abs(Math.sin(o.rotation ?? 0));
      const halfW = (w*c+d*s)/2, halfD = (w*s+d*c)/2;
      check(x >= halfW-1e-8 && x+halfW <= scene.bounds[0]+1e-8 && y >= halfD-1e-8 && y+halfD <= scene.bounds[1]+1e-8, '家具或展具越出场地边界');
    } else if(o.type==='model') {
      validateModel(o);const [lo,hi]=solidBounds(modelPrism(o));
      check(lo[0]>=-.0001&&lo[1]>=-.0001&&lo[2]>=-.0001&&hi[0]<=scene.bounds[0]+.0001&&hi[1]<=scene.bounds[1]+.0001&&hi[2]<=100,`精细模型 ${o.label} 的包络超出场地或标高范围`);
    } else if(o.type==='solid') {
      validateSolid(o);const [lo,hi]=solidBounds(o);
      check(lo[0]>=-1e-7&&lo[1]>=-1e-7&&lo[2]>=-1e-7&&hi[0]<=scene.bounds[0]+1e-7&&hi[1]<=scene.bounds[1]+1e-7&&hi[2]<=100,`构件 ${o.label} (${o.origin?.key??o.id}) 越出场地或标高范围，实际外包络 ${JSON.stringify([lo,hi])}`);
    } else throw new Error('未知对象类型');
    if(o.surface){check(['solid','floor'].includes(o.type),'仅参数构件和地面支持局部图像饰面；精细模型请在Blender中保留UV和材质');validateSurface(o.surface);}
    if (o.material !== undefined) check(Object.hasOwn(MATERIALS, o.material), '未知材质');
  }
  return scene;
}

function rectangle(object) {
  if (object.type === 'asset') return {x:object.position[0], y:object.position[1], w:object.size[0], d:object.size[1], angle:object.rotation ?? 0};
  return {x:(object.a[0]+object.b[0])/2, y:(object.a[1]+object.b[1])/2,
    w:Math.hypot(object.b[0]-object.a[0],object.b[1]-object.a[1]), d:object.thickness,
    angle:Math.atan2(object.b[1]-object.a[1],object.b[0]-object.a[0])};
}

function invalidateLayoutReview(scene) {
  if(scene.design?.componentReview)scene.design.componentReview={...scene.design.componentReview,status:'needs_recheck'};
  if(scene.design?.review) {
    scene.design.review.circulation={status:'needs_recheck',suggestedClearWidth:.6};
    scene.design.review.issues=[{code:'layout_changed',message:'家具布局已调整；净尺寸保持不变，通路需重新核对。'}];
  }
}

/** Identify blockers while accounting for elevation and actual extruded profiles. */
export function placementConflicts(scene, object) {
  const a=rectangle(object);
  const conflicts=[];
  if(furnitureBlocksDoor(object,scene.objects.filter(o=>o.type==='wall')))conflicts.push('门扇开启范围或门前0.45m空间');
  const floors=scene.objects.filter(o=>o.type==='floor'&&o.polygon);
  if(floors.length && !floors.some(floor=>furnitureFitsFloor(object,floor)))conflicts.push('房间外边界或内孔');
  const blocked=scene.objects.filter(other => {
    if (other.id === object.id || other.type === 'floor') return false;
    if(other.type==='model')return solidsOverlap(assetSolid(object),modelPrism(other));
    if(other.type==='solid')return solidsOverlap(assetSolid(object),other);
    if(other.type==='wall')return wallSolids(other).some(p=>solidsOverlap(assetSolid(object),p));
    const bottom=object.position[2]-object.size[2]/2,top=bottom+object.size[2];
    const low=other.type==='asset'?other.position[2]-other.size[2]/2:0,high=other.type==='asset'?low+other.size[2]:other.height;
    if(bottom>=high-1e-6||top<=low+1e-6)return false;
    const b=rectangle(other);
    return [a.angle,a.angle+Math.PI/2,b.angle,b.angle+Math.PI/2].every(angle => {
      const radius = r => Math.abs(Math.cos(r.angle-angle))*r.w/2+Math.abs(Math.sin(r.angle-angle))*r.d/2;
      const distance = Math.abs((a.x-b.x)*Math.cos(angle)+(a.y-b.y)*Math.sin(angle));
      return distance < radius(a)+radius(b)-.001;
    });
  });
  return [...conflicts,...blocked.map(o=>`${o.label} (${o.origin?.key??o.id})`)];
}

export const placementBlocked=(scene,object)=>placementConflicts(scene,object).length>0;

/** Add one catalog model to a confirmed scene; a bounded search finds a free default position. */
export function furnishScene(scene, input, sceneConfirmationId) {
  check(Object.hasOwn(FURNITURE, input.asset), '请选择家具目录中的模型');
  const candidate=structuredClone(scene), spec=FURNITURE[input.asset];
  candidate.schemaVersion=Math.max(2,candidate.schemaVersion);
  const object={id:randomUUID(),type:'asset',asset:input.asset,label:spec.label,size:[...spec.size],
    rotation:number(input.rotation ?? 0,'角度',-360,360)*Math.PI/180,
    position:[0,0,number(input.z??0,'底部标高',0,100)+spec.size[2]/2],origin:{category:'design_proposal',sceneConfirmationId,source:spec.source}};
  if (input.x === undefined && input.y === undefined) {
    let found=false;
    for(let row=1;row<20 && !found;row++) for(let col=1;col<20;col++) {
      object.position[0]=candidate.bounds[0]*col/20;object.position[1]=candidate.bounds[1]*row/20;
      try {validateScene({...candidate,objects:[...candidate.objects,object]});} catch {continue;}
      if(!placementBlocked(candidate,object)){found=true;break;}
    }
    check(found,'当前空间没有合适的空位，请调整家具布局或场地尺寸');
  } else {
    object.position[0]=number(input.x,'X 坐标',0,1000);object.position[1]=number(input.y,'Y 坐标',0,1000);
    check(!placementBlocked(candidate,object),'家具与墙面、已有家具重叠，或占用了门扇开启和门前空间，请调整位置');
  }
  candidate.objects.push(object);
  invalidateLayoutReview(candidate);
  return {scene:validateScene(candidate),changedIds:[object.id],objectId:object.id};
}

/** The write set is computed here; callers cannot supply additional target IDs. */
export function editScene(scene, selection, input) {
  const candidate = structuredClone(scene);
  const object = candidate.objects.find(o => o.id === selection.objectId);
  check(object, '选中对象已不存在');
  if (input.action === 'material') {
    check(object.type!=='model','精细模型保留导入材质；请重新导入修改后的模型');
    check(Object.hasOwn(MATERIALS, input.material), '未知材质');
    if(MATERIALS[input.material].texture)candidate.schemaVersion=Math.max(2,candidate.schemaVersion);
    if (object.type === 'wall') {
      check(['side-a', 'side-b'].includes(selection.surfaceId), '请选择墙的一侧');
      object.materials[selection.surfaceId] = input.material;
    } else {object.material = input.material;delete object.surface;if(object.type==='solid')delete object.finish;}
  } else if (input.action === 'move') {
    check(['asset','solid','model'].includes(object.type), '当前只能移动物件或构件');
    object.position[0] = number(input.x, 'X 坐标', 0, 1000);
    object.position[1] = number(input.y, 'Y 坐标', 0, 1000);
    if(input.z!==undefined)object.position[2]=number(input.z,'底部标高/构件原点Z',0,100)+(object.type==='asset'?object.size[2]/2:0);
    if(object.type==='asset')check(!placementBlocked(candidate,object),'家具与墙面、已有家具重叠，或占用了门扇开启和门前空间，请调整位置');
  } else if (input.action === 'transform') {
    check(object.type === 'asset', '请选择家具或展具');
    if(input.x !== undefined)object.position[0]=number(input.x,'X 坐标',0,1000);
    if(input.y !== undefined)object.position[1]=number(input.y,'Y 坐标',0,1000);
    if(input.rotation !== undefined)object.rotation=number(input.rotation,'角度',-360,360)*Math.PI/180;
    if(input.width !== undefined)object.size[0]=number(input.width,'家具宽度',.05,20);
    if(input.depth !== undefined)object.size[1]=number(input.depth,'家具进深',.05,20);
    if(input.z!==undefined)object.position[2]=number(input.z,'底部标高',0,100)+object.size[2]/2;
    if(input.height !== undefined){const base=object.position[2]-object.size[2]/2;object.size[2]=number(input.height,'家具高度',.05,20);object.position[2]=base+object.size[2]/2;}
    check(!placementBlocked(candidate,object),'家具与墙面、已有家具重叠，或占用了门扇开启和门前空间，请调整位置');
  } else if (input.action === 'remove') {
    check(['asset','solid','model'].includes(object.type), '当前仅支持移除物件或构件');
    candidate.objects=candidate.objects.filter(o=>o.id!==object.id);
  } else throw new Error('未支持的编辑操作');
  if(input.action!=='material')invalidateLayoutReview(candidate);
  if(['solid','model'].includes(object.type)&&input.action==='move')for(const asset of candidate.objects.filter(o=>o.type==='asset'))check(!placementBlocked(candidate,asset),`移动构件后与 ${asset.label} (${asset.origin?.key??asset.id}) 冲突，请调整位置`);
  return { scene: validateScene(candidate), changedIds: [object.id] };
}
