import test from 'node:test';
import assert from 'node:assert/strict';
import {componentSchedule} from '../src/component-schedule.js';
import {drawingScene} from '../src/drawing.js';
import {MATERIALS} from '../src/scene.js';
test('schedule carries actual dimensions and safe spreadsheet text without inventing cutting specifications',()=>{
  const scene=drawingScene({name:'Schedule',kind:'booth',dimensionBasis:'site',width:4,depth:4,height:3,thickness:.1,walls:[],assumptions:[],components:[{key:'part',label:'=SUM(A1)',shape:'box',width:1.2,depth:.5,height:.8,position:[2,2,0],material:'oak'}]});
  const before=JSON.stringify(scene),csv=componentSchedule(scene,{name:'Test',revision:7,materials:MATERIALS});
  assert.match(csv,/'=SUM\(A1\)/);assert.match(csv,/"1200","500","800"/);assert.match(csv,/非下料/);assert.equal(JSON.stringify(scene),before);
});
