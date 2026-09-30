# 数据模型草案（尚未落库）

数据库候选 PostgreSQL / Prisma。下面是实现契约，不是已经存在的表；先完成账号选型，再编写迁移和事务集成测试。

| 实体 | 核心字段 | 约束 |
|---|---|---|
| User | id, providerSubject, status, createdAt | 身份提供方唯一；停用立即阻止新授权；不自行明文存密码 |
| Game | id, slug, title, authorId, status, contentRating | slug 唯一；draft/review/published/suspended；展示与资源分开 |
| Release | id, gameId, edition, engine, engineVersion, saveVersion, manifestKey, checksum, status | 版本不可变；demo/full 分开；对象路径不对前台公开 |
| Listing | gameId, demoReleaseId, fullReleaseId, priceMinor, currency | 价格最小货币单位整数；可售版本必须属于同一 Game |
| Order | id, userId, gameId, fullReleaseScope, priceMinor, currency, status, providerRef | 服务端计价；providerRef 唯一；pending/paid/refunded/failed |
| PaymentEvent | provider, eventId, orderId, payloadDigest, processedAt | (provider,eventId) 唯一；验签后事务处理，重放不能重复发权益 |
| Entitlement | id, userId, gameId, sourceOrderId, state, expiresAt | sourceOrderId 唯一；active/revoked；会员与购买独立来源 |
| Submission | id, gameId, ownerId, quarantineKey, scanState, reviewState | 作者只可访问自己的提交；审核后才能关联 Release |
| AgeDecision | userId, provider, assertionId, policyVersion, expiresAt | 尽量只保存核验结果，不保存证件原件 |
| Bookmark | userId, gameId, createdAt | 联合唯一；不代表购买 |

## 必须独立测试的事务

1. 订单创建：客户端提交 gameId，服务端取当前价格与购买范围，生成不变订单快照。
2. 回调：校验提供方签名、订单归属、金额、币种、状态；事件插入、订单转换、权益创建在事务内。
3. 重复事件：唯一冲突视为已处理，不能再次授予；异步事件乱序有明确策略。
4. 退款/争议：记录事件并撤销适用授权，不能只删除订单；保留必要审计。
5. Launch：身份、年龄/地区、作品状态、Release 状态、Entitlement 联合校验；不能只查缓存的 paid=true。

银行/税务/支付供应商记录不进入公开 GitHub。金额不使用浮点。价格和收入分成不写死在 UI。数据保留周期与删除策略在目标市场确认后实施。
