import Link from 'next/link';
export const metadata = { title: '我的游戏' };
export default function LibraryPage() { return <section className="section empty"><span className="eyebrow">YOUR LIBRARY</span><h1>你的故事，将从这里继续。</h1><p>账号、已购权益和继续游玩尚未接入。本页面不伪造用户或订单。</p><Link className="button" href="/games">先探索示例作品 →</Link></section>; }
