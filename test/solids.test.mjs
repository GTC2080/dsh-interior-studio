import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,readFileSync,realpathSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {solidFromInput,solidBounds,solidsOverlap,reviewSolids} from '../src/solids.js';
import {drawingScene} from '../src/drawing.js';
import {validateScene,placementBlocked,editScene,MATERIALS} from '../src/scene.js';
import {reviewFurniture} from '../src/furniture-review.js';
import {DEFAULT_RENDER_VIEWS} from '../src/design-views.js';

const solid=row=>solidFromInput({key:'part',shape:'box',width:1,depth:1,height:1,position:[3,3,0],...row},row.key??'part',{});
const draft=components=>drawingScene({name:'General shapes',kind:'booth',dimensionBasis:'site',expectedRevision:0,width:8,depth:7,height:3.5,thickness:.1,walls:[],assumptions:[],components});

test('low cylinders, millimetre panels and elevated solids retain dimensions',()=>{
  const cylinder=solid({shape:'cylinder',radius:.3,height:.3,position:[2,2,.03]});
  const bounds=solidBounds(cylinder);assert.ok(Math.abs(bounds[1][0]-bounds[0][0]-.6)<1e-8);assert.ok(Math.abs(bounds[0][2]-.03)<1e-8);assert.ok(Math.abs(bounds[1][2]-.33)<1e-8);
  const panel=solid({width:1,depth:.001,height:2,position:[2,2,1]});assert.deepEqual(solidBounds(panel),[[1.5,1.9995,1],[2.5,2.0005,3]]);
  const copy=structuredClone(cylinder);copy.id='copy';assert.equal(solidsOverlap(cylinder,copy),true);
  copy.position[2]=.33;assert.equal(solidsOverlap(cylinder,copy),false);
});

test('a concave rounded vertical profile leaves the real passage empty',()=>{
  const arch=solid({shape:'extrusion',plane:'xz',outline:[[0,0],[1,0],[1,2,.2],[3,2,.2],[3,0],[4,0],[4,3],[0,3]],depth:.2,position:[1,1,0]});
  const inside=solid({position:[3,1.1,0],width:.8,depth:.4,height:1.7});
  assert.equal(solidsOverlap(arch,inside),false);
  inside.position[2]=1.9;assert.equal(solidsOverlap(arch,inside),true);
  inside.position=[1.5,1.1,0];assert.equal(solidsOverlap(arch,inside),true);
  const ring=solid({shape:'extrusion',plane:'xy',outline:[[0,0],[3,0],[3,3],[0,3]],holes:[[[1,1],[2,1],[2,2],[1,2]]],depth:.4,position:[1,1,0]});
  const hole=solid({position:[2.5,2.5,.1],width:.5,depth:.5,height:.1});assert.equal(solidsOverlap(ring,hole),false);
});

test('validation rejects invalid geometry, excessive fillets, holes, colours and site overflow',()=>{
  assert.throws(()=>solid({shape:'extrusion',outline:[[0,0],[2,2],[0,2],[2,0]]}),/自交|退化/);
  assert.throws(()=>solid({shape:'extrusion',outline:[[0,0,2],[1,0],[1,1],[0,1]],depth:.1}),/过大|重叠/);
  assert.throws(()=>solid({shape:'extrusion',outline:[[0,0],[2,0],[2,2],[0,2]],holes:[[[0,0],[1,0],[1,1]]],depth:.1}),/内孔/);
  assert.throws(()=>solid({color:[1,0,2]}),/RGB/);
  assert.throws(()=>draft([{key:'outside',shape:'cylinder',radius:1,height:.2,position:[0,0,0]}]),/越出场地/);
});

test('three-axis rotations, assembly diagnostics, platform contact and edits use 3D geometry',()=>{
  const a=solid({key:'a',width:2,depth:.2,height:.5,position:[3,3,1],rotation:[90,0,0]}),b=structuredClone(a);b.id='b';b.origin.key='b';
  assert.ok(Math.abs(solidBounds(a)[1][2]-1.1)<1e-8);
  let scene={schemaVersion:4,unit:'m',kind:'booth',bounds:[8,7],objects:[a,b]};
  assert.equal(reviewSolids(scene).issues.length,1);a.assembly=b.assembly='frame';assert.equal(reviewSolids(scene).issues.length,0);assert.equal(reviewSolids(scene).intersections.length,1);
  const stage=solid({width:6,depth:6,height:.03,position:[4,3.5,0]});
  const chair={id:'chair',type:'asset',asset:'chair',position:[4,3,.44],size:[.52,.55,.88],rotation:0,origin:{}};
  scene={...scene,objects:[stage,chair]};assert.equal(placementBlocked(scene,chair),true);chair.position[2]+=.03;assert.equal(placementBlocked(scene,chair),false);
  const tinted=solid({color:[.2,.5,.1]});scene.objects=[tinted];const changed=editScene(scene,{objectId:tinted.id},{action:'material',material:'blue'}).scene;assert.equal(changed.objects[0].finish,undefined);
});

test('explicit facing relationships can target a general solid without a table catalog asset',()=>{
  const scene=draft([{key:'surface',shape:'cylinder',radius:.3,height:.75,position:[3,3,0]}]);
  scene.objects.push({id:'chair',type:'asset',asset:'chair',label:'seat',size:[.52,.55,.88],position:[3,2,.44],rotation:Math.PI,faceTarget:'surface',origin:{key:'seat'}});
  scene.objects.push({id:'floor',type:'floor',width:8,depth:7,polygon:[[0,0],[8,0],[8,7],[0,7]],holes:[],area:56,material:'oak'});
  validateScene(scene);const review=reviewFurniture(scene);assert.equal(review.checked,1);assert.equal(review.items[0].status,'pass');assert.equal(review.items[0].targetSource,'explicit_design_relationship');
});

test('component/wall findings identify both objects and respect wall openings',()=>{
  const plan={name:'Opening check',kind:'booth',dimensionBasis:'site',width:8,depth:7,height:3,thickness:.2,assumptions:[],walls:[{key:'partition',points:[[1,2],[7,2]]}],openings:[{wall:'partition',kind:'passage',start:2,width:2,sill:0,top:2.2}],components:[{key:'moving',shape:'box',width:.5,depth:.5,height:1,position:[4,2,0]}]};
  const scene=drawingScene(plan);assert.equal(reviewSolids(scene).issues.length,0);scene.objects.find(o=>o.type==='solid').position[0]=1.5;
  const issue=reviewSolids(scene).issues[0];assert.equal(issue.code,'component_wall_intersection');assert.match(issue.message,/moving.*partition/);
});

test('real Blender exports and reopens independent shapes, holes, elevations and Unicode text',()=>{
  const root=fileURLToPath(new URL('../',import.meta.url)),workspace=realpathSync(mkdtempSync(join(tmpdir(),'dsh-solids-')));
  try {
    const env={...process.env,PYTHONDONTWRITEBYTECODE:'1',PYTHONNOUSERSITE:'1',BLENDER_USER_CONFIG:join(workspace,'config'),BLENDER_USER_SCRIPTS:join(workspace,'scripts'),BLENDER_USER_EXTENSIONS:join(workspace,'extensions'),XDG_CACHE_HOME:join(workspace,'cache')};
    delete env.PYTHONPATH;delete env.PYTHONHOME;delete env.PYTHONSTARTUP;
    const scene=draft([
      {key:'panel',shape:'extrusion',plane:'xz',outline:[[0,0,.1],[4,0,.1],[4,3,.2],[0,3,.2]],holes:[[[1,1,.1],[3,1,.1],[3,2,.1],[1,2,.1]]],depth:.03,position:[.5,1,0]},
      {key:'low',shape:'cylinder',radius:.4,height:.35,position:[6,2,.2],material:'wood-floor',color:[.6,.2,.1],roughness:.25},
      {key:'rounded',shape:'box',width:1.5,depth:1,height:.3,cornerRadius:.1,position:[5,5,.05],rotation:[0,0,25]},
      {key:'roof',shape:'extrusion',plane:'xz',outline:[[0,0],[2,0],[2,1],[1,1.6],[0,1]],depth:1.8,position:[4,3,1]},
      {key:'letters',shape:'text',text:'通用 ABC',width:1.2,height:.25,depth:.02,position:[.5,1.5,3.1],color:[.9,.1,.1],emission:.5},
    ]);
    const passage=drawingScene({name:'Bare opening',kind:'booth',dimensionBasis:'site',width:8,depth:7,height:2.8,thickness:.2,assumptions:[],walls:[{key:'partition',points:[[1,6.5],[7,6.5]]}],openings:[{wall:'partition',kind:'passage',start:2,width:2,top:2}]});
    scene.objects.push(...passage.objects);
    const executable=join(root,JSON.parse(readFileSync(join(root,'runtime/manifest.json'))).executable);
    const output=join(workspace,'output');
    const commands=[{id:'build',action:'build',scene,revision:1,materials:MATERIALS,output,render:true,views:DEFAULT_RENDER_VIEWS,resolution:[240,180],samples:2},...['blend','glb'].map(ext=>({id:ext,action:'inspect',scene,path:join(output,'scene.'+ext)}))];
    const stdout=execFileSync(executable,['--background','--factory-startup','--disable-autoexec','--python-exit-code','17','--python',join(root,'worker/worker.py'),'--','--workspace',workspace,'--vendor',join(root,'runtime/vendor')],{cwd:workspace,env,input:commands.map(c=>JSON.stringify(c)+'\n').join(''),timeout:60000,maxBuffer:8*1024*1024,stdio:['pipe','pipe','pipe']}).toString();
    const results=Object.fromEntries(stdout.split('\n').filter(s=>s.startsWith('@interior ')).map(s=>JSON.parse(s.slice(10))).filter(r=>r.id).map(r=>[r.id,r]));
    for(const [id,result] of Object.entries(results))assert.equal(result.ok,true,id+': '+result.error);
    assert.ok(results.build&&results.blend&&results.glb);
    const frames=results.build.value.views;assert.deepEqual(frames.map(v=>v.id),DEFAULT_RENDER_VIEWS);
    assert.equal(new Set(frames.map(v=>createHash('sha256').update(readFileSync(join(output,v.file))).digest('hex'))).size,6,'six views must not be repeated copies');
    for(const frame of frames){const [x0,y0,x1,y1]=frame.presentation.projectedBounds;assert.ok(x0>=0&&y0>=0&&x1<=1&&y1<=1,frame.id);}
    for(const ext of ['blend','glb']) {const value=results[ext].value,audit=value.componentAudit;assert.equal(audit.passed,true,JSON.stringify(audit));assert.equal(audit.objects.length,5);assert.equal(value.objects.length,6);assert.deepEqual(value.openingDetails,[]);assert.equal(value.geometryChecks[0].clear,true);assert.equal(value.geometryChecks[0].lintelSolid,true);}
    const tinted=scene.objects.find(o=>o.origin?.key==='low');
    execFileSync(executable,['--background','--factory-startup','--disable-autoexec',join(output,'scene.blend'),'--python-exit-code','17','--python-expr',`
import bpy
assert not [font for font in bpy.data.fonts if font.packed_file], 'Converted text must not retain packed CJK fonts'
assert not [image for image in bpy.data.images if image.source == 'FILE' and not image.packed_file], 'Texture images must remain embedded'
obj=bpy.data.objects[${JSON.stringify(tinted.id)}]
mat=obj.data.materials[0];shader=mat.node_tree.nodes.get('Principled BSDF')
assert not shader.inputs['Roughness'].is_linked and abs(shader.inputs['Roughness'].default_value-.25)<1e-6
mix=shader.inputs['Base Color'].links[0].from_node
assert mix.type=='MIX_RGB' and mix.blend_type=='MULTIPLY' and mix.inputs[1].is_linked
assert all(abs(a-b)<1e-6 for a,b in zip(mix.inputs[2].default_value[:3],[.6,.2,.1]))
print('TEXTURED_FINISH_VERIFIED')
`],{cwd:workspace,env,timeout:30000,stdio:['pipe','pipe','pipe']});
    const python=join(root,'runtime/Blender.app/Contents/Resources/4.5/python/bin/python3.11');
    execFileSync(python,['-B','-c',"import sys;sys.path.insert(0,sys.argv[1]);import ezdxf;d=ezdxf.readfile(sys.argv[2]);a=d.audit();assert not a.errors and not a.fixes;assert len(d.modelspace().query('3DFACE'))>100;assert any('通用' in e.text for e in d.modelspace().query('MTEXT'))",join(root,'runtime/vendor'),join(output,'plan.dxf')],{env,timeout:15000});
  } finally {rmSync(workspace,{recursive:true,force:true});}
});
