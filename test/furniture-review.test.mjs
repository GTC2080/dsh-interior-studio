import test from 'node:test';
import assert from 'node:assert/strict';
import {reviewFurniture} from '../src/furniture-review.js';
import {FURNITURE} from '../src/catalog.js';
import {placementBlocked} from '../src/scene.js';
import {drawingReport} from '../src/drawing.js';

const asset=(id,kind,x,y,angle=0)=>({id,type:'asset',asset:kind,label:id,size:[...FURNITURE[kind].size],
  position:[x,y,FURNITURE[kind].size[2]/2],rotation:angle*Math.PI/180});
function example() {
  const wall=(id,a,b)=>({id,type:'wall',a,b,thickness:.2,height:2.8,openings:[],origin:{}});
  return {bounds:[8,6],design:{name:'synthetic'},objects:[
    wall('south',[.1,.1],[7.9,.1]),wall('east',[7.9,.1],[7.9,5.9]),wall('north',[7.9,5.9],[.1,5.9]),
    wall('west',[.1,5.9],[.1,.1]),wall('partition',[4.8,.1],[4.8,5.9]),
    {id:'living',type:'floor',polygon:[[.1,.1],[4.8,.1],[4.8,5.9],[.1,5.9]]},
    {id:'bedroom',type:'floor',polygon:[[4.8,.1],[7.9,.1],[7.9,5.9],[4.8,5.9]]},
    asset('bed','bed',6.4,1.3),asset('sofa','sofa',.65,3,270),asset('coffee','coffee-table',1.85,3,90),
    asset('dining','table',3,4.45),asset('south-1','chair',2.5,3.7),asset('south-2','chair',3.5,3.7),
    asset('north-1','chair',2.5,5.2,180),asset('north-2','chair',3.5,5.2,180),
  ]};
}

test('numeric relationships identify all six reversed headings and repairs preserve every position',()=>{
  const scene=example(),before=structuredClone(scene),review=reviewFurniture(scene);
  assert.equal(review.checked,6);
  assert.deepEqual(review.issues.map(i=>[i.objectId,i.suggestedRotationDegrees]),[
    ['bed',180],['sofa',90],['south-1',180],['south-2',180],['north-1',0],['north-2',0],
  ]);
  assert.deepEqual(scene,before);
  for(const issue of review.issues)scene.objects.find(o=>o.id===issue.objectId).rotation=issue.suggestedRotationDegrees*Math.PI/180;
  assert.deepEqual(reviewFurniture(scene).issues,[]);
  assert.deepEqual(drawingReport(scene).furnitureReview.issues,[]);
  for(const item of scene.objects.filter(o=>o.type==='asset')) {
    assert.equal(placementBlocked(scene,item),false,item.id);
    assert.deepEqual(item.position,before.objects.find(o=>o.id===item.id).position);
  }
});

test('direction is evaluated in world coordinates and never pairs furniture across rooms',()=>{
  const scene={objects:[{id:'room',type:'floor',width:8,depth:6},asset('table','table',3,3,90),asset('chair','chair',2,3,270)]};
  assert.equal(reviewFurniture(scene).issues[0].suggestedRotationDegrees,90);
  scene.objects[2].rotation=Math.PI/2;assert.deepEqual(reviewFurniture(scene).issues,[]);
  const divided=example();divided.objects=divided.objects.filter(o=>o.asset!=='table');
  divided.objects.push(asset('other-room-table','table',6.5,4.45));
  assert.ok(reviewFurniture(divided).items.filter(i=>i.asset==='chair').every(i=>i.status==='not_evaluated'));
  scene.objects.shift();assert.equal(reviewFurniture(scene).checked,0);
});

test('a freestanding bed is an unresolved design choice, not an invented automatic correction',()=>{
  const scene=example();scene.objects.find(o=>o.asset==='bed').position[1]=3;
  const issue=reviewFurniture(scene).issues.find(i=>i.code==='bed_head_away_from_wall');
  assert.equal(issue.suggestedRotationDegrees,null);
});
