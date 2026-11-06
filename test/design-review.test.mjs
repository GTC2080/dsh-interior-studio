import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {drawingScene} from '../src/drawing.js';
import {solidFromInput,solidSurfaceDistance,solidWorld} from '../src/solids.js';
import {reviewDesign} from '../src/design-review.js';
import {Studio} from '../src/studio.js';

const scene=()=>drawingScene({name:'Review fixture',kind:'booth',dimensionBasis:'site',width:6,depth:6,height:3,thickness:.1,assumptions:[],walls:[],components:[
  {key:'base',shape:'box',width:4,depth:4,height:.1,position:[3,3,0]},
  {key:'upper',shape:'cylinder',radius:.3,height:1,position:[3,3,.1]},
]});
const source={source:'Explicit test requirement',basis:'user_request'};
const relation=(kind='support',point=[3,3,.1])=>({id:'joint',...source,a:'upper',b:'base',kind,point});

test('surface distance respects concavity, holes and three-axis transforms',()=>{
  const o=solidFromInput({key:'profile',shape:'extrusion',plane:'xz',position:[2,3,4],rotation:[20,30,40],depth:.2,outline:[[0,0],[3,0],[3,3],[0,3]],holes:[[[1,1],[2,1],[2,2],[1,2]]]},'part',{});
  const distance=p=>solidSurfaceDistance(o,solidWorld(o,p));
  assert.ok(Math.abs(distance([.5,.5,.1])+.1)<1e-8);
  assert.ok(Math.abs(distance([1.5,1.5,.1])-.5)<1e-8,'inside a profile hole is outside the solid');
  assert.ok(Math.abs(distance([1,1.5,.1]))<1e-8);
  assert.ok(Math.abs(distance([.5,.5,.25])-.05)<1e-8);
  assert.ok(Math.abs(distance([3.3,.5,.6])-.5)<1e-8);
  const concave=solidFromInput({key:'concave',shape:'extrusion',plane:'xy',position:[0,0,0],depth:1,outline:[[0,0],[2,0],[2,1],[1,1],[1,2],[0,2]]},'concave',{});
  assert.ok(Math.abs(solidSurfaceDistance(concave,[1.5,1.5,.5])-.5)<1e-8);
});

test('no collision is not contact, and side contact is not vertical support',()=>{
  const s=scene(),upper=s.objects.find(o=>o.origin?.key==='upper');
  let review=reviewDesign(s,{relations:[relation()]});assert.equal(review.relations[0].status,'pass');
  upper.position[2]+=.02;review=reviewDesign(s,{relations:[relation()]});
  assert.equal(review.componentReview.issues.length,0);assert.equal(review.relations[0].status,'fail');
  upper.position[2]-=.04;review=reviewDesign(s,{relations:[relation()]});assert.equal(review.relations[0].status,'fail');assert.equal(review.relations[0].penetration,true);
  const side=scene();side.objects[1]=solidFromInput({key:'upper',shape:'box',width:1,depth:1,height:.1,position:[.5,3,0]},'side',{});
  assert.equal(reviewDesign(side,{relations:[relation('contact',[1,3,.05])]}).relations[0].status,'pass');
  assert.equal(reviewDesign(side,{relations:[relation('support',[1,3,.05])]}).relations[0].status,'fail');
});

test('world dimensions, counts, missing objects and unsupported evidence remain distinct',()=>{
  const s=scene();const requirements=[
    {id:'radius',...source,keys:['upper'],property:'radius',expected:.3},
    {id:'height',...source,keys:['upper'],property:'base_z',expected:.1},
    {id:'count',...source,keys:['base','upper'],property:'count',expected:2,tolerance:0},
    {id:'missing',...source,keys:['absent'],property:'count',expected:1,tolerance:0},
    {id:'unsupported',...source,keys:['base'],property:'radius',expected:.5},
  ];
  const before=JSON.stringify(s),r=reviewDesign(s,{requirements});assert.deepEqual(r.totals,{pass:3,fail:1,not_evaluated:1});assert.equal(JSON.stringify(s),before);
  const upper=s.objects.find(o=>o.origin?.key==='upper');
  assert.equal(reviewDesign(s,{requirements:[{id:'aliases',...source,keys:['upper',upper.id],property:'count',expected:2,tolerance:0}]}).requirements[0].reason,'duplicate_object_aliases');
  assert.throws(()=>reviewDesign(s,{requirements:[{...requirements[0],expected:NaN}]}),/目标数值/);
  assert.throws(()=>reviewDesign(s,{relations:[{...relation(),point:[Infinity,0,0]}]}),/连接点/);
  assert.throws(()=>reviewDesign(s,{requirements:Array(81).fill(requirements[0])}),/80/);
  assert.throws(()=>reviewDesign(s,{requirements:[requirements[0],requirements[0]]}),/重复/);
  s.objects.push({id:'asset',type:'asset',asset:'chair',label:'catalog',position:[3,3,.54],size:[.52,.55,.88],rotation:0,origin:{key:'asset'}});
  assert.equal(reviewDesign(s,{relations:[{...relation(),a:'asset'}]}).relations[0].status,'not_evaluated');
});

test('review gates disclosure, binds draft identity and revision, and leaves project state untouched',async t=>{
  const root=mkdtempSync(join(tmpdir(),'dsh-review-')),studio=new Studio(root,{dispose:async()=>{}});
  t.after(async()=>{await studio.dispose();rmSync(root,{recursive:true,force:true});});
  const p=studio.store.create('session','Private design','booth','create'),s=scene();
  studio.store.once('session','initial',{},()=>studio.store.commit('session',p.id,0,s,'initial'));
  const input={expectedRevision:1,target:'current',requirements:[],relations:[]};
  assert.throws(()=>studio.review('session',input,true),/未授权/);
  assert.equal(studio.store.db.prepare('SELECT COUNT(*) n FROM disclosures').get().n,0);
  const route={sessionId:'session',provider:'deepseek',model:'flash'};studio.beforeModelRequest(route);
  await studio.ui('session','consent',{allow:true,expectedRevision:1},'grant');
  const before=JSON.stringify(studio.store.project(p.id)),current=JSON.stringify(studio.store.read(p.id));
  const task='11111111-1111-4111-8111-111111111111';
  studio.store.db.prepare('INSERT INTO tasks VALUES(?,?,?,?,?)').run(task,p.id,1,'complete',JSON.stringify({render:true,relativePath:'renders/'+task,files:{'render.png':{},'../private.txt':{},'scene.blend':{}}}));
  const paths=studio.context('session').tasks[0].artifacts;
  assert.deepEqual(Object.keys(paths).sort(),['render.png','scene.blend']);
  assert.equal(paths['render.png'],join(studio.store.root,p.id,'renders',task,'render.png'));
  assert.equal(studio.review('session',input,true).revision,1);
  assert.equal(JSON.stringify(studio.store.project(p.id)),before);assert.equal(JSON.stringify(studio.store.read(p.id)),current);
  assert.throws(()=>studio.review('session',{...input,expectedRevision:0},true),/版本/);
  studio.store.db.prepare('INSERT OR REPLACE INTO proposals VALUES(?,?)').run(p.id,JSON.stringify({type:'drawing',baseRevision:1,drawingId:'fresh',scene:s}));
  assert.throws(()=>studio.review('session',{...input,target:'draft',drawingId:'old'},true),/草案/);
  assert.equal(studio.review('session',{...input,target:'draft',drawingId:'fresh'},true).drawingId,'fresh');
  studio.store.db.prepare('UPDATE proposals SET data=? WHERE project=?').run(JSON.stringify({type:'drawing',baseRevision:0,drawingId:'fresh',scene:s}),p.id);
  assert.throws(()=>studio.review('session',{...input,target:'draft',drawingId:'fresh'},true),/过期/);
  await studio.ui('session','consent',{allow:false,expectedRevision:1},'revoke');
  assert.equal(studio.context('session').tasks,undefined,'revoked contexts must not disclose artifact paths');
  assert.throws(()=>studio.review('session',input,true),/未授权/);assert.throws(()=>studio.beforeModelRequest(route),/授权已变化/);
});
