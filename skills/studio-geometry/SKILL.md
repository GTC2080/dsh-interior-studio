---
name: studio-geometry
description: 通用几何算法、圆角与圆弧、复杂轮廓和孔洞检查、等厚偏移、单位换算与尺寸计算；使用studio_geometry生成可提交CAD的米制结果，避免猜测切点、手填密集坐标和放宽几何校验。
---

# 几何计算与 CAD 提交

面向任意室内、展陈和定制构件。用户提供用途、尺寸与造型意图；由助手选择正确的计算方式，不要求用户写坐标、公式或脚本。沿用其已确认的测量与工艺，不擅自改小圆角、板厚或净宽。

## 使用顺序

1. 读取当前 SDK 的 `studio_geometry` 定义。它是纯计算工具，不读工程、不确认需求、不修改场景。已有工程数据仍先经 `studio_context` 的授权与版本检查。
2. 明确单位、坐标系、外缘/中心线、完成面标高，以及实物范围是否包含地台和附件。工具输入可用m/mm/cm；角度用度，所有输出长度均为米。输出再次提交CAD时不重复做毫米换算。
3. 调用需要的运算，在PTC中筛选结果。`valid=false`没有可用几何，读取errors的code/path/message，修正后重算。不要把失败结果当空轮廓继续提交。
4. 将有效的outline/holes或wallArc交给`studio_draw`；CAD入口会再次强制校验闭合、自交、圆角冲突、孔洞和边界。生成不代表客户确认。
5. 将已知总高、组合外包、数量、净通路和连接存入`studio_draw.constraints`。遗漏旧编号不会删除要求；变更已确认要求须在CAD窗口单独接受。用户明确取消条件时，可在constraints.remove按requirements/relations/routes列旧编号；移除也需单独接受，不能靠遗漏来删除。`studio_review`自动复查保存清单，临时少传几项不能获得整案通过。

## 运算与输出

| operation | 输入与用途 | 必须检查 |
| --- | --- | --- |
| fillet | outline逐点[x,y,r]，或统一radius | 相邻圆角、短边、凹角与输出自交；不把二维轮廓圆角当成三维边倒角 |
| arc | center、radius、startDegrees、sweepDegrees，可设tolerance | 正/负转角、首尾点、弧长、arcChordErrorMetres；整圆outline不重复末点 |
| check_profile | outline与holes | 闭合、交叉、重复点、退化、孔洞完全内部；area为扣孔后的平面面积 |
| offset | outline、holes、distance、join | 正distance扩展实物、负值收缩；孔洞反向变化；检查所有profiles与topologyChanged |
| measure | 同维points | 返回端点距离、折线路长、外包；点集范围不自动等于整场尺寸 |

偏移使用随包的Clipper2算法，坐标网格为1微米，圆弧接角目标弦误差0.2mm；结果仍受边界数量与采样预算限制。轮廓分裂时处理全部profiles；孔洞消失、轮廓崩塌或预算超限要明确报告，不静默丢件。

例如输入4000×3000mm轮廓、R400mm，使用operation=fillet、unit=mm、radius=400；有效结果的outline已是米。可以直接作为extrusion的outline，深度和position也按CAD接口使用米。圆角不改变客户给定的外包基准。

整圆的`points`包含重复的末端点，供开放路径的长度/端点计算；CAD闭合轮廓或圆孔直接用`arcResult.outline`。例如孔半径30mm：`JSON.parse(await tools.studio_geometry({operation:'arc',unit:'mm',center:[0,0],radius:30,sweepDegrees:360})).outline`。不要把points作为holes后反复试错。部分圆弧不是闭合区域，曲墙用wallArc；薄弧板需用内外弧围成闭合带，再校验。已有有效结果在本轮工作区复用，不重复调用只为重新打印相同坐标。

## 尺寸与约束

`scope=scene`量所有实物，包括地台、顶部文字、灯具和装饰；`scope=assembly`量完整组合及附件；`scope=keys`只检查列出的对象。`width/depth/height`是世界轴跨度，`local_width/local_depth/local_height`仅用于一个对象的局部尺寸。总高用top_z和max，实体自身高度用height，最小净宽用min或保存的连续routes。

尺寸计算与几何合法性通过后，还需加载空间审查、精细建模和材质出图的适用技能。无碰撞不证明接触，接触不证明固定或承载，数值合法不证明造型美观。

## 文字阅读方向

orientation输入plane（默认xz）、towards（世界方向，指向读者）及可选up；返回reading和米制场景使用的rotationEuler，以及以度为单位的rotation。结果为右手坐标，保持字形左右与上方，不使用负缩放。components.reading可直接给方向让同一算法求解，不能同时指定rotation。平行的阅读方向与上方、零向量会拒绝。
