import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { ProjectStore } from '../src/store.js';
import { sceneFromProposal, sceneFromCad, proposal, editScene } from '../src/scene.js';

function setup(t) {
  const root = mkdtempSync(join(tmpdir(), 'dsh-interior-unit-'));
  const store = new ProjectStore(root);
  t.after(() => { store.close(); rmSync(root, { recursive: true }); });
  const p = store.create('session-a', '住宅', 'interior', 'create');
  const scene = sceneFromProposal(proposal({kind:'interior',width:6,depth:4,height:2.8,thickness:0.12}), 'trusted-confirmation');
  store.once('session-a','initial',{scene},()=>store.commit('session-a',p.id,0,scene,'initial'));
  return { root, store, p, scene };
}

test('one wall side changes while every other object and side retains its data', () => {
  const scene = sceneFromProposal({kind:'interior',width:6,depth:4,height:2.8,thickness:0.12},'confirmed');
  const wall = scene.objects.find(o=>o.type==='wall');
  const result = editScene(scene,{objectId:wall.id,surfaceId:'side-a'},{action:'material',material:'oak'});
  assert.equal(result.scene.objects.find(o=>o.id===wall.id).materials['side-b'],'plaster');
  assert.deepEqual(result.scene.objects.filter(o=>o.id!==wall.id),scene.objects.filter(o=>o.id!==wall.id));
  assert.equal(wall.materials['side-a'],'plaster');
});

test('open booth sides are not closed and assets reject leaving the site', () => {
  const scene=sceneFromProposal({kind:'booth',width:6,depth:4,height:3,thickness:0.12,openSides:['front','left','right']},'confirmed');
  assert.equal(scene.objects.filter(o=>o.type==='wall').length,1);
  const object=scene.objects.find(o=>o.type==='asset');
  assert.throws(()=>editScene(scene,{objectId:object.id},{action:'move',x:0,y:0}),/边界/);
  assert.throws(()=>proposal({kind:'booth',width:NaN,depth:4,height:3,thickness:0.12}),/宽度/);
});

test('receipts, expected versions, writer ownership and selection expiry reject conflicting writes', t=>{
  const {store,p,scene}=setup(t), wall=scene.objects.find(o=>o.type==='wall');
  const selection=store.select('session-a',p.id,1,wall.id,'side-a');
  const candidate=editScene(scene,selection,{action:'material',material:'oak'}).scene;
  const run=()=>store.once('session-a','edit',{candidate},()=>store.commit('session-a',p.id,1,candidate,'edit'));
  const first=run();assert.deepEqual(run(),first);assert.equal(store.project(p.id).revision,2);
  assert.throws(()=>store.once('session-a','edit',{different:true},()=>null),/不同请求/);
  assert.throws(()=>store.assertWriter('session-a',p.id,1),/版本/);
  assert.throws(()=>store.selection('session-a',p.id,2,selection.token),/过期/);
  store.bind('session-b',p.id);
  assert.throws(()=>store.assertWriter('session-b',p.id,2),/其他聊天/);
});

test('20 edits undo and redo to exact semantic states and survive reopening', t=>{
  const {store,p,scene,root}=setup(t), wall=scene.objects.find(o=>o.type==='wall');
  let current=scene;
  const states=[scene];
  for(let i=0;i<20;i++) {
    current=editScene(current,{objectId:wall.id,surfaceId:'side-a'},{action:'material',material:i%2?'blue':'oak'}).scene;
    store.once('session-a',`edit-${i}`,{i},()=>store.commit('session-a',p.id,i+1,current,`edit-${i}`));states.push(current);
  }
  for(let i=19;i>=0;i--) {
    store.history('session-a',p.id,store.project(p.id).revision,'undo',`undo-${i}`);
    assert.deepEqual(store.read(p.id),states[i]);
  }
  for(let i=1;i<=20;i++) {
    store.history('session-a',p.id,store.project(p.id).revision,'redo',`redo-${i}`);
    assert.deepEqual(store.read(p.id),states[i]);
  }
  const second=new ProjectStore(root);
  assert.deepEqual(second.read(p.id),current);second.close();
});

test('a corrupt snapshot and a symlink are refused, with current pointer preserved',t=>{
  const {store,p}=setup(t), row=store.db.prepare('SELECT path FROM revisions WHERE project=?').get(p.id);
  writeFileSync(store.dir(p.id,row.path),'corrupt');
  assert.throws(()=>store.read(p.id),/校验失败/);
  assert.equal(store.project(p.id).revision,1);
  symlinkSync(tmpdir(),store.dir(p.id,'escape'));
  assert.throws(()=>store.dir(p.id,'escape','outside'),/符号链接/);
});

test('CAD calibration exposes unit conflicts, preserves origin and rejects unconfirmed unknown units',()=>{
  const report={id:randomUUID(),fileHash:'a'.repeat(64),unit:'mm',origin:[100000,200000],extents:[100000,200000,106000,204000],
    walls:[{a:[100000,200000],b:[106000,200000],source:{handle:'A'}}],openings:[],blocking:[]};
  const input={unit:'mm',height:2.8,thickness:0.12};
  const scene=sceneFromCad(report,input,'confirmed');assert.deepEqual(scene.objects[0].b,[6,0]);
  assert.throws(()=>sceneFromCad(report,{...input,knownLength:12},'confirmed'),/冲突/);
  assert.throws(()=>sceneFromCad({...report,unit:null},input,'confirmed'),/已知长度/);
  assert.equal(sceneFromCad(report,{...input,knownLength:12,acceptScaleConflict:true},'confirmed').cad.scale,0.002);
});
