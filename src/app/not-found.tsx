import Link from 'next/link';
export default function NotFound() { return <section className="section empty"><h1>没有找到这个页面</h1><p>作品可能尚未发布，或地址不正确。</p><Link className="button" href="/games">返回游戏库</Link></section>; }
