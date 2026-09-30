# 来源与复用记录

截至本次初始化，业务组件为独立框架实现，没有直接复制 TouchGal、TapTap 仿站、SparkArc 或用户旧项目的源码，没有使用其 Logo、游戏素材或品牌资产。

## 参考源

| 来源 | 核对对象 | 本轮用法 |
|---|---|---|
| https://github.com/KunMoe/kun-touchgal-next | `components/galgame/Card.tsx`，blob `89ce84ab49a78a69c8801422ee01198a512931a7`；列表与详情结构 | 技术和组件拆分参考，未复制实现 |
| https://github.com/lee-fx/taptap-app | `pages.json`、首页/详情目录 | 移动端信息结构候选，未复制实现 |
| https://github.com/OpenWebGAL/WebGAL | 引擎与网页发布说明 | 正式制作模板候选，本仓库不含引擎二进制 |
| https://agentskills.io/specification | Skill 元数据与目录格式 | 自有 Skill 文档格式 |

用户负责获取业务需要的作者授权。实际移植时必须另外登记源文件、不可变提交、作者许可范围和第三方依赖；作者授权不能被推定覆盖其他依赖、字体或品牌素材。本文件不是对任何上游许可证的豁免。

依赖包各自遵循发布时许可证。本仓库没有擅自替用户确定整个商业项目的公开授权许可证。
