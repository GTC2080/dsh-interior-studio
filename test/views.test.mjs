import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,existsSync} from 'node:fs';
import {writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {Box3,PerspectiveCamera,Vector3} from 'three';
import {solidFromInput} from '../src/solids.js';
import {projectDrawing,renderImages,renderGallery,DEFAULT_RENDER_VIEWS} from '../src/design-views.js';
import {setStandardView} from '../src/view-fit.js';
import {sceneFromProposal} from '../src/scene.js';
import {Studio} from '../src/studio.js';

test('five CAD projections retain elevations and reverse rear/left axes consistently',()=>{
  const part=solidFromInput({key:'raised',shape:'box',position:[3,4,1],width:2,depth:1,height:2},'part',{});
  const scene={bounds:[8,7],objects:[part]};
  const expected={plan:[2,3.5,4,4.5],front:[2,1,4,3],back:[-4,1,-2,3],left:[-4.5,1,-3.5,3],right:[3.5,1,4.5,3]};
  for(const [view,extents] of Object.entries(expected)){const drawing=projectDrawing(scene,view);assert.deepEqual(drawing.extents,extents);assert.equal(drawing.lines.length,4);}
  assert.throws(()=>projectDrawing(scene,'unknown'),/未知/);
});

test('each standard model view keeps all corners inside portrait and landscape panels',()=>{
  const box=new Box3(new Vector3(0,-.08,-11),new Vector3(9,3.5,0)),target=new Vector3();
  const camera=new PerspectiveCamera(45,1,.01,5000),eyes=[];
  for(const view of DEFAULT_RENDER_VIEWS)for(const aspect of [.45,1.8]) {
    setStandardView(camera,target,box,aspect,view);eyes.push(camera.position.toArray().join(','));
    for(const x of [0,9])for(const y of [-.08,3.5])for(const z of [-11,0]){
      const point=new Vector3(x,y,z).project(camera);assert.ok(Math.abs(point.x)<1&&Math.abs(point.y)<1&&point.z>-1&&point.z<1,view);
    }
    if(view==='front')assert.ok(camera.position.z>0);
    if(view==='back')assert.ok(camera.position.z<-11);
  }
  assert.equal(new Set(eyes).size,12);
});

test('old single images and declared galleries show only available named files',()=>{
  assert.deepEqual(renderImages({state:'complete',detail:{files:{'render.png':{}}}}),[{id:'overview',label:'历史单视角',file:'render.png'}]);
  const task={state:'complete',detail:{views:[{id:'right',file:'render.png'},{id:'left',file:'render-left.png'},{id:'top',file:'missing.png'}],files:{'render.png':{},'render-left.png':{}}}};
  assert.deepEqual(renderImages(task).map(v=>v.id),['right','left']);
  assert.deepEqual(renderImages({...task,state:'running'}),[]);
});

test('render batches retain every view and a later rerender downloads from its own task',()=>{
  const task=(id,revision,views,state='complete')=>({id,revision,state,detail:{views:views.map(v=>({id:v,file:'render-'+v+'.png'})),
    files:Object.fromEntries(views.map(v=>['render-'+v+'.png',{}])),cadAudit:{passed:true}}});
  const first=task('six',3,DEFAULT_RENDER_VIEWS),close=task('close',3,['cab_close']);
  const pictures=renderGallery([first,close,task('failed',3,['front'],'failed'),task('new-front',3,['front']),task('other',4,['left'])],3);
  assert.deepEqual(pictures.map(v=>v.id),[...DEFAULT_RENDER_VIEWS,'cab_close']);
  assert.equal(pictures.find(v=>v.id==='front').taskId,'new-front');
  assert.equal(pictures.find(v=>v.id==='cab_close').taskId,'close');
  assert.ok(pictures.every(v=>v.revision===3&&v.cadVerified));
  assert.deepEqual(renderGallery([task('failed',3,['front'],'failed')],3),[]);
});

test('the host gallery survives the history window and never mixes scene revisions',async t=>{
  const root=mkdtempSync(join(tmpdir(),'dsh-gallery-')),studio=new Studio(root,{dispose:async()=>{}}),p=studio.store.create('user','Gallery','booth','create');
  t.after(async()=>{await studio.dispose();rmSync(root,{recursive:true,force:true});});
  const scene=sceneFromProposal({kind:'booth',width:6,depth:4,height:3,thickness:.12},'test');studio.store.commit('user',p.id,0,scene,'initial');
  const add=(id,revision,views,state='complete')=>studio.store.db.prepare('INSERT INTO tasks VALUES(?,?,?,?,?)').run(id,p.id,revision,state,
    JSON.stringify({views:views.map((v,i)=>({id:v,file:i?'render-'+v+'.png':'render.png'})),files:Object.fromEntries(views.map((v,i)=>[i?'render-'+v+'.png':'render.png',{}]))}));
  add('six',1,DEFAULT_RENDER_VIEWS);
  for(let i=0;i<16;i++)add('retry-'+i,1,['front'],'failed');
  add('close',1,['cab_close']);
  let s=studio.snapshot('user');assert.equal(s.tasks.length,12);assert.ok(!s.tasks.some(t=>t.id==='six'));
  assert.deepEqual(s.gallery.map(v=>v.id),[...DEFAULT_RENDER_VIEWS,'cab_close']);
  assert.equal(s.gallery.find(v=>v.id==='cab_close').taskId,'close');
  studio.store.commit('user',p.id,1,scene,'new-revision');s=studio.snapshot('user');assert.ok(s.gallery.every(v=>v.revision===1));
  add('current',2,['front']);s=studio.snapshot('user');assert.equal(s.gallery.length,1);assert.equal(s.gallery[0].taskId,'current');assert.equal(s.gallery[0].revision,2);
});

test('rendering requires a ready model and publishes a complete view set atomically',async t=>{
  const root=mkdtempSync(join(tmpdir(),'dsh-multiview-'));let incomplete=false;const commands=[];
  const engine={dispose:async()=>{},request:async command=>{
    if(command.action==='drawing-sheets'){await writeFile(join(command.output,'drawings.dxf'),'CAD drawing set');return {};}
    commands.push(command);
    const views=command.views.map((id,i)=>({id,file:i===0?'render.png':`render-${id}.png`}));
    const files=['scene.glb','scene.blend',...views.map(v=>v.file)];
    for(const file of files)await writeFile(join(command.output,file),file);
    return {backend:'CPU',views:incomplete?views.slice(1):views,poseAudit:{basis:'test',passed:true,objects:[]},componentAudit:{passed:true,objects:[]}};
  }};
  const studio=new Studio(root,engine),p=studio.store.create('user','Views','booth','create');
  const scene=sceneFromProposal({kind:'booth',width:6,depth:4,height:3,thickness:.12,openSides:['front']},'test');
  scene.objects=scene.objects.filter(o=>o.type!=='asset');
  studio.store.commit('user',p.id,0,scene,'confirm');
  t.after(async()=>{await studio.dispose();rmSync(root,{recursive:true,force:true});});
  assert.throws(()=>studio.startBuild('user',{expectedRevision:1},'too-early',true),/先生成当前版本的三维/);
  const build=studio.startBuild('user',{expectedRevision:1},'build');await studio.running.get(build.taskId).done;
  assert.equal(studio.snapshot('user').tasks[0].state,'complete');
  assert.throws(()=>studio.startBuild('user',{expectedRevision:1,views:['front','front']},'duplicate',true),/视角/);
  const task=studio.startBuild('user',{expectedRevision:1},'render',true);await studio.running.get(task.taskId).done;
  const completed=studio.snapshot('user').tasks[0];assert.equal(completed.state,'complete');assert.equal(completed.detail.views.length,6);
  assert.deepEqual(commands.at(-1).resolution,[1920,1080]);
  assert.equal(commands.at(-1).samples,48);
  for(const [quality,resolution] of [['preview',[960,720]],['1080p',[1920,1080]],['4k',[3840,2160]]]) {
    const r=studio.startBuild('user',{expectedRevision:1,quality},quality,true);await studio.running.get(r.taskId).done;
    assert.deepEqual(commands.at(-1).resolution,resolution);
  }
  assert.throws(()=>studio.startBuild('user',{expectedRevision:1,quality:'invalid'},'invalid',true),/档位/);
  assert.equal((await studio.artifact('user',{taskId:task.taskId,file:'render-right.png'})).toString(),'render-right.png');
  await assert.rejects(studio.artifact('user',{taskId:task.taskId,file:'../render.png'}),/不支持/);
  incomplete=true;const failed=studio.startBuild('user',{expectedRevision:1},'partial',true);await studio.running.get(failed.taskId).done;
  assert.equal(studio.snapshot('user').tasks[0].state,'failed');assert.equal(existsSync(join(root,p.id,'staging',failed.taskId)),false);
  assert.equal(studio.store.project(p.id).revision,1);
});
