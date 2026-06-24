import { chromium } from 'playwright';

const CI_SESSION = 'f75ce1f81146a5ea628b0c0d112c79de';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
await context.addCookies([{
  name: 'ci_session', value: CI_SESSION,
  domain: 'rise.fairsketch.com', path: '/',
  httpOnly: true, secure: true, sameSite: 'Lax',
}]);

// --- Clients ---
let page = await context.newPage();
await page.goto('https://rise.fairsketch.com/clients');
await page.waitForLoadState('networkidle');
await page.waitForTimeout(2000);

console.log('=== CLIENTS PAGE ===');
// Click "Clients" tab first
const clientsTab = page.locator('a:has-text("Clients")').first();
if (await clientsTab.isVisible()) {
  await clientsTab.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  console.log('URL after tab:', page.url());
  
  const table = await page.$$eval('table', els =>
    els.map(el => ({
      id: el.id,
      headers: Array.from(el.querySelectorAll('th')).map(th => th.textContent?.trim()).filter(Boolean),
      rows: el.querySelectorAll('tbody tr').length,
    }))
  );
  console.log('TABLE:', JSON.stringify(table, null, 2));
}

// Add client
const addClientBtn = page.locator('a.add-btn, a[data-title="Add client"]').last();
console.log('Add client visible:', await addClientBtn.isVisible());
await addClientBtn.click();
await page.waitForTimeout(3000);

let modal = await page.evaluate(() => {
  const m = document.querySelector('#ajaxModal');
  if (!m) return null;
  const title = m.querySelector('.modal-title')?.textContent?.trim();
  const inputs = Array.from(m.querySelectorAll('input:not([type="hidden"]), select:not([style*="display: none"]), textarea')).map(inp => {
    const fg = inp.closest('.form-group, .clearfix');
    const label = fg ? fg.querySelector('label') : null;
    return {
      tag: inp.tagName, type: inp.type, name: inp.name, id: inp.id,
      placeholder: inp.placeholder, label: label?.textContent?.trim() || '',
      required: inp.hasAttribute('data-rule-required') || inp.required,
    };
  }).filter(i => !i.id.startsWith('s2id_autogen'));
  return { title, inputs };
});
console.log('ADD CLIENT MODAL:', JSON.stringify(modal, null, 2));
await page.close();

// --- Tasks ---
page = await context.newPage();
await page.goto('https://rise.fairsketch.com/tasks/all_tasks');
await page.waitForLoadState('networkidle');
await page.waitForTimeout(2000);

console.log('\n=== TASKS PAGE ===');
const addTaskBtn = page.locator('.title-button-group a[data-title="Add task"]');
console.log('Add task visible:', await addTaskBtn.isVisible());
await addTaskBtn.click();
await page.waitForTimeout(3000);

modal = await page.evaluate(() => {
  const m = document.querySelector('#ajaxModal');
  if (!m) return null;
  const title = m.querySelector('.modal-title')?.textContent?.trim();
  const inputs = Array.from(m.querySelectorAll('input:not([type="hidden"]), select:not([style*="display: none"]), textarea')).map(inp => {
    const fg = inp.closest('.form-group, .clearfix');
    const label = fg ? fg.querySelector('label') : null;
    const options = inp.tagName === 'SELECT' ? Array.from(inp.querySelectorAll('option')).slice(0, 10).map(o => o.textContent?.trim()) : undefined;
    return {
      tag: inp.tagName, type: inp.type, name: inp.name, id: inp.id,
      placeholder: inp.placeholder, label: label?.textContent?.trim() || '',
      required: inp.hasAttribute('data-rule-required') || inp.required,
      options,
    };
  }).filter(i => !i.id.startsWith('s2id_autogen'));
  return { title, inputs };
});
console.log('ADD TASK MODAL:', JSON.stringify(modal, null, 2));
await page.close();

await browser.close();
