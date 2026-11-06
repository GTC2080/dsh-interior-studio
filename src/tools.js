/** Design operations appended to the complete official PTC preset. */
import { defineTool } from '@deepseek-ai/dsh-tools';
import {FURNITURE} from './catalog.js';
import {MATERIALS} from './scene.js';
import {calculateGeometry} from './geometry-tools.js';
import {CONSTRAINT_GROUPS} from './design-constraints.js';

export const inject = ['tools', 'interiorStudio'];
const textOutput = { schema: { type: 'string' }, render: (_args, value) => [{ type: 'text', text: value }] };
const numeric = description => ({ type: 'number', required: true, description });
const str = description => ({ type: 'string', required: true, description });
const point = {type:'array',items:{type:'number'},required:true,description:'[x,y] 平面坐标，单位米'};
const vector = {type:'array',items:{type:'number'},description:'恰好三个数值'};
const material = {type:'string',enum:Object.keys(MATERIALS),description:'目录中的材质 ID'};
const camerasParameter={type:'array',description:'提供时完整替换自定义相机列表，最多6个；不能覆盖标准视角',items:{type:'object',additionalProperties:false,properties:{key:str('相机编号，渲染时作为views的值'),label:{type:'string'},position:{...vector,required:true},target:{...vector,required:true},lens:{type:'number',description:'焦距10–150mm，默认35；局部取景不会自动包含全场'},purpose:{type:'string',enum:['overview','detail'],description:'overview要求主体完整入画；detail允许有意裁切'},subjects:{type:'array',items:{type:'string'},description:'1–32个要核对的对象key/ID；无主体时不声称覆盖通过'},focusPoints:{type:'array',items:{type:'array',items:{type:'number'}},description:'最多16个必须可见的世界XYZ米制表面点，按1mm核对视线；不能填对象内部或孔洞空心点。用于检查收口等细节遮挡'}}}};

export function apply(ctx) {
  const register = (name, description, parameters, execute) => {
    return ctx.effect(() => ctx.tools.register(defineTool({
    name, description, parameters, output: textOutput,
    presentCall: () => ({ card: 'generic', title: {studio_brief:'整理项目需求',studio_geometry:'计算几何',studio_build:'生成三维模型',studio_export:'导出当前设计',studio_context:'读取设计',studio_review:'审查设计',studio_preview:'检查 CAD 草案局部',studio_propose:'提出方案',studio_draw:'绘制 CAD 方案',studio_refine:'细化模型与出图设置',studio_furnish:'添加家具',studio_edit:'调整设计',studio_render:'生成效果图'}[name], kind: 'read' }),
    async execute(args, exec) {
      exec.signal.throwIfAborted();
      if (!exec.agent) throw new Error('设计工具需要当前聊天身份');
      return JSON.stringify(await execute(exec.agent.id, args, exec.callId, exec.signal,exec));
    },
    })));
  };
  register('studio_geometry','只读几何计算，不读取工程或代替确认。圆角、圆弧、轮廓检查、等厚偏移和尺寸计算使用经过校验的算法。输入单位m/mm/cm，输出始终米。valid=false时没有可用几何，须修正原因再计算。outline/holes可直接提交CAD，CAD仍强制校验；多块偏移须处理全部profiles。PTC内筛选结果，勿打印数千坐标。',{
    operation:{type:'string',enum:['fillet','arc','check_profile','offset','measure','orientation'],required:true},
    plane:{type:'string',enum:['xy','xz','yz'],description:'orientation文字平面，默认xz'},towards:{...vector,description:'orientation朝向读者的世界XYZ方向'},up:{...vector,description:'orientation文字上方，默认Z向上'},
    unit:{type:'string',enum:['m','mm','cm'],description:'本次所有长度输入的单位，默认m；角度始终为度'},
    outline:{type:'array',items:{type:'array',items:{type:'number'}},description:'闭合轮廓3–2048点，不重复首点；每点[x,y]或[x,y,圆角半径]'},
    holes:{type:'array',items:{type:'array',items:{type:'array',items:{type:'number'}}},description:'最多32个完全内部的孔洞，不得接触或交叠'},
    radius:{type:'number',description:'fillet统一圆角半径，省略时使用逐点半径；arc的圆半径'},
    center:{type:'array',items:{type:'number'},description:'arc圆心[x,y]'},startDegrees:{type:'number',description:'arc起始角，默认0朝+X'},sweepDegrees:{type:'number',description:'arc非零转角，正逆时针、负顺时针，绝对值最多360'},
    tolerance:{type:'number',description:'arc最大弦误差，默认0.2mm；使用本次unit'},
    distance:{type:'number',description:'offset正值扩大实物，负值收缩实物；孔洞方向自动相反'},
    join:{type:'string',enum:['miter','round','bevel'],description:'offset接角，默认miter，斜接上限2'},
    points:{type:'array',items:{type:'array',items:{type:'number'}},description:'measure的2–2048个同维二维/三维点；返回外包、端点距离、折线路长'},
  },(_session,args)=>calculateGeometry(args));
  register('studio_context', '读取经用户授权的工程、版本和任务。平时summary；index只列key/名称/类型/组合；objects按keys/assemblies读取最多100个完整对象及相关要求，避免反复取全场。target=draft必须带最新drawingId。旧调用默认full。对象key在origin.key；任务诊断带真实版本，缺失或过期不代表通过。artifacts提供真实产物路径。', {detail:{type:'string',enum:['summary','full','index','objects']},target:{type:'string',enum:['current','draft']},drawingId:{type:'string'},keys:{type:'array',items:{type:'string'}},assemblies:{type:'array',items:{type:'string'}}},
    (session,args) => ctx.interiorStudio.context(session,args));
  const scopeProperties={
    id:str('唯一验收编号'),source:str('对应客户要求或明确设计假设'),basis:{type:'string',enum:['user_request','user_confirmed','design_assumption'],required:true},
    scope:{type:'string',enum:['keys','assembly','scene'],description:'默认keys；完整组合用assembly，新增附件也纳入；scene包含全场实物'},
    keys:{type:'array',items:{type:'string'},description:'keys范围的1–500个对象key/ID'},assembly:{type:'string',description:'assembly范围的组合编号'},
  };
  const scopeChecks={
    views:{type:'array',description:'最多24项固定视图验收。独立于可编辑相机subjects；改变或移除须确认，完整范围不能靠缩小subjects绕过。',items:{type:'object',additionalProperties:false,properties:{...scopeProperties,
      view:str('标准或已保存自定义视角ID'),framing:{type:'string',enum:['complete','detail'],description:'默认complete，整个范围须入镜；detail允许局部构图，仍需实际可见'},
      visibleKeys:{type:'array',items:{type:'string'},description:'范围内必须分别可见的对象，最多32个；隐藏的内部构件不应列为必见'},
      focusPoints:{type:'array',items:{type:'array',items:{type:'number'}},description:'最多16个必须可见的米制世界XYZ表面点'},
    }}},
    supports:{type:'array',description:'最多32项跨组合网格接触路径。目标通过via对象/组合连接到声明的anchor基准，不自动把自身最低面当支撑；不证明固定或承载。',items:{type:'object',additionalProperties:false,properties:{...scopeProperties,
      anchorKeys:{type:'array',items:{type:'string'},required:true,description:'1–32个明确的连接基准对象key/ID，如地台或柜架；其固定方式仍须说明'},
      viaKeys:{type:'array',items:{type:'string'},description:'可参与连接路径的其他对象，最多500个'},viaAssemblies:{type:'array',items:{type:'string'},description:'可参与连接路径的其他完整组合，最多32个'},
    }}},
  };
  const reviewParameters={
    expectedRevision:numeric('当前场景版本'),target:{type:'string',enum:['current','draft'],required:true},drawingId:{type:'string',description:'target=draft 时必填，从最新草案返回值读取'},
    requirements:{type:'array',items:{type:'object',additionalProperties:false,properties:{
      id:str('本次检查唯一编号'),source:str('对应的客户要求或明确说明是设计假设'),basis:{type:'string',enum:['user_request','user_confirmed','design_assumption'],required:true},
      scope:{type:'string',enum:['keys','scene','assembly'],description:'默认keys；scene量全部实物附件，assembly量整个组合'},assembly:{type:'string',description:'scope=assembly时必填组合编号'},
      keys:{type:'array',items:{type:'string'},description:'scope=keys时需1–500个准确key/ID；不能用标签或重复别名'},
      property:{type:'string',enum:['width','depth','height','local_width','local_depth','local_height','base_z','top_z','min_x','max_x','min_y','max_y','radius','count','shape','material','text','representation'],required:true},
      stage:{type:'string',enum:['cad','render'],description:'默认cad须在图纸确认前满足。仅representation可设render用于后制图形/精细模型；尺寸数量不能推迟，未完成图形仍明确显示失败。'},
      operator:{type:'string',enum:['equal','min','max'],description:'默认equal；限高用max，最小净尺寸用min。local尺寸只支持单个对象'},
      expected:{type:'number',description:'数值目标；长度为米，count为整数'},expectedText:{type:'string',description:'shape/material/text的目标值；representation可用image_surface/model/text/solid，检查选定对象是否实际使用此表达，不能以占位板替代图片饰面'},
      tolerance:{type:'number',description:'尺寸公差0–.05m，默认.001；数量建议0'},
    }}},
    relations:{type:'array',items:{type:'object',additionalProperties:false,properties:{
      id:str('本次检查唯一编号'),source:str('对应客户要求或设计假设'),basis:{type:'string',enum:['user_request','user_confirmed','design_assumption'],required:true},
      a:str('上方/第一个构件key或ID'),b:str('支承/第二个构件key或ID'),kind:{type:'string',enum:['contact','support'],required:true},
      point:{...vector,required:true,description:'声明的接触点，米制世界坐标XYZ；每个点独立核对'},tolerance:{type:'number',description:'接触点公差.00001–.01m，默认.001'},
    }}},
    routes:{type:'array',description:'最多8条连续净通路；包括入口至功能区，不是只量一个局部间距。按实际占地检查底座、装饰与家具。',items:{type:'object',additionalProperties:false,properties:{
      id:str('唯一检查编号'),source:str('对应客户用途或设计假设'),basis:{type:'string',enum:['user_request','user_confirmed','design_assumption'],required:true},
      points:{type:'array',items:{type:'array',items:{type:'number'}},required:true,description:'2–32个连续XY米制路点，折点与端点用方形净空保守检查'},
      width:numeric('所需连续净宽，.3–5m；由需求确定，不是法规默认'),height:numeric('净高，.5–4m'),baseZ:numeric('实际地面完成面标高，米'),
    }}},
  };
  register('studio_review','只读审查当前场景或指定 CAD 草案，不改变工程。尺寸是世界外包，数量仅覆盖列出的不同对象。contact 在声明点检查参数表面接触且无穿插；support 另检查竖向接触，不是承载认证。supportReview 自动筛出连外包连接路径都缺失的悬空组；连通不代表实际支撑通过。routes 检查声明的连续净通路，包含端点与转角；目录/导入物件用保守包络，未声明路线不能称通行通过。来源和假设由模型声明，不代表整套设计或施工验收通过。',reviewParameters,(session,args)=>ctx.interiorStudio.review(session,args,true));
  register('studio_preview','在确认 CAD 前检查最新草案的实际 Blender 网格。用 keys 或 assembly 聚焦局部，返回米制包围范围、相关已声明的接触点与支撑路径、未接通对象。空结果表示没有相关连接声明；不代表通过、固定或承载。需要当前模型的工程摘要授权。不建正式三维、不更改版本。右侧「草案预览」可查看本地画面；本工具只返回数值和诊断，不读取图片。',{
    expectedRevision:numeric('当前工程版本'),drawingId:str('最新待确认 CAD 草案编号'),
    keys:{type:'array',items:{type:'string'},description:'1–32个不同的对象key/ID，与assembly二选一；均省略检查整份草案'},
    assembly:{type:'string',description:'一个草案组合编号，与keys二选一'},
  },(session,args,_operation,signal)=>ctx.interiorStudio.draftPreview(session,args,signal,true));
  const constraintsParameter={type:'object',additionalProperties:false,description:'随CAD版本保存的验收范围；省略不删除，变更或明确移除须在CAD确认窗口核对。',properties:{requirements:reviewParameters.requirements,relations:reviewParameters.relations,routes:reviewParameters.routes,...scopeChecks,
    remove:{type:'object',additionalProperties:false,properties:Object.fromEntries(CONSTRAINT_GROUPS.map(k=>[k,{type:'array',items:{type:'string'},description:'用户明确取消的旧验收编号；不能与修改编号重复'}]))}}};
  register('studio_brief','新设计绘图前保存独立需求卡，由用户在右侧确认。把客户原话与验收数值放在同一项source/expected或width中，用户硬条件与设计假设分开。可先约定对象key/assembly及所需视角，路径坐标后续CAD可调整但改变硬条件会单独提示。工具不能替用户确认。已有CAD草案时不能用需求卡覆盖；沿用已确认需求，无需重复建立。',{
    name:str('工程名称'),kind:{type:'string',enum:['interior','booth'],required:true},expectedRevision:numeric('当前版本，新工程填0'),
    constraints:{...constraintsParameter,required:true},assumptions:{type:'array',items:{type:'string'},description:'最多12条暂拟条件，每条最多200字，不能冒充客户要求'},
  },(session,args,operation)=>ctx.interiorStudio.brief(session,args,operation,true));
  register('studio_draw','绘制可编辑 CAD 与参数化三维草案。先读 studio_context。长度和XYZ坐标用米，旋转用度。墙/门窗/房间沿用原流程；components 可建任意用途的盒体、圆柱、带内孔/逐点圆角的轮廓拉伸、立体文字，支持三维旋转、标高、自定义颜色和发光。组合构件用相同 assembly 标识，交叠仍会在 componentReview 中列出；不能借组合名掩盖错误。不要用墙体或不合形状的目录家具冒充定制构件。最多120墙、240洞口、100目录物件、500构件。返回尺寸、朝向与构件相交审查；本工具不会确认或渲染。',{
    name:str('方案名称'),kind:{type:'string',enum:['interior','booth'],required:true},expectedRevision:numeric('现有场景版本；新工程填 0'),
    dimensionBasis:{type:'string',enum:['outside','centerline','site'],required:true,description:'尺寸基准：室内用户说总长宽时用 outside（外墙外缘）；明确中心线才用 centerline；展台用 site。outside 的外墙中心线须从边界退半墙厚，例如总宽 8、厚 .2 时两侧中心线 X=.1 和 7.9。'},
    width:numeric('场地 X 方向总宽度，1–100'),depth:numeric('场地 Y 方向总进深，1–100'),height:numeric('默认墙高，1–20'),thickness:numeric('默认墙厚，.04–.8；薄片用components'),floorMaterial:material,
    assumptions:{type:'array',items:{type:'string'},required:true,description:'最多12条，每条最多200字符；列未确认建议和必要限制。不在此估算净面积，读取 measurements'},
    constraints:constraintsParameter,
    presentation:{type:'object',additionalProperties:false,description:'可在首次CAD中保存所约定视角的相机，后续用studio_refine调整。',properties:{cameras:camerasParameter}},
    walls:{type:'array',required:true,items:{type:'object',additionalProperties:false,properties:{
      key:str('唯一墙编号，字母数字或下划线，例如 north'),label:{type:'string',description:'可读墙名'},
      points:{type:'array',items:{type:'array',items:{type:'number'}},description:'直墙或折线墙的坐标列表；与 arc 二选一'},
      arc:{type:'object',additionalProperties:false,properties:{center:point,radius:numeric('中心线半径'),startDegrees:numeric('起始角，0 朝向 +X'),sweepDegrees:numeric('逆时针转角，0–360')}},
      height:{type:'number',description:'可覆盖默认墙高，1–20m；低构件用components'},thickness:{type:'number',description:'可覆盖默认墙厚，.04–.8m；薄片用components'},material,
    }}},
    openings:{type:'array',items:{type:'object',additionalProperties:false,properties:{
      wall:str('所属墙的 key'),kind:{type:'string',enum:['door','window','passage'],required:true,description:'passage 是无框、无玻璃、无门扇的敞口'},start:numeric('沿墙中心线从起点到洞口的距离'),width:numeric('洞口沿墙宽度，.1–8m'),
      sill:{type:'number',description:'洞口底部高度，门默认 0，窗默认 0.9'},top:numeric('洞口顶部高度，须不超过墙高'),
      swing:{type:'string',enum:['left','right'],description:'门扇朝墙路径的左侧或右侧开启'},wrap:{type:'boolean',description:'仅整圆墙的洞口跨起点时为 true'},
    }}},
    rooms:{type:'array',items:{type:'object',additionalProperties:false,properties:{name:str('房间名称'),point,material}}},
    furniture:{type:'array',items:{type:'object',additionalProperties:false,properties:{
      key:{type:'string',description:'可选唯一编号，默认furniture_1等'},label:{type:'string',description:'可读对象名称'},
      asset:{type:'string',enum:Object.keys(FURNITURE),required:true},x:numeric('中心 X'),y:numeric('中心 Y'),rotation:{type:'number',description:'逆时针角度，度。椅子/沙发正面、床尾默认朝 -Y；90° 朝 +X，180° 朝 +Y，270° 朝 -X。床头为相反方向'},
      z:{type:'number',description:'底部标高，默认0；放在抬升地台上时填地台顶高'},
      faceTarget:{type:'string',description:'需要正面对向的对象key，可引用通用构件；按目录正面轴与目标投影检查，不自行旋转'},
      width:{type:'number'},depth:{type:'number'},height:{type:'number'},material,
    }}},
    components:{type:'array',description:'通用参数构件；总计最多24000轮廓采样点。输入不接受代码、脚本或本地文件路径。',items:{type:'object',additionalProperties:false,properties:{
      key:str('唯一编号，字母开头、字母数字或下划线，最多50字符'),label:{type:'string',description:'可读名称，最多100字符'},
      shape:{type:'string',enum:['box','cylinder','extrusion','text'],required:true},
      position:{...vector,required:true,description:'原点[x,y,z]。box/cylinder为底面中心；extrusion/text为轮廓坐标原点，按plane映射后平移。'},
      rotation:{...vector,description:'[绕X,绕Y,绕Z]欧拉角，度，依次XYZ应用，默认[0,0,0]'},
      width:{type:'number',description:'box宽；text外框宽，米'},height:{type:'number',description:'box/cylinder高；text外框高，米'},
      depth:{type:'number',description:'box进深；extrusion/text拉伸深度，米，至少.001'},radius:{type:'number',description:'cylinder半径，米'},
      cornerRadius:{type:'number',description:'仅box平面圆角，默认0；不超过短边一半'},
      plane:{type:'string',enum:['xy','xz','yz'],description:'extrusion/text轮廓平面；xy沿+Z，xz沿+Y，yz沿+X拉伸。extrusion默认xy，text默认xz。box/cylinder默认Z向，可用rotation转向。'},
      outline:{type:'array',items:{type:'array',items:{type:'number'}},description:'extrusion闭合轮廓3–2048点，不重复首点。可直接使用studio_geometry输出的米制outline/holes。每点[u,v]或[u,v,圆角半径]；敞口画入外轮廓，内孔必须完全在内部。'},
      holes:{type:'array',items:{type:'array',items:{type:'array',items:{type:'number'}}},description:'extrusion内孔，最多32个，每个格式同outline，不得相交或接触外轮廓'},
      text:{type:'string',description:'text文字1–200字符；按width/height外框适配，Mac支持中文；只能表达文字，不能冒充客户图片或商标图案'},
      reading:{type:'object',additionalProperties:false,description:'文字阅读方向，自动求解旋转；与rotation互斥。towards指向读者所在一侧，例如正面[0,-1,0]、左柜朝内[1,0,0]、右柜朝内[-1,0,0]。',properties:{towards:{...vector,required:true},up:{...vector,description:'文字上方世界方向，默认Z向上；水平文字自动选择Y向上'}}},
      material,color:{...vector,description:'可选RGB[0..1,0..1,0..1]；无图像纹理时为基础色，有纹理时为纹理乘色'},
      roughness:{type:'number',description:'自定义颜色时的粗糙度.02–1，默认.6'},metallic:{type:'number',description:'金属度0–1，默认0'},emission:{type:'number',description:'发光强度0–20，默认0'},
      assembly:{type:'string',description:'同一组合的编号；用于说明有意构造相交。不同组合相交返回问题；所有相交仍列在结果里。'},
    }}},
  },(session,args,operation,signal)=>ctx.interiorStudio.draw(session,args,operation,signal,true));
  register('studio_propose', '根据用户文字提出可编辑空间方案，仅待确认；不代替用户接受尺寸。booth 方案在用户确认时自动生成接待台、展示台、无品牌占位屏幕，尺寸和布局标为默认建议。展台开放面用 front/back/left/right 逗号分隔。', {
    name: str('方案名称'), kind: str('interior 或 booth'), width: numeric('宽度，米'), depth: numeric('进深，米'),
    height: numeric('高度，米'), thickness: numeric('墙厚，米'), openSides: { type: 'string', description: '开放面，逗号分隔；室内可为空' },
  }, (session, args, operation) => ctx.interiorStudio.propose(session,
    { ...args, openSides: args.openSides === undefined ? undefined : args.openSides.split(',').map(s => s.trim()).filter(Boolean) }, operation,true));
  register('studio_furnish','在已确认空间中添加一件目录家具。先读 studio_context 的 furniture。省略坐标时寻找空位；碰撞或越界会拒绝。不替用户确认空间尺寸。',{
    expectedRevision:numeric('当前场景版本'),asset:str('目录中的家具 ID'),
    x:{type:'number',description:'中心 X，米；可与 Y 一起省略，自动寻找空位'},
    y:{type:'number',description:'中心 Y，米'},rotation:{type:'number',description:'平面角度，度，默认 0'},
    z:{type:'number',description:'底部标高，米，默认0'},
  },(session,args,operation)=>ctx.interiorStudio.furnish(session,args,operation,true));
  register('studio_edit', '仅修改冻结选择。material换材质；move移动目录物件或通用构件；transform调整目录物件位置/角度/尺寸；remove移除物件或构件。通用构件的形状和三维旋转通过新的CAD草案调整。旧版本/选择被拒绝，不能移除墙或地面。', {
    expectedRevision: numeric('studio_context 的当前版本'), selectionToken: str('studio_context 返回的选择令牌'),
    action: str('material / move / transform / remove'), material: { type: 'string', description: '使用 studio_context materials 中的 ID；包括基础色和本地实木地板、细纹混凝土纹理' },
    x: { type: 'number', description: '移动后的 X 米' }, y: { type: 'number', description: '移动后的 Y 米' },
    z:{type:'number',description:'目录物件底部标高/通用构件原点Z，米'},
    rotation:{type:'number',description:'transform 平面角度，度'},width:{type:'number',description:'transform 宽度，米'},
    depth:{type:'number',description:'transform 进深，米'},height:{type:'number',description:'transform 高度，米'},
  }, (session, args, operation) => ctx.interiorStudio.edit(session, args, operation, true));
  register('studio_refine','细化已确认工程并生成待用户确认的 CAD 草案。使用完整 PTC 在随包 Blender 中制作局部素材，导出内嵌纹理静态 GLB，再用本工具回写 CAD；不直接载入 blend。也可更新本地PNG/JPEG饰面、灯光与相机。平面中的导入模型用包络，四向立面读取实际网格；不证明精确接触或施工节点。几何、饰面和灯光修改先经CAD草案确认；仅cameras且无待确认草案时直接保存机位版本，复用已确认几何，只渲染changedViews。独立素材不是正式工程。先加载当前适用建模与材质技能。保留稳定对象、版本与撤销，不替用户确认或渲染。',{
    constraints:constraintsParameter,
    expectedRevision:numeric('当前已确认版本'),drawingId:{type:'string',description:'继续已有草案时必须使用最新drawingId'},
    removeKeys:{type:'array',items:{type:'string'},description:'需要替换的旧参数构件/物件编号，最多100个；不得删除墙或地面'},
    models:{type:'array',items:{type:'object',additionalProperties:false,properties:{
      key:str('新对象编号；若已存在则替换并保留稳定ID和原组合'),label:{type:'string'},path:str('PTC已实际生成/获授权读取的本地GLB绝对路径，最多20MiB'),
      source:str('制作方式或素材来源与许可说明，不把未知来源写成已授权'),position:{...vector,required:true,description:'导入后底面中心[x,y,z]，米制Z向上'},rotation:{...vector,description:'XYZ欧拉角，度'},scale:{type:'number',description:'统一单位换算比例，默认1；毫米源可用.001，不改变XYZ相对比例'},
    }}},
    surfaces:{type:'array',items:{type:'object',additionalProperties:false,properties:{
      keys:{type:'array',items:{type:'string'},required:true,description:'参数构件或地面的key/ID'},path:str('已授权的本地PNG/JPEG绝对路径，最多20MiB/16MP'),source:str('素材来源与许可或客户提供说明'),
      face:{type:'string',enum:['all','x+','x-','y+','y-','z+','z-'],description:'对象局部坐标的表面法向；地面建议z+；原点按该面UV最小角对齐'},
      repeat:{type:'array',items:{type:'number'},required:true,description:'图像完整重复一次所占[u,v]米；要整幅铺满时填写该面实际宽高'},rotation:{type:'number',description:'纹理旋转角度，度'},roughness:{type:'number'},emission:{type:'number'},
    }}},
    presentation:{type:'object',additionalProperties:false,properties:{
      mode:{type:'string',enum:['studio','custom'],description:'studio保留摄影补光并添加本轮灯光；custom仅保留自定义灯与环境光'},worldStrength:{type:'number',description:'环境光强度0–2'},
      lights:{type:'array',description:'提供时完整替换自定义灯列表，最多16盏；[]清空',items:{type:'object',additionalProperties:false,properties:{key:str('唯一灯编号'),label:{type:'string'},type:{type:'string',enum:['area','spot','point'],required:true},position:{...vector,required:true},target:vector,power:numeric('Blender灯光功率瓦数0–10000；不是项目耗电验收'),color:vector,size:{type:'number',description:'面积光直径或点光源直径，米'},spotDegrees:{type:'number',description:'射灯锥角1–170度'}}}},
      cameras:camerasParameter,
    }},
  },(session,args,operation,signal)=>ctx.interiorStudio.refine(session,args,operation,signal,true));
  register('studio_export','从当前工程或准确绑定的CAD草案导出图纸和设计构件清单。SVG含平面、四立面及可指定位置的剖面；DXF返回已核验图册的真实路径与生成/适用版本；schedule返回CSV。PTC可将返回的svg/csv写入本轮工作区并present；不能用旧草稿冒充当前图纸。',{
    expectedRevision:numeric('当前场景版本'),drawingId:{type:'string',description:'导出草案SVG时使用最新drawingId'},format:{type:'string',enum:['svg','dxf','schedule'],required:true},
    view:{type:'string',enum:['plan','front','back','left','right','section_x','section_y'],description:'SVG视图，默认plan'},cutAt:{type:'number',description:'剖切位置，世界X或Y米制值；默认场地中部'},
  },(session,args,_operation,signal)=>ctx.interiorStudio.trackCad(ctx.interiorStudio.exportDesign(session,args,signal,true)));
  register('studio_build','生成已确认CAD方案的三维模型。先写当前CAD图册，再建模和检查实际网格；不代用户确认或渲染。返回taskId/jobId，使用原生后台任务完成通知或job_output，不用sleep轮询。',{
    expectedRevision:numeric('当前已确认场景版本'),
  },(session,args,operation,_signal,exec)=>{
    if(!ctx.interiorStudio.modelAllowed(session,ctx.interiorStudio.store.bound(session)))throw Error('工程未获外发授权');
    return ctx.interiorStudio.startBuild(session,args,operation,false,exec);
  });
  register('studio_render', '在已确认CAD和已核验三维上启动真实Blender渲染。仅改相机时复用原几何和CAD，只渲染指定视角；材质或几何变化须先更新模型。出图前检查机位、主体覆盖与遮挡。返回taskId/jobId，通过原生后台任务完成通知或job_output收结果，不用sleep轮询。生成不等于逐图质量验收。', {
    expectedRevision: numeric('当前场景版本'), quality: { type: 'string', enum:['preview','1080p','4k'], description: '默认1080p（1920×1080）；preview（960×720）用于快速构图检查。4k仅用户明确要求时使用。' },
    views:{type:'array',items:{type:'string'},description:'1–12个不同视角ID，来自studio_context.renderViews，默认全部六个标准视角；按所选顺序出图'},
  }, (session, args, operation,_signal,exec) => {
    const context = ctx.interiorStudio.context(session);
    if (context.sharing === 'disabled') throw new Error('工程未获外发授权');
    return ctx.interiorStudio.startBuild(session, args, operation, true,exec);
  });
}
