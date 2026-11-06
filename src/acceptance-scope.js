/** Resolve versioned acceptance ranges independently of a camera's mutable targets. */
const check=(ok,message)=>{if(!ok)throw Error(message);};
const names=(value,label,max=500,required=false)=>{
  check(Array.isArray(value)&&value.length<=(max)&&(!required||value.length>0)&&new Set(value).size===value.length
    &&value.every(v=>typeof v==='string'&&v.length>0&&v.length<=100&&!/[\x00-\x1f]/.test(v)),label+'无效或超限');
  return value;
};
const standardViews=['overview','front','back','left','right','top'];

export function resolveScope(scene,row) {
  const scope=row.scope??'keys';check(['keys','assembly','scene'].includes(scope),'验收范围须为keys/assembly/scene');
  if(scope==='scene')return {objects:scene.objects,missing:scene.objects.length?[]:['scene']};
  if(scope==='assembly') {
    check(typeof row.assembly==='string'&&row.assembly.length>0&&row.assembly.length<=50,'验收组合编号无效');
    const objects=scene.objects.filter(o=>o.assembly===row.assembly);
    return {objects,missing:objects.length?[]:[row.assembly]};
  }
  return resolveKeys(scene,names(row.keys,'验收对象列表',500,true));
}

function resolveKeys(scene,keys) {
  const objects=[],missing=[];
  for(const key of keys) {
    const found=scene.objects.filter(o=>o.id===key||o.origin?.key===key);
    if(found.length!==1)missing.push(key);else objects.push(found[0]);
  }
  check(new Set(objects.map(o=>o.id)).size===objects.length,'验收对象包含重复别名');
  return {objects,missing};
}

/** CAD can validate references; actual camera and mesh evidence arrives from a checked task. */
export function reviewScopeDeclarations(scene,constraints={}) {
  const views=constraints.views??[],supports=constraints.supports??[];
  check(Array.isArray(views)&&views.length<=24&&Array.isArray(supports)&&supports.length<=32,'最多24项视图与32项跨组合连接要求');
  const source=row=>{
    check(row&&typeof row.id==='string'&&row.id.length>0&&row.id.length<=60&&!/[\x00-\x1f]/.test(row.id),'验收编号无效');
    check(typeof row.source==='string'&&row.source.length>0&&row.source.length<=200&&!/[\x00-\x1f]/.test(row.source),'验收要求需写明来源');
    check(['user_request','user_confirmed','design_assumption'].includes(row.basis),'验收依据无效');
    const range=resolveScope(scene,row);
    return {id:row.id,source:row.source,basis:row.basis,scope:row.scope??'keys',resolvedIds:range.objects.map(o=>o.id),missing:range.missing};
  };
  const viewRows=views.map(row=>{
    const result=source(row),available=[...standardViews,...(scene.presentation?.cameras??[]).map(c=>c.key)];
    check(typeof row.view==='string'&&row.view.length<=50,'验收视角编号无效');
    check(row.framing===undefined||['complete','detail'].includes(row.framing),'视图范围须为complete/detail');
    const visible=resolveKeys(scene,names(row.visibleKeys??[],'必见对象',32));
    check(visible.objects.every(o=>result.resolvedIds.includes(o.id)),'必见对象须属于已保存的视图范围');
    check(Array.isArray(row.focusPoints??[])&&(row.focusPoints??[]).length<=16&&(row.focusPoints??[]).every(p=>Array.isArray(p)&&p.length===3&&p.every(v=>Number.isFinite(v)&&Math.abs(v)<=1000)),'视图必看点无效');
    const missing=[...result.missing,...visible.missing,...(available.includes(row.view)?[]:[row.view])];
    return {...result,view:row.view,framing:row.framing??'complete',visibleIds:visible.objects.map(o=>o.id),missing,
      status:missing.length?'fail':'not_evaluated',reason:missing.length?'missing_scope_objects_or_view':'render_preflight_required'};
  });
  const supportRows=supports.map(row=>{
    const result=source(row),anchors=resolveKeys(scene,names(row.anchorKeys,'连接基准对象',32,true));
    const via=resolveKeys(scene,names(row.viaKeys??[],'跨组合承托对象'));
    const assemblies=names(row.viaAssemblies??[],'跨组合承托组合',32);
    const missing=[...result.missing,...anchors.missing,...via.missing];
    for(const assembly of assemblies) {
      const objects=scene.objects.filter(o=>o.assembly===assembly);
      if(!objects.length)missing.push(assembly);else via.objects.push(...objects);
    }
    return {...result,anchorIds:anchors.objects.map(o=>o.id),viaIds:[...new Set(via.objects.map(o=>o.id))],missing,
      status:missing.length?'fail':'not_evaluated',reason:missing.length?'missing_scope_objects':'actual_mesh_required'};
  });
  return {views:viewRows,supports:supportRows};
}

/** Only task evidence matching the current geometry and saved scopes may complete these rows. */
export function applyScopeEvidence(declarations,evidence={}) {
  const same=(a,b)=>JSON.stringify([...(a??[])].sort())===JSON.stringify([...(b??[])].sort());
  return Object.fromEntries(['views','supports'].map(group=>[group,declarations[group].map(row=>{
    if(row.status==='fail')return row;
    const found=evidence[group]?.find(r=>r.id===row.id);
    if(!found||!['pass','fail','not_evaluated'].includes(found.status)||!same(found.resolvedIds,row.resolvedIds)||group==='supports'&&(!same(found.anchorIds,row.anchorIds)||!same(found.viaIds,row.viaIds)))return row;
    const reason=['render_preflight_required','actual_mesh_required'].includes(found.reason)?undefined:found.reason;
    return {...row,...found,reason:reason??(found.status==='pass'?'scope_checked':found.status==='fail'?
      found.failures?.join('/')||'scope_check_failed':'scope_check_not_evaluated')};
  })]));
}

/** Geometry may be inspected with diagnostics; rendering requires all saved applicable checks. */
export function requireRenderAcceptance(scene,result,requestedViews) {
  const declarations=reviewScopeDeclarations(scene,scene.design?.constraints);
  const checked=applyScopeEvidence(declarations,{supports:result.meshContactReview?.declaredSupports,
    views:result.preflight?.views?.flatMap(v=>v.fixedChecks??[])});
  const blocked=[...checked.supports,...checked.views.filter(r=>requestedViews.includes(r.view))].filter(r=>r.status!=='pass');
  if(!blocked.length)return;
  const error=new Error('固定验收范围尚未通过：'+blocked.map(r=>r.id+' ('+(r.reason??r.status)+')').join('、'));
  error.meshContactReview=result.meshContactReview;error.preflight=result.preflight;throw error;
}
