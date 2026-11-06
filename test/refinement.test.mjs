import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,realpathSync,readFileSync,writeFileSync,mkdirSync,rmSync,readdirSync,copyFileSync} from 'node:fs';
import {mkdtemp,writeFile,copyFile,mkdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {imageInfo,validateGlb,resourceHash,readResource} from '../src/resources.js';
import {modelPrism,presentationFromInput,validateSurface} from '../src/refinement.js';
import {Studio} from '../src/studio.js';
import {drawingScene} from '../src/drawing.js';
import {solidBounds} from '../src/solids.js';
import {MATERIALS,validateScene} from '../src/scene.js';
import {reviewDesign} from '../src/design-review.js';
import {draftGeometry} from '../src/drafting.js';
import {renderImages} from '../src/design-views.js';

function glb(mutator=()=>{}) {
  const document={asset:{version:'2.0'},buffers:[{byteLength:72}],bufferViews:[{buffer:0,byteOffset:0,byteLength:48},{buffer:0,byteOffset:48,byteLength:24}],
    accessors:[{bufferView:0,componentType:5126,count:4,type:'VEC3',min:[0,0,0],max:[1,.2,.5]},{bufferView:1,componentType:5123,count:12,type:'SCALAR'}],
    meshes:[{primitives:[{attributes:{POSITION:0},indices:1}]}],nodes:[{mesh:0}],scenes:[{nodes:[0]}],scene:0};
  mutator(document);let json=Buffer.from(JSON.stringify(document));json=Buffer.concat([json,Buffer.alloc((4-json.length%4)%4,32)]);
  const binary=Buffer.alloc(72);[0,0,0,1,0,0,0,.2,0,0,0,.5].forEach((n,i)=>binary.writeFloatLE(n,i*4));
  [0,2,1,0,1,3,0,3,2,1,2,3].forEach((n,i)=>binary.writeUInt16LE(n,48+i*2));
  const header=Buffer.alloc(20);header.write('glTF');header.writeUInt32LE(2,4);header.writeUInt32LE(28+json.length+binary.length,8);header.writeUInt32LE(json.length,12);header.writeUInt32LE(0x4e4f534a,16);
  const chunk=Buffer.alloc(8);chunk.writeUInt32LE(binary.length);chunk.writeUInt32LE(0x004e4942,4);
  return Buffer.concat([header,json,chunk,binary]);
}
const plan=()=>drawingScene({name:'Refinement check',kind:'booth',dimensionBasis:'site',width:4,depth:4,height:3,thickness:.1,walls:[],assumptions:[],components:[{key:'part',shape:'box',width:1,depth:.2,height:.5,position:[2,2,0]}]});
const model=()=>({id:'imported',type:'model',label:'Detail model',position:[2,2,0],rotationEuler:[0,0,0],size:[1,.2,.5],resource:'a'.repeat(64),source:'Test-authored geometry',audit:{vertices:4,triangles:4,images:0},origin:{key:'detail'}});

test('embedded GLB imports reject external data, animation, excessive geometry and image bombs',()=>{
  assert.equal(validateGlb(glb()).triangles,4);
  for(const mutate of [d=>{d.buffers[0].uri='file:///private/input.bin';},d=>{d.animations=[{}];},d=>{d.accessors[0].count=999999;},d=>{d.images=[{uri:'https://example.com/image.png',mimeType:'image/png'}];},d=>{d.meshes[0].primitives[0].mode=1;}])assert.throws(()=>validateGlb(glb(mutate)));
  const png=Buffer.alloc(24);Buffer.from([137,80,78,71,13,10,26,10]).copy(png);png.write('IHDR',12);png.writeUInt32BE(65535,16);png.writeUInt32BE(65535,20);
  assert.throws(()=>imageInfo(png),/16 MP/);assert.throws(()=>imageInfo(Buffer.from('not an image')));
  assert.throws(()=>validateSurface({resource:'a'.repeat(64),extension:'png',source:'Test',face:'y-',repeat:[0,1],rotation:0,roughness:.5,emission:0}),/重复尺寸/);
});

test('model envelopes remain labelled approximations in CAD, dimensions and relation checks',()=>{
  const scene=plan();scene.schemaVersion=5;scene.objects.push(model());validateScene(scene);
  assert.deepEqual(solidBounds(modelPrism(model())),[[1.5,1.9,0],[2.5,2.1,.5]]);
  assert.ok(draftGeometry(scene,'front').objects.find(o=>o.id==='imported').approximation);
  const report=reviewDesign(scene,{requirements:[{id:'width',source:'Test requirement',basis:'user_request',keys:['detail'],property:'width',expected:1}],relations:[{id:'contact',source:'Test',basis:'design_assumption',a:'detail',b:'part',kind:'contact',point:[2,2,.5]}]});
  assert.equal(report.requirements[0].status,'pass');assert.match(report.requirements[0].geometryBasis,/envelope/);assert.equal(report.relations[0].status,'not_evaluated');
  assert.throws(()=>presentationFromInput({cameras:[{key:'front',position:[1,1,1],target:[0,0,0]}]}),/标准视角/);
  assert.throws(()=>presentationFromInput({lights:[{key:'light',type:'area',position:[0,0,0],target:[0,0,0],power:100}]}),/重合/);
});

test('refinement waits for confirmation, keeps stable IDs and resources through undo/redo, and rejects stale writes',async()=>{
  const folder=realpathSync(await mkdtemp(join(tmpdir(),'dsh-refinement-'))),root=join(folder,'projects'),source=join(folder,'detail.glb');
  await writeFile(source,glb());let imports=0;
  const engine={async request(c){await mkdir(c.output,{recursive:true});if(c.action==='import-model'){imports++;await copyFile(c.path,join(c.output,'model.glb'));return {size:[1,.2,.5]};}await writeFile(join(c.output,'plan.dxf'),'CAD fixture');c.scene.design.review={issues:[]};return {scene:c.scene};},async dispose(){}};
  const studio=new Studio(root,engine),session='owner';
  try {
    const id=studio.store.create(session,'Test','booth','create').id,scene=plan(),original=scene.objects[0].id;
    scene.schemaVersion=7;scene.objects[0].assembly='sample';
    scene.design.constraints={views:[{id:'sample-view',view:'front',source:'Show sample assembly',basis:'user_request',scope:'assembly',assembly:'sample',visibleKeys:['part']}]};
    studio.store.commit(session,id,0,scene,'seed');
    const input={expectedRevision:1,models:[{key:'part',path:source,position:[2,2,0],source:'Test-authored tetrahedron'}]};
    await assert.rejects(studio.refine(session,input,'no-consent',undefined,true),/授权/);
    const result=await studio.refine(session,input,'refine');
    assert.equal(studio.store.project(id).revision,1);assert.equal(studio.store.read(id).objects[0].type,'solid');
    assert.equal(result.state,'awaiting_user_confirmation');
    // The first call and a replay expose the same JSON payload, including the fixed view checks.
    assert.deepEqual(await studio.refine(session,input,'refine'),JSON.parse(JSON.stringify(result)));assert.equal(imports,1);
    await assert.rejects(studio.refine(session,{...input,expectedRevision:0},'stale'),/版本/);
    studio.confirm(session,{expectedRevision:1,drawingId:result.drawingId,acceptDrawing:true},'confirm');
    const saved=studio.store.read(id);assert.equal(saved.objects[0].id,original);assert.equal(saved.objects[0].type,'model');assert.equal(saved.schemaVersion,7);
    assert.equal(saved.objects[0].assembly,'sample');assert.equal(saved.design.constraints.views[0].assembly,'sample');
    assert.equal(readdirSync(studio.store.dir(id,'drafts')).length,0,'only the confirmed working draft is removed');
    const resources=readdirSync(studio.store.dir(id,'resources'));assert.equal(resources.length,1);
    studio.store.history(session,id,2,'undo','undo');assert.equal(studio.store.read(id).objects[0].type,'solid');
    studio.store.history(session,id,3,'redo','redo');assert.equal(studio.store.read(id).objects[0].type,'model');
    assert.deepEqual(readdirSync(studio.store.dir(id,'resources')),resources);
    assert.equal(readdirSync(studio.store.dir(id,'staging')).length,0);
  } finally {await studio.dispose();rmSync(folder,{recursive:true,force:true});}
});

test('cancelled, failed and concurrently superseded imports leave the saved model and resources unchanged',async()=>{
  const folder=realpathSync(await mkdtemp(join(tmpdir(),'dsh-refinement-failure-'))),source=join(folder,'input.glb');await writeFile(source,glb());
  let mode='fail';const controller=new AbortController();let studio,id;
  const engine={async request(c){await mkdir(c.output,{recursive:true});if(mode==='fail')throw Error('Import failed');await copyFile(c.path,join(c.output,'model.glb'));if(mode==='abort')controller.abort();if(mode==='race')studio.store.db.prepare('INSERT OR REPLACE INTO proposals VALUES(?,?)').run(id,JSON.stringify({type:'drawing',drawingId:'concurrent-change',baseRevision:1}));return {size:[1,.2,.5]};},async dispose(){}};
  studio=new Studio(join(folder,'projects'),engine);
  try {
    id=studio.store.create('owner','Test','booth','create').id;studio.store.commit('owner',id,0,plan(),'seed');const hash=studio.store.read(id);
    const input={expectedRevision:1,models:[{key:'part',path:source,position:[2,2,0],source:'Test geometry'}]};
    await assert.rejects(studio.refine('owner',input,'failed'),/Import failed/);
    mode='abort';await assert.rejects(studio.refine('owner',input,'cancelled',controller.signal));
    mode='race';await assert.rejects(studio.refine('owner',input,'race'),/方案已变化/);
    assert.deepEqual(studio.store.read(id),hash);assert.equal(studio.store.project(id).revision,1);assert.equal(readdirSync(studio.store.dir(id,'staging')).length,0);
    assert.equal(studio.store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id).data.includes('concurrent-change'),true);
  } finally {await studio.dispose();rmSync(folder,{recursive:true,force:true});}
});

test('real Blender normalizes a static GLB, preserves textures and renders saved lights and custom views',()=>{
  const plugin=fileURLToPath(new URL('../',import.meta.url)),folder=realpathSync(mkdtempSync(join(tmpdir(),'dsh-refinement-engine-')));
  const runtime=JSON.parse(readFileSync(join(plugin,'runtime/manifest.json'))),executable=join(plugin,runtime.executable);
  const env={...process.env,PYTHONDONTWRITEBYTECODE:'1',PYTHONNOUSERSITE:'1',BLENDER_USER_CONFIG:join(folder,'config'),BLENDER_USER_SCRIPTS:join(folder,'scripts'),BLENDER_USER_EXTENSIONS:join(folder,'extensions'),XDG_CACHE_HOME:join(folder,'cache')};
  delete env.PYTHONPATH;delete env.PYTHONHOME;delete env.PYTHONSTARTUP;
  const run=commands=>{
    const stdout=execFileSync(executable,['--background','--factory-startup','--disable-autoexec','--threads','2','--python-exit-code','17','--python',join(plugin,'worker/worker.py'),'--','--workspace',folder,'--vendor',join(plugin,'runtime/vendor')],{cwd:folder,env,input:commands.map(c=>JSON.stringify(c)+'\n').join(''),timeout:90000,maxBuffer:8*1024*1024}).toString();
    const results=Object.fromEntries(stdout.split('\n').filter(s=>s.startsWith('@interior ')).map(s=>JSON.parse(s.slice(10))).filter(r=>r.id).map(r=>[r.id,r]));
    for(const c of commands)assert.equal(results[c.id]?.ok,true,JSON.stringify(results[c.id]));return results;
  };
  try {
    const input=join(folder,'input.glb'),normalized=join(folder,'normalized');writeFileSync(input,glb());
    const imported=run([{id:'import',action:'import-model',path:input,output:normalized}]).import.value;
    const bytes=readFileSync(join(normalized,'model.glb'));validateGlb(bytes);
    const resources=join(folder,'resources');mkdirSync(resources);const digest=resourceHash(bytes);copyFileSync(join(normalized,'model.glb'),join(resources,digest+'.glb'));
    // Let Blender encode the tiny test image so the decoder is exercised with a valid PNG.
    const image=join(folder,'surface.png');
    execFileSync(executable,['--background','--factory-startup','--disable-autoexec','--threads','2','--python-expr',`import bpy; image=bpy.data.images.new('Test',width=4,height=4);image.generated_color=(.1,.6,.25,1);image.file_format='PNG';image.filepath_raw=${JSON.stringify(image)};image.save()`],{cwd:folder,env,timeout:30000});
    const png=readFileSync(image);imageInfo(png);const imageDigest=resourceHash(png);writeFileSync(join(resources,imageDigest+'.png'),png);
    const scene=plan();scene.schemaVersion=7;const importedModel={...model(),resource:digest,size:imported.size,audit:validateGlb(bytes),rotationEuler:[0,0,.25]};scene.objects=[importedModel,...scene.objects];
    scene.objects[1].position=[1,3,0];scene.objects[1].surface={resource:imageDigest,extension:'png',source:'Test-generated pixels',face:'y-',repeat:[1,.5],rotation:0,roughness:.4,emission:.1};
    scene.presentation=presentationFromInput({mode:'custom',worldStrength:.1,lights:[{key:'key',type:'area',position:[2,0,3],target:[2,2,.3],power:400}],cameras:[{key:'detail',label:'Detail',position:[3,.7,1.2],target:[2,2,.2],lens:45}]});
    validateScene(scene);const output=join(folder,'output');
    const results=run([{id:'build',action:'build',scene,revision:1,materials:MATERIALS,resourceRoot:resources,output,render:true,views:['detail','front'],resolution:[320,240],samples:4},...['blend','glb'].map(ext=>({id:ext,action:'inspect',scene,path:join(output,'scene.'+ext)}))]);
    const exported=readFileSync(join(output,'scene.glb')),document=JSON.parse(exported.toString('utf8',20,20+exported.readUInt32LE(12)));
    const surfaceMaterial=document.materials.find(m=>m.name.includes('__surface'));
    assert.equal(surfaceMaterial.pbrMetallicRoughness.baseColorTexture.extensions.KHR_texture_transform.scale[1],2,'GLB must preserve the physical texture scale');
    assert.equal(results.build.value.importedAudit.passed,true);assert.equal(results.build.value.views[0].presentation.custom,true);
    for(const ext of ['blend','glb']){assert.equal(results[ext].value.importedAudit.passed,true);assert.deepEqual(results[ext].value.externalImages,[]);assert.equal(results[ext].value.objects.filter(o=>o.id==='imported').length,1);}
    assert.notEqual(resourceHash(readFileSync(join(output,'render.png'))),resourceHash(readFileSync(join(output,'render-front.png'))));
    const images=renderImages({state:'complete',detail:{views:results.build.value.views,files:{'render.png':{},'render-front.png':{}}}});assert.equal(images[0].label,'Detail');
    const checkedBlend=resourceHash(readFileSync(join(output,'scene.blend'))),cad=join(output,'plan.dxf'),reused=join(folder,'reused');
    writeFileSync(cad,'Checked synthetic CAD source');mkdirSync(reused);
    const renderScene=structuredClone(scene);
    renderScene.presentation.cameras[0]={...renderScene.presentation.cameras[0],position:[4,-4,3],target:[2,2,.2],lens:35,subjects:['detail','part'],purpose:'overview'};
    renderScene.design??={};renderScene.design.constraints={views:[{id:'full-detail',source:'Fixed view fixture',basis:'user_request',view:'detail',keys:['detail','part']}]};
    const rerender=run([{id:'reuse',action:'render-existing',scene:renderScene,revision:2,blendPath:join(output,'scene.blend'),blendHash:checkedBlend,
      cadPath:cad,cadHash:resourceHash(readFileSync(cad)),output:reused,views:['detail'],resolution:[320,180],samples:2}]).reuse.value;
    assert.equal(rerender.rendered,true,JSON.stringify(rerender.preflight));assert.equal(rerender.geometryRebuilt,false);
    assert.equal(rerender.preflight.views[0].status,'pass');assert.equal(rerender.preflight.views[0].fixedChecks[0].status,'pass');assert.equal(rerender.views[0].imageReview.pixels,320*180);
    assert.equal(resourceHash(readFileSync(join(output,'scene.blend'))),checkedBlend,'rendering must not resave its model source');
    assert.deepEqual(readdirSync(reused),['render.png'],'a camera update owns only its image');
    execFileSync(executable,['--background','--factory-startup','--disable-autoexec',join(output,'scene.blend'),'--python-expr',"import bpy; assert [o['studio_light'] for o in bpy.data.objects if o.get('studio_light')]==['key']; assert len([o for o in bpy.data.objects if o.type=='LIGHT'])==1; assert any('__surface' in m.name and any(n.type=='TEX_IMAGE' for n in m.node_tree.nodes) for m in bpy.data.materials if m.use_nodes)"],{cwd:folder,env,timeout:30000});
  } finally {rmSync(folder,{recursive:true,force:true});}
});
