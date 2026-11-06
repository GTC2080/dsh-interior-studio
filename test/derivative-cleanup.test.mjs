import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,mkdirSync,writeFileSync,readFileSync,existsSync,symlinkSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {Studio} from '../src/studio.js';
import {drawingScene} from '../src/drawing.js';
import {MATERIALS} from '../src/scene.js';
import {hash} from '../src/store.js';
import {modelFingerprint,cadFingerprint,viewFingerprint} from '../src/design-fingerprints.js';

function fixture(t) {
  const folder=mkdtempSync(join(tmpdir(),'dsh-derivative-cleanup-')),studio=new Studio(folder,{dispose:async()=>{}});
  t.after(async()=>{await studio.dispose();rmSync(folder,{recursive:true,force:true});});
  const p=studio.store.create('owner','Cleanup','booth','create');
  const scene=drawingScene({name:'Cleanup',kind:'booth',dimensionBasis:'site',width:4,depth:4,height:3,thickness:.1,walls:[],assumptions:[],components:[]});
  studio.store.commit('owner',p.id,0,scene,'seed');
  const task=(render=false,source)=>{
    const id=randomUUID(),relativePath=(render?'renders/':'builds/')+id;mkdirSync(studio.store.dir(p.id,relativePath),{recursive:true});
    const files={};for(const name of render?['render.png']:['plan.dxf','scene.glb','scene.blend']) {
      const bytes=Buffer.from(name+id);writeFileSync(studio.store.dir(p.id,relativePath,name),bytes);files[name]={bytes:bytes.length,sha256:hash(bytes)};
    }
    const detail={render,relativePath,files,runtime:'test',modelHash:modelFingerprint(scene,MATERIALS),cadFingerprint:cadFingerprint(scene),meshAudit:{passed:true},
      cadAudit:{passed:true,sceneHash:hash(JSON.stringify(scene)),views:['plan','front','back','left','right'],sha256:files['plan.dxf']?.sha256??'a'.repeat(64)}};
    if(render)Object.assign(detail,{sourceModelTask:source,cadSourceTask:source,views:[{id:'front',file:'render.png'}],viewFingerprints:{front:viewFingerprint(scene,'front',MATERIALS,'test')}});
    studio.store.db.prepare('INSERT INTO tasks VALUES(?,?,?,?,?)').run(id,p.id,1,'complete',JSON.stringify(detail));return {id,relativePath,detail};
  };
  return {studio,p,scene,task};
}

test('cleanup protects originals, source revisions, current gallery and its older model dependencies',t=>{
  const f=fixture(t),old=f.task(),source=f.task(),obsolete=f.task(true,source.id),current=f.task(true,source.id),latest=f.task();
  const original=f.studio.store.dir(f.p.id,'source');mkdirSync(original);writeFileSync(join(original,'original.pdf'),'keep');
  const before=hash(JSON.stringify(f.studio.store.read(f.p.id)));
  const defaultPlan=f.studio.cleanupPlan('owner',{expectedRevision:1});assert.equal(defaultPlan.entries.length,0);
  const plan=f.studio.cleanupPlan('owner',{expectedRevision:1,includeHistory:true});
  assert.ok(plan.protectedTaskIds.includes(source.id));assert.ok(plan.protectedTaskIds.includes(current.id));assert.ok(plan.protectedTaskIds.includes(latest.id));
  assert.ok(plan.entries.some(e=>e.taskId===old.id));assert.ok(plan.entries.some(e=>e.taskId===obsolete.id));
  const input={expectedRevision:1,includeHistory:true,token:plan.token},result=f.studio.cleanup('owner',input,'cleanup');
  assert.equal(result.completed,true);assert.ok(result.bytesRemoved>0);assert.ok(!existsSync(f.studio.store.dir(f.p.id,old.relativePath)));
  assert.equal(f.studio.store.db.prepare('SELECT state FROM tasks WHERE id=?').get(old.id).state,'removed');
  for(const item of [source,current,latest])assert.ok(existsSync(f.studio.store.dir(f.p.id,item.relativePath)));
  assert.equal(readFileSync(join(original,'original.pdf'),'utf8'),'keep');assert.equal(hash(JSON.stringify(f.studio.store.read(f.p.id))),before);
  assert.deepEqual(f.studio.cleanup('owner',input,'cleanup'),result);
});

test('unknown files, links, active tasks and stale previews are preserved',t=>{
  const f=fixture(t),old=f.task(),keep=f.task();
  writeFileSync(f.studio.store.dir(f.p.id,old.relativePath,'customer.txt'),'unknown');
  let plan=f.studio.cleanupPlan('owner',{expectedRevision:1,includeHistory:true});
  assert.ok(!plan.entries.some(e=>e.taskId===old.id));assert.ok(plan.skipped.length);
  rmSync(f.studio.store.dir(f.p.id,old.relativePath,'customer.txt'));const linkPath=join(f.studio.store.dir(f.p.id,old.relativePath),'outside.png');symlinkSync(f.studio.store.dir(f.p.id,keep.relativePath,'plan.dxf'),linkPath);
  plan=f.studio.cleanupPlan('owner',{expectedRevision:1,includeHistory:true});assert.ok(plan.skipped.length);rmSync(linkPath);
  plan=f.studio.cleanupPlan('owner',{expectedRevision:1,includeHistory:true});writeFileSync(f.studio.store.dir(f.p.id,old.relativePath,'scene.glb'),'changed');
  assert.throws(()=>f.studio.cleanup('owner',{expectedRevision:1,includeHistory:true,token:plan.token},'stale'),/清理范围已变化/);
  f.studio.store.db.prepare("UPDATE tasks SET state='running' WHERE id=?").run(keep.id);
  assert.throws(()=>f.studio.cleanupPlan('owner',{expectedRevision:1}),/工程正在使用/);
});

test('a same-size modified derivative cannot pass the stored content hash',t=>{
  const f=fixture(t),old=f.task();f.task();
  const path=f.studio.store.dir(f.p.id,old.relativePath,'scene.glb'),bytes=readFileSync(path);
  bytes[0]^=1;writeFileSync(path,bytes);
  const plan=f.studio.cleanupPlan('owner',{expectedRevision:1,includeHistory:true});
  assert.throws(()=>f.studio.cleanup('owner',{expectedRevision:1,includeHistory:true,token:plan.token},'modified'),/已被修改/);
  assert.ok(existsSync(path));assert.equal(f.studio.store.db.prepare('SELECT state FROM tasks WHERE id=?').get(old.id).state,'complete');
});
