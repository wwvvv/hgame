import { resolveLaunch } from '@/lib/launch';
export async function POST(request: Request) {
  let input: unknown; try { const text = await request.text(); if (text.length > 2048) return Response.json({ error:'REQUEST_TOO_LARGE' },{ status:413 }); input=JSON.parse(text); } catch { return Response.json({ error:'INVALID_JSON' },{ status:400 }); }
  const result=resolveLaunch(input);
  return Response.json(result.body,{ status:result.status, headers:{ 'Cache-Control':'no-store' } });
}
