# HGAME

成人向 H5 游戏发行项目：前台参考 TapTap 的作品浏览方式，内容结构参考 TouchGal；游戏由作者通过本地 Skill 和模板制作，平台负责审核、试玩与销售。仓库示例均为非露骨原创占位内容。

> **当前版本：v0.1 框架骨架，不是可收费上线的完整平台。** 已有首页、作品列表/筛选、详情、可信 H5 技术样板、接口边界、清单校验和测试。账号、数据库、真实支付、年龄核验、上传审核和商业游戏托管尚未实现，相关访问默认拒绝。

## 启动

Node.js 22.16+（建议 Node 22），npm。

```bash
npm install
npm test
npm run validate:manifest -- contracts/game-manifest.example.json
npm run typecheck
npm run dev
```

打开 `http://localhost:3000`。生产构建：`npm run build && npm start`。浏览器测试：先构建，然后 `npx playwright install chromium && npm run test:e2e`。

当前直依赖固定版本；联网安装会产生 `package-lock.json`。**在完成联网验证并提交 lockfile 前，不视为可复现发行基线。** CI 会保留安装生成的 lockfile 和浏览器报告供核验，不自动修改仓库。

## 技术基线

Next.js App Router / React / TypeScript / Tailwind CSS；单体网站，H5 游戏运行与制作工具解耦。后续数据库选 PostgreSQL，ORM 候选 Prisma；本次未安装数据库依赖或提供虚假持久化。HeroUI 等 TouchGal 依赖按实际组件迁移增加，不整站引入论坛、聊天、Redis、搜索集群或在线 Agent 工作台。

## 路由

| 路由 | 本次状态 |
|---|---|
| `/` | 作品优先首页，原创图形占位，无虚假销量评分 |
| `/games?q=&genre=` | 服务端搜索与题材筛选 |
| `/games/[slug]` | 详情、试玩入口、未开放购买说明 |
| `/play/midnight-letter` | 可信非露骨技术样板，两段短结局 |
| `/creators` | 本地制作与投稿流程 |
| `/library` | 明确标记未接通的账号/已购页面 |
| `/api/health` | 框架状态，不冒充数据库健康检查 |
| `POST /api/launch` | 只启动内置演示；完整访问返回 503 |
| `POST /api/orders` | 固定返回 503，不创建演示订单 |

## 开发文档

- [产品与商业基线](docs/PRODUCT.md)
- [架构与技术决策](docs/ARCHITECTURE.md)
- [界面与源码复用计划](docs/UI_AND_REUSE.md)
- [数据模型草案](docs/DATA_MODEL.md)
- [API 与授权边界](docs/API.md)
- [游戏制作、提交与发布规范](docs/PUBLISHING.md)
- [安全、内容与上线清单](docs/SECURITY.md)
- [开发、测试与部署](docs/DEVELOPMENT.md)
- [任务拆解与验收](docs/ROADMAP.md)
- [本次交付与验证状态](docs/STATUS.md)
- [本地制作 Skill](skills/h5-game-maker/SKILL.md)
- [代码来源记录](THIRD_PARTY_NOTICES.md)

**不要把这个仓库当成 TouchGal 的完整 fork。** 本轮建立相同技术方向的独立薄层框架和迁移边界，尚未移植上游业务实现；详细候选文件与依赖见复用计划。没有修改或引用用户其他项目的私有源码，也没有部署线上服务。
