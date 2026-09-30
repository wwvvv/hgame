# 架构与技术决策

## ADR-001：发行网站与本地制作分离

作者 -> 本地 Skill + WebGAL 候选模板 -> Demo/Full 独立交付 -> 隔离校验与人工审核 -> 发行记录 -> 作品前台 -> 服务端 Launch -> 独立游戏来源。

不把 Codex/Claude 的运行环境搬上服务器；平台也不接收模型密钥。Skill 不自带生成服务，不改变客户端内容限制。

## ADR-002：单体网站、模块隔离

采用 Next.js App Router、React、TypeScript、Tailwind。TouchGal 的相同技术方向方便后续迁移独立组件，但不是完整 fork。当前不引入 HeroUI/Prisma/Redis 等未实际使用的依赖。将来需要迁移某一组件时，连同其必要依赖和授权一起验收。

目录：

```text
src/app/               玩家页面与 Route Handlers
src/components/        展示与交互组件
src/lib/               游戏目录、启动策略与交付契约
contracts/             清单样例（非可发行游戏）
scripts/               本地校验工具
public/demo/           自有技术样板，不能接收上传
skills/h5-game-maker/   本地制作工作流
tests/ e2e/            契约测试与浏览器验收
```

最终业务模块划分为 catalog、identity、billing、entitlements、publishing、launch；先作为单体内部模块，不上微服务或 Kubernetes。API 不借用游戏引擎内部对象作为交易数据。

## ADR-003：业务数据库与资源分离

后续生产使用 PostgreSQL，ORM 优先评估 Prisma。当前没有数据库连接、迁移和持久化实现，静态目录只用于框架演示。绝不把样例数组和 localStorage 当成付费业务数据库。

公开封面/预览可以 CDN；付费清单和资源必须默认私有。业务库只保存元信息、状态、对象键及校验值；不保存任意上传源码。上传包和发布资源不进入本仓库。

## ADR-004：发布不可变

Game 有稳定 ID；Release 有不可变 ID、edition、引擎版本、内容校验与 saveVersion。更新创建新 Release，并由运营切换 active 引用，不原地覆盖。下架同时影响 Launch；泄露链接通过过期/撤销处理。Demo -> Full 不天然兼容存档，需单独测试。

## ADR-005：运行隔离

当前自有烟雾样板在 opaque-origin iframe 下只允许脚本，不允许 same-origin、弹窗、顶层导航、表单或网络请求，因此不支持 localStorage 云存档。

未来上传作品必须由独立游戏来源提供，最好每作品隔离；绝不能共享主站会话 Cookie。只有证明资源来源不同且具备 CSP/网络限制后，才评估 allow-same-origin。签名会话短时、限作品/版本/权限，不能包含主站长期令牌。

## ADR-006：生产闸门

支付、完整包启动和上传执行未实现时固定拒绝，不能仅靠环境变量强开。完成 P1/P2 的身份、内容、支付、权益与存储验收后，才能替换禁用适配器。

参考：Next.js https://nextjs.org/docs/app/getting-started/installation ；独立部署 https://nextjs.org/docs/app/guides/self-hosting ；iframe https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe 。
