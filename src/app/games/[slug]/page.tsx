import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGame } from '@/lib/catalog';
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return { title: getGame(slug)?.title ?? '作品不存在' }; }
export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const game = getGame(slug); if (!game) notFound();
  return <section className="section"><Link href="/games" className="muted">← 返回游戏库</Link><div className="detail-grid"><div><div className={`cover detail-cover ${game.tone}`} aria-hidden="true"><span className="cover-orbit"/><b>{game.title}</b><small>ORIGINAL SAMPLE / NO COMMERCIAL CONTENT</small></div><h2>关于作品</h2><p className="prose">{game.description}</p><h2>体验说明</h2><p className="prose">框架样板只验证加载与分支按钮，不代表已完成商业游戏。正式作品的引擎版本、存档兼容和设备支持必须逐作测试。</p></div><aside className="detail-aside"><span className="eyebrow">{game.genre} / H5</span><h1>{game.title}</h1><p>{game.tagline}</p><dl><dt>作者</dt><dd>{game.author}</dd><dt>时长</dt><dd>{game.duration}</dd><dt>内容</dt><dd>非露骨演示素材</dd><dt>收费</dt><dd>未开放购买</dd></dl>{game.hasDemo ? <Link className="button wide" href={`/play/${game.slug}`}>开始试玩 ↗</Link> : <button className="button wide" disabled>游戏尚未制作</button>}<button className="button secondary wide" disabled>完整版购买尚未启用</button><small>付款、已购权益和会员服务将在后续验收后开放。</small></aside></div></section>;
}
