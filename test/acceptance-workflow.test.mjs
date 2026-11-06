import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {Studio} from '../src/studio.js';
import {drawingScene} from '../src/drawing.js';
import {mergeConstraints} from '../src/design-constraints.js';
import {reviewScopeDeclarations} from '../src/acceptance-scope.js';

function fixture(t) {
  const root=mkdtempSync(join(tmpdir(),'dsh-acceptance-flow-'));let supportStatus='fail';
  const engine={dispose:async()=>{},request:async command=>{
    if(['draw','refine','drawing-sheets'].includes(command.action)) {
      writeFileSync(join(command.output,command.action==='drawing-sheets'?'drawings.dxf':'plan.dxf'),'CAD');return {scene:command.scene};
    }
    if(command.action==='build')for(const file of ['scene.blend','scene.glb'])writeFileSync(join(command.output,file),file);
    const declarations=reviewScopeDeclarations(command.scene,command.scene.design.constraints);
    const views=command.views.map((id,i)=>({id,file:i?`render-${id}.png`:'render.png'}));
    for(const view of views)writeFileSync(join(command.output,view.file),'PNG');
    return {views,poseAudit:{basis:'fixture',passed:true,objects:[]},componentAudit:{passed:true,objects:[]},
      meshContactReview:{declaredSupports:declarations.supports.map(r=>({...r,status:supportStatus})),declaredContacts:[],duplicateGeometry:[]},
      preflight:{status:'checked',views:views.map(v=>({id:v.id,status:'pass',fixedChecks:declarations.views.filter(r=>r.view===v.id).map(r=>({...r,status:'pass'}))}))}};
  }};
  const studio=new Studio(root,engine),project=studio.store.create('writer','Acceptance','booth','create');
  const scene=drawingScene({name:'Acceptance',kind:'booth',dimensionBasis:'site',width:6,depth:6,height:3,thickness:.1,assumptions:[],walls:[],components:[
    {key:'base',shape:'box',width:5,depth:5,height:.1,position:[3,3,0]},
    {key:'panel',shape:'box',width:1,depth:.2,height:2,position:[3,3,.1],assembly:'facade'}]});
  scene.schemaVersion=7;scene.presentation={mode:'studio',worldStrength:.35,lights:[],cameras:[{key:'entry',label:'Entry',position:[3,-4,1],target:[3,3,1],lens:35}]};
  scene.design.constraints=mergeConstraints({views:[{id:'frontage',source:'Complete facade',basis:'user_request',view:'entry',scope:'assembly',assembly:'facade'}],
    supports:[{id:'supported',source:'Panel to platform',basis:'user_request',keys:['panel'],anchorKeys:['base']}]});
  studio.store.commit('writer',project.id,0,scene,'initial');
  t.after(async()=>{await studio.dispose();rmSync(root,{recursive:true,force:true});});
  const wait=async receipt=>{await studio.running.get(receipt.taskId)?.done;return studio.snapshot('writer').tasks.find(t=>t.id===receipt.taskId);};
  return {studio,project,wait,pass:()=>{supportStatus='pass';}};
}

test('a geometric build can retain diagnostics while failed fixed supports block image publication',async t=>{
  const f=fixture(t),built=await f.wait(f.studio.startBuild('writer',{expectedRevision:1},'build'));
  assert.equal(built.state,'complete');assert.equal(f.studio.snapshot('writer').workflow.quality.crossAssembly.status,'fail');
  const failed=await f.wait(f.studio.startBuild('writer',{expectedRevision:1,views:['entry']},'bad-render',true));
  assert.equal(failed.state,'failed');assert.match(failed.detail.message,/supported/);assert.equal(f.studio.snapshot('writer').gallery.length,0);
  f.pass();const good=await f.wait(f.studio.startBuild('writer',{expectedRevision:1,views:['entry']},'good-render',true));
  assert.equal(good.state,'complete');const quality=f.studio.snapshot('writer').workflow.quality;
  assert.equal(quality.views.status,'pass');assert.equal(quality.crossAssembly.status,'pass');assert.equal(quality.visual.status,'not_evaluated');
});

test('camera-only updates cannot remove a required camera and scope edits need trusted CAD acceptance',async t=>{
  const f=fixture(t);f.pass();await f.wait(f.studio.startBuild('writer',{expectedRevision:1},'build'));
  await assert.rejects(f.studio.refine('writer',{expectedRevision:1,presentation:{cameras:[]}},'remove-camera'),/frontage/);
  const draft=await f.studio.refine('writer',{expectedRevision:1,constraints:{views:[{id:'frontage',source:'Complete facade',basis:'user_request',view:'entry',keys:['panel'],scope:'keys',framing:'detail'}]}},'narrow');
  assert.throws(()=>f.studio.confirm('writer',{expectedRevision:1,drawingId:draft.drawingId,acceptDrawing:true},'unaccepted'),/项目要求有变更/);
  assert.equal(f.studio.store.project(f.project.id).revision,1);
});

test('a changed saved support scope cannot inherit a prior mesh acceptance with unchanged geometry',async t=>{
  const f=fixture(t);f.pass();await f.wait(f.studio.startBuild('writer',{expectedRevision:1},'build'));
  assert.equal(f.studio.snapshot('writer').workflow.quality.crossAssembly.status,'pass');
  const scene=f.studio.store.read(f.project.id);scene.design.constraints.supports[0].viaKeys=['base'];
  f.studio.store.commit('writer',f.project.id,1,scene,'new-scope');
  assert.equal(f.studio.snapshot('writer').workflow.quality.crossAssembly.status,'not_evaluated');
});
