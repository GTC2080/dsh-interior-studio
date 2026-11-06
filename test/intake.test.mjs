import test from 'node:test';
import assert from 'node:assert/strict';
import {installCadIntake} from '../src/cad-intake.js';

function harness(session='session') {
  const registered=new Map(),calls=[],errors=[],ended=[];
  const document={addEventListener:(type,fn)=>registered.set(type,fn),removeEventListener:type=>registered.delete(type)};
  const release=installCadIntake({document,window:{dispatchEvent:event=>ended.push(event.type)},getSession:()=>session,
    intake:(...args)=>calls.push(args),onError:error=>errors.push(error.message)});
  const fire=(type,files)=>{
    const event={type,target:{files,value:'chosen',hasAttribute:()=>false},
      preventDefault(){this.prevented=true;},stopImmediatePropagation(){this.stopped=true;}};
    if(type==='drop')event.dataTransfer={files};
    if(type==='paste')event.clipboardData={files};
    registered.get(type)(event);return event;
  };
  return{registered,calls,errors,ended,release,fire};
}

test('CAD drop is claimed once before generic attachment intake and releases the drop overlay',async()=>{
  const h=harness(),file={name:'plan.dxf'};
  const event=h.fire('drop',[file]);await Promise.resolve();
  assert.equal(event.prevented,true);assert.equal(event.stopped,true);
  assert.deepEqual(h.calls,[['session',[file]]]);assert.deepEqual(h.ended,['dragend']);
  h.release();assert.equal(h.registered.size,0);
});

test('ordinary files keep their existing intake; CAD chooser and paste use local import',async()=>{
  const h=harness();
  assert.equal(h.fire('drop',[{name:'notes.txt'}]).prevented,undefined);
  const change=h.fire('change',[{name:'plan.DWG'}]);h.fire('paste',[{name:'plan.dxf'}]);await Promise.resolve();
  assert.equal(change.target.value,'');assert.equal(h.calls.length,2);assert.equal(h.errors.length,0);
});

test('a CAD file without a Session is blocked locally and never falls through to attachments',()=>{
  const h=harness(undefined); // Explicit absence is exercised below rather than the helper default.
  h.release();
  const registered=new Map(),errors=[];let imported=false;
  installCadIntake({document:{addEventListener:(t,f)=>registered.set(t,f),removeEventListener:()=>{}},window:{dispatchEvent:()=>{}},
    getSession:()=>undefined,intake:()=>{imported=true;},onError:e=>errors.push(e.message)});
  const event={type:'drop',dataTransfer:{files:[{name:'plan.dxf'}]},preventDefault(){this.prevented=true;},stopImmediatePropagation(){this.stopped=true;}};
  registered.get('drop')(event);
  assert.equal(imported,false);assert.equal(event.stopped,true);assert.match(errors[0],/没有作为普通附件/);
});
