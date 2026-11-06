"""Exercise the real isolated DSH authenticated API, bundled engine and durable projects.

Pass the task's isolated Host log; authentication values stay in memory and are never printed.
This check does not access the live DSH home or make a model request.
"""
import argparse
import base64
import hashlib
import http.cookiejar
import json
import re
import time
import uuid
import urllib.request
from pathlib import Path

parser=argparse.ArgumentParser()
parser.add_argument('--url',default='http://127.0.0.1:3097')
parser.add_argument('--launch-log',required=True)
parser.add_argument('--evidence',required=True)
parser.add_argument('--artifact-root',default='evidence')
args=parser.parse_args()
assert args.url.startswith('http://127.0.0.1:')
root=Path(__file__).resolve().parents[1]
log=Path(args.launch_log).read_text()
url=next(u for u in re.findall(r'http://[^\s\x1b]+',log) if u.startswith(args.url+'/?token='))
jar=http.cookiejar.CookieJar()
opener=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))
page=opener.open(url,timeout=20).read().decode()
assert 'DeepSeek Harness' in page
records=[]
artifact_root=root/args.artifact_root
session='interior-validation-'+str(uuid.uuid4())

def call(action, data=None, session_id=None, operation=None, allow_error=False):
    payload=dict(action=action,sessionId=session_id or session,input=data or {},operationId=operation or str(uuid.uuid4()))
    request=urllib.request.Request(args.url+'/api/interior-studio',data=json.dumps(payload).encode(),headers={'content-type':'application/json'})
    with opener.open(request,timeout=180) as response: result=json.load(response)
    if not result['ok'] and not allow_error:raise AssertionError(result['error'])
    return result if allow_error else result['value']

def wait(task, session_id=None, limit=180):
    started=time.monotonic()
    while time.monotonic()-started<limit:
        state=call('snapshot',session_id=session_id)
        row=next(t for t in state['tasks'] if t['id']==task['taskId'])
        if row['state'] in ['complete','failed','cancelled','interrupted']:
            assert row['state']=='complete',row
            return row,round(time.monotonic()-started,3)
        time.sleep(.5)
    raise AssertionError('task deadline exceeded')

call('create',dict(name='合成展台验证',kind='booth'))
call('propose',dict(kind='booth',width=6,depth=4,height=3,thickness=.12,openSides=['front','left','right']))
assert call('snapshot')['project']['revision']==0
accepted=call('confirm',dict(expectedRevision=0))
assert accepted['revision']==1
task=call('build',dict(expectedRevision=1))
task_row,elapsed=wait(task)
state=call('snapshot')
assert sum(o['type']=='wall' for o in state['scene']['objects'])==1
assert state['project']['consent'] is False
wall=next(o for o in state['scene']['objects'] if o['type']=='wall')
selection=call('select',dict(expectedRevision=1,objectId=wall['id'],surfaceId='side-b'))
edit=dict(expectedRevision=1,selectionToken=selection['token'],action='material',material='oak')
operation=str(uuid.uuid4())
edited=call('edit',edit,operation=operation)
assert call('edit',edit,operation=operation)==edited
changed=call('snapshot')
assert changed['project']['revision']==2
assert next(o for o in changed['scene']['objects'] if o['id']==wall['id'])['materials']==dict(**{'side-a':'plaster','side-b':'oak','edge':'plaster'})
assert [o for o in changed['scene']['objects'] if o['id']!=wall['id']]==[o for o in state['scene']['objects'] if o['id']!=wall['id']]
assert not call('edit',edit,allow_error=True)['ok']
call('undo',dict(expectedRevision=2))
assert call('snapshot')['scene']==state['scene']
call('redo',dict(expectedRevision=3))
assert call('snapshot')['scene']==changed['scene']
render=call('render',dict(expectedRevision=4,quality='preview'))
row,render_seconds=wait(render,limit=300)
for filename in ['scene.blend','scene.glb','render.png','scene.json','manifest.json']:
    value=call('artifact',dict(taskId=row['id'],file=filename))
    data=base64.b64decode(value['base64'])
    target=artifact_root/'booth'/filename
    target.parent.mkdir(exist_ok=True,parents=True)
    target.write_bytes(data)
    if filename=='scene.glb':
        assert data[:4]==b'glTF'
        length=int.from_bytes(data[12:16],'little');gltf=json.loads(data[20:20+length])
        ids={n.get('extras',{}).get('studio_id') for n in gltf['nodes']}
        assert {o['id'] for o in changed['scene']['objects']}<=ids
    if filename=='render.png':assert data.startswith(b'\x89PNG')
records.append(dict(case='text_parameters_booth',buildSeconds=elapsed,renderSeconds=render_seconds,
                    projectId=state['project']['id'],revision=4,objects=len(changed['scene']['objects']),render=row['detail']))
print('PASS: booth create, confirm, build, local edit, idempotence, stale selection, undo/redo, Blender render, GLB stable IDs',flush=True)

for filename,unit in [('residential-mm.dxf','mm'),('residential-m.dxf','m'),('residential-inch.dxf','inch'),
                      ('residential-large-origin.dxf','mm'),('residential-duplicate.dxf','mm')]:
    sid='interior-validation-'+str(uuid.uuid4())
    raw=(root/'fixtures'/filename).read_bytes()
    imported=call('import',dict(name=filename,base64=base64.b64encode(raw).decode()),sid)
    current=call('snapshot',session_id=sid);report=current['report']
    assert len(report['walls'])==5 and len(report['openings'])==3,report
    assert report['paperSpaceEntitiesExcluded']==1
    result=call('confirm',dict(expectedRevision=0,importId=imported['importId'],unit=unit,height=2.8,thickness=.12,
                             doorHeight=2.1,windowSill=.9,windowTop=2.1,acceptCenterlines=True),sid)
    scene=call('snapshot',session_id=sid)['scene']
    assert abs(scene['bounds'][0]-6)<1e-9 and abs(scene['bounds'][1]-4)<1e-9
    assert sum(len(o.get('openings',[])) for o in scene['objects'])==3
    if filename=='residential-mm.dxf':
        rendered=call('render',dict(expectedRevision=1,quality='preview'),sid)
        row,seconds=wait(rendered,sid,300)
        for file in ['render.png','scene.blend','scene.glb','scene.json','manifest.json']:
            value=call('artifact',dict(taskId=row['id'],file=file),sid)
            target=artifact_root/'residential'/file;target.parent.mkdir(exist_ok=True,parents=True)
            target.write_bytes(base64.b64decode(value['base64']))
        records.append(dict(case=filename,projectId=imported['projectId'],bounds=scene['bounds'],walls=5,openings=3,renderSeconds=seconds))
    else:records.append(dict(case=filename,bounds=scene['bounds'],walls=5,openings=3))
    print('PASS:',filename,'scale, centre-lines, rectangular openings and local origin',flush=True)

for filename in ['residential-unitless.dxf','unsupported-arc.dxf','rotated-block.dxf']:
    sid='interior-validation-'+str(uuid.uuid4())
    raw=(root/'fixtures'/filename).read_bytes()
    imported=call('import',dict(name=filename,base64=base64.b64encode(raw).decode()),sid)
    report=call('snapshot',session_id=sid)['report']
    if filename=='residential-unitless.dxf':
        rejected=call('confirm',dict(expectedRevision=0,importId=imported['importId'],unit='mm',height=2.8,thickness=.12,
          doorHeight=2.1,windowSill=.9,windowTop=2.1,acceptCenterlines=True),sid,allow_error=True)
        assert not rejected['ok']
    elif filename=='unsupported-arc.dxf':assert report['blocking']
    else:
        assert len(report['walls'])==1
        line=report['walls'][0]
        assert abs(line['b'][1]-line['a'][1]-4)<1e-9 and abs(line['b'][0]-line['a'][0])<1e-9
    records.append(dict(case=filename,unit=report['unit'],blocking=report['blocking'],counts=report['counts']))
    print('PASS:',filename,'explicit diagnostics / transforms',flush=True)

bad=call('import',dict(name='truncated.dxf',base64=base64.b64encode((root/'fixtures/truncated.dxf').read_bytes()).decode()),
         session_id='invalid-cad-'+str(uuid.uuid4()),allow_error=True)
assert not bad['ok']
dwg=call('import',dict(name='test.dwg',base64='QQ=='),allow_error=True)
assert not dwg['ok'] and 'DWG_NOT_LICENSED' in dwg['error']['message']
records.append(dict(case='invalid_and_DWG',corruptRejected=True,dwgRejected=True))
Path(args.evidence).write_text(json.dumps(dict(host='DSH official client 0.2.1-rc.3 / 1f81c04',blender='4.5.15 LTS',
    platform='macOS arm64 development machine',network='No model call; no engine dependency download during runtime',cases=records),indent=2,ensure_ascii=False)+'\n')
print('PASS: invalid CAD and unlicensed DWG rejected; evidence saved',flush=True)
