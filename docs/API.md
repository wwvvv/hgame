# API 契约 v0.1

## 已实现

### GET /api/health

200: `{ "status":"ok", "mode":"scaffold", "commerce":"disabled", "untrustedUploads":"disabled" }`。仅检查应用路由，不宣称外部依赖已健康。

### POST /api/launch

JSON: `{ "gameId":"midnight-letter", "edition":"demo" }`。

只有内置样板返回 200 和固定 `/demo/index.html`，不接受客户端提供任意 URL。无效 JSON/结构 400；未知作品或无试玩 404；完整访问 503 `COMMERCE_NOT_CONFIGURED`；响应 no-store。请求体 2 KiB 应用限制发生在读取后，生产反向代理还须设置传输体积上限。

### POST /api/orders

当前总是 503 `COMMERCE_NOT_CONFIGURED`，不创建订单、不读信用卡、不模拟支付成功。

## 计划实现（尚不存在）

`GET /api/games`：仅 published/approved；分页游标；返回公开 DTO。
`POST /api/orders`：需会话和 CSRF/Origin 防护；只接收 gameId、幂等键，价格/币种以服务端为准。
`POST /api/payments/:provider/webhook`：验证原始 body 签名、事件唯一键、金额/币种；持久化幂等。
`GET /api/library`：需身份，只返回自己的权益与收藏。
`POST /api/submissions`：需作者身份，返回隔离上传许可，不能直接发布。
`POST /api/admin/releases/:id/publish`：需管理员权限、通过的安全/内容审核和明确确认。

## 未来 Launch 返回

应返回受限的游戏来源 URL、短时会话期限和必要启动配置，不返回存储长期密钥或主站登录令牌。完整版所有资源路径必须受会话约束，不能只保护 index.html。

状态建议：未登录 401、无权益/年龄/地区不允许 403、不可用作品 404、请求冲突 409、限流 429、未配置服务 503。对未知/未授权资源是否统一 404 由防枚举策略决定。未知错误不能用演示用户或付费成功兜底。
