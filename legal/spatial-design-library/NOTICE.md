# 空间设计与建模参考的来源

本目录保留选择性改编内容的许可证与版权。`sources.json` 固定所读提交、文件及上游 Git blob；正文改写为 DSH Interior Studio 的中文按需技能，不代表上游作者认可本插件。

| 来源与作者 | 使用内容 | 本插件落点与许可 |
| --- | --- | --- |
| [wuciyouci/interior-design-skill](https://github.com/wuciyouci/interior-design-skill) — wuciyouci | 风格、材料与灯光联合组织、搭配一致性 | studio-interior-style 及其参考；MIT，原文见 interior-design-MIT.txt |
| [gujun1502/arch-skills](https://github.com/gujun1502/arch-skills) — Gu Jun / arch-skills.com | 设计意图到空间手法、意向板锚定及跨轮问题记录 | studio-design-concept 及 concept-and-moodboard.md；[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)，原声明见 arch-skills-LICENSE.txt |
| [Abhinavbwj/Skills-Architects](https://github.com/Abhinavbwj/Skills-Architects) — Abhinav Bhardwaj | 比例、均衡、节奏、主次、统一及案例提取方法 | studio-spatial-composition 及其参考；MIT，原文见 Skills-Architects-MIT.txt |
| [sixtysevenlf/dsh-skill-blender-modeling](https://github.com/sixtysevenlf/dsh-skill-blender-modeling) — sixtyseven67 | 形体制作路线、修改器求值、多视图比例与装配证据 | studio-detail-modeling 新增两份参考；MIT，原许可和 NOTICE 随附 |

建模技能的上游 RobLe3/cc-blender-skill、arjun988/blender-skills 的版权与 MIT 许可同样保留。没有复制它们的插件或可执行程序。

## 修改范围

- 按当前问题拆分入口和参考，连接现有原生检索与 skill 工具；不将上游长篇正文塞进系统提示词。
- 去除资管办公专用概念、固定弧线/比例、材料数量上限与未经独立核实的市场排名。保留客户风格选择，不把参考配方当规范。
- 去除把模型自评分上涨当作效果证明的判断；比较实际稿、CAD、模型与当前渲染，保留未知项与用户判断。
- 建模方法改接随包 Blender 4.5 与 CAD 草案/确认/审查接口，不提供或调用 blender_rt_*、shape_*、generator_* 等外部专用工具，不引入上游 Windows、GUI、持久内核或多 Agent 执行要求。
- 不照搬“照片必须先校正”、所有模型必须一体连通、通用修改器顺序或搭接阈值。求值、标定与碰撞的适用条件明确保留。
- 不收录参考照片、字体、案例资产、图纸、完整教材或外部生图服务，不在客户运行时下载资料。

## 独立编写与排除内容

studio-realism 按本插件既有 CAD、真实网格审查、材料与渲染接口独立编写。它用于定位问题，技术通过不证明审美或结构承载。

[zwl0520/codex-blender-skill](https://github.com/zwl0520/codex-blender-skill/blob/main/RIGHTS.md) 的原文、脚本、模型、图像和案例没有复制或再分发；作者的公开权利声明未授予原创内容开源许可，未将其标为 MIT。
