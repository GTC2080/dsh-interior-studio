import test from 'node:test';
import assert from 'node:assert/strict';
import {solidFromInput} from '../src/solids.js';
import {draftGeometry,drawingSheet,sheetSvg} from '../src/drafting.js';
import {lineStyle} from '../src/drafting.js';
import {execFileSync} from 'node:child_process';
import {mkdtempSync,rmSync,readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {sceneFromProposal} from '../src/scene.js';
import {Studio} from '../src/studio.js';
import {arcPoints} from '../src/geometry.js';

const solid=(id,row)=>solidFromInput({key:id,...row},id,{});
const scene=objects=>({kind:'interior',bounds:[4,4],parameters:{height:3},objects});

test('opaque front surfaces hide rear geometry while a true profile hole reveals it',()=>{
  const panel=solid('panel',{shape:'extrusion',plane:'xz',position:[0,0,0],depth:.1,outline:[[0,0],[4,0],[4,4],[0,4]],holes:[[[.7,.7],[1.3,.7],[1.3,1.3],[.7,1.3]]]});
  const through=solid('through',{shape:'box',position:[1,2,.85],width:.3,depth:.3,height:.3});
  const hidden=solid('hidden',{shape:'box',position:[3,2,.85],width:.3,depth:.3,height:.3});
  const drawing=draftGeometry(scene([panel,through,hidden]),'front');
  assert.ok(drawing.lines.some(l=>l.id==='through'));
  assert.ok(!drawing.lines.some(l=>l.id==='hidden'));
  const reversed=draftGeometry(scene([panel,through,hidden]),'back');
  assert.ok(reversed.lines.some(l=>l.id==='hidden'));
  const cut=draftGeometry(scene([panel]),'plan').cuts.find(c=>c.id==='panel');
  assert.equal(cut.rings.length,2,'cutting through a real hole leaves two disconnected posts');
});

test('segment visibility is split at face boundaries rather than sampled into false visibility',()=>{
  const front=solid('front',{shape:'box',position:[2,0,0],width:1,depth:.1,height:2});
  const rear=solid('rear',{shape:'box',position:[2,1,.5],width:4,depth:.1,height:.2});
  const drawing=draftGeometry(scene([front,rear]),'front');
  const segments=drawing.lines.filter(l=>l.id==='rear');assert.ok(segments.length);
  assert.ok(segments.every(l=>Math.max(l.a[0],l.b[0])<=1.5+1e-6||Math.min(l.a[0],l.b[0])>=2.5-1e-6));
  assert.ok(segments.some(l=>Math.abs(l.a[0]-1.5)<1e-6||Math.abs(l.b[0]-1.5)<1e-6));
});

test('plan sections preserve door/window gaps and keep overhead elements separate',()=>{
  const wall={id:'wall',type:'wall',label:'wall',a:[0,0],b:[4,0],height:3,thickness:.2,
    openings:[{kind:'door',start:1,width:1,sill:0,top:2,swing:'left'},{kind:'window',start:2.5,width:1,sill:.8,top:2}]};
  const above=solid('above',{shape:'box',position:[2,2,2],width:1,depth:1,height:.2});
  const drawing=draftGeometry(scene([wall,above]),'plan');
  assert.equal(drawing.cuts.length,3);
  assert.ok(drawing.lines.some(l=>l.kind==='door'));
  assert.equal(drawing.lines.filter(l=>l.kind==='window').length,3);
  assert.ok(!drawing.lines.some(l=>l.id==='above'));
  const withOverhead=draftGeometry(scene([wall,above]),'plan',{overhead:true});
  assert.ok(withOverhead.overhead.some(l=>l.id==='above'));
});

test('circular glazing remains on its true radii including the curved wall endpoint',()=>{
  const arc={center:[2,2],radius:1,start:0,sweep:Math.PI/2};
  const wall={id:'arc',type:'wall',label:'arc',path:arcPoints(arc),arc,height:3,thickness:.18,
    openings:[{kind:'window',start:Math.PI/2-.5,width:.5,sill:.8,top:2}]};
  const drawing=draftGeometry(scene([wall]),'plan'),radii=new Set();
  for(const l of drawing.lines.filter(l=>l.kind==='window'))for(const p of [l.a,l.b]) {
    const r=Math.hypot(p[0]-2,p[1]-2);assert.ok([.94,1,1.06].some(expected=>Math.abs(r-expected)<1e-9));radii.add(Math.round(r*100));
  }
  assert.deepEqual([...radii].sort((a,b)=>a-b),[94,100,106]);
});

test('paper dimensions, scale and export are derived from geometry without mutating the design',()=>{
  const part=solid('part',{shape:'box',label:'<script>&"图纸',position:[2,2,0],width:4,depth:4,height:3});
  const model=scene([part]),before=structuredClone(model),sheet=drawingSheet(model,'front',{name:'<img onerror="x">',revision:9});
  assert.ok(sheet.dimensions.some(d=>d.value===4000));assert.ok(sheet.dimensions.some(d=>d.value===3000));
  const horizontal=sheet.dimensions.find(d=>d.axis==='x');assert.equal(Math.abs(horizontal.b[0]-horizontal.a[0])*1000,4000);
  assert.equal(sheet.width,420);assert.equal(sheet.height,297);assert.ok(sheet.scale>=10);
  const svg=sheetSvg(sheet);assert.ok(!svg.includes('<img'));assert.ok(svg.includes('&lt;img'));assert.ok(svg.includes('viewBox="0 0 420 297"'));
  assert.ok(svg.includes('场景版本 v9'));assert.deepEqual(model,before);
  assert.throws(()=>draftGeometry(model,'perspective'),/未知/);
});

test('smooth cylinders retain silhouettes without exposing every tessellation edge',()=>{
  const cylinder=solid('cylinder',{shape:'cylinder',position:[2,2,0],radius:1,height:1});
  const drawing=draftGeometry(scene([cylinder]),'front'),vertical=drawing.lines.filter(l=>Math.abs(l.a[0]-l.b[0])<1e-6);
  assert.equal(vertical.length,2);assert.deepEqual(vertical.map(l=>Math.round(l.a[0])).sort(),[1,3]);
});

test('interior room labels distinguish measured net area from the footprint area',()=>{
  const model={...scene([{id:'room',type:'floor',label:'工作区',labelPoint:[2,2],polygon:[[0,0],[4,0],[4,4],[0,4]],holes:[],area:16}]),
    design:{review:{rooms:[{id:'room',clear:{area:14.44}}]}}};
  let sheet=drawingSheet(model,'plan');assert.ok(sheet.texts.some(t=>t.value==='工作区'));
  assert.ok(sheet.texts.some(t=>t.value==='净面积 14.44 m²'));
  delete model.design;sheet=drawingSheet(model,'plan');assert.ok(sheet.texts.some(t=>t.value==='轮廓面积 16.00 m²'));
});

test('real DXF drawing sets reopen with five A3 layouts and native scaled dimensions',t=>{
  const root=fileURLToPath(new URL('../',import.meta.url)),directory=mkdtempSync(join(tmpdir(),'dsh-drafting-'));
  t.after(()=>rmSync(directory,{recursive:true,force:true}));
  const model=sceneFromProposal({kind:'booth',width:6,depth:4,height:3,thickness:.12,openSides:['front']},'test');
  const sheets=['plan','front','back','left','right'].map(view=>{
    const {geometry,...sheet}=drawingSheet(model,view,{revision:7});
    sheet.styles=Object.fromEntries([...new Set(sheet.lines.map(l=>l.kind).concat(sheet.paths.map(l=>l.kind)))].map(k=>[k,lineStyle(k)]));return sheet;
  });
  const python=join(root,'runtime/Blender.app/Contents/Resources/4.5/python/bin/python3.11');
  const result=JSON.parse(execFileSync(python,['-c',`
import sys,json
from pathlib import Path
sys.dont_write_bytecode=True;sys.path[:0]=['runtime/vendor','worker']
from drawing import write_drawing_set
import ezdxf
r=json.load(sys.stdin);path=Path(sys.argv[1])/'drawings.dxf';write_drawing_set(r['scene'],r['sheets'],path)
doc=ezdxf.readfile(path);audit=doc.audit();assert not audit.errors and not audit.fixes
assert doc.units==6
result=[]
for layout,sheet in zip([l for l in doc.layouts if l.name!='Model'],r['sheets']):
 assert layout.dxf.paper_width==420 and layout.dxf.paper_height==297 and layout.dxf.plot_paper_units==1
 dims=list(layout.query('DIMENSION'));assert len(dims)==len(sheet['dimensions'])
 for dim,expected in zip(dims,sheet['dimensions']):
  style=dim.get_acad_dstyle(doc.dimstyles.get(dim.dxf.dimstyle))
  assert round(dim.get_measurement()*style['dimlfac'])==expected['value']
 assert all(e.dxf.lineweight==-1 for e in layout.query('LINE'))
 assert (255,255,255) in {tuple(e.rgb) for e in layout.query('HATCH') if e.rgb is not None}, 'scale bar must retain white RGB'
 result.append({'name':layout.name,'dimensions':len(dims)})
assert any('场景版本 v7' in e.text for e in doc.layouts.get(result[0]['name']).query('MTEXT'))
# Exercise the DXF writer's optional section slots independently of the
# mesh-section geometry tests. Reuse a known paper fixture here.
extra=[dict(r['sheets'][1],view='section_x',label='X剖面'),dict(r['sheets'][1],view='section_y',label='Y剖面')]
seven=path.with_name('seven.dxf');write_drawing_set(r['scene'],r['sheets']+extra,seven)
section_doc=ezdxf.readfile(seven);assert not section_doc.audit().errors
assert len([l for l in section_doc.layouts if l.name!='Model'])==7
try:write_drawing_set(r['scene'],r['sheets']+[extra[0],extra[0]],path.with_name('invalid.dxf'))
except ValueError:pass
else:raise AssertionError('Duplicate section accepted')
print(json.dumps(result))
`,directory],{cwd:root,input:JSON.stringify({scene:model,sheets}),env:{...process.env,PYTHONDONTWRITEBYTECODE:'1',XDG_CACHE_HOME:join(directory,'cache')},maxBuffer:4*1024*1024}));
  assert.equal(result.length,5);assert.ok(result.every(s=>s.dimensions>=2));
  assert.ok(readFileSync(join(directory,'drawings.dxf')).includes(Buffer.from('SECTION')));
});

test('drawing-set export binds the scene version, leaves it unchanged and cleans failed output',async t=>{
  const directory=mkdtempSync(join(tmpdir(),'dsh-drawing-set-'));let calls=0,fail=false;
  const engine={dispose:async()=>{},request:async command=>{
    calls++;assert.equal(command.action,'drawing-sheets');assert.equal(command.sheets.length,5);
    writeFileSync(join(command.output,'drawings.dxf'),'DXF');if(fail)throw new Error('export failure');return {};
  }};
  const studio=new Studio(directory,engine),p=studio.store.create('writer','工程','booth','create');
  t.after(async()=>{await studio.dispose();rmSync(directory,{recursive:true,force:true});});
  const model=sceneFromProposal({kind:'booth',width:6,depth:4,height:3,thickness:.12,openSides:['front']},'test');
  model.objects=model.objects.filter(o=>o.type!=='asset');
  studio.store.commit('writer',p.id,0,model,'initial');const before=studio.store.read(p.id);
  await assert.rejects(studio.ui('writer','drawing-set',{expectedRevision:0},'stale'),/版本/);
  await assert.rejects(studio.ui('writer','drawing-set',{expectedRevision:1,drawingId:'stale'},'stale-draft'),/草案/);
  assert.equal(calls,0);
  const result=await studio.ui('writer','drawing-set',{expectedRevision:1},'export');
  assert.equal(result.revision,1);assert.equal(Buffer.from(result.base64,'base64').toString(),'DXF');
  assert.deepEqual(studio.store.read(p.id),before);assert.equal(studio.store.project(p.id).revision,1);
  assert.deepEqual(readdirSync(studio.store.dir(p.id,'staging')),[]);
  fail=true;await assert.rejects(studio.ui('writer','drawing-set',{expectedRevision:1},'failed'),/export failure/);
  assert.deepEqual(readdirSync(studio.store.dir(p.id,'staging')),[]);
  assert.equal(studio.drawings.size,0);assert.deepEqual(studio.store.read(p.id),before);
});
