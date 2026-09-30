export type Game = {
  slug: string; title: string; tagline: string; description: string;
  genre: string; tone: string; author: string; duration: string;
  status: 'demo' | 'concept'; hasDemo: boolean;
};
// Original, non-explicit fixtures. Not real commercial titles or user metrics.
export const games: readonly Game[] = [
  { slug: 'midnight-letter', title: '午夜来信', tagline: '一封迟到的信，两条不同的路。',
    description: '用于验证网站与 H5 游戏衔接的原创非露骨样板。选择查看来信或前往灯塔，体验两个简短结局。这不是 WebGAL 完整模板。',
    genre: '悬疑', tone: 'mint', author: 'HGAME 示例', duration: '约 1 分钟', status: 'demo', hasDemo: true },
  { slug: 'after-rain', title: '雨后霓虹', tagline: '城市安静下来，故事才刚刚开始。',
    description: '都市题材展示占位，没有游戏包，也没有正在销售的内容。',
    genre: '都市', tone: 'violet', author: 'HGAME 示例', duration: '待制作', status: 'concept', hasDemo: false },
  { slug: 'starlit-island', title: '星屿回声', tagline: '在另一座岛上，寻找自己的答案。',
    description: '奇幻题材展示占位，用于测试分类和作品详情布局。',
    genre: '奇幻', tone: 'amber', author: 'HGAME 示例', duration: '待制作', status: 'concept', hasDemo: false }
];
export function getGame(slug: string): Game | undefined { return games.find(g => g.slug === slug); }
export function listGames(q = '', genre = ''): Game[] {
  const query = q.trim().toLocaleLowerCase();
  return games.filter(g => (!genre || g.genre === genre) && (!query || `${g.title} ${g.tagline} ${g.genre}`.toLocaleLowerCase().includes(query)));
}
