import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Studio } from '../src/studio.js';

test('model output requires a trusted grant, and retained history blocks a new route or revoked grant',async t=>{
  const root=mkdtempSync(join(tmpdir(),'interior-privacy-'));
  const studio=new Studio(root,{dispose:async()=>{}});
  t.after(async()=>{await studio.dispose();rmSync(root,{recursive:true});});
  studio.store.create('session','Confidential room','interior','create');
  const empty=studio.context('session');
  assert.equal(empty.permissions.canDrawNewDesign,true);
  assert.ok(!JSON.stringify(empty).includes('Confidential room'));
  await studio.propose('session',{kind:'interior',width:8,depth:6,height:2.8,thickness:.2},'private-dimensions');
  assert.equal(studio.context('session').sharing,'disabled');
  await assert.rejects(()=>studio.ui('session','consent',{allow:true,expectedRevision:0},'consent'),/尚未确定/);
  const first={sessionId:'session',provider:'deepseek',model:'deepseek-v4.1-flash'};
  studio.beforeModelRequest(first);
  await studio.ui('session','consent',{allow:true,expectedRevision:0},'consent');
  assert.equal(studio.context('session').project.name,'Confidential room');
  assert.throws(()=>studio.beforeModelRequest({...first,provider:'different-provider'}),/接收模型/);
  assert.equal(studio.context('session').sharing,'disabled');
  studio.beforeModelRequest(first);
  await studio.ui('session','consent',{allow:false,expectedRevision:0},'revoke');
  assert.throws(()=>studio.beforeModelRequest(first),/授权已变化/);
  assert.equal(studio.context('session').sharing,'disabled');
});

test('a model cannot manufacture a UI confirmation or file path through its proposal',async t=>{
  const root=mkdtempSync(join(tmpdir(),'interior-proposal-'));
  const studio=new Studio(root,{dispose:async()=>{}});
  t.after(async()=>{await studio.dispose();rmSync(root,{recursive:true});});
  await studio.propose('session',{name:'Booth',kind:'booth',width:6,depth:4,height:3,thickness:.12,
    confirmed:true,path:'/tmp/forged',origin:'user_input'},'proposal');
  const snap=studio.snapshot('session');
  assert.equal(snap.project.revision,0);assert.equal(snap.scene,null);
  assert.equal(snap.proposal.status,'awaiting_user_confirmation');
  assert.equal(snap.proposal.origin,'design_proposal');assert.equal(snap.proposal.path,undefined);
});
