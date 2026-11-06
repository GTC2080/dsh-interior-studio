import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtempSync,rmSync,existsSync,readdirSync,readFileSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {Studio} from '../src/studio.js';
import {drawingScene,drawingReport} from '../src/drawing.js';
import {editScene} from '../src/scene.js';

const root=fileURLToPath(new URL('../',import.meta.url));
const python=join(root,'runtime/Blender.app/Contents/Resources/4.5/python/bin/python3.11');
const plan=()=>JSON.parse(readFileSync(join(root,'fixtures/design-plan.json'),'utf8'));

function setup(t) {
  const directory=mkdtempSync(join(tmpdir(),'dsh-drawing-test-'));let calls=0;
  const engine={dispose:async()=>{},request:async command=>{
    calls++;
    return JSON.parse(execFileSync(python,['-c',`
import sys,json
from pathlib import Path
sys.dont_write_bytecode=True;sys.path[:0]=['runtime/vendor','worker']
from drawing import prepare_drawing
c=json.load(sys.stdin);print(json.dumps(prepare_drawing(c['scene'],c['drawingId'],Path(c['output']))))
`],{cwd:root,input:JSON.stringify(command),env:{...process.env,PYTHONNOUSERSITE:'1',PYTHONDONTWRITEBYTECODE:'1',EZDXF_DISABLE_C_EXT:'1',XDG_CACHE_HOME:join(directory,'cache')},maxBuffer:3*1024*1024,stdio:['pipe','pipe','pipe']}));
  }};
  const studio=new Studio(directory,engine);
  t.after(async()=>{await studio.dispose();rmSync(directory,{recursive:true,force:true});});
  return {studio,directory,engine,calls:()=>calls};
}

test('redrawing never removes unknown customer files added beside a working draft',async t=>{
  const {studio}=setup(t),input=plan();
  const first=await studio.draw('user',input,'first'),path=studio.store.dir(first.projectId,'drafts',first.drawingId,'customer.txt');
  writeFileSync(path,'Preserve customer content');
  const second=await studio.draw('user',input,'second');
  assert.match(second.warning,/已保留/);assert.equal(readFileSync(path,'utf8'),'Preserve customer content');
  assert.equal(studio.snapshot('user').proposal.drawingId,second.drawingId);
});

test('automatic and manual draft cleanup preserve a modified source JSON',async t=>{
  const {studio}=setup(t),first=await studio.draw('user',plan(),'first');
  const path=studio.store.dir(first.projectId,'drafts',first.drawingId,'scene.json'),modified=JSON.parse(readFileSync(path,'utf8'));
  modified.design.assumptions.push('Customer edit outside the plugin');writeFileSync(path,JSON.stringify(modified));
  const confirmed=studio.confirm('user',{expectedRevision:0,drawingId:first.drawingId,acceptDrawing:true},'confirm');
  assert.ok(existsSync(path));assert.match(confirmed.warning,/源文件已修改/);
  const preview=studio.cleanupPlan('user',{expectedRevision:1});
  assert.ok(!preview.entries.some(e=>e.relative==='drafts/'+first.drawingId));
  assert.ok(preview.skipped.some(e=>/源文件已修改/.test(e.reason)));
  assert.equal(JSON.parse(readFileSync(path,'utf8')).design.assumptions.at(-1),'Customer edit outside the plugin');
});

test('explicit retirement of a saved condition still needs separate trusted acceptance',async t=>{
  const {studio}=setup(t),input=plan();
  input.constraints={requirements:[{id:'limit',source:'Customer height limit',basis:'user_request',scope:'scene',property:'top_z',operator:'max',expected:3}]};
  const first=await studio.draw('user',input,'first');studio.confirm('user',{expectedRevision:0,drawingId:first.drawingId,acceptDrawing:true},'confirm');
  const second=await studio.draw('user',{...input,expectedRevision:1,constraints:{remove:{requirements:['limit']}}},'retire');
  assert.equal(second.summary.constraintChanges[0].proposed,null);
  assert.throws(()=>studio.confirm('user',{expectedRevision:1,drawingId:second.drawingId,acceptDrawing:true},'without-separate-acceptance'),/要求有变更/);
  studio.confirm('user',{expectedRevision:1,drawingId:second.drawingId,acceptDrawing:true,acceptConstraintChanges:true},'accept-retirement');
  assert.equal(studio.store.read(first.projectId).design.constraints.requirements.length,0);
});

test('an agent design produces editable DXF and waits for explicit confirmation',async t=>{
  const {studio,calls}=setup(t),input=plan();
  const brief=studio.brief('user',{name:input.name,kind:input.kind,expectedRevision:0,constraints:{}},'brief',true);
  studio.confirm('user',{expectedRevision:0,briefId:brief.briefId,acceptBrief:true},'confirm-brief');
  const result=await studio.draw('user',input,'draw',undefined,true);
  const snap=studio.snapshot('user');assert.equal(snap.project.revision,0);assert.equal(snap.scene,null);
  assert.equal(snap.proposal.type,'drawing');assert.equal(snap.report.generated,true);assert.equal(snap.report.rooms.length,2);
  assert.deepEqual(snap.proposal.summary.rooms.map(r=>r.area),[24,24]);
  assert.equal(snap.proposal.summary.doors,2);assert.equal(snap.proposal.summary.windows,1);
  assert.equal(studio.context('user').sharing,'disabled');
  const downloaded=await studio.ui('user','drawing-artifact',{drawingId:result.drawingId},'download');
  assert.ok(Buffer.from(downloaded.base64,'base64').toString().includes('SECTION'));
  assert.throws(()=>studio.startBuild('user',{expectedRevision:0},'premature',true),/尚未|场景/);
  assert.throws(()=>studio.confirm('user',{expectedRevision:0,drawingId:result.drawingId},'not-confirmed'),/核对/);
  const confirmed=studio.confirm('user',{expectedRevision:0,drawingId:result.drawingId,acceptDrawing:true},'confirmed');
  const current=studio.store.read(result.projectId);assert.equal(confirmed.revision,1);
  assert.equal(current.parameters.status,'user_confirmed');assert.ok(current.objects.every(o=>o.origin.acceptedBy==='user'));
  assert.equal(studio.snapshot('user').proposal,null);assert.equal(studio.snapshot('user').report.rooms.length,2);
  assert.deepEqual(await studio.draw('user',input,'draw',undefined,true),result);assert.equal(calls(),1);
});

test('an empty project can be drawn without disclosing an existing design or granting read access',async t=>{
  const {studio}=setup(t);const p=studio.store.create('user','private-project-label','interior','empty');
  const context=studio.context('user');assert.equal(context.permissions.canDrawNewDesign,true);
  assert.equal(context.permissions.canReadExistingDesign,false);assert.equal(context.scene,undefined);
  assert.equal(context.project.revision,0);assert.ok(!JSON.stringify(context).includes('private-project-label'));
  studio.store.bind('reader',p.id);assert.equal(studio.context('reader').permissions.canDrawNewDesign,false);
  await studio.propose('user',{kind:'interior',width:8,depth:6,height:2.8,thickness:.2},'private-proposal');
  assert.equal(studio.context('user').sharing,'disabled');
});

test('outside dimensions are checked against wall geometry and net dimensions exclude both wall halves',async t=>{
  const {studio}=setup(t),input=plan();input.dimensionBasis='outside';
  await assert.rejects(studio.draw('user',input,'bad-extent'),/尺寸不一致.*8.200/);
  for(const wall of input.walls)wall.points=wall.points.map(([x,y])=>[x===0?.1:x===8?7.9:x===4?5:x,y===0?.1:y===6?5.9:y]);
  input.openings[2].start=.5;input.openings[2].width=1.5;input.furniture[1].x=6.45;
  const result=await studio.draw('user',input,'outside');const rooms=result.summary.measurements.rooms;
  assert.deepEqual(rooms.map(r=>[r.clear.width,r.clear.depth,r.clear.area]),[[4.7,5.6,26.32],[2.7,5.6,15.12]]);
  assert.equal(result.summary.measurements.dimensionBasis,'outside');assert.deepEqual(result.summary.measurements.issues,[]);
  const file=studio.store.dir(result.projectId,'drafts',result.drawingId,'plan.dxf');
  const dimensions=JSON.parse(execFileSync(python,['-c',`import sys,json;sys.dont_write_bytecode=True;sys.path.insert(0,'runtime/vendor');import ezdxf;d=ezdxf.readfile(sys.argv[1]);a=d.audit();assert not a.errors and not a.fixes;text=[e.text for e in d.modelspace().query('MTEXT[layer=="ROOMS"]')];assert any('Net area: 26.32' in s for s in text) and any('Net area: 15.12' in s for s in text);print(json.dumps([round(e.get_measurement(),3) for e in d.modelspace().query('DIMENSION')]))`,file],{cwd:root,env:{...process.env,PYTHONDONTWRITEBYTECODE:'1',XDG_CACHE_HOME:studio.store.root}}));
  assert.deepEqual(dimensions.sort((a,b)=>a-b),[2.7,4.7,5.6,5.6,6,8]);
});

test('a door swing or approach cannot be occupied even when furniture does not touch a wall',async t=>{
  const {studio}=setup(t),input=plan();input.furniture=[{asset:'chair',x:1.5,y:.65}];
  await assert.rejects(studio.draw('user',input,'blocked-door'),/门扇开启/);
  input.furniture=[{asset:'chair',x:1.8,y:.8}];
  await assert.rejects(studio.draw('user',input,'swing'),/门扇开启/);
  input.furniture=[];const result=await studio.draw('user',input,'clear');
  studio.confirm('user',{expectedRevision:0,drawingId:result.drawingId,acceptDrawing:true},'confirm');
  assert.throws(()=>studio.furnish('user',{asset:'chair',x:1.5,y:.65,expectedRevision:1},'place'),/门扇开启/);
});

test('room connections and furniture-blocked routes return explicit layout findings',async t=>{
  const {studio}=setup(t),input=plan();input.furniture=[];input.openings=input.openings.filter(o=>o.wall!=='partition');
  let result=await studio.draw('user',input,'sealed');assert.ok(result.summary.measurements.issues.some(i=>i.code==='disconnected_room'));
  input.openings=plan().openings;input.furniture=[{asset:'bookcase',x:2.6,y:3,width:.3,depth:5.5,height:1.8}];
  result=await studio.draw('user',input,'blocked-path');assert.ok(result.summary.measurements.issues.some(i=>i.code==='blocked_route'));
  input.furniture=plan().furniture;result=await studio.draw('user',input,'repaired');assert.deepEqual(result.summary.measurements.issues,[]);
  studio.confirm('user',{expectedRevision:0,drawingId:result.drawingId,acceptDrawing:true},'confirm');
  const scene=studio.store.read(result.projectId),sofa=scene.objects.find(o=>o.asset==='sofa');
  const edited=editScene(scene,{objectId:sofa.id},{action:'move',x:2,y:4}).scene;
  assert.equal(edited.design.review.circulation.status,'needs_recheck');assert.equal(edited.design.review.rooms[0].clear.width,3.8);
});

test('replacing a CAD draft rejects stale confirmation and removes only the old temporary draft',async t=>{
  const {studio}=setup(t);const first=await studio.draw('user',plan(),'first');
  const oldPath=studio.store.dir(first.projectId,'drafts',first.drawingId);
  const second=await studio.draw('user',{...plan(),assumptions:['修订后的布局建议']},'second');
  assert.equal(existsSync(oldPath),false);
  assert.throws(()=>studio.confirm('user',{expectedRevision:0,drawingId:first.drawingId,acceptDrawing:true},'stale'),/草案已变化/);
  assert.equal(studio.snapshot('user').project.revision,0);
  assert.equal(readdirSync(studio.store.dir(first.projectId,'drafts')).length,1);
  assert.equal(studio.snapshot('user').proposal.drawingId,second.drawingId);
});

test('invalid layout, furniture collisions and cancellation leave the saved draft intact',async t=>{
  const {studio}=setup(t);const first=await studio.draw('user',plan(),'valid');
  const collision=plan();collision.furniture[0].x=4;
  await assert.rejects(studio.draw('user',collision,'collision'),/重叠/);
  const open=plan();open.walls=open.walls.filter(w=>w.key!=='west');open.rooms=[];
  await assert.rejects(studio.draw('user',open,'open'),/闭合房间/);
  const abort=new AbortController();abort.abort();
  await assert.rejects(studio.draw('user',plan(),'aborted',abort.signal));
  assert.equal(studio.snapshot('user').proposal.drawingId,first.drawingId);
  assert.deepEqual(readdirSync(studio.store.dir(first.projectId,'staging')),[]);
  assert.equal(readdirSync(studio.store.dir(first.projectId,'drafts')).length,1);
});

test('drawing validation and plan projection retain dimensions and reflect furniture edits',()=>{
  const data=plan();const scene=drawingScene(data);scene.design.drawingId='test';
  assert.throws(()=>drawingScene({...data,walls:[...data.walls,data.walls[0]]}),/唯一/);
  assert.throws(()=>drawingScene({...data,openings:[{wall:'missing',kind:'door',start:0,width:1,top:2}]}),/不存在/);
  assert.throws(()=>drawingScene({...data,furniture:[{asset:'__proto__',x:1,y:1}]}),/目录/);
  const sofa=scene.objects.find(o=>o.asset==='sofa'),before=drawingReport(scene);
  const changed=editScene(scene,{objectId:sofa.id},{action:'transform',x:2,y:4}).scene;
  const after=drawingReport(changed);assert.notDeepEqual(after.references,before.references);
  assert.deepEqual(after.walls,before.walls);assert.deepEqual(after.openings,before.openings);
});

test('curved-window CAD exports circular glazing instead of a straight chord',async t=>{
  const {studio}=setup(t);const input={...plan(),width:6,depth:6,walls:[{key:'circle',arc:{center:[3,3],radius:3,startDegrees:0,sweepDegrees:360}}],
    openings:[{wall:'circle',kind:'window',start:Math.PI*350/60,width:Math.PI/3,sill:.9,top:2.1,wrap:true}],
    rooms:[{name:'圆形空间',point:[3,3]}],furniture:[]};
  const result=await studio.draw('user',input,'circle');
  const path=studio.store.dir(result.projectId,'drafts',result.drawingId,'plan.dxf');
  const types=JSON.parse(execFileSync(python,['-c',"import sys,json;sys.dont_write_bytecode=True;sys.path.insert(0,'runtime/vendor');import ezdxf;d=ezdxf.readfile(sys.argv[1]);print(json.dumps([e.dxftype() for e in d.modelspace() if e.dxf.layer=='A-WINDOW']))",path],{cwd:root,env:{...process.env,PYTHONNOUSERSITE:'1',PYTHONDONTWRITEBYTECODE:'1',EZDXF_DISABLE_C_EXT:'1'}}));
  assert.deepEqual(types,['ARC','ARC','ARC']);
});

test('a replacement draft cannot render or overwrite a scene edited while drawing was running',async t=>{
  const {studio,engine}=setup(t),first=await studio.draw('user',plan(),'first');
  studio.confirm('user',{expectedRevision:0,drawingId:first.drawingId,acceptDrawing:true},'confirm');
  await studio.draw('user',{...plan(),expectedRevision:1},'replacement');
  assert.throws(()=>studio.startBuild('user',{expectedRevision:1},'unconfirmed-render',true),/草案尚未确认/);
  const previous=studio.snapshot('user').proposal.drawingId;
  const execute=engine.request;let release;
  const gate=new Promise(resolve=>{release=resolve;});engine.request=async command=>{await gate;return execute(command);};
  const work=studio.draw('user',{...plan(),expectedRevision:1},'concurrent');
  const floor=studio.snapshot('user').scene.objects.find(o=>o.type==='floor');
  const selection=studio.store.select('user',first.projectId,1,floor.id);
  studio.edit('user',{expectedRevision:1,selectionToken:selection.token,action:'material',material:'concrete'},'local-edit');
  release();await assert.rejects(work,/版本/);
  assert.equal(studio.snapshot('user').project.revision,2);
  assert.equal(studio.snapshot('user').proposal.drawingId,previous);
  assert.equal(studio.snapshot('user').proposal.stale,true);
  assert.equal(studio.snapshot('user').scene.objects.find(o=>o.id===floor.id).material,'concrete');
});
