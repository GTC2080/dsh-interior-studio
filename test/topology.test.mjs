import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
import {sceneFromCad,validateScene,furnishScene,editScene} from '../src/scene.js';
import {wallLength,polygonArea} from '../src/geometry.js';

const root=fileURLToPath(new URL('../',import.meta.url));
const reports=JSON.parse(execFileSync(join(root,'runtime/Blender.app/Contents/Resources/4.5/python/bin/python3.11'),['-c',`
import sys,os,tempfile,hashlib,json
from pathlib import Path
sys.dont_write_bytecode=True;sys.path[:0]=['runtime/vendor','worker','test']
from cad import parse_file
from cad_cases import create_cases
with tempfile.TemporaryDirectory(prefix='dsh-cad-host-unit-') as temporary:
 reports={}
 for name,file in create_cases(Path(temporary)).items():
  options={'wallMode':'paired'} if name.startswith('paired-') else {}
  reports[name]=parse_file(file,dict(importId=name,fileHash=hashlib.sha256(file.read_bytes()).hexdigest(),options=options))
 print(json.dumps(reports))
`],{cwd:root,env:{...process.env,PYTHONNOUSERSITE:'1',PYTHONDONTWRITEBYTECODE:'1',EZDXF_DISABLE_C_EXT:'1'},maxBuffer:2*1024*1024}));
const input={unit:'m',height:2.8,thickness:.2,doorHeight:2.1,windowSill:.9,windowTop:2.1};
const build=(name,extra={})=>sceneFromCad(reports[name],{...input,...extra},'ui-confirmation');

test('CAD curves, door heights and separate room floors survive Host conversion',()=>{
  const scene=build('curved-room.dxf');assert.equal(scene.schemaVersion,3);
  const arc=scene.objects.find(o=>o.arc);assert.ok(arc.path.length>30);
  assert.ok(Math.abs(wallLength(arc)-3*Math.PI)<1e-8);
  assert.ok(Math.abs(arc.openings[0].width-Math.PI)<1e-8);
  assert.equal(arc.openings[0].sill,.9);assert.equal(arc.openings[0].top,2.1);
  assert.equal(scene.objects.filter(o=>o.type==='floor').length,2);
  assert.equal(scene.objects.filter(o=>o.type==='wall').flatMap(w=>w.openings).length,3);
  const index=reports['curved-room.dxf'].walls.findIndex(w=>w.arc);
  const calibrated=build('curved-room.dxf',{calibrationIndex:index,knownLength:3*Math.PI});
  assert.equal(calibrated.cad.scale,1);
  assert.throws(()=>build('curved-room.dxf',{windowSill:2.2,windowTop:2.1}),/高度/);
});

test('opening gap bridges retain lintels, require type confirmation, and can stay reference-only',()=>{
  const scene=build('paired-curved-gap.dxf');assert.equal(scene.cad.roomCount,1);
  const bridges=scene.objects.filter(o=>o.origin.category==='inferred_opening_bridge');
  assert.equal(bridges.length,2);
  assert.ok(bridges.every(w=>w.openings.length===1 && Math.abs(w.openings[0].width-wallLength(w))<1e-7));
  assert.throws(()=>build('shared-opening-layer.dxf'),/请确认第 1 处洞口/);
  assert.equal(build('shared-opening-layer.dxf',{openingOverrides:{0:'window'}}).objects.flatMap(o=>o.openings??[])[0].sill,.9);
  assert.equal(build('shared-opening-layer.dxf',{openingOverrides:{0:'ignore'}}).objects.flatMap(o=>o.openings??[]).length,0);
  assert.equal(build('paired-curved-gap.dxf',{openingOverrides:{0:'ignore'}}).cad.roomCount,0);
  assert.throws(()=>build('shared-opening-layer.dxf',{openingOverrides:{99:'door'}}),/编号/);
});

test('concave floors and nested holes do not fill exterior space or an excluded courtyard',()=>{
  const concave=build('concave-room.dxf'),floor=concave.objects.find(o=>o.type==='floor');
  assert.equal(floor.area,20);assert.equal(polygonArea(floor.polygon),20);
  assert.throws(()=>furnishScene(concave,{asset:'chair',x:4,y:4},'confirmed'),/范围|重叠/);
  const courtyard=build('nested-courtyard.dxf',{excludedRooms:[1]});
  const floors=courtyard.objects.filter(o=>o.type==='floor');assert.equal(floors.length,1);assert.equal(floors[0].area,74);assert.equal(floors[0].holes.length,1);
  assert.throws(()=>furnishScene(courtyard,{asset:'chair',x:4.5,y:4},'confirmed'),/范围|重叠/);
  assert.equal(build('unexplained-gap.dxf').objects.filter(o=>o.type==='floor').length,0);
  assert.throws(()=>build('nested-courtyard.dxf',{excludedRooms:[-1]}),/房间选择/);
});

test('curved-wall placement and material edits keep scene format 3',()=>{
  let scene=build('curved-room.dxf');
  assert.throws(()=>furnishScene(scene,{asset:'chair',x:8.8,y:.5},'confirmed'),/范围|重叠/);
  scene=furnishScene(scene,{asset:'chair',x:7.5,y:3},'confirmed').scene;
  assert.equal(scene.schemaVersion,3);
  const floor=scene.objects.find(o=>o.type==='floor');
  scene=editScene(scene,{objectId:floor.id},{action:'material',material:'wood-floor'}).scene;
  assert.equal(scene.schemaVersion,3);assert.equal(validateScene(scene),scene);
});

test('invalid paths, self-intersecting floors and corrupted room areas are rejected',()=>{
  const scene=build('curved-room.dxf'),bad=structuredClone(scene);
  bad.objects.find(o=>o.arc).arc.radius=1;
  assert.throws(()=>validateScene(bad),/圆弧与路径/);
  const altered=build('concave-room.dxf');altered.objects.find(o=>o.type==='floor').area+=1;
  assert.throws(()=>validateScene(altered),/面积/);
  const crossing=build('concave-room.dxf');crossing.objects.find(o=>o.type==='floor').polygon=[[0,0],[4,4],[0,4],[4,0]];
  assert.throws(()=>validateScene(crossing),/自交|退化/);
  assert.equal(build('mirrored-bulge.dxf').cad.roomCount,1);
  assert.equal(build('ellipse-room.dxf').cad.roomCount,1);
});

test('a window crossing a circular wall origin cuts the short interval',()=>{
  const scene=build('circular-window.dxf'),wall=scene.objects.find(o=>o.type==='wall');
  assert.equal(wall.openings.length,1);assert.equal(wall.openings[0].wrap,true);
  assert.ok(Math.abs(wall.openings[0].width-Math.PI/3)<1e-7);
  assert.equal(validateScene(scene),scene);
});
