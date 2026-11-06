import test from 'node:test';
import assert from 'node:assert/strict';
import {drawingScene} from '../src/drawing.js';
import {reviewDesign} from '../src/design-review.js';
import {mergeConstraints,constraintChanges,requireConstraintsReady} from '../src/design-constraints.js';
const basis={source:'Customer maximum height including platform',basis:'user_request'};
const scene=()=>drawingScene({name:'requirements',kind:'booth',dimensionBasis:'site',width:8,depth:8,height:3.5,thickness:.1,walls:[],assumptions:[],components:[
  {key:'platform',shape:'box',width:7,depth:7,height:.03,position:[4,4,0],assembly:'display'},
  {key:'panel',shape:'box',width:2,depth:.2,height:3.47,position:[4,4,.03],assembly:'display'}]});
const top={id:'top',...basis,scope:'scene',property:'top_z',operator:'max',expected:3.5,tolerance:.001};

test('saved whole-scene limits include platforms and attachments even with an empty ad-hoc review',()=>{
  const s=scene();s.design.constraints=mergeConstraints({requirements:[top]});
  let r=reviewDesign(s,{});assert.equal(r.fixedChecks.requirements[0].status,'pass');assert.deepEqual(r.totals,{pass:0,fail:0,not_evaluated:0});
  s.objects[1].position[2]+=.035;r=reviewDesign(s,{});
  assert.equal(r.fixedChecks.requirements[0].status,'fail');assert.equal(r.quality.overall,'needs_fix');assert.throws(()=>requireConstraintsReady(r),/top/);
});

test('blocked saved route cannot be hidden by passing dimensions or narrowed ad-hoc routes',()=>{
  const s=scene();s.objects=s.objects.filter(o=>o.origin.key!=='platform');
  s.design.constraints=mergeConstraints({requirements:[top],routes:[{id:'entrance',...basis,width:1,height:2,baseZ:0,points:[[4,1],[4,7]]}]});
  const r=reviewDesign(s,{requirements:[{...top,id:'limited'}],routes:[{id:'other',...basis,width:.98,height:2,baseZ:0,points:[[1,1],[1,7]]}]});
  assert.equal(r.totals.pass,1);assert.equal(r.fixedChecks.circulationReview.routes[0].status,'blocked');assert.equal(r.quality.overall,'needs_fix');
  assert.throws(()=>requireConstraintsReady(r),/entrance/);
});

test('omission retains saved requirements; changes are explicit and confirmations cannot be self-reported',()=>{
  const saved=mergeConstraints({requirements:[{...top,basis:'user_confirmed'}]});
  assert.equal(saved.requirements[0].basis,'user_request');
  const omitted=mergeConstraints({requirements:[]},saved);assert.deepEqual(omitted,saved);
  const changed=mergeConstraints({requirements:[{...top,expected:4}]},saved);
  assert.equal(constraintChanges(saved,changed).length,1);
  assert.equal(constraintChanges(saved,omitted).length,0);
  assert.throws(()=>mergeConstraints({requirements:[top],routes:[{...top}]}),/不同类别.*重复/);
  const removed=mergeConstraints({remove:{requirements:['top']}},saved);
  assert.equal(removed.requirements.length,0);assert.equal(constraintChanges(saved,removed)[0].proposed,null);
  assert.throws(()=>mergeConstraints({remove:{requirements:['unknown']}},saved),/不存在/);
  assert.throws(()=>mergeConstraints({requirements:[top],remove:{requirements:['top']}},saved),/同时被修改/);
});

test('world span and local thickness remain separate after rotation and grouping',()=>{
  const s=scene(),p=s.objects[1];p.rotationEuler=[0,0,Math.PI/2];
  const r=reviewDesign(s,{requirements:[{id:'thickness',...basis,keys:['panel'],property:'local_depth',expected:.2},
    {id:'whole',...basis,scope:'assembly',assembly:'display',property:'width',expected:7}]});
  assert.equal(r.totals.pass,2);assert.equal(r.quality.visual.status,'not_evaluated');assert.equal(r.quality.overall,'needs_review');
});
