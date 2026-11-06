import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,writeFileSync,readFileSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {Studio} from '../src/studio.js';
import {sceneFromProposal} from '../src/scene.js';

function fixture(t,{cadFailure=false,holdCad=false}={}) {
  const root=mkdtempSync(join(tmpdir(),'dsh-cad-first-')),calls=[];let release;
  const engine={dispose:async()=>{},request:async command=>{
    calls.push(command.action);
    if(command.action==='drawing-sheets') {
      if(holdCad)await new Promise(resolve=>{release=resolve;});
      if(cadFailure)throw Error('CAD generation failed');
      assert.equal(command.sheets.length,5);writeFileSync(join(command.output,'drawings.dxf'),'CAD complete');return {};
    }
    assert.ok(['build','render-existing'].includes(command.action));assert.equal(readFileSync(command.cadPath??join(command.output,'plan.dxf'),'utf8'),'CAD complete');
    assert.match(command.cadHash,/^[a-f0-9]{64}$/);
    if(command.action==='build')for(const file of ['scene.glb','scene.blend'])writeFileSync(join(command.output,file),file);
    const views=command.views.map((id,i)=>({id,file:i?`render-${id}.png`:'render.png'}));
    for(const view of views)writeFileSync(join(command.output,view.file),'image');
    return {views,poseAudit:{basis:'fixture',passed:true,objects:[]},componentAudit:{passed:true,objects:[]}};
  }};
  const studio=new Studio(root,engine),p=studio.store.create('writer','Pipeline','booth','create');
  const initial=sceneFromProposal({kind:'booth',width:6,depth:4,height:3,thickness:.12,openSides:['front']},'test');
  initial.objects=initial.objects.filter(o=>o.type!=='asset');
  initial.design={drawingId:'initial',name:'Pipeline',dimensionBasis:'site',assumptions:[]};
  studio.store.commit('writer',p.id,0,initial,'initial');
  t.after(async()=>{await studio.dispose();rmSync(root,{recursive:true,force:true});});
  const wait=async receipt=>{await studio.running.get(receipt.taskId)?.done;return studio.snapshot('writer').tasks.find(t=>t.id===receipt.taskId);};
  return {studio,p,root,calls,wait,release:()=>release?.()};
}

test('3D waits for all CAD sheets and rendering reuses only that verified CAD revision',async t=>{
  const f=fixture(t,{holdCad:true}),build=f.studio.startBuild('writer',{expectedRevision:1},'model');
  await new Promise(resolve=>setImmediate(resolve));
  while(!f.calls.length)await new Promise(resolve=>setImmediate(resolve));
  assert.deepEqual(f.calls,['drawing-sheets']);assert.equal(f.studio.snapshot('writer').workflow.modelReady,false);
  f.release();const completed=await f.wait(build);assert.equal(completed.state,'complete');
  assert.deepEqual(f.calls,['drawing-sheets','build']);assert.equal(completed.detail.cadAudit.views.length,5);
  assert.equal(f.studio.snapshot('writer').workflow.modelReady,true);
  const render=await f.wait(f.studio.startBuild('writer',{expectedRevision:1},'render',true));
  assert.equal(render.state,'complete');assert.deepEqual(f.calls,['drawing-sheets','build','render-existing']);
  assert.equal(render.detail.cadAudit.sceneHash,completed.detail.cadAudit.sceneHash);
});

test('a failed CAD stage never starts a model and removes unfinished outputs',async t=>{
  const f=fixture(t,{cadFailure:true}),receipt=f.studio.startBuild('writer',{expectedRevision:1},'fail');
  const task=await f.wait(receipt);assert.equal(task.state,'failed');assert.deepEqual(f.calls,['drawing-sheets']);
  assert.ok(!existsSync(join(f.root,f.p.id,'staging',receipt.taskId)));assert.equal(f.studio.snapshot('writer').workflow.modelReady,false);
});

test('CAD changing during preparation prevents publishing an obsolete model',async t=>{
  const f=fixture(t,{holdCad:true}),receipt=f.studio.startBuild('writer',{expectedRevision:1},'old');
  while(!f.calls.length)await new Promise(resolve=>setImmediate(resolve));
  f.studio.store.commit('writer',f.p.id,1,f.studio.store.read(f.p.id),'new-cad');f.release();
  const task=await f.wait(receipt);assert.equal(task.state,'failed');assert.match(task.detail.message,/CAD 版本/);
  assert.deepEqual(f.calls,['drawing-sheets']);assert.equal(f.studio.store.project(f.p.id).revision,2);
});

test('pending CAD and material-only revisions cannot bypass CAD-first through render',async t=>{
  const f=fixture(t);await f.wait(f.studio.startBuild('writer',{expectedRevision:1},'model'));
  const value=f.studio.store.read(f.p.id);
  f.studio.store.db.prepare('INSERT INTO proposals VALUES(?,?)').run(f.p.id,JSON.stringify({type:'drawing',drawingId:'pending',baseRevision:1,scene:value}));
  assert.throws(()=>f.studio.startBuild('writer',{expectedRevision:1},'skip-draft'),/CAD 草案/);
  assert.throws(()=>f.studio.startBuild('writer',{expectedRevision:1},'skip-draft-render',true),/CAD 草案/);
  assert.equal(f.studio.snapshot('writer').workflow.modelReady,false);
  f.studio.store.db.prepare('DELETE FROM proposals WHERE project=?').run(f.p.id);
  value.objects.find(o=>o.type==='wall').materials['side-a']='oak';
  f.studio.store.commit('writer',f.p.id,1,value,'finish-change');
  assert.throws(()=>f.studio.startBuild('writer',{expectedRevision:2,cadAudit:{passed:true}},'skip-cad',true),/先生成当前版本/);
  assert.equal(f.studio.snapshot('writer').workflow.cadReady,false);
});

test('a corrupted CAD drawing set is rejected before the render engine runs',async t=>{
  const f=fixture(t),built=await f.wait(f.studio.startBuild('writer',{expectedRevision:1},'model'));
  writeFileSync(join(f.root,f.p.id,built.detail.relativePath,'plan.dxf'),'tampered');
  const task=await f.wait(f.studio.startBuild('writer',{expectedRevision:1},'render',true));
  assert.equal(task.state,'failed');assert.match(task.detail.message,/CAD 图册校验失败/);
  assert.deepEqual(f.calls,['drawing-sheets','build']);
});

test('legacy complete models without a CAD record remain readable but cannot render',t=>{
  const f=fixture(t);
  f.studio.store.db.prepare('INSERT INTO tasks VALUES(?,?,?,?,?)').run('legacy-model',f.p.id,1,'complete',JSON.stringify({render:false,files:{'scene.glb':{}},meshAudit:{passed:true}}));
  assert.equal(f.studio.snapshot('writer').tasks[0].id,'legacy-model');
  assert.equal(f.studio.snapshot('writer').workflow.modelReady,false);
  assert.throws(()=>f.studio.startBuild('writer',{expectedRevision:1},'render',true),/须先完成 CAD/);
  assert.deepEqual(f.calls,[]);
});
