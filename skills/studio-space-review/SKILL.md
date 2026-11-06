---
name: studio-space-review
description: 审查空间布局、尺寸数量、朝向、净空及构件接触和支撑，或修复穿墙、悬空、错位时使用。依靠几何和需求证据，不依赖截图猜测，也不等于施工合规认证。
---

# 空间与关系审查

先审数值和关系，再补充视觉判断。没有碰撞不能推出连接正确；文件成功生成也不能推出设计合理。

先按用途判断哪些部位应接触、哪些必须留缝。开合、滑动、拆装与维护需要的间隙是设计要求，不能为了通过 contact/support 就消除间隙、放大运动件或强行贴死。接触检查应针对真实支承/连接部位；缺少铰接、支架或安装信息时标记待深化，不能把“塞满外框”当作安装正确。修正接触后重新核对活动与使用空间。

## 绑定正确对象

在 PTC 程序内读取 `studio_context` 并 JSON.parse，使用完整场景计算与选取对象，只输出必要证据。审当前模型用 `studio_review` 的 target=current；审草案用 target=draft 与最新 drawingId。始终提供当前 expectedRevision，旧草案或版本必须重读。

检查项的 source 引用客户实际要求或设计依据，basis 使用 user_request、user_confirmed 或 design_assumption。工具不会认证来源真伪；模型推定值永远不能改称客户确认。

## 可执行检查

- requirements 每次最多80项，keys 指定准确且不重复的对象 key 或 ID。width/depth/height 是所选对象合并后的世界外包尺寸；base_z/top_z 是世界最低/最高点。旋转后的尺寸可能与局部参数不同，房间净尺寸仍读 measurements。
- radius 仅适用于单个圆柱；shape/material/text 仅对单个对象。数值用 expected，字符串用 expectedText。尺寸公差默认1mm；精确数量用 count、tolerance=0。count 仅计数指定对象，必须先与完整 scene 对照，不能靠漏列对象证明总数正确。
- relations 每次最多80项，声明 a、b、kind、世界坐标 point 与公差。contact 核对该点位于双方参数表面且无实体穿插；support 额外检查 a 在上、b 在下的竖向实体接触。依据真实轮廓、内孔和三维变换，不能拿外包盒接触当作实体接触。
- 连接只证明列出的采样点；长接缝或多点支承分别抽查有代表性的端点与中部。它不证明连续接缝或承载能力。目录资产和文字外框不提供真实实体连接证明，工具返回 not_evaluated 时保留待核验，不自行改写为通过。
- 导入模型内部接触用 [网格表面检查脚本](scripts/mesh_contacts.py) 辅助核对：用随包 Blender 只读打开当前正式 build 的 scene.blend，将当前 scene 写到临时 JSON，传入 --blend、--scene、--keys（逗号分隔的稳定 key，最多32项）、--output。仍按精细建模资料隔离配置、禁用自动执行、设置超时与非零退出检查。脚本按真实三角面拆分网格岛，检查1mm内表面接触与到本组件最低表面的路径，不按整个模型包围盒或同组名称判定连接。connection_unresolved 返回需检查的世界坐标范围；可能存在嵌入或组件外安装，先核实后修正。surface_path_observed 也不证明固定、承重或无穿插；不能自动吸附、扩大公差或改客户尺寸来制造通过。
- 示例：有上层构件应落在平台顶面，先由实际尺寸算出候选接触点，再提交 support。两件互不相交、却相隔几厘米时，contact 应失败；修正实际位置后重新审查。不得把允许公差扩大来掩盖明显间隙。

## 布局与功能

- 读取 supportReview：disconnectedGroups 表示构件组连外包都没有通向地面Z=0的连接路径，应查缺少的底座、杆件、背撑、吊挂或固定件。无 disconnectedGroups 也不能称支撑通过；外包可能跨越内孔或彼此并未真实接触，仍须以 relations 或真实网格核对。assembly 相同不代表接上了。抬升地面要核对实际完成面和支承。
- 用 routes 声明入口到主要功能区的连续通路，每条提供 points（2–32个XY米制路点）、width、height、baseZ、source 与 basis。把底座、装饰、展品、家具、门扇等实际占地纳入；先核各段、折点和目标区，再判断可达。只量门洞宽或桌椅间一处净距不能代表全程可通行。routes 未提供时 circulationReview.coverage=not_requested，不能声称通行审查已完成。
- 连续通路按扫掠矩形及方形端点/转角保守检查；参数轮廓使用真实三维变换，目录和导入模型用包络，阻挡可能需要更精确的网格核对。clear 只对应本条路径与所给净宽/净高，不是自动寻路、承载、法规或无障碍认证；关闭的门不能默认算已打开。

- 读取 componentReview 的 issues 与 intersections：同 assembly 的交叠仍有记录，逐项判断是否为有意装配。文字按外框审查，不能宣称完成逐字形碰撞检测。
- 读取 furnitureReview 的参考目标、正面轴和建议角度，判断是否符合对象用途。faceTarget 可指向通用构件。不能把某一种搭配、某个朝向或固定家具品类规则强套到所有设计。
- 移动、缩放或旋转后重查边界、相邻对象、开合和通行。室内净尺寸读 measurements.rooms.clear。工具对门前0.45m、主通道0.60m等检查属于当前设计规则；其他使用、维护、无障碍及现场要求需单独核对，不能称法规审查已通过。
- 不为消除报错删掉客户要求、改动固定尺寸、扩场地或隐去未检查范围。有约束冲突就列出具体冲突，让用户选择必须改变的条件。

最后分别汇报已通过的具体项目、失败项、未评估项与设计假设。`totals.fail=0` 只代表本次列出的要求，不是整套设计通过。

## 工具与验证衔接

优先读取studio_review.fixedChecks与quality：保存清单自动复查，临时totals不等于整案通过。实际建模任务的meshContactReview检查声明组合内的真实面路径；connection_unresolved/not_evaluated须核对，不把最低部件当成已接地或承载成立。

## 固定的跨组合检查

在当前CAD草案的constraints.supports保存需要检查的范围；可用studio_refine.constraints补充，保留已有几何。每项有id/source/basis，目标用scope=assembly和assembly、scope=scene或明确keys；anchorKeys指定声明的地台、柜架或其他连接基准，viaKeys/viaAssemblies列可参与路径的其他对象或完整组合。完整组合优先按assembly保存，新附件随组合自动纳入，不能漏列悬空部件。原生确认沿用已有CAD流程；省略、临时审查或改同一相机subjects不能删除固定要求。

例：目标keys=['shelf']，anchorKeys=['platform']，viaAssemblies=['case_frame']，source说明层板经柜架连接地台。实际网格将按此范围追踪，不自动把层板自身最低面当支撑。结果在任务meshContactReview.declaredSupports和当前studio_review.fixedChecks.supports；预算超限保留not_evaluated和原因，不能截断后称全部通过。构建完成允许查看诊断，但固定范围未通过不发布效果图。声明基准不等于已经证明其固定方式或承载。

quality的requirements/circulation/connections/views/crossAssembly只统计已保存要求，quality.temporary和coverage.temporaryCounts是本次临时检查。核对coverage.savedCounts与逐项状态；通路仍覆盖全场，不因构件分属不同组合而排除。没有请求或没有算完的范围继续显示待核对。

## 大组合与可定位失败

实际接触图使用空间候选筛选，超过256个文字/零件片段仍可检查；总顶点、三角面、8192片段、候选对和表面采样仍有预算。达到真实预算时保持not_evaluated，不能只删掉难查的对象或扩大公差。固定支持范围的resolvedIds/anchorIds/viaIds必须完整对应原要求。

失败时读取graph.unresolvedKeys与unresolvedParts，按片段实际位置检查支承路径，再用detail=objects取相关构件。缺少铰链、底板或过渡件时回CAD补建或说明未知工艺，不能把相交、同组合或最近邻当作可靠连接。指定必见文字的视角会检查阅读面；required_text_reversed表示看到了字的背面，应修改文字在CAD中的阅读方向。
