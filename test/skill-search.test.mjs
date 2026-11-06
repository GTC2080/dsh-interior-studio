import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createRequire} from 'node:module';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {searchNativeSkills,withoutFlatSkillCatalog} from '../src/skill-search-ranking.js';

const config={maxResults:6,summaryMaxChars:300};
const names=['studio-design-brief','studio-modeling','studio-detail-modeling','studio-space-review','studio-material-render','studio-design-acceptance'];
const summaries=names.map(name=>{
  const text=readFileSync(new URL(`../skills/${name}/SKILL.md`,import.meta.url),'utf8');
  return {name,description:text.match(/^description: (.+)$/m)[1],provider:'bundled',source:'custom',
    invocation:{modelInvocable:true,userInvocable:true}};
});
const registry={snapshot:async()=>({skills:summaries,complete:true})};

test('trade language retrieves multiple applicable skills without returning bodies',async()=>{
  const result=await searchNativeSkills(registry,{}, {query:'木纹比例和饰面要调整，同时检查构件连接与支撑',limit:4},config);
  const returned=result.matches.map(s=>s.name);
  assert.ok(returned.includes('studio-material-render'));
  assert.ok(returned.includes('studio-space-review'));
  assert.equal(result.catalogSize,6);
  assert.ok(result.matches.length<=4);
  assert.ok(result.matches.every(s=>!('content' in s)&&!('path' in s)));
});

test('curved detail, exact names and phase browsing stay discoverable across phases',async()=>{
  const curved=await searchNativeSkills(registry,{}, {query:'弧面太生硬，需要细化造型',limit:2},config);
  assert.equal(curved.matches[0].name,'studio-detail-modeling');
  const exact=await searchNativeSkills(registry,{}, {query:'studio-space-review',stage:'render',limit:1},config);
  assert.equal(exact.matches[0].name,'studio-space-review');
  const browse=await searchNativeSkills(registry,{}, {stage:'render'},config);
  assert.equal(browse.matches[0].name,'studio-material-render');
});

test('Chinese compounds retrieve geometry, finish and connection skills without single-character mail noise',async()=>{
  const all=[...summaries,{...summaries[0],name:'agently-mail',description:'通过命令行发送、回复和转发邮件',provider:'user',source:'user-agents'}];
  const result=await searchNativeSkills({snapshot:async()=>({skills:all,complete:true})},{},
    {query:'陈列柜 圆弧转角 生硬 木纹比例 柜格 台面 连接 收口',stage:'review'},config);
  assert.deepEqual(new Set(result.matches.map(s=>s.name)),new Set(['studio-detail-modeling','studio-material-render','studio-space-review']));
});

test('no match, incomplete discovery and bounded summaries are explicit',async()=>{
  const empty=await searchNativeSkills(registry,{}, {query:'quasar spectroscopy'},config);
  assert.deepEqual(empty.matches,[]);
  assert.equal(empty.totalMatches,0);
  const partial={snapshot:async()=>({skills:[{...summaries[0],description:'需求'.repeat(1000)}],complete:false})};
  const result=await searchNativeSkills(partial,{}, {query:'需求'}, {...config,summaryMaxChars:80});
  assert.equal(result.complete,false);
  assert.equal(result.matches[0].description.length,80);
  assert.match(result.notice,/不完整/);
});

test('query constraints, cancellation and caller scope reach the registry unchanged',async()=>{
  let calls=0,received;
  const native={snapshot:async options=>{calls++;received=options;return {skills:summaries,complete:true};}};
  const controller=new AbortController(),lookup={cwd:'/test-project',scope:{},signal:controller.signal};
  await searchNativeSkills(native,lookup,{query:'图纸'},config);
  assert.equal(received,lookup);
  for(const input of [{query:''},{query:'x'.repeat(601)},{query:'图纸',limit:7},{query:'图纸',limit:1.5},{stage:'unknown'}])
    await assert.rejects(searchNativeSkills(native,lookup,input,config));
  assert.equal(calls,1);
  controller.abort(new Error('cancelled'));
  await assert.rejects(searchNativeSkills(native,lookup,{query:'图纸'},config),/cancelled/);
  assert.equal(calls,1);
  const later=new AbortController();
  await assert.rejects(searchNativeSkills({snapshot:async()=>{later.abort(new Error('late cancel'));return {skills:summaries,complete:true};}},
    {signal:later.signal},{query:'图纸'},config),/late cancel/);
});

test('only the design catalog frame is removed, preserving explicit skill invocation and rejection',()=>{
  const ordinary={role:'user',source:{kind:'user'},content:[{type:'text',text:'<available_skills>quotation</available_skills>'}]};
  const invocation={role:'user',source:{kind:'skill-invocation',name:'user-only'},content:[]};
  const policy={role:'user',source:{kind:'working-directory'},content:[]};
  const catalog={role:'user',source:{kind:'skill-catalog',form:'catalog',entries:[]},content:[]};
  const decision={kind:'continue',messages:[ordinary,catalog,invocation,policy]};
  assert.equal(withoutFlatSkillCatalog(decision,false),decision);
  assert.deepEqual(withoutFlatSkillCatalog(decision,true).messages,[ordinary,invocation,policy]);
  const rejected={kind:'reject',reason:'blocked'};
  assert.equal(withoutFlatSkillCatalog(rejected,true),rejected);
});

const nativeURL=new URL('../../../source/packages/skill/skill/lib/index.js',import.meta.url);
const nativeAvailable=existsSync(nativeURL);

test('real native registry owns precedence, invocation policy, invalidation and deferred body reads',{skip:!nativeAvailable},async()=>{
  const require=createRequire(new URL('../../../source/packages/skill/skill/package.json',import.meta.url));
  const {Context}=await import(pathToFileURL(require.resolve('@deepseek-ai/cordis')).href);
  const {default:SkillRegistry}=await import(nativeURL.href);
  const ctx=new Context();await ctx.plugin(SkillRegistry);
  let reads=0,control;
  const candidate=(name,description,rank,modelInvocable=true)=>({name,description,rank,
    provider:'project',source:'project-dsh',locator:name,invocation:{modelInvocable,userInvocable:true}});
  const rows=[candidate('project-cabinet','柜体深化与板厚节点',10),candidate('user-only','柜体隐藏技能',10,false)];
  const release=ctx.skills.registerProvider(c=>{control=c;return {name:'project',list:async()=>rows,
    get:async row=>{reads++;return {...row,content:'Project-owned body.'};}};});
  const releaseOther=ctx.skills.registerProvider(()=>({name:'lower',list:async()=>[
    {...candidate('project-cabinet','低优先级重复技能',600),provider:'lower',source:'bundled'},
    {...candidate('render-helper','木纹与灯光出图',600),provider:'lower',source:'bundled'},
  ],get:async row=>({...row,content:'Lower body.'})}));
  try {
    const result=await searchNativeSkills(ctx.skills,{}, {query:'柜体深化'},config);
    assert.deepEqual(result.matches.map(s=>s.name),['project-cabinet']);
    assert.equal(result.matches[0].source,'project-dsh');
    assert.equal(result.catalogSize,2,'model-disabled skill must not leak through search');
    assert.equal(reads,0,'search must not load bodies');
    assert.equal((await ctx.skills.get(result.matches[0].name)).content,'Project-owned body.');
    assert.equal(reads,1);
    rows.push(candidate('new-window','窗户开口识别',10));control.invalidate();
    const updated=await searchNativeSkills(ctx.skills,{}, {query:'窗户'},config);
    assert.equal(updated.matches[0].name,'new-window');
    assert.ok((await ctx.skills.list()).some(s=>s.name==='user-only'&&s.invocation.userInvocable));
  } finally {releaseOther();release();}
});

test('native scope changes do not leak another preset into retrieval',{skip:!nativeAvailable},async()=>{
  const require=createRequire(new URL('../../../source/packages/skill/skill/package.json',import.meta.url));
  const {Context}=await import(pathToFileURL(require.resolve('@deepseek-ai/cordis')).href);
  const {createScope,scopeOf,bindScopeParent}=await import(pathToFileURL(require.resolve('@deepseek-ai/dsh-scope')).href);
  const {default:SkillRegistry}=await import(nativeURL.href);
  const ctx=new Context();await ctx.plugin(SkillRegistry);
  const a=createScope(ctx,{preset:'a'}),b=createScope(ctx,{preset:'b'});
  a.ctx.get('skills').register({name:'a-cabinet',description:'柜体细化',source:'preset',content:'A'});
  b.ctx.get('skills').register({name:'b-cabinet',description:'柜体细化',source:'preset',content:'B'});
  const agent={},binding=bindScopeParent(agent,scopeOf(a.ctx));
  try {
    const first=await searchNativeSkills(ctx.skills,{scope:agent},{query:'柜体'},config);
    assert.deepEqual(first.matches.map(s=>s.name),['a-cabinet']);
    binding.rebind(scopeOf(b.ctx));
    const second=await searchNativeSkills(ctx.skills,{scope:agent},{query:'柜体'},config);
    assert.deepEqual(second.matches.map(s=>s.name),['b-cabinet']);
  } finally {await a.dispose();await b.dispose();}
});

test('real filesystem provider discovers bundled skills and native get resolves their resource base',{skip:!nativeAvailable},async()=>{
  const require=createRequire(new URL('../../../source/packages/skill/skill-filesystem/package.json',import.meta.url));
  const {Context}=await import(pathToFileURL(require.resolve('@deepseek-ai/cordis')).href);
  const {default:SkillRegistry}=await import(nativeURL.href);
  const filesystem=await import(new URL('../../../source/packages/skill/skill-filesystem/lib/index.js',import.meta.url));
  const ctx=new Context();await ctx.plugin(SkillRegistry);
  const mount=await ctx.plugin(filesystem,{providerName:'design-test',includeDefaultRoots:false,watch:false,
    customSkillDirs:[fileURLToPath(new URL('../skills/',import.meta.url))]});
  try {
    const found=await searchNativeSkills(ctx.skills,{}, {query:'弧面生硬和木纹方向',limit:6},config);
    assert.ok(found.matches.some(s=>s.name==='studio-detail-modeling'));
    assert.ok(found.matches.some(s=>s.name==='studio-material-render'));
    const visual=await searchNativeSkills(ctx.skills,{}, {query:'外立面 品牌视觉 审美 排版',stage:'modeling',limit:6},config);
    assert.ok(visual.matches.some(s=>s.name==='studio-visual-design'));
    assert.ok(visual.matches.some(s=>s.name==='studio-aesthetic-review'));
    const aesthetic=await ctx.skills.get('studio-aesthetic-review');
    assert.ok(existsSync(new URL('references/design-principles.md',pathToFileURL(aesthetic.resourceBase.path+'/'))));
    const loaded=await ctx.skills.get('studio-detail-modeling');
    assert.equal(loaded.provider,'design-test');
    assert.equal(loaded.resourceBase.kind,'directory');
    assert.ok(existsSync(new URL('references/blender-roundtrip.md',pathToFileURL(loaded.resourceBase.path+'/'))));
  } finally {await mount.dispose();}
});

test('ordinary design feedback retrieves domain methods and native loading resolves their references',{skip:!nativeAvailable},async()=>{
  const require=createRequire(new URL('../../../source/packages/skill/skill-filesystem/package.json',import.meta.url));
  const {Context}=await import(pathToFileURL(require.resolve('@deepseek-ai/cordis')).href);
  const {default:SkillRegistry}=await import(nativeURL.href);
  const filesystem=await import(new URL('../../../source/packages/skill/skill-filesystem/lib/index.js',import.meta.url));
  const ctx=new Context();await ctx.plugin(SkillRegistry);
  const mount=await ctx.plugin(filesystem,{providerName:'spatial-design-test',includeDefaultRoots:false,watch:false,
    customSkillDirs:[fileURLToPath(new URL('../skills/',import.meta.url))]});
  try {
    for(const [query,expected,resource] of [
      ['这个展厅没有设计感，主题也不清楚','studio-design-concept','references/concept-and-moodboard.md'],
      ['喜欢原木和侘寂，材料配色和光怎么搭','studio-interior-style','references/style-and-materials.md'],
      ['北欧风和工业风能混搭吗','studio-interior-style','references/style-and-materials.md'],
      ['地中海和乡村的材料怎么选','studio-interior-style','references/style-and-materials.md'],
      ['门头比例失衡，构图主次和节奏不好','studio-spatial-composition','references/composition-and-precedents.md'],
      ['柜体像塑料玩具，真实感不足','studio-realism','../studio-detail-modeling/references/shape-and-modifiers.md'],
    ]) {
      const result=await searchNativeSkills(ctx.skills,{}, {query},config);
      assert.ok(result.matches.some(s=>s.name===expected),query+': '+result.matches.map(s=>s.name).join(', '));
      const skill=await ctx.skills.get(expected);
      assert.equal(skill.provider,'spatial-design-test');
      const target=new URL(resource,pathToFileURL(skill.resourceBase.path+'/'));
      assert.ok(existsSync(target),resource+' missing');
      assert.ok(readFileSync(target,'utf8').length>500,'reference must contain actionable detail');
    }
    const mixed=await searchNativeSkills(ctx.skills,{}, {query:'审查门头构图比例、材质配色和灯光搭配'},config);
    assert.ok(mixed.matches.some(s=>s.name==='studio-interior-style'));
    assert.ok(mixed.matches.some(s=>s.name==='studio-spatial-composition'));
    const scope=await searchNativeSkills(ctx.skills,{}, {query:'跨组合连接、支撑和通路堵塞',stage:'review'},config);
    assert.ok(scope.matches.some(s=>s.name==='studio-space-review'),'domain additions must retain physical-review retrieval');
  } finally {await mount.dispose();}
});

test('native skill tool loads search hits and retains its disabled-model check after catalog suppression',{skip:!nativeAvailable},async()=>{
  const require=createRequire(new URL('../../../source/packages/skill/skill/package.json',import.meta.url));
  const {Context}=await import(pathToFileURL(require.resolve('@deepseek-ai/cordis')).href);
  const {default:SkillRegistry}=await import(nativeURL.href);
  const nativeTool=await import(new URL('../../../source/packages/skill/tool-skill/lib/index.js',import.meta.url));
  const ctx=new Context();await ctx.plugin(SkillRegistry);
  const release=ctx.skills.registerProvider(()=>({name:'native-test',list:async()=>[
    ...summaries.map(s=>({...s,provider:'native-test',rank:10,locator:s.name})),
    ...Array.from({length:1000},(_,i)=>({name:`unrelated-${i}`,description:'Data extraction utility',provider:'native-test',source:'custom',rank:10,locator:i,invocation:{modelInvocable:true,userInvocable:true}})),
    {...summaries[0],name:'user-only',provider:'native-test',rank:10,locator:'user-only',invocation:{modelInvocable:false,userInvocable:true}},
  ],get:async s=>({...s,content:'Full body from native provider.'})}));
  const tools=new Map(),listeners=[];
  const env={skills:ctx.skills,workingDirectory:{ensure:async()=>'/test-project'},
    tools:{register:tool=>tools.set(tool.name,tool),get:name=>tools.get(name)},
    on:(_event,callback)=>listeners.push(callback)};
  nativeTool.apply(env);
  const signal=new AbortController().signal;
  const agent={session:{surface:{nodes:[]},seq:0}};
  const initial={kind:'continue',messages:[]};
  const frame={agent,messages:[],signal};
  const run=()=>listeners.reduceRight((next,listener)=>()=>listener(frame,next),async()=>initial)();
  try {
    const native=await run();
    const catalog=native.messages.find(m=>m.source.kind==='skill-catalog');
    assert.equal(catalog.source.entries.length,1006);
    const filtered=withoutFlatSkillCatalog(native,true);
    assert.equal(filtered.messages.length,0,'no flat metadata catalog should reach this model request');
    const found=await searchNativeSkills(ctx.skills,{scope:agent,signal},{query:'木纹饰面'},config);
    const skill=tools.get('skill');
    const loaded=await skill.execute({name:found.matches[0].name},{agent,signal});
    assert.equal(loaded.content,'Full body from native provider.');
    await assert.rejects(skill.execute({name:'user-only'},{agent,signal}),/not available for model invocation/);
    assert.ok((await ctx.skills.list()).some(s=>s.name==='user-only'));
    assert.ok(JSON.stringify(found).length<5000,'unrelated catalog growth must not grow the bounded search result');
    const user={role:'user',source:{kind:'user'},content:[{type:'text',text:'/user-only'}]};
    const explicitFrame={...frame,messages:[user]};
    const explicit=await listeners.reduceRight((next,listener)=>()=>listener(explicitFrame,next),async()=>({kind:'continue',messages:[user]}))();
    assert.ok(withoutFlatSkillCatalog(explicit,true).messages.some(m=>m.source.kind==='skill-invocation'&&m.source.name==='user-only'));
  } finally {release();}
});

test('Cordis prepend suppresses a catalog even when the filter initializes after the publisher',{skip:!nativeAvailable},async()=>{
  const require=createRequire(new URL('../../../source/packages/skill/skill/package.json',import.meta.url));
  const {Context}=await import(pathToFileURL(require.resolve('@deepseek-ai/cordis')).href);
  const ctx=new Context();
  const original={role:'user',source:{kind:'user'},content:[]};
  const removePublisher=ctx.on('agent/pre-step',async (_frame,next)=>{
    const result=await next();return {...result,messages:[...result.messages,{role:'user',source:{kind:'skill-catalog',form:'catalog'},content:[]}]};
  });
  const removeFilter=ctx.on('agent/pre-step',async (_frame,next)=>withoutFlatSkillCatalog(await next(),true),{prepend:true});
  try {
    const filtered=await ctx.waterfall('agent/pre-step',{},async()=>({kind:'continue',messages:[original]}));
    assert.deepEqual(filtered.messages,[original]);
    removeFilter();
    const restored=await ctx.waterfall('agent/pre-step',{},async()=>({kind:'continue',messages:[original]}));
    assert.equal(restored.messages.length,2,'unmount restores native publishing');
  } finally {removePublisher();}
});
