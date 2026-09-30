'use client';
import { useRef, useState } from 'react';
export function DemoPlayer({ gameId }: { gameId: string }) {
  const frame = useRef<HTMLIFrameElement>(null); const [src,setSrc] = useState<string>(); const [busy,setBusy] = useState(false); const [error,setError] = useState('');
  async function launch() { setBusy(true); setError(''); try {
    const response = await fetch('/api/launch', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ gameId, edition:'demo' }) });
    const data = await response.json();
    if (!response.ok || data.src !== '/demo/index.html') throw new Error('当前试玩不可用');
    setSrc(data.src);
  } catch { setError('试玩加载失败，请重试。'); } finally { setBusy(false); } }
  async function fullscreen() { try { if (frame.current?.requestFullscreen) await frame.current.requestFullscreen(); else setError('此浏览器不支持全屏，请横屏游玩。'); } catch { setError('浏览器未允许全屏。'); } }
  return <><div className="player-toolbar"><span>技术样板 · 不保存个人数据</span><button className="button secondary" disabled={!src} onClick={fullscreen}>全屏</button></div><div className="player-stage">{src ? <iframe ref={frame} title="H5 技术试玩" src={src} sandbox="allow-scripts" allow="fullscreen" referrerPolicy="no-referrer"/> : <div className="empty"><h2>准备进入故事</h2><p>当前加载的是自有非露骨样板，不执行上传的第三方代码。</p><button className="button" onClick={launch} disabled={busy}>{busy ? '加载中…' : '载入试玩'}</button></div>}</div>{error && <p role="alert">{error}</p>}</>;
}
