import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateGeometry} from '../src/geometry-tools.js';
import {drawingScene} from '../src/drawing.js';
const square=[[0,0],[4,0],[4,3],[0,3]];

test('millimetre fillets preserve radius and produce CAD-usable checked geometry',()=>{
  const r=calculateGeometry({operation:'fillet',unit:'mm',outline:[[0,0],[4000,0],[4000,3000],[0,3000]],radius:450});
  assert.equal(r.valid,true);assert.equal(r.unit,'m');assert.ok(r.outline.some(p=>Math.abs(p[0]-.45)<1e-12&&Math.abs(p[1])<1e-12));
  const scene=drawingScene({name:'geometry',kind:'booth',dimensionBasis:'site',width:8,depth:8,height:3,thickness:.1,walls:[],assumptions:[],
    components:[{key:'rounded',shape:'extrusion',outline:r.outline,holes:r.holes,position:[1,1,0],depth:.03}]});
  assert.equal(scene.objects[0].outline.length,r.outline.length);
  const invalid=calculateGeometry({operation:'fillet',outline:[[0,0],[1,0],[1,1],[0,1]],radius:1});
  assert.equal(invalid.valid,false);assert.match(invalid.errors[0].path,/outline.edge/);assert.match(invalid.errors[0].message,/重叠/);
  assert.equal(invalid.errors[0].code,'fillet_overlap');assert.ok(invalid.errors[0].details.adjacentRadiusScaleUpperBound<1);
  const circle=calculateGeometry({operation:'fillet',outline:[[0,0],[1,0],[1,1],[0,1]],radius:.5});
  assert.equal(circle.valid,true);assert.ok(Math.abs(circle.area-Math.PI*.25)<.001);
});

test('arc sampling respects endpoints, length and a measured sagitta bound',()=>{
  const r=calculateGeometry({operation:'arc',center:[1,2],radius:2,startDegrees:0,sweepDegrees:90,tolerance:.0001});
  assert.equal(r.valid,true);assert.deepEqual(r.points[0],[3,2]);assert.ok(Math.abs(r.points.at(-1)[1]-4)<1e-12);
  assert.ok(Math.abs(r.length-Math.PI)<1e-12);assert.ok(r.arcChordErrorMetres<=.0001+1e-12);
  for(let i=1;i<r.points.length;i++) {
    const midpoint=r.points[i].map((n,j)=>(n+r.points[i-1][j])/2);
    assert.ok(2-Math.hypot(midpoint[0]-1,midpoint[1]-2)<=.0001+1e-12);
  }
  const full=calculateGeometry({operation:'arc',center:[0,0],radius:1,sweepDegrees:360});
  assert.equal(full.closed,true);assert.equal(full.outline.length,full.points.length-1);
});

test('offset maintains holes and reports splits and collapse rather than silently deleting geometry',()=>{
  const outward=calculateGeometry({operation:'offset',outline:square,holes:[[[1,1],[1,2],[2,2],[2,1]]],distance:.1});
  assert.equal(outward.valid,true);assert.equal(outward.holes.length,1);assert.ok(Math.abs(outward.area-(4.2*3.2-.8*.8))<1e-8);
  const inward=calculateGeometry({operation:'offset',outline:square,distance:-.1});
  assert.equal(inward.valid,true);assert.ok(Math.abs(inward.area-3.8*2.8)<1e-8);
  assert.equal(calculateGeometry({operation:'offset',outline:square,distance:-3}).valid,false);
  const neck=[[0,0],[2,0],[2,.9],[4,.9],[4,0],[6,0],[6,2],[4,2],[4,1.1],[2,1.1],[2,2],[0,2]];
  const split=calculateGeometry({operation:'offset',outline:neck,distance:-.15});
  assert.equal(split.valid,true);assert.equal(split.profiles.length,2);assert.equal(split.topologyChanged,true);assert.equal(split.outline,undefined);
});

test('bad profiles, touching holes, non-numbers and mismatched dimensions return located failures',()=>{
  for(const input of [
    {operation:'check_profile',outline:[[0,0],[2,2],[0,2],[2,0]]},
    {operation:'check_profile',outline:square,holes:[[[0,0],[1,0],[1,1]]]},
    {operation:'measure',points:[[0,0],[1,2,3]]},
    {operation:'measure',points:[['0',0],[1,2]]},
    {operation:'arc',center:[0,0],radius:'1',sweepDegrees:90},
    {operation:'arc',center:[0,0],radius:1,sweepDegrees:0},
    {operation:'check_profile',unit:'inch',outline:square},
  ])assert.equal(calculateGeometry(input).valid,false);
  const r=calculateGeometry({operation:'measure',unit:'mm',points:[[0,0,30],[3000,4000,30]]});
  assert.equal(r.valid,true);assert.equal(r.distance,5);assert.deepEqual(r.size,[3,4,0]);
});

test('CAD submission rejects invalid profiles even when the calculation tool was not called',()=>{
  assert.throws(()=>drawingScene({name:'bad',kind:'booth',dimensionBasis:'site',width:8,depth:8,height:3,thickness:.1,walls:[],assumptions:[],
    components:[{key:'broken',shape:'extrusion',outline:[[0,0],[1,1],[0,1],[1,0]],depth:.1,position:[2,2,0]}]}),/broken.*自交/);
});
