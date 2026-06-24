import { chromium } from 'playwright';

const CI_SESSION = 'f75ce1f81146a5ea628b0c0d112c79de';
const pages = ['clients', 'projects/all_projects', 'tasks/all_tasks', 'leads'];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
await context.addCookies([{
  name: 'ci_session', value: CI_SESSION,
  domain: 'rise.fairsketch.com', path: '/',
  httpOnly: true, secure: true, sameSite: 'Lax',
}]);

for (const p of pages) {
  const page = await context.newPage();
  await page.goto('https://rise.fairsketch.com/' + p);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  console.log('\n' + '='.repeat(80));
  console.log('PAGE: ' + p + ' | URL: ' + page.url());
  console.log('='.repeat(80));

  if (page.url().includes('signin')) {
    console.log('SESSION EXPIRED');
    break;
  }

  const headings = await page.$$eval('h1, h2, h3', els =>
    els.slice(0, 5).map(el => el.tagName + ': ' + el.textContent?.trim().substring(0, 80))
  );
  console.log('\nHEADINGS:', headings);

  const buttons = await page.$$eval('button, a.btn, .btn', els =>
    els.map(el => el.textContent?.trim().substring(0, 60)).filter(t => t && t.length > 0 && t.length < 50)
  );
  console.log('BUTTONS:', buttons);

  const tables = await page.$$eval('table', els =>
    els.map((el, i) => ({
      id: el.id,
      headers: Array.from(el.querySelectorAll('th')).map(th => th.textContent?.trim()).filter(Boolean),
      rows: el.querySelectorAll('tbody tr').length,
    }))
  );
  console.log('TABLES:', JSON.stringify(tables, null, 2));

  const inputs = await page.$$eval('input:not([type="hidden"]), select, textarea', els =>
    els.map(el => ({ tag: el.tagName, type: el.type, name: el.name, id: el.id, placeholder: el.placeholder }))
  );
  console.log('INPUTS:', JSON.stringify(inputs, null, 2));

  const filters = await page.$$eval('.filter-multi-select li, [data-act="multiselect"] li', els =>
    els.map(el => ({ text: el.textContent?.trim(), value: el.getAttribute('data-value'), active: el.classList.contains('active') }))
  );
  console.log('FILTERS:', JSON.stringify(filters));

  // Check for add button and its modal URL
  const addBtns = await page.$$eval('a[data-act="ajax-modal"], a.add-btn', els =>
    els.map(el => ({ text: el.textContent?.trim().substring(0, 40), url: el.getAttribute('data-action-url'), title: el.getAttribute('data-title') }))
  );
  console.log('ADD BUTTONS:', JSON.stringify(addBtns, null, 2));

  // Check for tabs
  const tabs = await page.$$eval('.nav-tabs a, .nav-pills a, ul.nav a', els =>
    els.map(el => ({ text: el.textContent?.trim().substring(0, 40), href: el.getAttribute('href') }))
  );
  console.log('TABS:', JSON.stringify(tabs));

  await page.close();
}

await browser.close();
