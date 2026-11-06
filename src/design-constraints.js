/** Versioned requirement lists survive redraws; only trusted CAD confirmation accepts changes. */
export const CONSTRAINT_GROUPS=['requirements','relations','routes','views','supports'];
const groups=CONSTRAINT_GROUPS;
const check=(ok,message)=>{if(!ok)throw Error(message);};
const canonical=row=>JSON.stringify(Object.fromEntries(Object.entries(row).sort(([a],[b])=>a.localeCompare(b))));

export function mergeConstraints(input,previous) {
  check(input===undefined||input&&typeof input==='object'&&!Array.isArray(input),'项目要求须为对象');
  check(input?.remove===undefined||input.remove&&typeof input.remove==='object'&&!Array.isArray(input.remove)&&Object.keys(input.remove).every(k=>groups.includes(k)),'移除要求须按requirements/relations/routes指定编号');
  const result={},allIds=new Set();
  for(const group of groups) {
    const supplied=input?.[group]??[],old=previous?.[group]??[],limit={routes:8,views:24,supports:32}[group]??80;
    check(Array.isArray(supplied)&&supplied.length<=limit&&Array.isArray(old),'项目要求数量超限');
    const rows=new Map(old.map(row=>[row.id,structuredClone(row)])),used=new Set();
    for(const row of supplied) {
      check(row&&typeof row.id==='string'&&row.id.length>0&&row.id.length<=60&&!used.has(row.id),'项目要求编号无效或重复');used.add(row.id);
      check(typeof row.source==='string'&&row.source.length>0&&row.source.length<=200,'项目要求需写明来源');
      check(['user_request','user_confirmed','design_assumption'].includes(row.basis),'项目要求依据无效');
      // The caller reports a source; user confirmation is recorded separately by the trusted UI.
      rows.set(row.id,{...structuredClone(row),basis:row.basis==='user_confirmed'?'user_request':row.basis});
    }
    const remove=input?.remove?.[group]??[];
    check(Array.isArray(remove)&&remove.length<=limit&&new Set(remove).size===remove.length,'待移除要求编号无效或重复');
    for(const id of remove){check(typeof id==='string'&&rows.has(id)&&!used.has(id),'待移除要求不存在或同时被修改：'+id);rows.delete(id);}
    check(rows.size<=limit,'已保存项目要求超过数量上限');
    for(const id of rows.keys()){check(!allIds.has(id),'不同类别的项目要求编号不能重复：'+id);allIds.add(id);}
    result[group]=[...rows.values()];
  }
  return result;
}

export function constraintChanges(previous,next) {
  const changes=[];
  for(const group of groups)for(const old of previous?.[group]??[]) {
    const row=next?.[group]?.find(r=>r.id===old.id);
    if(!row||canonical(row)!==canonical(old))changes.push({group,id:old.id,previous:old,proposed:row??null});
  }
  return changes;
}

export function requireConstraintsReady(review,stage='cad') {
  const failed=[...(review.fixedChecks?.requirements??[]).filter(r=>r.status!=='pass'&&(stage==='render'||r.stage!=='render')),...(review.fixedChecks?.relations??[]).filter(r=>r.status==='fail'),
    ...(review.fixedChecks?.views??[]).filter(r=>r.status==='fail'),...(review.fixedChecks?.supports??[]).filter(r=>r.status==='fail')];
  const blocked=review.fixedChecks?.circulationReview?.routes?.filter(r=>r.status==='blocked')??[];
  check(!failed.length&&!blocked.length,'已保存项目要求未满足：'+[...failed,...blocked].map(r=>r.id).join('、')+'；请先修正CAD方案');
}
