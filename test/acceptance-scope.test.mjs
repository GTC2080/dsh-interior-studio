import test from 'node:test';
import assert from 'node:assert/strict';
import {drawingScene} from '../src/drawing.js';
import {validateScene} from '../src/scene.js';
import {mergeConstraints,constraintChanges,requireConstraintsReady} from '../src/design-constraints.js';
import {reviewDesign} from '../src/design-review.js';
import {reviewScopeDeclarations,applyScopeEvidence,requireRenderAcceptance} from '../src/acceptance-scope.js';
import {viewFingerprint,meshScopeFingerprint} from '../src/design-fingerprints.js';

const basis={source:'Customer complete frontage and supported display',basis:'user_request'};
const view={id:'front-complete',...basis,view:'front',scope:'assembly',assembly:'facade',visibleKeys:['sign']};
const support={id:'shelf-path',...basis,keys:['shelf'],anchorKeys:['platform'],viaAssemblies:['facade']};
function scene() {
  const s=drawingScene({name:'Fixed acceptance',kind:'booth',width:8,depth:6,height:3,thickness:.1,dimensionBasis:'site',assumptions:[],walls:[],components:[
    {key:'platform',shape:'box',width:7,depth:5,height:.1,position:[4,3,0]},
    {key:'frame',shape:'box',width:.2,depth:.2,height:2,position:[4,3,.1],assembly:'facade'},
    {key:'sign',shape:'box',width:6,depth:.1,height:.4,position:[4,3,2.1],assembly:'facade'},
    {key:'shelf',shape:'box',width:1,depth:.4,height:.1,position:[4,3,1],assembly:'display'}]});
  s.schemaVersion=7;s.design.constraints=mergeConstraints({views:[view],supports:[support]});return s;
}

test('saved framing and cross-assembly targets survive omission and changes require explicit acceptance',()=>{
  const s=scene(),saved=s.design.constraints;
  assert.deepEqual(mergeConstraints({},saved),saved);
  const narrowed=mergeConstraints({views:[{...view,scope:'keys',keys:['sign']}]},saved);
  assert.equal(constraintChanges(saved,narrowed)[0].id,view.id);
  const removed=mergeConstraints({remove:{supports:[support.id]}},saved);
  assert.equal(constraintChanges(saved,removed)[0].group,'supports');
  assert.throws(()=>mergeConstraints({views:[{...view,id:support.id}],supports:[support]}),/不同类别/);
  s.schemaVersion=6;assert.throws(()=>validateScene(s),/场景版本7/);
});

test('an assembly range includes new attachments and missing references remain failures',()=>{
  const s=scene(),before=reviewScopeDeclarations(s,s.design.constraints);
  assert.equal(before.views[0].resolvedIds.length,2);
  s.objects.push({...structuredClone(s.objects[2]),id:'attachment',origin:{key:'attachment'}});
  assert.equal(reviewScopeDeclarations(s,s.design.constraints).views[0].resolvedIds.length,3);
  s.objects=s.objects.filter(o=>o.origin?.key!=='platform');
  const review=reviewDesign(s);assert.equal(review.fixedChecks.supports[0].status,'fail');
  assert.throws(()=>requireConstraintsReady(review),/shelf-path/);
});

test('temporary checks do not increase saved counts or complete mesh and visual acceptance',()=>{
  const s=scene(),requirement={id:'width',...basis,scope:'scene',property:'width',expected:7};
  s.design.constraints=mergeConstraints({requirements:[requirement]},s.design.constraints);
  const r=reviewDesign(s,{requirements:[{...requirement,id:'temporary'}]});
  assert.equal(r.totals.pass,1);assert.equal(r.quality.requirements.required,1);
  assert.equal(r.quality.temporary.requirements.required,1);assert.equal(r.quality.coverage.savedCounts.views,1);
  assert.equal(r.quality.coverage.required,3);assert.equal(r.quality.views.status,'not_evaluated');
  assert.equal(r.quality.crossAssembly.status,'not_evaluated');assert.equal(r.quality.visual.status,'not_evaluated');
});

test('rendering cannot accept missing, partial or differently scoped engine evidence',()=>{
  const s=scene(),declared=reviewScopeDeclarations(s,s.design.constraints);
  const result={meshContactReview:{declaredSupports:[{...declared.supports[0],status:'pass'}]},
    preflight:{views:[{id:'front',fixedChecks:[{...declared.views[0],status:'pass'}]}]}};
  assert.doesNotThrow(()=>requireRenderAcceptance(s,result,['front']));
  assert.equal(applyScopeEvidence(declared,{views:result.preflight.views[0].fixedChecks}).views[0].reason,'scope_checked');
  const clipped=structuredClone(result);clipped.preflight.views[0].fixedChecks[0].status='fail';clipped.preflight.views[0].fixedChecks[0].failures=['subject_clipped_or_behind_camera'];
  assert.throws(()=>requireRenderAcceptance(s,clipped,['front']),/subject_clipped_or_behind_camera/);
  const partial=structuredClone(result);partial.preflight.views[0].fixedChecks[0].resolvedIds.pop();
  assert.throws(()=>requireRenderAcceptance(s,partial,['front']),/front-complete/);
  const unassessed=structuredClone(result);unassessed.meshContactReview.declaredSupports[0].status='not_evaluated';
  assert.throws(()=>requireRenderAcceptance(s,unassessed,['front']),/shelf-path/);
  assert.throws(()=>requireRenderAcceptance(s,{},['front']),/固定验收/);
  assert.equal(applyScopeEvidence(declared,{views:[{...declared.views[0],status:'complete'}]}).views[0].status,'not_evaluated');
});

test('saved acceptance changes invalidate evidence while a different view can be rendered separately',()=>{
  const s=scene(),before=viewFingerprint(s,'front',{},'fixture'),contactHash=meshScopeFingerprint(s);
  s.design.constraints.views[0].framing='detail';assert.notEqual(viewFingerprint(s,'front',{},'fixture'),before);
  assert.equal(meshScopeFingerprint(s),contactHash);
  s.design.constraints.supports[0].viaAssemblies=[];assert.notEqual(meshScopeFingerprint(s),contactHash);
  const declarations=reviewScopeDeclarations(s,s.design.constraints);
  assert.doesNotThrow(()=>requireRenderAcceptance(s,{meshContactReview:{declaredSupports:[{...declarations.supports[0],status:'pass'}]}},['back']));
  assert.throws(()=>reviewScopeDeclarations(s,{views:[{...view,visibleKeys:['shelf']}]}),/必见对象/);
  assert.throws(()=>reviewScopeDeclarations(s,{supports:[{...support,anchorKeys:[]}]}),/连接基准/);
  assert.throws(()=>reviewScopeDeclarations(s,{views:[{...view,id:'bad\u0000id'}]}),/验收编号/);
});
