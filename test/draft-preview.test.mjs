import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,readdirSync,realpathSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {Studio} from '../src/studio.js';
import {drawingScene} from '../src/drawing.js';
import {MATERIALS} from '../src/scene.js';

const basis='design_assumption';
const box=(key,assembly,position,width,depth,height)=>({key,assembly,shape:'box',position,width,depth,height,material:'oak'});
const input=(repaired=false)=>({name:'Draft preview fixture',kind:'booth',dimensionBasis:'site',expectedRevision:0,width:6,depth:4,height:3,thickness:.12,walls:[],assumptions:[],
  components:[
    ...[['left',1.6],['right',4.4]].flatMap(([side,x])=>[
      box('pier_'+side,'portal',[x,1,0],.65,.35,2.4),
      box('roof_'+side,'portal',[x,1,2.75],.65,.35,.25),
      ...(repaired?[box('trim_'+side,'portal',[x,1,2.4],.65,.35,.35)]:[]),
    ]),
    box('cabinet_back','cabinet',[4,3,0],1,.08,1.6),
    box('shelf','cabinet',[4,2.65,.8],1,.62,.03),
  ],
  constraints:{supports:[
    ...['left','right'].map(side=>({id:'roof_'+side,source:'Separate '+side+' roof support',basis,keys:['roof_'+side],anchorKeys:['pier_'+side],
      ...(repaired?{viaKeys:['trim_'+side]}:{})})),
    {id:'shelf_to_back',source:'Shelf to cabinet back',basis,keys:['shelf'],anchorKeys:['cabinet_back']},
  ],relations:[{id:'shelf_joint',source:'Shelf rear edge to back',basis,a:'shelf',b:'cabinet_back',kind:'contact',point:[4,2.96,.815]}]},
});

test('a draft preview is scoped, read-only, and model diagnostics require the active recipient grant',async t=>{
  const root=realpathSync(mkdtempSync(join(tmpdir(),'dsh-preview-state-')));
  const requests=[];let onPreview;
  const engine={dispose:async()=>{},async request(c){
    if(c.action==='draw'){writeFileSync(join(c.output,'plan.dxf'),'CAD fixture');return {scene:c.scene};}
    assert.equal(c.action,'draft-preview');requests.push(c);
    if(c.output) {
      // A worker stub supplies a header; the real test below opens the complete PNG.
      const png=Buffer.alloc(25);Buffer.from([137,80,78,71,13,10,26,10]).copy(png);png.writeUInt32BE(640,16);png.writeUInt32BE(360,20);
      writeFileSync(join(c.output,'preview.png'),png);
    }
    if(onPreview)await onPreview();
    return {connections:{supports:[],relations:[]}};
  }};
  const studio=new Studio(root,engine),session='owner';
  t.after(async()=>{await studio.dispose();rmSync(root,{recursive:true,force:true});});
  const first=await studio.draw(session,input(),'first');
  const id=first.projectId,args={expectedRevision:0,drawingId:first.drawingId,assembly:'cabinet',view:'front'};
  await assert.rejects(studio.draftPreview(session,args,undefined,true),/授权/);
  await assert.rejects(studio.draftPreview(session,{...args,keys:['shelf']}),/只选/);
  await assert.rejects(studio.draftPreview(session,{...args,view:'__proto__'}),/视角/);
  await assert.rejects(studio.draftPreview(session,{...args,assembly:'not_present'}),/不存在/);
  assert.equal(requests.length,0);
  const local=await studio.ui(session,'draft-preview',args,'preview');
  assert.ok(local.base64);assert.equal(local.selectedCount,2);assert.equal(local.drawingId,first.drawingId);
  assert.deepEqual(requests[0].supports.map(r=>r.id),['shelf_to_back']);
  assert.deepEqual(requests[0].relations.map(r=>r.id),['shelf_joint']);
  const route={sessionId:session,provider:'ollama',model:'fixture'};
  studio.beforeModelRequest(route);
  await studio.ui(session,'consent',{expectedRevision:0,allow:true},'grant');
  const model=await studio.draftPreview(session,{expectedRevision:0,drawingId:first.drawingId,keys:['roof_left']},undefined,true);
  assert.equal(model.base64,undefined);assert.equal(requests[1].output,undefined);
  assert.deepEqual(requests[1].supports.map(r=>r.id),['roof_left']);
  assert.equal(model.selectedCount,1);assert.equal(model.contextCount,1);
  onPreview=()=>{studio.routes.set(session,JSON.stringify({provider:'ollama',model:'different'}));};
  await assert.rejects(studio.draftPreview(session,args,undefined,true),/授权已变化/);
  onPreview=async()=>{await studio.draw(session,input(true),'second');};
  await assert.rejects(studio.draftPreview(session,args),/草案已变化/);
  await assert.rejects(studio.draftPreview(session,args),/草案已变化/);
  const current=studio.snapshot(session);
  const cancel=new AbortController();onPreview=()=>cancel.abort();
  await assert.rejects(studio.draftPreview(session,{...args,drawingId:current.proposal.drawingId},cancel.signal),{name:'AbortError'});
  assert.equal(studio.snapshot(session).project.revision,0);
  assert.equal(studio.snapshot(session).workflow.modelReady,false);
  assert.deepEqual(studio.snapshot(session).tasks,[]);
  assert.deepEqual(studio.snapshot(session).gallery,[]);
  assert.deepEqual(readdirSync(studio.store.dir(id,'staging')),[]);
});

test('real Mac Blender shows both draft roof gaps and independently checks each repair and the cabinet shelf',()=>{
  const pkg=fileURLToPath(new URL('../',import.meta.url)),runtime=JSON.parse(readFileSync(join(pkg,'runtime/manifest.json')));
  const folder=realpathSync(mkdtempSync(join(tmpdir(),'dsh-preview-engine-')));
  try {
    const command=(id,repaired,assembly)=>{
      const scene=drawingScene(input(repaired)), selected=scene.objects.filter(o=>o.assembly===assembly).map(o=>o.id);
      const output=join(folder,id);mkdirSync(output);
      return {id,action:'draft-preview',scene,materials:MATERIALS,selected,context:selected,view:'front',output,
        supports:input(repaired).constraints.supports.filter(r=>assembly==='portal'?r.id.startsWith('roof_'):r.id==='shelf_to_back'),
        relations:assembly==='cabinet'?input(repaired).constraints.relations:[]};
    };
    const commands=[command('gap',false,'portal'),command('joined',true,'portal'),command('cabinet',false,'cabinet')];
    const pixels=`import bpy
from pathlib import Path
root=Path(${JSON.stringify(folder)})
old,new=[bpy.data.images.load(str(root/name/'preview.png')) for name in ('gap','joined')]
def pixel(im,x,y):
    i=(640*y+x)*4
    return im.pixels[i:i+3]
for x in (173,467):
    assert sum(abs(a-b) for a,b in zip(pixel(old,x,293),pixel(new,x,293))) > .12
for x in (173,467):
    assert sum(abs(a-b) for a,b in zip(pixel(old,x,167),pixel(new,x,167))) < .08
`;
    const env={...process.env,PYTHONDONTWRITEBYTECODE:'1',PYTHONNOUSERSITE:'1',BLENDER_USER_CONFIG:join(folder,'config'),
      BLENDER_USER_SCRIPTS:join(folder,'scripts'),BLENDER_USER_EXTENSIONS:join(folder,'extensions')};
    delete env.PYTHONPATH;delete env.PYTHONHOME;delete env.PYTHONSTARTUP;
    const worker=spawnSync(join(pkg,runtime.executable),['--background','--factory-startup','--disable-autoexec','--threads','2','--python-exit-code','17',
      '--python',join(pkg,'worker/worker.py'),'--python-expr',pixels,'--','--workspace',folder,'--vendor',join(pkg,'runtime/vendor')],
    {cwd:folder,env,input:commands.map(c=>JSON.stringify(c)+'\n').join(''),timeout:45000,maxBuffer:4*1024*1024,encoding:'utf8'});
    if(worker.error)throw worker.error;
    const rows=Object.fromEntries(worker.stdout.split('\n').filter(line=>line.startsWith('@interior ')).map(line=>JSON.parse(line.slice(10))).filter(r=>r.id).map(r=>[r.id,r]));
    for(const {id,output} of commands) {
      assert.equal(rows[id]?.ok,true,JSON.stringify(rows[id]));
      assert.deepEqual(rows[id].value.resolution,[640,360]);assert.deepEqual(readdirSync(output),['preview.png']);
    }
    assert.equal(worker.status,0,worker.stderr||worker.stdout);
    const {gap,joined,cabinet}=Object.fromEntries(Object.entries(rows).map(([id,r])=>[id,r.value]));
    assert.deepEqual(gap.camera,joined.camera,'unchanged bounds retain identical front framing');
    assert.deepEqual(gap.connections.supports.map(r=>[r.status,r.unresolvedKeys]),[['fail',['roof_left']],['fail',['roof_right']]]);
    assert.deepEqual(joined.connections.supports.map(r=>r.status),['pass','pass']);
    assert.equal(cabinet.connections.supports[0].status,'pass');
    assert.equal(cabinet.connections.relations[0].status,'pass');
    assert.ok(Math.abs(cabinet.boundsMetres[1][2]-1.6)<1e-6);
  } finally {rmSync(folder,{recursive:true,force:true});}
});
