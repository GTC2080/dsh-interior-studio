import test from 'node:test';
import assert from 'node:assert/strict';
import {solidFromInput,solidBounds} from '../src/solids.js';
import {supportScreen,reviewCirculation} from '../src/spatial-review.js';

const part=(key,input)=>solidFromInput({key,shape:'box',...input},key,{key});
const route={id:'entry',source:'Fixture circulation requirement',basis:'user_request',points:[[3,0],[3,5]],width:1,height:2.1,baseZ:.03};

test('disconnected crowns remain unsupported even when they share an assembly name',()=>{
  const scene={objects:[part('base',{width:6,depth:6,height:.03,position:[3,3,0]}),
    part('stem',{width:.12,depth:.1,height:.8,position:[3,3,.03],assembly:'tree'}),
    part('crown',{width:1,depth:.1,height:1,position:[3,3,1],assembly:'tree'})]};
  const r=supportScreen(scene);assert.equal(r.status,'disconnected');assert.equal(r.disconnectedGroups[0].objects[0].key,'crown');
  scene.objects[1].depth=.97;
  assert.equal(supportScreen(scene).disconnectedGroups.length,0);
  assert.equal(supportScreen(scene).status,'not_proven');
});

test('continuous corridors catch raised and side obstructions while excluding the floor and high lintel',()=>{
  const scene={objects:[part('floor',{width:6,depth:6,height:.03,position:[3,3,0]}),
    part('lintel',{width:6,depth:.2,height:.5,position:[3,1,2.4]}),
    part('sign',{width:.2,depth:.1,height:.5,position:[3.4,2,1]})]};
  let r=reviewCirculation(scene,[route]);assert.equal(r.routes[0].status,'blocked');assert.deepEqual(r.routes[0].blockers.map(o=>o.key),['sign']);
  scene.objects[2].position[0]=5;
  r=reviewCirculation(scene,[route]);assert.equal(r.routes[0].status,'clear');
  assert.equal(reviewCirculation(scene).coverage,'not_requested');
});

test('turn regions are checked and malformed or unbounded requests fail',()=>{
  const scene={objects:[part('corner',{width:.1,depth:.1,height:1,position:[1.4,3.4,0]})]};
  const turn={...route,points:[[1,0],[1,3],[4,3]],baseZ:0};
  assert.equal(reviewCirculation(scene,[turn]).routes[0].status,'blocked');
  for(const bad of [{...route,points:[[1,1],[1,1]]},{...route,width:NaN},{...route,height:0},{...route,baseZ:Infinity}])assert.throws(()=>reviewCirculation(scene,[bad]));
  assert.throws(()=>reviewCirculation(scene,Array(9).fill(route)),/8/);
  assert.throws(()=>reviewCirculation({objects:[]},[route,route]),/重复/);
  assert.equal(reviewCirculation({objects:[]},[{...route,points:[[-99,-99],[99,99]]}]).routes[0].status,'clear');
});

test('rotated crown geometry exposes the actual vertical gap rather than its unrotated depth',()=>{
  const stem=part('stem',{width:.12,depth:.1,height:.8,position:[3,3,.03]});
  const crown=solidFromInput({key:'crown',shape:'cylinder',radius:.55,height:.12,position:[3,3,1.55],rotation:[90,0,0]},'crown',{key:'crown'});
  assert.ok(Math.abs(solidBounds(crown)[0][2]-1)<1e-8);
  assert.equal(supportScreen({objects:[stem,crown]}).disconnectedGroups.length,2);
});
