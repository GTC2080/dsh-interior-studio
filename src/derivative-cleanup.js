/** Inspect and retire only recorded derivatives. Originals, revisions and resources are never candidates. */
import {lstatSync,readdirSync,readFileSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {hash} from './store.js';
const uuid=/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
const allowed=/^(plan\.dxf|scene\.(blend|glb|json)|manifest\.json|render(?:-[A-Za-z][A-Za-z0-9_-]{0,49})?\.png)$/;
const check=(ok,message)=>{if(!ok)throw Error(message);};
const draftSourceHash=(store,id,drawingId)=>{
  const row=store.db.prepare("SELECT result FROM receipts WHERE json_extract(result,'$.projectId')=? AND json_extract(result,'$.drawingId')=? AND json_extract(result,'$.draftSourceHash') IS NOT NULL LIMIT 1").get(id,drawingId);
  const value=row?JSON.parse(row.result).draftSourceHash:null;
  check(/^[a-f0-9]{64}$/.test(value??''),'草案缺少原始源文件摘要，已保留');return value;
};

function inventory(store,id,relative) {
  const path=store.dir(id,relative);
  let stat;try {stat=lstatSync(path);}catch(error){if(error.code==='ENOENT')return null;throw error;}
  check(stat.isDirectory()&&!stat.isSymbolicLink(),'派生物目录身份无效，已保留');
  const entries=readdirSync(path,{withFileTypes:true});check(entries.length<=32,'目录内容超出已知范围，已保留');
  return entries.map(entry=>{
    check(entry.isFile()&&allowed.test(entry.name),'目录含未知内容或链接，已保留');
    const stat=lstatSync(store.dir(id,relative,entry.name));
    check(stat.isFile()&&!stat.isSymbolicLink(),'派生物已变化，已保留');
    return {name:entry.name,bytes:stat.size,mtime:stat.mtimeMs,inode:stat.ino};
  }).sort((a,b)=>a.name.localeCompare(b.name));
}

/** Retained renders keep their source model and CAD transitively. */
export function derivativePlan(store,id,protectedIds,includeHistory=false) {
  check(typeof includeHistory==='boolean','历史文件清理选项无效');
  const project=store.project(id),rows=store.db.prepare('SELECT * FROM tasks WHERE project=? ORDER BY rowid DESC').all(id).map(t=>({...t,detail:JSON.parse(t.detail)}));
  const protectedSet=new Set(protectedIds),candidates=new Set();
  const lastModel=rows.find(t=>t.state==='complete'&&t.detail.files?.['scene.glb']);if(lastModel)protectedSet.add(lastModel.id);
  for(const task of rows)if(['failed','cancelled','interrupted','cleaning'].includes(task.state)||includeHistory&&task.state==='complete')candidates.add(task.id);
  for(const task of rows)if(!candidates.has(task.id)&&task.state!=='removed')protectedSet.add(task.id);
  let changed=true;
  while(changed) {
    changed=false;
    for(const task of rows.filter(t=>protectedSet.has(t.id)))for(const ref of [task.detail.sourceModelTask,task.detail.cadSourceTask])
      if(ref&&!protectedSet.has(ref)){protectedSet.add(ref);changed=true;}
  }
  const entries=[],skipped=[];
  for(const task of rows) {
    if(!uuid.test(task.id)||!candidates.has(task.id)||protectedSet.has(task.id))continue;
    const relatives=task.detail.cleanup?.directories??[`${task.detail.render?'renders':'builds'}/${task.id}`,`staging/${task.id}`];
    for(const relative of relatives) {
      check(['builds/','renders/','staging/'].some(prefix=>relative===prefix+task.id),'清理路径与任务身份不符');
      try {
        const files=inventory(store,id,relative);
        const known=new Set(['manifest.json',...(task.detail.files?Object.keys(task.detail.files):['plan.dxf','scene.blend','scene.glb','render.png',...(task.detail.requestedViews??[]).map(v=>'render-'+v+'.png')])]);
        check((files??[]).every(f=>known.has(f.name)&&(!task.detail.files?.[f.name]||task.detail.files[f.name].bytes===f.bytes)),'目录有未登记或已修改文件，已保留');
        if(files!==null||task.state==='cleaning')entries.push({kind:'task',taskId:task.id,relative,files:files??[],expectedHashes:Object.fromEntries(Object.entries(task.detail.files??{}).map(([name,f])=>[name,f.sha256]))});
      }
      catch(error){skipped.push({taskId:task.id,reason:error.message});}
    }
  }
  const pending=store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id),draft=pending?JSON.parse(pending.data):null;
  let drafts=[];try{drafts=readdirSync(store.dir(id,'drafts'),{withFileTypes:true});}catch(error){if(error.code!=='ENOENT')throw error;}
  for(const entry of drafts) {
    if(!entry.isDirectory()||!uuid.test(entry.name)||draft?.relativePath==='drafts/'+entry.name)continue;
    const relative='drafts/'+entry.name;
    try {
      const files=inventory(store,id,relative);
      check(files.every(f=>['plan.dxf','scene.json'].includes(f.name)),'草案目录含额外文件，已保留');
      let scene;
      if(files.some(f=>f.name==='scene.json')) {
        scene=JSON.parse(readFileSync(store.dir(id,relative,'scene.json'),'utf8'));
      } else {
        const confirmation=store.db.prepare("SELECT data FROM confirmations WHERE project=? AND json_extract(data,'$.drawingId')=?").get(id,entry.name);
        check(confirmation,'草案来源记录缺失，已保留');
        scene=store.read(id,JSON.parse(confirmation.data).expectedRevision+1);
      }
      check(scene.design?.drawingId===entry.name,'草案身份不符，已保留');
      check(/^[a-f0-9]{64}$/.test(scene.design.draftCadHash),'旧草案缺少文件摘要，已保留');
      const sourceHash=draftSourceHash(store,id,entry.name);
      check(!files.some(f=>f.name==='scene.json')||hash(readFileSync(store.dir(id,relative,'scene.json')))===sourceHash,'草案源文件已修改，已保留');
      entries.push({kind:'draft',relative,files,expectedHashes:{'plan.dxf':scene.design.draftCadHash,'scene.json':sourceHash}});
    }catch(error){skipped.push({relative,reason:error.message});}
  }
  const selected=entries.slice(0,100),basis={projectId:id,revision:project.revision,includeHistory,entries:selected};
  return {...basis,token:hash(JSON.stringify(basis)),bytes:selected.reduce((n,e)=>n+e.files.reduce((s,f)=>s+f.bytes,0),0),
    protectedTaskIds:[...protectedSet],skipped,truncated:entries.length>selected.length,
    statement:'保留原件、全部源版本、引用资源、当前/最后可用模型、当前图集及其依赖。历史派生物仅在明确勾选后清理。'};
}

export function cleanDerivatives(store,session,id,input,operation,plan) {
  const request={projectId:id,...input};
  const record=store.once(session,operation,request,()=>{
    store.assertWriter(session,id,input.expectedRevision);check(input.token===plan.token,'清理范围已变化，请重新预览');
    for(const item of plan.entries)for(const file of item.files)if(item.expectedHashes?.[file.name])
      check(hash(readFileSync(store.dir(id,item.relative,file.name)))===item.expectedHashes[file.name],'派生物已被修改，未清理：'+item.relative+'/'+file.name);
    const directories=new Map();
    for(const item of plan.entries)if(item.kind==='task') {
      if(!directories.has(item.taskId))directories.set(item.taskId,[]);directories.get(item.taskId).push(item.relative);
    }
    for(const [taskId,paths] of directories) {
      const row=store.db.prepare('SELECT detail FROM tasks WHERE id=? AND project=?').get(taskId,id);check(row,'清理任务已变化');
      store.db.prepare("UPDATE tasks SET state='cleaning',detail=? WHERE id=?").run(JSON.stringify({...JSON.parse(row.detail),cleanup:{directories:paths}}),taskId);
    }
    return {kind:'derivative_cleanup',projectId:id,entries:plan.entries,removed:[],bytesRemoved:0,completed:false};
  });
  if(record.completed)return record;
  const pending=store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id),draft=pending?JSON.parse(pending.data):null;
  const errors=[];
  for(const item of record.entries) {
    if(record.removed.includes(item.relative))continue;
    try {
      check(draft?.relativePath!==item.relative,'草案正被使用，已保留');
      check(!item.taskId||!plan.protectedTaskIds.includes(item.taskId),'文件现在被保留成果引用，已停止清理');
      const remaining=inventory(store,id,item.relative)??[];
      check(remaining.every(f=>item.files.some(old=>JSON.stringify(old)===JSON.stringify(f))),'派生文件已变化，已保留');
      rmSync(store.dir(id,item.relative),{recursive:true,force:true});
      record.removed.push(item.relative);record.bytesRemoved+=remaining.reduce((n,f)=>n+f.bytes,0);
    } catch(error){errors.push({relative:item.relative,message:error.message});}
  }
  for(const taskId of new Set(record.entries.filter(e=>e.taskId).map(e=>e.taskId))) {
    const entries=record.entries.filter(e=>e.taskId===taskId);
    if(entries.every(e=>record.removed.includes(e.relative))) {
      const row=store.db.prepare('SELECT detail FROM tasks WHERE id=? AND project=?').get(taskId,id);
      if(row)store.db.prepare("UPDATE tasks SET state='removed',detail=? WHERE id=?").run(JSON.stringify({...JSON.parse(row.detail),removedAt:new Date().toISOString()}),taskId);
    }
  }
  record.completed=record.entries.every(e=>record.removed.includes(e.relative));record.errors=errors;
  store.db.prepare('UPDATE receipts SET result=? WHERE session=? AND operation=?').run(JSON.stringify(record),session,operation);
  return record;
}

/** A confirmed draft is only a working copy; immutable revisions and project assets remain. */
export function cleanSupersededDraft(store,id,draft) {
  check(uuid.test(draft.drawingId)&&draft.relativePath==='drafts/'+draft.drawingId,'草案身份无效');
  const pending=store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id);
  check(!pending||JSON.parse(pending.data).drawingId!==draft.drawingId,'草案仍待确认，已保留');
  const files=inventory(store,id,draft.relativePath);if(!files)return;
  check(files.every(f=>['plan.dxf','scene.json'].includes(f.name)),'草案目录含额外文件，已保留');
  check(/^[a-f0-9]{64}$/.test(draft.sha256),'旧草案缺少文件摘要，已保留');
  check(hash(readFileSync(store.dir(id,draft.relativePath,'plan.dxf')))===draft.sha256,'草案CAD已变化，已保留');
  check(JSON.stringify(JSON.parse(readFileSync(store.dir(id,draft.relativePath,'scene.json'),'utf8')))===JSON.stringify(draft.scene),'草案源内容已变化，已保留');
  rmSync(store.dir(id,draft.relativePath),{recursive:true,force:true});
}

export function cleanConfirmedDraft(store,id,drawingId) {
  check(uuid.test(drawingId),'草案编号无效');
  const pending=store.db.prepare('SELECT data FROM proposals WHERE project=?').get(id);
  check(!pending||JSON.parse(pending.data).drawingId!==drawingId,'草案仍待确认，已保留');
  const files=inventory(store,id,'drafts/'+drawingId);if(!files)return;
  check(files.every(f=>['plan.dxf','scene.json'].includes(f.name)),'草案目录含额外文件，已保留');
  check(store.db.prepare("SELECT 1 FROM confirmations WHERE project=? AND json_extract(data,'$.drawingId')=?").get(id,drawingId),'缺少草案确认记录，已保留');
  const scene=JSON.parse(readFileSync(store.dir(id,'drafts',drawingId,'scene.json'),'utf8'));
  check(hash(readFileSync(store.dir(id,'drafts',drawingId,'scene.json')))===draftSourceHash(store,id,drawingId),'草案源文件已修改，已保留');
  check(scene.design?.drawingId===drawingId&&/^[a-f0-9]{64}$/.test(scene.design.draftCadHash),'缺少草案文件摘要，已保留');
  check(hash(readFileSync(store.dir(id,'drafts',drawingId,'plan.dxf')))===scene.design.draftCadHash,'草案CAD已变化，已保留');
  rmSync(store.dir(id,'drafts/'+drawingId),{recursive:true,force:true});
}
