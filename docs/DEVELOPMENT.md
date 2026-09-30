# 开发、验证与部署

## 环境

Node 22.16+、npm。当前锁定直依赖 Next 16.3.0 / React 19.2.8 / TypeScript 5.9.2 / Tailwind 4.1.12。选定版本用于骨架，不声称它们是今天的最新版本，也不声称已完成生产漏洞审计。

本地初始化：`npm install` -> `npm test` -> `npm run typecheck` -> `npm run dev`。不需要数据库或任何真实密钥。测试使用非露骨示例，不从外部加载商业游戏。

## 校验顺序

1. `npm test`：Node 自带测试 + TypeScript strip-types，无需 npm 安装即可测试核心契约。
2. `npm run validate:manifest -- contracts/game-manifest.example.json`：结构校验，不是发行许可。
3. `npm run typecheck`：完整 TypeScript 编译检查。
4. `npm run build`：Next webpack 构建，避免把项目成功等同于只有语法无误。
5. `npx playwright install chromium && npm run test:e2e`：桌面/手机页面、筛选、试玩两分支、未知作品、付费接口拒绝。

浏览器测试截图在 test-results，CI 作为 artifact 保留。不要提交缓存、真实日志和 node_modules。

## 锁文件

当前环境可能不能访问 npm。首次受控联网安装应生成并审查 package-lock.json，记录审计结果，提交后统一 `npm ci`。没有 lock 时 CI/Docker 明确使用 npm install 仅作初始化验证；这不等于可复现生产构建。正式发布必须有锁文件并固定镜像/Actions 引用。

## GitHub 工作流

.github/workflows/ci.yml 对 main、feat 分支和 PR 执行类型、契约、构建、浏览器检查，并保存报告与安装锁。权限只读，不自动推送锁、不自动部署、不触发收费。仓库 Actions 若未启用/无额度/被组织政策阻止，记录真实状态后在授权环境运行，不能写“CI 通过”。

## Docker

`docker compose build` / `docker compose up -d` 使用 standalone 输出，非 root 运行，宿主机只绑定 127.0.0.1:3000。还需要明确配置反向代理与 HTTPS 才能对外开放。此镜像仅用于框架预览；没有生产数据库、上传空间或交易功能。

## 继续开发

严格按 ROADMAP。没有强需求不增加 Redis、消息队列、图数据库、在线多 Agent、微服务和第二套 UI 框架。实测付费与上传边界优先于榜单、社区和动效。新增功能同步修改 API、DATA_MODEL 和 STATUS。

参考：Next 安装 https://nextjs.org/docs/app/getting-started/installation ；部署 https://nextjs.org/docs/app/guides/self-hosting 。
