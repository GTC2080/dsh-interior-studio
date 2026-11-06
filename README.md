# DSH Interior Studio · 设计模式

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的独立设计插件，面向懂自己的空间、却不一定会画 CAD 或操作 Blender 的人。左侧用日常语言讨论需求，右侧核对图纸、查看模型和挑选效果图。适用于室内布置、装潢方案和展位设计。

当前为 **开发预览版**（`0.1.0-dev.37`），面向 Apple Silicon Mac 上的 DSH Web。图纸和效果图供方案沟通与核对，不能作为施工验收依据。

## 从需求到效果图

1. 在 DSH 新建「设计」会话。说明空间用途、已知尺寸和必须保留的条件。可以拖入本地 DXF；不确定的尺寸保留为「待核对」。
2. 在「CAD 图纸」核对平面、立面和剖面。先用草案局部预览检查关键构件，再确认图纸。需要修改构件尺寸或外形时，先更新 CAD。
3. 在「三维建模」检查空间布置和构件，复核通行、朝向、支撑及连接。修改前后的场景有独立版本。
4. 在「效果图」选择视角并出图。Blender 默认生成 1080P 图片，支持多视角图集和分批重渲。可导出 DXF、SVG、GLB、Blend 和 PNG。

侧栏的「设计工程」可以打开、新建、重命名或删除本地工程。

## 在 Mac 上安装开发预览

需要 Apple Silicon Mac、官方 **DSH 0.2.2-rc.1** 的 Web profile，以及 **Node.js ≥24.9.0**、Python 3 和 Git。先确认在终端能运行 `dsh`，且它使用你的目标 DSH 数据目录。

```sh
git clone https://github.com/GTC2080/dsh-interior-studio.git
cd dsh-interior-studio
python3 scripts/prepare-runtime.py
dsh plugin --profile web add "link:$PWD"
```

准备脚本从 Blender 官方发行源下载固定的 4.5.15 LTS，校验 SHA-256 和 macOS 签名，再装配并核对私有 CAD 依赖。若已持有同版本的官方 Apple Silicon App，可以用 `--blender-app /path/to/Blender.app` 复用。第一次装配需要网络与约 1.2 GB 可用磁盘空间；临时下载在装配结束后清理。使用插件时由 DSH 在后台启动私有 Blender。

仓库已包含编译后的前端，安装无需运行 npm 构建。安装后重新启动 DSH Web，新建「设计」会话。链接安装依赖当前源码目录，请保留该目录。卸载命令为 `dsh plugin --profile web remove dsh-interior-studio`，卸载保留用户工程。

## 设计工具与技能

- 设计预设保留 DSH 官方 PTC 能力，并增加设计工具。通过 DSH 原生技能注册表检索并按需加载 [13 个设计技能](skills/)，覆盖需求澄清、几何、空间构成、精细建模、审美、审查和出图。
- 圆角、圆弧、轮廓、偏移与尺寸由几何工具计算，CAD 提交时验证。确认过的 CAD 是构建的基准；构件支撑、动线、固定要求和机位检查绑定具体版本，区分通过、失败和未检查。
- 支持本地 DXF 的直墙、圆弧墙、洞口和闭合房间识别。不能确定的几何需要人工核对。当前不包含 DWG 转换器；Windows、Intel Mac 和 Linux 未提供运行时。

## 工程数据

默认工程保存在用户主目录下的 `DSH Interior Projects`。CAD、版本、模型和效果图由本机保存，删除聊天不会删除工程。设计工具读取已有工程摘要前，需要对当前模型路由授权；导入原件不会被设计工具作为聊天附件发送。PTC 的其他通用工具遵循 DSH 宿主的权限。

## 开发

```sh
npm ci --ignore-scripts
npm run build
npm test
npm run test:cad
```

`test:cad` 和部分模型检查需要先准备私有运行时。需要官方 DSH 源码的宿主测试在独立源码仓库中会标为跳过；未随仓库分发的可选 CAD 样本也会单独标为跳过。图纸测试使用合成数据与有许可的 [FloorPlanner 样本](fixtures/public/sources.json)。

## 许可

插件独立编写的 Host 和 Client 使用 MIT；Blender Worker 使用 GPL-3.0-or-later。技能、素材和随附依赖的许可与归属见 [LICENSE](LICENSE)、[NOTICE](NOTICE) 和 [legal/](legal/)。公开仓库不分发 Blender 应用、Python wheel 或装配后的二进制包。
