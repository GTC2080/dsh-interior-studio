import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {drawingSheet,meshDrawingGeometry,needsMeshElevation} from '../src/drafting.js';
import {sceneFromProposal} from '../src/scene.js';
import {solidFromInput} from '../src/solids.js';
import {Studio} from '../src/studio.js';

const scene=()=>{
  const value=sceneFromProposal({kind:'booth',width:6,depth:4,height:3,thickness:.12,openSides:['front']},'test');
  value.schemaVersion=4;
  value.objects.push(solidFromInput({key:'sign',shape:'text',text:'CAD',width:2,height:.4,depth:.02,plane:'xz',position:[1,0,2]},'sign',{}));
  return value;
};
const mesh=(value,view='front')=>({view,basis:'actual_mesh_feature_edges; sampled_orthographic_visibility',visibilityStepMetres:.005,
  extents:[0,0,6,3],lines:5,groups:[{id:value.objects.at(-1).id,bounds:[0,0,2,1],worldBounds:[[0,0,0],[2,.02,1]],frontDepth:0,
    lines:[[0,0,2,0],[2,0,2,1],[2,1,0,1],[0,1,0,0],[.2,.2,.8,.8]]}]});

test('real mesh features reach the sheet and malformed or foreign geometry is rejected',()=>{
  const value=scene(),raw=mesh(value),geometry=meshDrawingGeometry(raw,value,'front');
  assert.equal(needsMeshElevation(value,'front'),true);assert.equal(needsMeshElevation(value,'plan'),false);
  const sheet=drawingSheet(value,'front',{geometry});assert.equal(sheet.lines.filter(l=>l.id==='sign').length,5);
  assert.ok(sheet.notes.some(n=>n.includes('网格')));assert.ok(!sheet.notes.some(n=>n.includes('文字以外框')));
  for(const mutate of [v=>{v.view='back';},v=>{v.groups[0].id='foreign';},v=>{v.groups[0].lines[0][0]=NaN;},
    v=>{v.lines=4;},v=>{v.groups.push(v.groups[0]);},v=>{v.groups[0].lines=Array(20001).fill([0,0,1,1]);}]) {
    const invalid=structuredClone(raw);mutate(invalid);assert.throws(()=>meshDrawingGeometry(invalid,value,'front'),/数据无效/);
  }
});

test('display and DXF use the same elevation features and do not modify the project',async t=>{
  const root=mkdtempSync(join(tmpdir(),'dsh-mesh-sheet-'));let elevations=0,exported;
  const engine={dispose:async()=>{},request:async command=>{
    if(command.action==='drawing-elevation'){elevations++;return mesh(command.scene,command.view);}
    exported=command.sheets;writeFileSync(join(command.output,'drawings.dxf'),'DXF');return {};
  }};
  const studio=new Studio(root,engine),p=studio.store.create('writer','工程','booth','create'),value=scene();
  t.after(async()=>{await studio.dispose();rmSync(root,{recursive:true,force:true});});
  studio.store.commit('writer',p.id,0,value,'initial');const before=JSON.stringify(studio.store.read(p.id));
  const page=await studio.ui('writer','drawing-sheet',{expectedRevision:1,view:'front'},'page');
  await studio.ui('writer','drawing-set',{expectedRevision:1},'export');
  assert.equal(elevations,5);assert.deepEqual(exported.find(s=>s.view==='front').lines,page.sheet.lines);
  assert.equal(JSON.stringify(studio.store.read(p.id)),before);
  await assert.rejects(studio.ui('writer','drawing-sheet',{expectedRevision:0,view:'front'},'old'),/版本/);
  await assert.rejects(studio.ui('writer','drawing-sheet',{expectedRevision:1,view:'unknown'},'bad'),/视图/);
  await assert.rejects(studio.ui('writer','drawing-sheet',{expectedRevision:1,view:'front',drawingId:'old'},'draft'),/草案/);
});

test('cancelled or outdated async elevation results cannot be returned as current',async t=>{
  const root=mkdtempSync(join(tmpdir(),'dsh-mesh-stale-'));let finish;
  const engine={dispose:async()=>{},request:command=>new Promise(resolve=>{finish=()=>resolve(mesh(command.scene,command.view));})};
  const studio=new Studio(root,engine),p=studio.store.create('writer','工程','booth','create'),value=scene();
  t.after(async()=>{await studio.dispose();rmSync(root,{recursive:true,force:true});});
  studio.store.commit('writer',p.id,0,value,'initial');
  const old=studio.ui('writer','drawing-sheet',{expectedRevision:1,view:'front'},'old');
  studio.store.commit('writer',p.id,1,value,'changed');finish();await assert.rejects(old,/版本/);
  const controller=new AbortController(),cancelled=studio.ui('writer','drawing-sheet',{expectedRevision:2,view:'front'},'cancelled',controller.signal);
  controller.abort(new Error('cancelled by viewer'));finish();await assert.rejects(cancelled,/cancelled/);
  assert.equal(studio.drawings.size,0);
});
