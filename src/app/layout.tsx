import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
export const metadata: Metadata = { title: { default: 'HGAME · 互动故事', template: '%s · HGAME' }, description: '本地创作，网页即玩。H5 游戏发行框架。', robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>
    <a className="skip" href="#main">跳到主要内容</a>
    <header className="header"><div className="shell nav"><Link href="/" className="brand">H<span>GAME</span><small>STORIES / PLAY</small></Link><nav aria-label="主导航"><Link href="/">发现</Link><Link href="/games">游戏库</Link><Link href="/creators">创作者</Link><Link href="/library">我的</Link></nav><span className="badge">开发预览</span></div></header>
    <main id="main" className="shell">{children}</main>
    <footer className="shell footer"><span>HGAME / 本地创作 · 网页即玩</span><p>本版本仅含非露骨示例。真实账号、收款、年龄核验与付费游戏访问尚未启用。</p><Link href="https://github.com/wwvvv/hgame">源码与开发文档 ↗</Link></footer>
  </body></html>;
}
