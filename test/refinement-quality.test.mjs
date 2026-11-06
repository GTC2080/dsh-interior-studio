import test from 'node:test';
import assert from 'node:assert/strict';
import {readingOrientation} from '../src/orientation.js';
import {solidFromInput,rotate3,validateSolid} from '../src/solids.js';
import {drawingScene} from '../src/drawing.js';
import {reviewDesign} from '../src/design-review.js';
import {mergeConstraints,requireConstraintsReady} from '../src/design-constraints.js';
import {recommendedRenderViews,galleryCoverage} from '../src/design-views.js';
import {calculateGeometry} from '../src/geometry-tools.js';
import {validateScene} from '../src/scene.js';

test('text reading frames face every audience direction with upright, non-mirrored glyph axes',()=>{
  const dot=(a,b)=>a.reduce((sum,n,i)=>sum+n*b[i],0);
  for(const plane of ['xy','xz','yz'])for(const direction of [[0,-1,0],[0,1,0],[1,0,0],[-1,0,0],[.3,-.7,.2],[0,0,1],[0,0,-1]]) {
    const input={key:'sign',shape:'text',text:'正面 F',position:[0,0,0],width:1,height:.3,plane,reading:{towards:direction}};
    const text=solidFromInput(input,'id',{}),expected=readingOrientation(plane,input.reading);
    const localNormal={xy:[0,0,1],xz:[0,-1,0],yz:[1,0,0]}[plane],localUp=plane==='xy'?[0,1,0]:[0,0,1],localRight=plane==='yz'?[0,1,0]:[1,0,0];
    assert.ok(dot(rotate3(localNormal,text.rotationEuler),expected.reading.towards)>.999999);
    assert.ok(dot(rotate3(localUp,text.rotationEuler),expected.reading.up)>.999999);
    assert.ok(dot(rotate3(localRight,text.rotationEuler),expected.right)>.999999);
    text.rotationEuler[2]+=.1;assert.throws(()=>validateSolid(text),/阅读方向/);
  }
  assert.throws(()=>readingOrientation('xz',{towards:[0,0,0]}),/非零/);
  assert.throws(()=>readingOrientation('xz',{towards:[0,0,1],up:[0,0,1]}),/平行/);
  assert.equal(calculateGeometry({operation:'orientation',towards:[-1,0,0]}).valid,true);
});
test('printed details remain missing until an actual image surface is applied and block rendering',()=>{
  const scene=drawingScene({name:'Details',kind:'booth',width:6,depth:4,height:3,thickness:.1,dimensionBasis:'site',walls:[],assumptions:[],components:[
    {key:'artwork',shape:'box',width:1,depth:.1,height:1,position:[3,3,0]},
  ]});
  scene.schemaVersion=7;scene.design.constraints=mergeConstraints({requirements:[{id:'printed-art',source:'Customer printed character artwork',basis:'user_request',keys:['artwork'],property:'representation',expectedText:'image_surface',stage:'render'}]});
  let review=reviewDesign(scene);
  assert.equal(review.fixedChecks.requirements[0].status,'fail');assert.equal(review.quality.overall,'needs_fix');
  assert.doesNotThrow(()=>requireConstraintsReady(review));
  assert.throws(()=>requireConstraintsReady(review,'render'),/printed-art/);
  scene.objects.find(o=>o.origin?.key==='artwork').surface={resource:'a'.repeat(64),extension:'png',source:'Original vector artwork',face:'y-',repeat:[1,1],rotation:0,roughness:.6,emission:0};
  validateScene(scene);review=reviewDesign(scene);assert.equal(review.fixedChecks.requirements[0].status,'pass');
  assert.doesNotThrow(()=>requireConstraintsReady(review,'render'));assert.equal(review.quality.visual.status,'not_evaluated');
  scene.design.constraints.requirements[0]={id:'height',source:'Client height',basis:'user_request',scope:'scene',property:'top_z',operator:'max',expected:3,stage:'render'};
  assert.throws(()=>reviewDesign(scene),/尺寸与数量不能推迟/);
});
test('default render views follow all saved client angles and stale images cannot complete coverage',()=>{
  const ids=['front','entry','left-inside','right-inside','island','hidden-door','cabinet-detail'];
  const scene={design:{constraints:{views:ids.map((view,index)=>({id:'view'+index,view}))}}};
  assert.deepEqual(recommendedRenderViews(scene),ids);
  const gallery=ids.map(id=>({id,current:id!=='hidden-door'}));
  assert.deepEqual(galleryCoverage(scene,gallery).missing,['hidden-door']);assert.equal(galleryCoverage(scene,gallery).complete,false);
  gallery.find(row=>row.id==='hidden-door').current=true;assert.equal(galleryCoverage(scene,gallery).complete,true);
});
