import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,existsSync} from 'node:fs';
import {writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {Scene,Mesh,BoxGeometry,MeshStandardMaterial,Texture} from 'three';
import {sceneFromProposal,furnishScene,editScene,validateScene,sceneFromCad} from '../src/scene.js';
import {Studio} from '../src/studio.js';
import {disposeModel} from '../src/viewport-resources.js';

const room=()=>sceneFromProposal({kind:'interior',width:6,depth:4,height:2.8,thickness:.12},'room-confirmed');
function setup(t,engine={dispose:async()=>{}}) {
  const root=mkdtempSync(join(tmpdir(),'dsh-mac-furniture-'));
  const studio=new Studio(root,engine),p=studio.store.create('user','test','interior','create');
  studio.store.once('user','confirm',{},()=>studio.store.commit('user',p.id,0,room(),'confirm'));
  t.after(async()=>{await studio.dispose();rmSync(root,{recursive:true,force:true});});
  return {studio,p,root};
}

test('catalog furniture creates a new-version scene while preserving the existing objects',()=>{
  const original=room(),{scene,objectId}=furnishScene(original,{asset:'sofa'},'room-confirmed');
  assert.equal(scene.schemaVersion,2);
  assert.equal(original.objects.length+1,scene.objects.length);
  assert.deepEqual(scene.objects.filter(o=>o.id!==objectId),original.objects);
  assert.throws(()=>furnishScene(original,{asset:'../../outside'},'confirmed'),/目录/);
  assert.throws(()=>furnishScene(original,{asset:'sofa',x:3,y:0},'confirmed'),/重叠/);
  assert.throws(()=>editScene(scene,{objectId},{action:'transform',x:.6,rotation:90}),/边界|重叠/);
  const changed=editScene(scene,{objectId},{action:'transform',x:3,y:2,rotation:90,width:1.8});
  assert.deepEqual(changed.scene.objects.filter(o=>o.id!==objectId),original.objects);
  assert.throws(()=>editScene(scene,{objectId:original.objects[0].id},{action:'remove'}),/仅支持/);
});

test('consecutive edits retain the selected object with a fresh token; removal is undoable',t=>{
  const {studio,p}=setup(t);
  const result=studio.furnish('user',{expectedRevision:1,asset:'chair'},'add');
  assert.deepEqual(studio.furnish('user',{expectedRevision:1,asset:'chair'},'add'),result);
  let selection=studio.snapshot('user').selection;
  const old=selection.token;
  studio.edit('user',{expectedRevision:2,selectionToken:old,action:'transform',x:3,y:2},'move');
  selection=studio.snapshot('user').selection;
  assert.equal(selection.objectId,result.objectId);assert.notEqual(selection.token,old);
  assert.throws(()=>studio.edit('user',{expectedRevision:3,selectionToken:old,action:'remove'},'stale'),/过期/);
  const before=studio.store.read(p.id);
  studio.edit('user',{expectedRevision:3,selectionToken:selection.token,action:'remove'},'remove');
  assert.ok(!studio.store.read(p.id).objects.some(o=>o.id===result.objectId));
  studio.store.history('user',p.id,4,'undo','undo');assert.deepEqual(studio.store.read(p.id),before);
  assert.throws(()=>studio.furnish('user',{expectedRevision:5,asset:'chair'},'model-add',true),/授权/);
});

test('failed renders discard unpublished files while keeping the committed scene',async t=>{
  let staging;
  const engine={dispose:async()=>{},request:async command=>{
    if(command.action==='drawing-sheets'){await writeFile(join(command.output,'drawings.dxf'),'CAD');return {};}
    if(!command.render){
      for(const file of ['scene.glb','scene.blend'])await writeFile(join(command.output,file),file);
      return {poseAudit:{passed:true,objects:[]},componentAudit:{passed:true,objects:[]}};
    }
    staging=command.output;await writeFile(join(staging,'partial.blend'),'partial');throw Error('renderer failed');
  }};
  const {studio,p}=setup(t,engine);const before=studio.store.read(p.id);
  const built=studio.startBuild('user',{expectedRevision:1},'model');await studio.running.get(built.taskId).done;
  assert.equal(studio.snapshot('user').tasks[0].state,'complete');
  const task=studio.startBuild('user',{expectedRevision:1},'render',true);
  await studio.running.get(task.taskId).done;
  assert.equal(studio.snapshot('user').tasks[0].state,'failed');assert.equal(existsSync(staging),false);
  assert.deepEqual(studio.store.read(p.id),before);assert.equal(studio.running.size,0);
  assert.throws(()=>studio.startBuild('user',{expectedRevision:1,projectId:'other'},'wrong'),/工程已变化/);
});

test('shared GLB textures, decoded images and geometry are released exactly once',()=>{
  const model=new Scene(),material=new MeshStandardMaterial(),texture=new Texture();
  let closed=0,disposed=0,geometryDisposed=0,materialDisposed=0;
  texture.image={close:()=>{closed++;}};texture.addEventListener('dispose',()=>{disposed++;});
  material.map=texture;material.normalMap=texture;material.addEventListener('dispose',()=>{materialDisposed++;});
  const geometry=new BoxGeometry();geometry.addEventListener('dispose',()=>{geometryDisposed++;});
  model.add(new Mesh(geometry,material),new Mesh(geometry,material));disposeModel(model);
  assert.deepEqual([closed,disposed,geometryDisposed,materialDisposed],[1,1,1,1]);
});

test('partial CAD reconstruction requires explicit acceptance and preserves measured wall widths',()=>{
  const report={id:'test',fileHash:'a'.repeat(64),unit:'m',origin:[0,0],extents:[0,0,6,4],blocking:[],openings:[],
    requiresPartialConfirmation:true,settings:{wallMode:'paired'},walls:[{a:[0,0],b:[6,0],thickness:.2,source:{handle:'A'}}]};
  const input={unit:'m',height:2.8,thickness:.12};
  assert.throws(()=>sceneFromCad(report,input,'confirmed'),/部分墙边线/);
  const scene=sceneFromCad(report,{...input,acceptPartial:true},'confirmed');
  assert.equal(scene.objects[0].thickness,.2);assert.equal(scene.cad.scope,'user_confirmed_straight_wall_pairs');
  assert.equal(validateScene(room()).schemaVersion,1);
});
