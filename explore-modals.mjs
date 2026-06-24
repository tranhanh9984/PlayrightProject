import { chromium } from 'playwright';

const CI_SESSION = 'f75ce1f81146a5ea628b0c0d112c79de';
const modalPages = [
  { page: 'clients/clients_list', addSelector: 'a[data-title="Add client"]' },
  { page: 'projects/all_projects', addSelector: 'a[data-title="Add project"]' },
  { page: 'tasks/all_tasks', addSelector: 'a.add-btn[data-title="Add task"]' },
  { page: 'leads', addSelector: 'a[data-title="Add lead"]' },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
await context.addCookies([{
  name: 'ci_session', value: CI_SESSION,
  domain: 'rise.fairsketch.com', path: '/',
  httpOnly: true, secure: true, sameSite: 'Lax',
}]);

for (const mp of modalPages) {
  const page = await context.newPage();
  await page.goto('https://rise.fairsketch.com/' + mp.page);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  if (page.url().includes('signin')) { console.log('SESSION EXPIRED'); break; }

  console.log('\n' + '='.repeat(80));
  console.log('ADD MODAL FOR: ' + mp.page);
  console.log('='.repeat(80));

  // Also get table info for clients list
  if (mp.page === 'clients/clients_list') {
    const table = await page.$$eval('table', els =>
      els.map(el => ({
        id: el.id,
        headers: Array.from(el.querySelectorAll('th')).map(th => th.textContent?.trim()).filter(Boolean),
        rows: el.querySelectorAll('tbody tr').length,
      }))
    );
    console.log('CLIENT LIST TABLE:', JSON.stringify(table, null, 2));
  }

  const addBtn = page.locator(mp.addSelector).first();
  if (await addBtn.isVisible().catch(() => false)) {
    await addBtn.click();
    await page.waitForTimeout(3000);

    const modal = await page.evaluate(() => {
      const m = document.querySelector('#ajaxModal');
      if (!m) return null;
      const title = m.querySelector('.modal-title')?.textContent?.trim();
      const inputs = Array.from(m.querySelectorAll('input:not([type="hidden"]), select:not([style*="display: none"]), textarea')).map(inp => {
        const fg = inp.closest('.form-group, .clearfix');
        const label = fg ? fg.querySelector('label') : null;
        const options = inp.tagName === 'SELECT' ? Array.from(inp.querySelectorAll('option')).slice(0, 10).map(o => o.textContent?.trim()) : undefined;
        return {
          tag: inp.tagName, type: inp.type, name: inp.name, id: inp.id,
          placeholder: inp.placeholder,
          label: label?.textContent?.trim() || '',
          required: inp.hasAttribute('data-rule-required') || inp.required,
          options,
        };
      }).filter(i => !i.id.startsWith('s2id_autogen'));
      const btns = Array.from(m.querySelectorAll('button, input[type="submit"]')).map(b => ({
        text: b.textContent?.trim().substring(0, 30), type: b.type
      })).filter(b => b.text);
      const formAction = m.querySelector('form')?.action;
      return { title, inputs, buttons: btns, formAction };
    });
    console.log(JSON.stringify(modal, null, 2));
  } else {
    console.log('Add button not found');
  }

  await page.close();
}

await browser.close();
