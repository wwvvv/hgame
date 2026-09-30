import { test, expect } from '@playwright/test';
test('browse, filter, load demo, take a branch',async({page})=>{
  await page.goto('/'); await expect(page.getByRole('heading',{level:1})).toContainText('选择一段故事');
  await page.screenshot({path:'test-results/home-desktop.png',fullPage:true});
  await page.goto('/games?q=不存在'); await expect(page.getByRole('status')).toContainText('没有找到');
  await page.goto('/play/midnight-letter'); await page.getByRole('button',{name:'载入试玩'}).click();
  const frame=page.frameLocator('iframe'); await frame.getByRole('button',{name:'打开来信'}).click(); await expect(frame.locator('#story')).toContainText('结局 A');
  await frame.getByRole('button',{name:'重新开始'}).click(); await frame.getByRole('button',{name:'前往灯塔'}).click(); await expect(frame.locator('#story')).toContainText('结局 B');
});
test('mobile layout and commerce fail closed',async({page,request})=>{
  await page.setViewportSize({width:390,height:844}); await page.goto('/');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
  await page.screenshot({path:'test-results/home-mobile.png',fullPage:true});
  expect((await request.post('/api/launch',{data:{gameId:'midnight-letter',edition:'full',paid:true}})).status()).toBe(503);
  expect((await request.post('/api/orders',{data:{amount:1}})).status()).toBe(503);
  expect((await request.get('/games/missing-title')).status()).toBe(404);
});
