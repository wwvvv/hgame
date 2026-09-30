# 开发、验证与部署

## 环境与启动

Node 22.16+、npm。直依赖固定 Next 16.3.0 / React 19.2.8 / TypeScript 5.9.2 / Tailwind 4.1.12，不声称为今日最新版本或已经通过生产漏洞审计。

本地：`npm install` -> `npm test` -> `npm run typecheck` -> `npm run dev`。不需要数据库或真实密钥。技术样例为非露骨原创内容，不从外部加载商业游戏。

## 校验顺序

1. `npm test`：Node 自带测试 + TypeScript strip-types，不依赖 npm 安装即可测试核心契约。
2. `npm run validate:manifest -- contracts/game-manifest.example.json`：只校验结构，不批准发行。
3. `npm run typecheck`：完整项目类型检查。
4. `npm run build`：Next webpack 构建。
5. `npx playwright install chromium && npm run test:e2e`：桌面/手机、搜索、两分支、未知作品及付费接口拒绝。

截图在 test-results；CI 作为 artifact 保留。禁止提交真实日志、node_modules 或缓存。

## 依赖锁

首次受控联网安装生成、审查并提交 package-lock.json，之后统一 `npm ci`。没有 lock 时 CI/Docker 明确使用 npm install 仅作初始化验证，不等于可复现生产构建。正式发布必须冻结锁、审查依赖、固定镜像与 Actions 引用。

## GitHub 验证

工作流对 main 推送、PR 和手动事件执行检查。功能分支仅通过 PR 触发，避免同一改动重复运行。权限只读，不自动提交锁、不部署、不收费。Actions 受网络/配额/策略影响时记录实际结果，不伪造通过。

## Docker

`docker compose build` / `docker compose up -d`。standalone 输出、非 root、宿主机仅绑定 127.0.0.1:3000。公网需要另外配置反向代理和 HTTPS；本轮没有部署。

镜像仍是框架预览，无生产数据库、上传空间或交易。按 ROADMAP 完成身份、审核、存储、支付、内容及年龄策略后才可运营。

## 继续开发

先读 AGENTS、STATUS、ROADMAP；无强需求不增加 Redis、消息队列、在线多 Agent、微服务或第二套 UI。付费/上传边界优先于榜单、社区和动效。新增功能同步 API、DATA_MODEL 和 STATUS。

参考：https://nextjs.org/docs/app/getting-started/installation 、https://nextjs.org/docs/app/guides/self-hosting 。
