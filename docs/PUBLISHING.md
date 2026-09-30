# 本地制作与发布规范

## 制作流程

制作简报 -> 固定引擎与模板 -> 占位素材跑通 -> 局部完善 -> 关键路线测试 -> Demo/Full 分离 -> 元信息与素材权利记录 -> 待审核交付。

首个正式模板候选 WebGAL。当前 `public/demo/index.html` 只是自有 smoke test，不是 WebGAL、不是成人游戏成品，也没有云存档。引擎版本必须在模板验收后固定；不在每个作品中重写播放器。

## 交付目录

```text
work-delivery/
  demo.zip
  full.zip
  demo-manifest.json
  full-manifest.json
  store.md
  qa.md
  asset-rights.csv
```

每个 manifest 描述一个独立 edition。schemaVersion=1；entry 是包内相对 HTML 路径；assets 列举所有文件、字节数与 sha256。发布校验和由平台复算，不信任作者自报。参考 `contracts/game-manifest.example.json` 是空文件哈希结构例子，**不是可发行资源**。

`npm run validate:manifest -- PATH` 只校验字段、路径、重复项、大小范围和哈希格式。它不会读取 ZIP、复算文件哈希、证明素材版权、批准引擎版本、检测恶意 JS 或完成内容审核。当前安全限制为草案，验收后调整。

## 服务器接收（待实现）

隔离对象存储 -> ZIP 校验 -> 解压到受限临时目录 -> 对比全部资源和清单 -> 内容审核 -> 生成不可变发布版本 -> 创建 Launch 可用状态。不能接受作者任意 build/install/postinstall 脚本；第一版只接收预构建包。

检查路径穿越、绝对路径、编码绕过、重复大小写、符号链接、解压体积/压缩比、文件数、格式与 MIME、可执行载荷、嵌入追踪脚本、外网请求、服务工作线程和敏感文件。错误回滚清理隔离区，不留下半公开版本。

## Demo/Full 与存档

试玩不能包含未售出完整内容；默认不共享完整清单。购买后重新请求完整启动权限。游戏/引擎/Release/saveVersion 分别记录；场景 ID 稳定。Demo->Full 的迁移、旧存档、新版本回退、移动浏览器清理存储都需实测，不承诺跨引擎通用云存档。

## 发布确认

Skill 只生成本地交付，不默认上传或公开发布。第一阶段运营手动验收；未来 API 也只创建待审核提交。公开状态改变、价格改变和收费范围需要明确授权。源码、模型密钥、聊天历史和未采用素材不能进入发行包。

参考 https://docs.openwebgal.com/en/publish/web/ 、https://agentskills.io/specification 。
