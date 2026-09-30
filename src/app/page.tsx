import Link from 'next/link';
import { GameCard } from '@/components/game-card';
import { games } from '@/lib/catalog';
export default function HomePage() { return <>
  <section className="hero"><div className="hero-copy"><span className="eyebrow">DISCOVER YOUR NEXT STORY</span><h1>选择一段故事。<br/><em>走进另一种可能。</em></h1><p>不必下载，不必等待。发现独立创作者的互动作品，从一次选择开始。</p><div className="actions"><Link className="button" href="/play/midnight-letter">体验技术样板 ↗</Link><Link className="button secondary" href="/creators">了解创作方式</Link></div><small>当前为框架预览，不含在售作品。</small></div><div className="hero-art" aria-hidden="true"><div className="art-ring"/><span>01 / MIDNIGHT</span><b>午夜<br/>来信</b><p>A LETTER. TWO PATHS.</p></div></section>
  <section className="section"><div className="section-title"><div><span className="eyebrow">CURATED STORIES</span><h2>从这里开始</h2></div><Link href="/games">浏览全部 →</Link></div><div className="game-grid">{games.map(game => <GameCard key={game.slug} game={game}/>)}</div></section>
  <section className="creator-callout"><div><span className="eyebrow">MADE LOCALLY. PLAYED EVERYWHERE.</span><h2>把灵感留给创作，把发行交给平台。</h2><p>使用本地 Skill 和标准模板，完成游戏后提交经过检查的发行包。</p></div><Link className="button secondary" href="/creators">查看制作流程 →</Link></section>
</>; }
