import { GameCard } from '@/components/game-card';
import { listGames } from '@/lib/catalog';
export const metadata = { title: '游戏库' };
export default async function GamesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams; const q = typeof params.q === 'string' ? params.q.slice(0, 100) : ''; const genre = typeof params.genre === 'string' ? params.genre : '';
  const results = listGames(q, genre);
  return <section className="section"><span className="eyebrow">EXPLORE</span><h1 className="page-title">发现你的下一段故事</h1><form className="filters" action="/games"><label>搜索作品<input name="q" defaultValue={q} maxLength={100} placeholder="标题、简介或题材"/></label><label>题材<select name="genre" defaultValue={genre}><option value="">全部题材</option>{['悬疑','都市','奇幻'].map(g => <option key={g}>{g}</option>)}</select></label><button className="button" type="submit">筛选</button></form><p className="muted">{results.length} 个示例 · 无真实销量或评分</p><div className="game-grid">{results.map(g => <GameCard key={g.slug} game={g}/>)}</div>{!results.length && <p role="status" className="empty">没有找到匹配作品。请更换关键词。</p>}</section>;
}
