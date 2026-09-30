import { getGame } from './catalog.ts';
export type LaunchResult = { status: number; body: { error?: string; src?: string; mode?: string } };
export function resolveLaunch(input: unknown): LaunchResult {
  if (!input || typeof input !== 'object') return { status: 400, body: { error: 'INVALID_REQUEST' } };
  const { gameId, edition } = input as Record<string, unknown>;
  if (typeof gameId !== 'string' || typeof edition !== 'string' || !['demo', 'full'].includes(edition)) return { status: 400, body: { error: 'INVALID_REQUEST' } };
  const game = getGame(gameId);
  if (!game) return { status: 404, body: { error: 'GAME_NOT_FOUND' } };
  // Fail closed: a client-supplied paid flag, cookie, or query cannot grant access.
  if (edition === 'full') return { status: 503, body: { error: 'COMMERCE_NOT_CONFIGURED' } };
  if (!game.hasDemo) return { status: 404, body: { error: 'DEMO_NOT_AVAILABLE' } };
  return { status: 200, body: { src: '/demo/index.html', mode: 'trusted-smoke-demo' } };
}
