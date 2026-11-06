import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtempSync,rmSync,realpathSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {MATERIALS} from '../src/scene.js';
import {FURNITURE} from '../src/catalog.js';

test('actual Blender meshes and exported GLB retain every furniture heading and envelope',t=>{
  const root=fileURLToPath(new URL('../',import.meta.url)),directory=realpathSync(mkdtempSync(join(tmpdir(),'dsh-mesh-pose-')));
  t.after(()=>rmSync(directory,{recursive:true,force:true}));
  const items=['sofa','chair','bed','coffee-table'].flatMap((asset,row)=>[0,Math.PI/2,Math.PI,Math.PI*1.5,.63].map((rotation,col)=>({
    id:`${asset}-${col}`,type:'asset',asset,label:asset,rotation,size:FURNITURE[asset].size,position:[3+col*4,3+row*4,FURNITURE[asset].size[2]/2],
  })));
  const script=`import sys,os,io,json,runpy,math
from pathlib import Path
sys.dont_write_bytecode=True
data=json.load(sys.stdin);root=Path(data['root']);work=Path(data['directory']);sys.stdin=io.StringIO('')
sys.argv=['worker.py','--','--workspace',str(work),'--vendor',str(root/'runtime/vendor')]
api=runpy.run_path(str(root/'worker/worker.py'));bpy=api['bpy'];bpy.ops.wm.read_factory_settings(use_empty=True)
for item in data['items']:
 obj=api['furniture_mesh'](item,data['materials']);obj['studio_id']=item['id'];obj['studio_type']='asset'
scene={'objects':data['items']};audit=api['furniture_pose_audit'](scene)
assert audit['passed'],json.dumps([r for r in audit['objects'] if not r['passed']])
bpy.ops.file.pack_all();bpy.ops.wm.save_as_mainfile(filepath=str(work/'scene.blend'))
bpy.ops.export_scene.gltf(filepath=str(work/'scene.glb'),export_format='GLB',export_extras=True,export_yup=True)
checks=[]
for extension in ['blend','glb']:
 result=api['run']({'action':'inspect','path':str(work/('scene.'+extension)),'scene':scene})
 assert result['poseAudit']['passed'],json.dumps(result['poseAudit'])
 checks.append({'format':extension,'objects':len(result['poseAudit']['objects']),'passed':True})
print('POSE_TEST '+json.dumps(checks))
`;
  const output=execFileSync(join(root,'runtime/Blender.app/Contents/MacOS/Blender'),['--background','--factory-startup','--disable-autoexec','--python-exit-code','17','--python-expr',script],{
    cwd:directory,input:JSON.stringify({root,directory,items,materials:MATERIALS}),encoding:'utf8',timeout:60000,maxBuffer:3*1024*1024,
    env:{...process.env,PYTHONNOUSERSITE:'1',PYTHONDONTWRITEBYTECODE:'1',PYTHONPATH:'',PYTHONHOME:'',BLENDER_USER_CONFIG:join(directory,'config'),BLENDER_USER_SCRIPTS:join(directory,'scripts'),BLENDER_USER_EXTENSIONS:join(directory,'extensions'),XDG_CACHE_HOME:join(directory,'cache')},stdio:['pipe','pipe','pipe'],
  });
  const checks=JSON.parse(output.split('\n').find(line=>line.startsWith('POSE_TEST ')).slice(10));
  assert.deepEqual(checks,[{format:'blend',objects:20,passed:true},{format:'glb',objects:20,passed:true}]);
});
