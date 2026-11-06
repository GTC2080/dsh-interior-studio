"""Inspect actual DSH composition and fixed worker calls in the isolated development profile."""
import argparse,http.cookiejar,json,re,urllib.request,uuid
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--launch-log',required=True);p.add_argument('--evidence');a=p.parse_args()
root=Path(__file__).resolve().parents[1]
url=next(u for u in re.findall(r'http://[^\s\x1b]+',Path(a.launch_log).read_text()) if '3097/?token=' in u)
base=url.split('/?')[0]
opener=urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
opener.open(url,timeout=20).close()
def post(path,data):
    request=urllib.request.Request(base+path,data=json.dumps(data).encode(),headers={'content-type':'application/json'})
    with opener.open(request,timeout=180) as r:result=json.load(r)
    if result.get('type')=='server-response':result=result['result']
    assert result['ok'],result
    return result['value']
def remote(endpoint,args):
    return post('/api/'+endpoint,dict(type='client-request',rpcId=str(uuid.uuid4()),method=endpoint,payload=dict(args=args)))
presets=post('/api/interior-validation',dict(action='presets'))
studio=next(p for p in presets['roster'] if p['id']=='interior-studio');assert 'broken' not in studio,studio
tools=post('/api/interior-validation',dict(action='tools'))
assert tools['names']==['studio_context','studio_draw','studio_propose','studio_furnish','studio_edit','studio_render']
session_tools=post('/api/interior-validation',dict(action='session-tools'))
assert session_tools['names']==tools['names'] and not session_tools['error'],session_tools
assert session_tools['extraHostToolBlocked'],session_tools
assert json.loads(session_tools['context'][0]['text'])['project'] is None
runtime=post('/api/interior-validation',dict(action='runtime'))
assert '/runtime/vendor/' in runtime['modules']['ezdxf']
assert '/runtime/Blender.app/' in runtime['modules']['numpy']
assert str(Path(a.launch_log).resolve().parent) in runtime['userScripts'] and '/.engine/' in runtime['userScripts']
assert runtime['bytecodeWritingDisabled']
work=Path(a.launch_log).resolve().parent/'session-workspace';work.mkdir(exist_ok=True)
session=remote('session/create',dict(request=dict(cwd=str(work),agentPreset='interior-studio')))
assert session['agentPreset']=='interior-studio'
reopened=post('/api/interior-validation',dict(action='reopen'));assert reopened
report=dict(preset=studio,toolNames=tools['names'],actualSessionToolNames=session_tools['names'],actualSessionContextDispatch=True,extraHostToolBlocked=True,invalidToolArgsRejected=tools['invalidArgsRejected'],
            modelContextWithoutConsent=tools['context']['sharing'],
            runtime=dict(blender=runtime['blender'],python=runtime['python'],ezdxf=runtime['ezdxf'],
                         parserPrivate=True,numpyPrivate=True,userScriptsPrivate=True,bytecodeWritingDisabled=True),
            actualDshSessionCreated=True,modelRequestSent=False,reopened=reopened)
Path(a.evidence or root/'evidence/contracts.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n')
(Path(a.launch_log).resolve().parent/'ui-session.json').write_text(json.dumps(session)+'\n')
print('PASS: actual preset load, six restricted tool schemas, consent boundary, private runtime paths, DSH session creation and Blender reopen')
