# UI 与现成代码复用计划

## 信息架构

发现 / 游戏库 / 创作者 / 我的。作品卡片 -> 详情 -> 试玩/完整启动。创作者页是 Skill 使用与提交说明，不是在线编辑器。电脑端内容网格；手机端大触控目标和单列详情。页面必须有空结果、缺失作品、不可购买、加载失败和未接通账户状态。

视觉方向参考 TapTap 的作品优先布局，但使用 HGAME 自有标识。非露骨抽象占位封面由 CSS 绘制，没有下载第三方人物素材。不得添加假的评分、销量、促销倒计时或会员权益。

## 迁移边界

| 候选 | 路径 | 处理 |
|---|---|---|
| TouchGal | `components/galgame/Card.tsx` | 优先候选；已有 HeroUI、图标和工具函数依赖；先将 GalgameCard 输入映射成自有展示 DTO |
| TouchGal | `components/galgame/FilterBar.tsx` / `AdvancedFilterPanel.tsx` | 只保留题材、语言、网页设备与作品状态，去掉不相关下载筛选 |
| TouchGal | `components/patch/header/` / `app/[id]/page.tsx` | 迁移展示，不直接复用下载权限为购买权限 |
| lee-fx/taptap-app | 首页、游戏详情、移动导航 | uni-app 代码不能直接作为 React 组件；优先借布局，不移植账号/聊天/红包 |

**本次实际状态：独立薄层骨架 + 参考学习，尚未移植以上上游实现。** 不是将多个完整项目拼成一套产品。后续逐组件比较“迁移和解除耦合”与“保留当前简化组件”的工作量。

## UI 验收

桌面 1440 与手机 390/360 宽度无横向溢出；键盘可到达全部功能；焦点可见；对比度与 reduced-motion 保留。搜索状态使用 URL，刷新可恢复。独立详情元数据，初期默认 noindex，正式审核上线再允许收录。公开封面分级、年龄核验和会员权益分别处理。

源码参考 https://github.com/KunMoe/kun-touchgal-next 、https://github.com/lee-fx/taptap-app 。授权和文件来源记录见根目录 THIRD_PARTY_NOTICES。
