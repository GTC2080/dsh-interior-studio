"""Fixed CAD proposals through an isolated DSH Host and real Blender; no LLM call."""
import argparse
import base64
import hashlib
import http.cookiejar
import json
import math
import re
import time
import urllib.request
import uuid
from pathlib import Path

parser=argparse.ArgumentParser()
parser.add_argument('--launch-log',required=True)
parser.add_argument('--evidence',required=True)
args=parser.parse_args()
root=Path(__file__).resolve().parents[1];work=Path(args.launch_log).resolve().parent
base='http://127.0.0.1:3097'
url=next(u for u in re.findall(r'http://[^\s\x1b]+',Path(args.launch_log).read_text()) if u.startswith(base+'/?token='))
opener=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
opener.open(url,timeout=20).close()

def call(action,data=None,sid='drawing-check',operation=None,path='interior-studio',error=False):
    request=urllib.request.Request(base+'/api/'+path,data=json.dumps(dict(action=action,input=data or {},sessionId=sid,operationId=operation or str(uuid.uuid4()))).encode(),headers={'content-type':'application/json'})
    result=json.load(opener.open(request,timeout=180))
    if not error:assert result['ok'],result.get('error')
    return result if error else result['value']

def wait(task,sid,expected='complete',limit=180):
    started=time.monotonic()
    while time.monotonic()-started<limit:
        task=next(t for t in call('snapshot',sid=sid)['tasks'] if t['id']==task.get('taskId',task.get('id')))
        if task['state'] in ('complete','cancelled','failed','interrupted'):
            assert task['state']==expected,task;return task
        time.sleep(.25)
    raise AssertionError('Blender task deadline exceeded')

regular=json.loads((root/'fixtures/design-plan.json').read_text())
curved=dict(regular,name='曲墙 CAD 固定用例',width=9,depth=6,furniture=[dict(asset='chair',x=7.3,y=3)],
    walls=[dict(key='south',points=[[0,0],[6,0]]),dict(key='curve',arc=dict(center=[6,3],radius=3,startDegrees=270,sweepDegrees=180)),
           dict(key='north',points=[[6,6],[0,6]]),dict(key='west',points=[[0,6],[0,0]]),dict(key='partition',points=[[4,0],[4,6]])],
    openings=[dict(wall='curve',kind='window',start=math.pi,width=math.pi,sill=.9,top=2.1),dict(wall='partition',kind='door',start=2,width=1,top=2.1)],
    rooms=[dict(name='休息区',point=[2,3]),dict(name='弧形客厅',point=[7,3])])
circular=dict(regular,name='整圆跨起点窗固定用例',width=6,depth=6,furniture=[],
    walls=[dict(key='circle',arc=dict(center=[3,3],radius=3,startDegrees=0,sweepDegrees=360))],
    openings=[dict(wall='circle',kind='window',start=math.radians(350)*3,width=math.pi/3,sill=.9,top=2.1,wrap=True)],
    rooms=[dict(name='圆形空间',point=[3,3])])
records=[]
for index,plan in enumerate((regular,curved,circular)):
    sid='drawing-flow-'+str(uuid.uuid4());operation=str(uuid.uuid4())
    proposed=call('draw',plan,sid,operation)
    assert call('draw',plan,sid,operation)==proposed
    snap=call('snapshot',sid=sid);assert snap['project']['revision']==0 and snap['scene'] is None
    assert snap['report']['generated'] and snap['proposal']['type']=='drawing'
    draft=base64.b64decode(call('drawing-artifact',dict(drawingId=proposed['drawingId']),sid)['base64'])
    assert b'SECTION' in draft and b'DSH' in draft
    assert not call('render',dict(expectedRevision=0),sid,error=True)['ok']
    assert not call('confirm',dict(expectedRevision=0,drawingId=proposed['drawingId']),sid,error=True)['ok']
    confirmed=call('confirm',dict(expectedRevision=0,drawingId=proposed['drawingId'],acceptDrawing=True),sid)
    scene=call('snapshot',sid=sid)['scene'];assert scene['parameters']['status']=='user_confirmed'
    task=call('render' if index==0 else 'build',dict(expectedRevision=confirmed['revision']),sid)
    done=wait(task,sid)
    assert 'plan.dxf' in done['detail']['files'] and 'scene.glb' in done['detail']['files']
    for name in ('plan.dxf','scene.glb')+ (('render.png',) if index==0 else ()):
        data=base64.b64decode(call('artifact',dict(taskId=task['taskId'],file=name),sid)['base64'])
        assert hashlib.sha256(data).hexdigest()==done['detail']['files'][name]['sha256']
        if name=='scene.glb':
            length=int.from_bytes(data[12:16],'little');gltf=json.loads(data[20:20+length]);ids={n.get('extras',{}).get('studio_id') for n in gltf['nodes']}
            assert {o['id'] for o in scene['objects']}<=ids
        if index==0:(work/('drawing-'+name)).write_bytes(data)
    records.append(dict(name=plan['name'],projectId=proposed['projectId'],rooms=proposed['summary']['rooms'],doors=proposed['summary']['doors'],windows=proposed['summary']['windows'],furniture=proposed['summary']['furniture'],draftConfirmationRequired=True,DXFExportVerified=True,sceneRevision=confirmed['revision']))
    print('PASS:',plan['name'],'CAD draft, user-confirmation boundary, DXF/GLB and Blender output',flush=True)

reopened=call('reopen',path='interior-validation')
for record in records:
    result=next(p for p in reopened if p['projectId']==record['projectId'])
    assert not result['externalImages']
    assert len(result['openingDetails'])==2*(record['doors']+record['windows'])
    assert all(d['owner'] for d in result['openingDetails'])
    x0,y0,x1,y1=result['presentation']['projectedBounds'];assert 0<x0<x1<1 and 0<y0<y1<1
    for check in result['geometryChecks']:
        if check['kind']=='opening':
            assert check['clear'] and check['lintelSolid'] is not False and check['sillSolid'] is not False,check
        else:
            assert abs(check['area']-check['expectedArea'])<max(.001,check['expectedArea']*1e-5),check
            assert all(check['holesClear']),check
    record['geometryChecks']=result['geometryChecks']
    record['presentation']=result['presentation'];record['openingDetails']=result['openingDetails']
resources=call('resources',path='interior-validation');assert resources['running']==0 and resources['pending']==0
report=dict(platform='macOS arm64',modelRequestSent=False,source='fixed structured design inputs, not a model evaluation',cases=records,resources=resources)
Path(args.evidence).write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print('PASS: reopened Blender geometry, real door/window voids, lintels, floor areas, embedded textures and stable IDs',flush=True)
