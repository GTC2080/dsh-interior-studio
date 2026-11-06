/** Metadata-only retrieval over the native registry's already-resolved skill view. */
export const SKILL_STAGES = {
  brief: ['需求','用途','意图','口述','brief'],
  cad: ['cad','图纸','绘制','开口','标高'],
  modeling: ['建模','造型','精细','曲面','modeling','detail'],
  review: ['审查','检查','碰撞','连接','支撑','review'],
  render: ['材质','纹理','灯光','渲染','效果图','render'],
  delivery: ['验收','交付','还原','查漏','acceptance'],
};

// Vocabulary expands ordinary trade language, never a hand-maintained skill-name index.
const vocabulary = [
  ['cad','图纸','绘图','平面','立面'], ['modeling','三维','建模','造型','3d'],
  ['detail','细化','精细','深化','细节','粗糙','生硬'], ['曲面','弧面','圆弧','弧形','圆角'],
  ['review','检查','审查','校核','验收','核对'], ['render','渲染','效果图','出图'],
  ['material','材质','贴图','纹理','饰面','木纹'], ['灯光','照明','打光'],
  ['布局','布置','动线','通行'], ['碰撞','穿墙','越界','超出'],
  ['连接','接触','贴合','支撑','承托','搭接','悬空','错位'],
  ['brief','需求','想法','意图','口述'],
  ['几何','算法','轮廓','偏移','曲率','圆角','fillet','offset'],
  ['审美','品味','美观','好看','难看','设计感','aesthetic'],
  ['概念','主题','气质','意向板','moodboard','concept'],
  ['风格','搭配','配色','style'], ['构图','比例','均衡','节奏','主次','composition'],
  ['真实感','塑料','玩具','realism'],
];
const stop = new Set('的 了 和 与 把 在 是 要 我 你 他 它 有 能 不 也 就 都 这 那 给 做 这个 那个 一个 一些 怎么 如何 需要 一下 进行 可以 帮我 我们 设计 问题 the and a an please help me to with studio skill skills'.split(' '));
const segmenter = new Intl.Segmenter('zh',{granularity:'word'});
const meaningfulSingle = new Set('墙门窗孔灯床柜图');
const normalize = text => text.normalize('NFKC').toLowerCase();
const compareNames = (a,b) => a.name<b.name?-1:a.name>b.name?1:0;
const terms = text => [...new Set([...segmenter.segment(normalize(text))]
  .filter(part=>part.isWordLike&&!stop.has(part.segment)&&(part.segment.length>1||meaningfulSingle.has(part.segment)||normalize(text.trim())===part.segment)).map(part=>part.segment))];

/** Return bounded summaries for one query, preserving native invocation and precedence decisions. */
export async function searchNativeSkills(registry, lookup, input, config) {
  lookup.signal?.throwIfAborted();
  const {maxResults,summaryMaxChars}=config;
  if(!Number.isInteger(maxResults)||maxResults<1||maxResults>12||!Number.isInteger(summaryMaxChars)||summaryMaxChars<80||summaryMaxChars>600)throw Error('技能检索配置无效');
  const query=input.query??'',stage=input.stage??'',limit=input.limit??maxResults;
  if(typeof query!=='string'||query.length>600||typeof stage!=='string'||(stage&&!Object.hasOwn(SKILL_STAGES,stage))||(!query.trim()&&!stage))throw Error('提供最多600字符的检索词，或选择有效的阶段');
  if(!Number.isInteger(limit)||limit<1||limit>maxResults)throw Error(`检索数量须为1–${maxResults}的整数`);
  const snapshot=await registry.snapshot(lookup);
  lookup.signal?.throwIfAborted();
  const skills=snapshot.skills.filter(s=>s.invocation.modelInvocable);
  const exact=normalize(query.trim()),words=terms(query),aliases=new Set();
  // Some bundled ICU dictionaries split Chinese compounds; retain known phrases before expansion.
  for(const group of vocabulary)for(const word of group)
    if(/\p{Script=Han}/u.test(word)&&exact.includes(word)&&!words.includes(word))words.push(word);
  for(const group of vocabulary)if(group.some(word=>words.includes(word)))for(const word of group)if(!words.includes(word))aliases.add(word);
  const ranked=[];
  for(const skill of skills) {
    const fields=[normalize(skill.name),normalize(skill.description.slice(0,4096)),normalize((skill.whenToUse??'').slice(0,4096))];
    const weight=word=>fields.reduce((sum,text,i)=>sum+(text.includes(word)?[5,2,3][i]:0),0);
    const hits=words.filter(word=>weight(word)>0),related=[...aliases].filter(word=>weight(word)>0);
    let score=hits.reduce((sum,word)=>sum+weight(word),0)+related.length;
    if(exact===fields[0])score+=1000;
    const stageScore=stage?SKILL_STAGES[stage].reduce((sum,word)=>sum+(fields.some(text=>text.includes(word))?1:0),0):0;
    // Stage is a hint: a relevant skill from another phase remains discoverable.
    if(score>0||(!words.length&&stageScore))score+=stageScore;
    if(score<=0)continue;
    ranked.push({name:skill.name,description:skill.description.slice(0,summaryMaxChars),
      whenToUse:(skill.whenToUse??'').slice(0,summaryMaxChars),provider:skill.provider,source:skill.source,
      score,matchedTerms:[...hits,...related].slice(0,8).map(term=>term.slice(0,80))});
  }
  ranked.sort((a,b)=>b.score-a.score||compareNames(a,b));
  return {query:query.trim(),stage,catalogSize:skills.length,totalMatches:ranked.length,hasMore:ranked.length>limit,
    complete:snapshot.complete,matches:ranked.slice(0,limit),
    notice:!snapshot.complete?'原生目录发现不完整，未找到不代表不存在；可稍后重试。':!ranked.length?'没有匹配项；可换行业用语、精确技能名，或仅指定阶段浏览。':'候选可多选；用原生 skill 加载所需正文，分数是词语相关度，不是能力或安全评级。'};
}

/** Omit only native flat catalog frames; explicit skill invocations and other context stay intact. */
export function withoutFlatSkillCatalog(decision, enabled) {
  if(!enabled||decision.kind==='reject')return decision;
  const messages=decision.messages.filter(message=>message.source?.kind!=='skill-catalog');
  return messages.length===decision.messages.length?decision:{...decision,messages};
}
