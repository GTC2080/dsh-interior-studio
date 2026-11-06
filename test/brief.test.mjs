import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,writeFileSync,mkdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {Studio} from '../src/studio.js';

const requirement={id:'frontage',source:'客户要求：门头整体9米',basis:'user_request',scope:'assembly',assembly:'facade',property:'width',expected:9,tolerance:.001};
const route={id:'route',source:'客户要求：通道净宽1米',basis:'user_request',points:[[4,1],[4,3]],width:1,height:2,baseZ:0};
const plan={name:'Brief regression',kind:'booth',expectedRevision:0,width:10,depth:5,height:3,thickness:.1,dimensionBasis:'site',assumptions:[],walls:[],components:[{key:'sign',assembly:'facade',shape:'box',width:9,depth:.1,height:.2,position:[5,4,2.5]}]};
function setup(t) {
  const root=mkdtempSync(join(tmpdir(),'dsh-brief-'));
  let calls=0;
  const studio=new Studio(root,{dispose:async()=>{},request:async command=>{
    calls++;mkdirSync(command.output,{recursive:true});writeFileSync(join(command.output,'plan.dxf'),'test');return {scene:command.scene};
  }});
  t.after(async()=>{await studio.dispose();rmSync(root,{recursive:true,force:true});});return {studio,calls:()=>calls};
}
test('new model drawings require a separately confirmed brief and retain it across drafts',async t=>{
  const {studio,calls}=setup(t);
  await assert.rejects(studio.draw('test',plan,'before',undefined,true),/studio_brief/);
  assert.equal(calls(),0);
  const input={name:plan.name,kind:'booth',expectedRevision:0,constraints:{requirements:[requirement],routes:[route]},assumptions:['颜色暂拟']};
  const brief=studio.brief('test',input,'brief',true);
  assert.deepEqual(studio.brief('test',input,'brief',true),brief);
  await assert.rejects(studio.draw('test',plan,'unconfirmed',undefined,true),/需求卡尚未确认/);
  assert.throws(()=>studio.confirm('test',{expectedRevision:0,briefId:brief.briefId},'reject'),/核对需求卡/);
  studio.confirm('test',{expectedRevision:0,briefId:brief.briefId,acceptBrief:true},'confirm-brief');
  assert.equal(studio.snapshot('test').project.revision,0);
  const draft=await studio.draw('test',{...plan,constraints:{routes:[{...route,width:.95}]}},'lowered',undefined,true);
  assert.equal(draft.summary.constraints.requirements[0].expected,9);
  assert.equal(draft.summary.constraintChanges[0].previous.width,1);
  assert.equal(draft.summary.constraintChanges[0].proposed.width,.95);
  assert.throws(()=>studio.confirm('test',{expectedRevision:0,drawingId:draft.drawingId,acceptDrawing:true},'cannot-silently-lower'),/项目要求有变更/);
  assert.equal(studio.acceptedBrief(brief.projectId).constraints.routes[0].width,1);
  assert.throws(()=>studio.brief('test',input,'cannot-overwrite-drawing',true),/不能用需求核对覆盖图纸/);
});
test('a replaced brief, malformed declaration and wrong writer cannot be accepted',t=>{
  const {studio}=setup(t),input={name:plan.name,kind:'booth',expectedRevision:0,constraints:{requirements:[requirement]}};
  const first=studio.brief('test',input,'first');
  studio.brief('test',input,'second');
  assert.throws(()=>studio.confirm('test',{expectedRevision:0,briefId:first.briefId,acceptBrief:true},'stale'),/需求卡已变化/);
  assert.throws(()=>studio.brief('test',{...input,constraints:{routes:[{...route,width:.1}]}},'invalid'),/净宽/);
  studio.store.bind('other',first.projectId);
  assert.throws(()=>studio.brief('other',input,'wrong-writer'),/写权限|编辑/);
});
test('focused context resolves stable keys, preserves draft identity and respects sharing',async t=>{
  const {studio}=setup(t),draft=await studio.draw('test',plan,'draft');
  studio.confirm('test',{expectedRevision:0,drawingId:draft.drawingId,acceptDrawing:true},'confirm');
  assert.equal(studio.context('test',{detail:'index'}).sharing,'disabled');
  studio.beforeModelRequest({sessionId:'test',provider:'test-provider',model:'test-model'});
  await studio.ui('test','consent',{expectedRevision:1,allow:true},'consent');
  const index=studio.context('test',{detail:'index'});assert.equal(index.objects.find(o=>o.key==='sign').assembly,'facade');
  assert.equal(index.objects.find(o=>o.key==='sign').outline,undefined);
  const selected=studio.context('test',{detail:'objects',keys:['sign']});assert.equal(selected.objects.length,1);assert.ok(selected.objects[0].outline.length);
  assert.throws(()=>studio.context('test',{detail:'objects',keys:['missing']}),/对象不存在/);
  assert.throws(()=>studio.context('test',{detail:'objects',assemblies:['missing']}),/组合不存在/);
});
test('a new confirmed brief survives unrelated revisions and blocks old CAD until adopted',async t=>{
  const {studio}=setup(t),input={name:plan.name,kind:'booth',expectedRevision:0,constraints:{routes:[route]}};
  const first=studio.brief('test',input,'first');studio.confirm('test',{expectedRevision:0,briefId:first.briefId,acceptBrief:true},'first-accept');
  const original=await studio.draw('test',plan,'original');studio.confirm('test',{expectedRevision:0,drawingId:original.drawingId,acceptDrawing:true},'original-accept');
  const updated=studio.brief('test',{...input,expectedRevision:1,constraints:{routes:[{...route,width:1.2}]}},'updated');
  studio.confirm('test',{expectedRevision:1,briefId:updated.briefId,acceptBrief:true},'updated-accept');
  studio.store.commit('test',first.projectId,1,studio.store.read(first.projectId),'other-local-revision');
  studio.gallery=()=>[{id:'front',current:true,revision:1}];
  assert.equal(studio.snapshot('test').workflow.requirementsChanged,true);
  assert.equal(studio.snapshot('test').gallery[0].current,false);
  assert.throws(()=>studio.startBuild('test',{expectedRevision:2},'must-not-build'),/需求卡已更新/);
  const next=await studio.draw('test',{...plan,expectedRevision:2},'adopt-updated');
  assert.equal(next.summary.constraints.routes[0].width,1.2);
  studio.confirm('test',{expectedRevision:2,drawingId:next.drawingId,acceptDrawing:true},'adopt-accept');
  assert.equal(studio.snapshot('test').workflow.requirementsChanged,false);
  await studio.ui('test','undo',{expectedRevision:3},'undo');
  assert.equal(studio.snapshot('test').workflow.requirementsChanged,true);
});
