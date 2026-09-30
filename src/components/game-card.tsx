import Link from 'next/link';
import type { Game } from '@/lib/catalog';
// Original scaffold component; TouchGal is a documented reference, not vendored here.
export function GameCard({ game }: { game: Game }) {
  return <article className="game-card"><Link href={`/games/${game.slug}`} className="card-link">
    <div className={`cover ${game.tone}`} aria-hidden="true"><span className="cover-orbit"/><b>{game.title}</b><small>HGAME ORIGINAL SAMPLE</small></div>
    <div className="card-body"><div className="eyebrow">{game.genre} <span>{game.hasDemo ? '可试玩 · 技术样板' : '概念展示'}</span></div><h3>{game.title}</h3><p>{game.tagline}</p><div className="card-foot"><span>{game.duration}</span><strong>{game.hasDemo ? '免费试玩 ↗' : '查看介绍 ↗'}</strong></div></div>
  </Link></article>;
}
