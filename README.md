# DSH Interior Studio · 设计模式

[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 的独立设计插件，面向懂自己的空间、却不一定会画 CAD 或操作 Blender 的人。左侧用日常语言讨论需求，右侧核对图纸、查看模型和挑选效果图。适用于室内布置、装潢方案和展位设计。

当前为 **开发预览版**（`0.1.0-dev.38`），面向 Apple Silicon Mac 上的 DSH Web。图纸和效果图供方案沟通与核对，不能作为施工验收依据。

## 从需求到效果图

1. 在 DSH 新建「设计」会话。说明空间用途、已知尺寸和必须保留的条件。可以拖入本地 DXF；不确定的尺寸保留为「待核对」。
2. 在「CAD 图纸」核对平面、立面和剖面。先用草案局部预览检查关键构件，再确认图纸。需要修改构件尺寸或外形时，先更新 CAD。
3. 在「三维建模」检查空间布置和构件，复核通行、朝向、支撑及连接。修改前后的场景有独立版本。
4. 在「效果图」选择视角并出图。Blender 默认生成 1080P 图片，支持多视角图集和分批重渲。可导出 DXF、SVG、GLB、Blend 和 PNG。

侧栏的「设计工程」可以打开、新建、重命名或删除本地工程。

## 在 Mac 上安装开发预览

需要 Apple Silicon Mac 和 **DeepSeek Harness 0.2.2-rc.1** 的 Web profile。

在 DSH 的「插件管理」选择安装，将 [Mac 安装包](https://github.com/GTC2080/dsh-interior-studio/releases/download/v0.1.0-dev.38/dsh-interior-studio-0.1.0-dev.38-macos-arm64.tgz) 的链接粘贴到安装框并确认。重启 DSH Web 后新建「设计」会话。也可以先下载该文件，再在安装框填写其本机绝对路径。

**这个包自带官方 Blender 4.5.15 LTS 和 DXF 依赖。** Blender 随插件存放，由 DSH 在后台启动。无需额外下载或安装 Blender、Python，也无需运行源码准备脚本。包内包含基础材质，可用参数构件建模或导入自己的资源。旧工程若使用了可选家具或贴图，需要本机仍有相应素材。

命令行也可安装已下载的包：`dsh plugin --profile web add /absolute/path/to/dsh-interior-studio-0.1.0-dev.38-macos-arm64.tgz`。从 DSH 移除插件时，本地工程保留。

[发行说明与校验值](https://github.com/GTC2080/dsh-interior-studio/releases/tag/v0.1.0-dev.38) · [Blender 对应源码](legal/BLENDER-SOURCE.md)

## 设计工具与技能

- 设计预设保留 DSH 官方 PTC 能力，并增加设计工具。通过 DSH 原生技能注册表检索并按需加载 [13 个设计技能](skills/)，覆盖需求澄清、几何、空间构成、精细建模、审美、审查和出图。
- 圆角、圆弧、轮廓、偏移与尺寸由几何工具计算，CAD 提交时验证。确认过的 CAD 是构建的基准；构件支撑、动线、固定要求和机位检查绑定具体版本，区分通过、失败和未检查。
- 支持本地 DXF 的直墙、圆弧墙、洞口和闭合房间识别。不能确定的几何需要人工核对。当前不包含 DWG 转换器；Windows、Intel Mac 和 Linux 未提供运行时。

## 工程数据

默认工程保存在用户主目录下的 `DSH Interior Projects`。CAD、版本、模型和效果图由本机保存，删除聊天不会删除工程。设计工具读取已有工程摘要前，需要对当前模型路由授权；导入原件不会被设计工具作为聊天附件发送。PTC 的其他通用工具遵循 DSH 宿主的权限。

## 从源码开发

```sh
git clone https://github.com/GTC2080/dsh-interior-studio.git
cd dsh-interior-studio
npm ci --ignore-scripts
npm run build
python3 scripts/prepare-runtime.py --core-only
dsh plugin --profile web add "link:$PWD"
```

如需本地可选素材库，可省略 `--core-only`。已持有同版本官方 Blender App、完整素材目录或 [Kenney 官方 ZIP](https://kenney.nl/assets/furniture-kit) 时，可以用准备脚本的 `--blender-app`、`--assets-dir` 或 `--furniture-zip` 复用。公开 Git 源码树只保留插件本体；家具模型、缩略图、贴图、测试、样本和工程文件不随安装包发布。

## 许可

插件独立编写的 Host 和 Client 使用 MIT；Blender Worker 使用 GPL-3.0-or-later。技能和依赖的许可与归属见 [LICENSE](LICENSE)、[NOTICE](NOTICE) 和 [legal/](legal/)。
