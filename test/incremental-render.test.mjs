import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,writeFileSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {Studio} from '../src/studio.js';
import {drawingScene} from '../src/drawing.js';
import {presentationFromInput} from '../src/refinement.js';

test('the first camera on a scene with implicit default lighting is also camera-only',async t=>{
  const root=mkdtempSync(join(tmpdir(),'dsh-first-camera-'));
  const studio=new Studio(root,{dispose:async()=>{},request:async()=>{throw Error('camera-only update called the engine');}});
  t.after(async()=>{await studio.dispose();rmSync(root,{recursive:true,force:true});});
  const p=studio.store.create('owner','First camera','booth','create');
  const scene=drawingScene({name:'First camera',kind:'booth',dimensionBasis:'site',width:4,depth:4,height:3,thickness:.1,walls:[],assumptions:[],components:[]});
  studio.store.commit('owner',p.id,0,scene,'initial');
  const result=await studio.refine('owner',{expectedRevision:1,presentation:{cameras:[{key:'detail',position:[2,-2,2],target:[2,2,1],subjects:['part']}]}},'camera');
  assert.equal(result.state,'presentation_saved');assert.deepEqual(result.changedViews,['detail']);
});

test('one camera update exports no CAD or geometry and keeps other applicable images with their source versions',async t=>{
  const root=mkdtempSync(join(tmpdir(),'dsh-incremental-')),calls=[];
  const engine={dispose:async()=>{},request:async c=>{
    calls.push(c.action);
    if(c.action==='drawing-sheets'){writeFileSync(join(c.output,'drawings.dxf'),'CAD');return {};}
    assert.ok(['build','render-existing'].includes(c.action));
    if(c.action==='build')for(const file of ['scene.glb','scene.blend'])writeFileSync(join(c.output,file),'stable-'+file);
    else assert.equal(readFileSync(c.blendPath,'utf8'),'stable-scene.blend');
    const views=c.views.map((id,i)=>({id,file:i?`render-${id}.png`:'render.png'}));
    for(const v of views)writeFileSync(join(c.output,v.file),v.id);
    return {views,poseAudit:{passed:true,objects:[]},componentAudit:{passed:true,objects:[]}};
  }};
  const studio=new Studio(root,engine);t.after(async()=>{await studio.dispose();rmSync(root,{recursive:true,force:true});});
  const p=studio.store.create('owner','Incremental','booth','create');
  const scene=drawingScene({name:'Incremental',kind:'booth',dimensionBasis:'site',width:6,depth:6,height:3,thickness:.1,walls:[],assumptions:[],components:[{key:'part',shape:'box',width:1,depth:1,height:1,position:[3,3,0]}]});
  scene.schemaVersion=5;scene.presentation=presentationFromInput({cameras:[{key:'detail',position:[3,-1,2],target:[3,3,.5],lens:35,subjects:['part'],purpose:'detail'}]});
  studio.store.commit('owner',p.id,0,scene,'initial');
  const wait=async value=>{await studio.running.get(value.taskId)?.done;const row=studio.snapshot('owner').tasks.find(t=>t.id===value.taskId);assert.equal(row.state,'complete',row.detail.message);return row;};
  const model=await wait(studio.startBuild('owner',{expectedRevision:1},'build'));
  const first=await wait(studio.startBuild('owner',{expectedRevision:1,views:['front','detail']},'images',true));
  const count=calls.length;
  const next=await studio.refine('owner',{expectedRevision:1,presentation:{cameras:[{...scene.presentation.cameras[0],position:[3,-2,2]}]}},'camera');
  assert.equal(next.state,'presentation_saved');assert.equal(next.geometryChanged,false);assert.deepEqual(next.changedViews,['detail']);assert.equal(calls.length,count);
  assert.equal(studio.snapshot('owner').workflow.modelReady,true);assert.equal(studio.snapshot('owner').workflow.modelTask.id,model.id);
  const second=await wait(studio.startBuild('owner',{expectedRevision:2,views:next.changedViews},'new-image',true));
  assert.deepEqual(calls.slice(count),['render-existing']);assert.deepEqual(Object.keys(second.detail.files),['render.png']);
  assert.equal(second.detail.sourceModelTask,model.id);assert.equal(second.detail.sourceModelRevision,1);
  const gallery=studio.snapshot('owner').gallery;
  assert.equal(gallery.length,2);assert.equal(gallery.find(v=>v.id==='front').taskId,first.id);assert.equal(gallery.find(v=>v.id==='front').revision,1);
  assert.ok(gallery.every(v=>v.current&&v.applicableRevision===2));
  const changed=studio.store.read(p.id);changed.objects[0].position[0]+=.2;studio.store.commit('owner',p.id,2,changed,'move');
  assert.equal(studio.snapshot('owner').workflow.modelReady,false);assert.throws(()=>studio.startBuild('owner',{expectedRevision:3},'old-model',true),/先生成/);
});

test('background admission precedes work and gives one owned cancellable completion',async t=>{
  const root=mkdtempSync(join(tmpdir(),'dsh-studio-jobs-')),specs=[];let hooks,handle;
  const jobs={start(spec){specs.push(spec);handle={id:'studio-123',updateProgress(){}};hooks=spec.run(handle);return handle.id;}};
  const engine={dispose:async()=>{},request:async c=>{if(c.action==='drawing-sheets')writeFileSync(join(c.output,'drawings.dxf'),'CAD');else {for(const file of ['scene.glb','scene.blend'])writeFileSync(join(c.output,file),file);return {poseAudit:{passed:true,objects:[]},componentAudit:{passed:true,objects:[]}};}return {};}};
  const studio=new Studio(root,engine,()=>false,jobs);t.after(async()=>{await studio.dispose();rmSync(root,{recursive:true,force:true});});
  const p=studio.store.create('owner','Jobs','booth','create'),scene=drawingScene({name:'Jobs',kind:'booth',dimensionBasis:'site',width:4,depth:4,height:3,thickness:.1,walls:[],assumptions:[],components:[]});
  studio.store.commit('owner',p.id,0,scene,'initial');
  const result=studio.startBuild('owner',{expectedRevision:1},'job',false,{agent:{id:'owner'},callId:'nested',rootCallId:'root'});
  assert.equal(result.jobId,'studio-123');assert.equal(specs[0].owner,'owner');assert.deepEqual(specs[0].toolCall,{callId:'nested',rootCallId:'root'});
  assert.equal((await hooks.done).status,'completed');
  studio.startBuild('owner',{expectedRevision:1},'job',false,{agent:{id:'owner'},callId:'nested',rootCallId:'root'});
  assert.equal(specs.length,1);
});
