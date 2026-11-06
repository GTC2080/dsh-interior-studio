/** Search the native skill view without publishing its entire flat catalog to design agents. */
import Schema from '@deepseek-ai/schemastery';
import {defineTool} from '@deepseek-ai/dsh-tools';
import {searchNativeSkills,withoutFlatSkillCatalog,SKILL_STAGES} from './skill-search-ranking.js';

export const name='interior-skill-search';
export const inject=['skills','tools','workingDirectory'];
export const Config=Schema.object({
  maxResults:Schema.natural().min(1).max(12).default(6),
  summaryMaxChars:Schema.natural().min(80).max(600).default(300),
});

export function apply(ctx,config) {
  const search=defineTool({
    name:'search_skills',
    description:'按任务、行业用语和当前阶段检索本聊天可调用的原生 DSH 技能。返回多项候选名称和摘要，不读取正文。可跨阶段命中；选需要的候选，再用原生 skill({name}) 加载。无匹配时换词或仅按阶段浏览；不把分数当作能力评级。',
    parameters:{
      query:{type:'string',description:'当前要解决的问题、行业说法或精确技能名，最多600字符；按阶段浏览时可省略'},
      stage:{type:'string',enum:Object.keys(SKILL_STAGES),description:'可选阶段提示：brief需求/cad图纸/modeling建模/review审查/render出图/delivery交付；不强制排除其他阶段'},
      limit:{type:'number',description:`返回候选数，1–${config.maxResults}，默认${config.maxResults}`},
    },
    output:{schema:{type:'object',additionalProperties:false,properties:{
      query:{type:'string',required:true},stage:{type:'string',required:true},catalogSize:{type:'number',required:true},
      totalMatches:{type:'number',required:true},hasMore:{type:'boolean',required:true},complete:{type:'boolean',required:true},notice:{type:'string',required:true},
      matches:{type:'array',required:true,items:{type:'object',additionalProperties:false,properties:{
        name:{type:'string',required:true},description:{type:'string',required:true},whenToUse:{type:'string',required:true},
        provider:{type:'string',required:true},source:{type:'string',required:true},score:{type:'number',required:true},
        matchedTerms:{type:'array',items:{type:'string'},required:true},
      }}},
    }},render:(_args,value)=>[{type:'text',text:JSON.stringify(value)}]},
    async execute(args,exec) {
      exec.signal.throwIfAborted();
      const cwd=exec.agent?await ctx.workingDirectory.ensure(exec.agent,exec.signal):undefined;
      return searchNativeSkills(ctx.skills,{cwd,scope:exec.agent,signal:exec.signal},args,config);
    },
    presentCall:args=>({card:'generic',title:'检索技能',kind:'search',rawInput:args.query??args.stage}),
  });
  ctx.tools.register(search);
  // Imports may initialize out of configuration order; prepend makes this the outer waterfall.
  ctx.on('agent/pre-step',async ({agent},next)=>{
    const decision=await next();
    return withoutFlatSkillCatalog(decision,ctx.tools.get(search.name,agent)===search&&!!ctx.tools.get('skill',agent));
  },{prepend:true});
}
