import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGame } from '@/lib/catalog';
import { DemoPlayer } from '@/components/demo-player';
export default async function PlayPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const game = getGame(slug); if (!game || !game.hasDemo) notFound(); return <section className="section"><Link href={`/games/${slug}`} className="muted">← 返回作品详情</Link><h1>{game.title}</h1><DemoPlayer gameId={slug}/><p className="muted">只验证发布网站与 iframe 启动，不代表正式引擎已集成。当前样板不支持云存档。</p></section>; }
