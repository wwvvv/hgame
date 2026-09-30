# 制作工作流与交付

## 留在工程中的资料

brief.md（范围）、characters.md（角色）、changes.md（修改记录）、qa.md（实际测试）、asset-rights.csv（path/source/license/authorization）。未采用的素材和聊天记录不打入发行包。

## 必测

开始到结尾、两个分支、缺失资源、BGM/语音操作、移动触控、存读档、刷新、旧版本存档、Demo->Full 的可行性与限制。没有执行的项目标注未验证。

## 交付

独立 demo.zip 和 full.zip；各自 manifest；store.md（简介/截图/语言/设备/购买范围/内容分级）；qa.md；asset-rights.csv。

manifest 样例与平台校验程序在 HGAME 仓库 contracts/、scripts/。模板发行版本必须固定；不使用 0.0.0-example 作为正式引擎版本。对象存储签名和发布状态由平台产生，不由作者生成。

## 客户端安装

将整个 h5-game-maker 目录安装到所用客户端官方支持的 skills 目录；保留 references 相对路径。通用格式见 https://agentskills.io/specification 。客户端安装目录以该客户端当前官方说明为准，不把 Skill 格式等同于所有客户端的自动安装协议。
