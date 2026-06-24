import { test, expect } from '../../src/fixtures/auth.fixture';
import { allureMetadata } from '../../src/helpers/allure.helper';

test.describe('Dashboard Page Tests', () => {
  test.beforeEach(async ({ dashboardPage }) => {
    await dashboardPage.navigate();
    await dashboardPage.waitForPageLoad();
  });

  // ─── 1.1 Page Display ────────────────────────────────────────

  test('[TC-D001] should display welcome message', async ({ dashboardPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Dashboard',
      feature: 'Welcome',
      story: 'Display welcome message',
    });

    await dashboardPage.expectVisible(dashboardPage.welcomeMessage);
  });

  test('[TC-D002] should display stats cards', async ({ dashboardPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Dashboard',
      feature: 'Stats',
      story: 'Display stats cards',
    });

    const count = await dashboardPage.getStatsCardCount();
    expect(count).toBeGreaterThan(0);
  });

  test('[TC-D003] should have functional navbar', async ({ dashboardPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Dashboard',
      feature: 'Navigation',
      story: 'Navbar display',
    });

    await dashboardPage.navbar.waitForVisible();
    expect(await dashboardPage.navbar.isVisible()).toBeTruthy();
  });

  test('[TC-D004] should perform search', async ({ dashboardPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Dashboard',
      feature: 'Search',
      story: 'Search functionality',
    });

    await test.step('Enter search query', async () => {
      await dashboardPage.search('test query');
    });

    await test.step('Verify search results page', async () => {
      await expect(page).toHaveURL(/search|query/);
    });
  });

  // ─── 1.2 Summary Statistics Widgets ───────────────────────────

  test('[TC-D005] should display "My open tasks" widget', async ({ dashboardPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Dashboard',
      feature: 'Summary Widgets',
      story: 'My open tasks widget',
    });

    await test.step('Verify widget is visible', async () => {
      await expect(dashboardPage.myOpenTasksWidget).toBeVisible();
    });

    await test.step('Click widget and verify navigation', async () => {
      await dashboardPage.myOpenTasksWidget.click();
      await expect(page).toHaveURL(/tasks.*my_open_tasks/);
    });
  });

  test('[TC-D006] should display "Events today" widget', async ({ dashboardPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Dashboard',
      feature: 'Summary Widgets',
      story: 'Events today widget',
    });

    await test.step('Verify widget is visible', async () => {
      await expect(dashboardPage.eventsTodayWidget).toBeVisible();
    });

    await test.step('Click widget and verify navigation', async () => {
      await dashboardPage.eventsTodayWidget.click();
      await expect(page).toHaveURL(/events/);
    });
  });

  test('[TC-D007] should display "Due" amount widget', async ({ dashboardPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Dashboard',
      feature: 'Summary Widgets',
      story: 'Due amount widget',
    });

    await test.step('Verify widget is visible', async () => {
      await expect(dashboardPage.dueWidget).toBeVisible();
    });

    await test.step('Click widget and verify navigation', async () => {
      await dashboardPage.dueWidget.click();
      await expect(page).toHaveURL(/invoices/);
    });
  });

  // ─── 1.3 Projects Overview Widget ────────────────────────────

  test('[TC-D008] should display Projects Overview widget', async ({ dashboardPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Dashboard',
      feature: 'Projects Overview',
      story: 'Widget display',
    });

    await expect(dashboardPage.projectsOverviewSection).toBeVisible();
    await expect(dashboardPage.projectsOpenCount).toBeVisible();
    await expect(dashboardPage.projectsCompletedCount).toBeVisible();
    await expect(dashboardPage.projectsHoldCount).toBeVisible();
  });

  test('[TC-D009] should navigate via Projects Overview links', async ({ dashboardPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Dashboard',
      feature: 'Projects Overview',
      story: 'Navigation links',
    });

    await test.step('Click Open count link', async () => {
      await dashboardPage.projectsOpenCount.click();
      await expect(page).toHaveURL(/projects\/all_projects\/1/);
    });

    await test.step('Go back to dashboard', async () => {
      await dashboardPage.navigate();
      await dashboardPage.waitForPageLoad();
    });

    await test.step('Click Completed count link', async () => {
      await dashboardPage.projectsCompletedCount.click();
      await expect(page).toHaveURL(/projects\/all_projects\/2/);
    });
  });

  // ─── 1.4 Invoice Overview Widget ─────────────────────────────

  test('[TC-D010] should display Invoice Overview widget', async ({ dashboardPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Dashboard',
      feature: 'Invoice Overview',
      story: 'Widget display',
    });

    await expect(dashboardPage.invoiceOverviewSection).toBeVisible();
    await expect(dashboardPage.invoiceOverviewChart).toBeVisible();

    const chartWidth = await dashboardPage.invoiceOverviewChart.evaluate((el) => el.clientWidth);
    expect(chartWidth).toBeGreaterThan(0);
  });

  // ─── 1.5 Income vs Expenses Widget ───────────────────────────

  test('[TC-D011] should display Income vs Expenses widget', async ({ dashboardPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Dashboard',
      feature: 'Income vs Expenses',
      story: 'Widget display',
    });

    await expect(dashboardPage.incomeExpensesSection).toBeVisible();
    await expect(dashboardPage.incomeExpenseChart).toBeVisible();
    await expect(dashboardPage.dashboardIncomeVsExpensesChart).toBeVisible();
  });

  // ─── 1.6 All Tasks Overview Widget ───────────────────────────

  test('[TC-D012] should display All Tasks Overview widget', async ({ dashboardPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Dashboard',
      feature: 'All Tasks Overview',
      story: 'Widget display',
    });

    await expect(dashboardPage.allTasksOverviewSection).toBeVisible();
    await expect(dashboardPage.allTasksOverviewChart).toBeVisible();
  });

  // ─── 1.7 Team Members Overview Widget ────────────────────────

  test('[TC-D013] should display Team Members Overview widget', async ({ dashboardPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Dashboard',
      feature: 'Team Members',
      story: 'Widget display',
    });

    await expect(dashboardPage.teamMembersSection).toBeVisible();
    await expect(dashboardPage.teamMembersLink).toBeVisible();
  });

  test('[TC-D014] should navigate via Team Members links', async ({ dashboardPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Dashboard',
      feature: 'Team Members',
      story: 'Navigation links',
    });

    await test.step('Click Team members link', async () => {
      await dashboardPage.teamMembersLink.click();
      await expect(page).toHaveURL(/team_members\/index/);
    });

    await test.step('Go back to dashboard', async () => {
      await dashboardPage.navigate();
      await dashboardPage.waitForPageLoad();
    });

    await test.step('Click Members Clocked In link', async () => {
      await dashboardPage.membersClockedInLink.click();
      await expect(page).toHaveURL(/attendance\/index\/members_clocked_in/);
    });
  });

  // ─── 1.8 Ticket Status Widget ────────────────────────────────

  test('[TC-D015] should display Ticket Status widget', async ({ dashboardPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Dashboard',
      feature: 'Ticket Status',
      story: 'Widget display',
    });

    await expect(dashboardPage.ticketStatusSection).toBeVisible();
    await expect(dashboardPage.ticketStatusChart).toBeVisible();
  });

  test('[TC-D016] should navigate via Ticket Status links', async ({ dashboardPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Dashboard',
      feature: 'Ticket Status',
      story: 'Navigation links',
    });

    await test.step('Click New ticket link', async () => {
      await dashboardPage.ticketNewLink.click();
      await expect(page).toHaveURL(/tickets\/index\/new/);
    });

    await test.step('Go back and click Open ticket link', async () => {
      await dashboardPage.navigate();
      await dashboardPage.waitForPageLoad();
      await dashboardPage.ticketOpenLink.click();
      await expect(page).toHaveURL(/tickets\/index\/open/);
    });
  });

  // ─── 1.9 Charts ──────────────────────────────────────────────

  test('[TC-D017] should render all dashboard charts', async ({ dashboardPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Dashboard',
      feature: 'Charts',
      story: 'All charts rendered',
    });

    const charts = [
      dashboardPage.invoiceOverviewChart,
      dashboardPage.incomeExpenseChart,
      dashboardPage.dashboardIncomeVsExpensesChart,
      dashboardPage.allTasksOverviewChart,
      dashboardPage.ticketStatusChart,
    ];

    for (const chart of charts) {
      await expect(chart).toBeVisible();
      const width = await chart.evaluate((el) => el.clientWidth);
      expect(width).toBeGreaterThan(0);
    }
  });

  // ─── 1.10 Clock In/Out Widget ────────────────────────────────

  test('[TC-D018] should display Clock In/Out widget', async ({ dashboardPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Dashboard',
      feature: 'Clock In/Out',
      story: 'Widget display',
    });

    const clockInVisible = await dashboardPage.clockInButton.isVisible();
    const clockOutVisible = await dashboardPage.clockOutButton.isVisible();
    expect(clockInVisible || clockOutVisible).toBeTruthy();
  });

  // ─── 1.11 Project Timeline Widget ────────────────────────────

  test('[TC-D019] should display Project Timeline widget', async ({ dashboardPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Dashboard',
      feature: 'Project Timeline',
      story: 'Widget display',
    });

    await expect(dashboardPage.projectTimelineSection).toBeVisible();
  });

  // ─── 1.12 Events Widget ──────────────────────────────────────

  test('[TC-D020] should display Events widget', async ({ dashboardPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Dashboard',
      feature: 'Events Widget',
      story: 'Widget display',
    });

    await expect(dashboardPage.eventsSection).toBeVisible();

    await test.step('Click View on calendar link', async () => {
      await dashboardPage.viewOnCalendarLink.first().click();
      await expect(page).toHaveURL(/events/);
    });
  });

  // ─── 1.13 My Tasks Table Widget ──────────────────────────────

  test('[TC-D021] should display My Tasks table widget', async ({ dashboardPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Dashboard',
      feature: 'My Tasks',
      story: 'Table widget display',
    });

    await expect(dashboardPage.myTasksTable).toBeVisible();
    const rowCount = await dashboardPage.myTasksRows.count();
    expect(rowCount).toBeGreaterThan(0);
  });

  // ─── 1.14 To Do (Private) Widget ─────────────────────────────

  test('[TC-D022] should display To do widget', async ({ dashboardPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Dashboard',
      feature: 'To Do',
      story: 'Widget display',
    });

    await expect(dashboardPage.todoSection).toBeVisible();
  });

  // ─── 1.15 Sticky Note Widget ─────────────────────────────────

  test('[TC-D023] should display Sticky Note widget', async ({ dashboardPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'minor',
      epic: 'Dashboard',
      feature: 'Sticky Note',
      story: 'Widget display',
    });

    await expect(dashboardPage.stickyNoteSection).toBeVisible();
  });

  // ─── 1.16 Quick Actions ──────────────────────────────────────

  test('[TC-D024] should display Quick action dropdown items', async ({ dashboardPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Dashboard',
      feature: 'Quick Actions',
      story: 'Dropdown items',
    });

    await dashboardPage.openQuickActions();
    await expect(dashboardPage.quickActionAddTask).toBeVisible();
    await expect(dashboardPage.quickActionAddEvent).toBeVisible();
  });

  test('[TC-D025] should open Add task modal via quick action', async ({ dashboardPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Dashboard',
      feature: 'Quick Actions',
      story: 'Add task quick action',
    });

    await dashboardPage.openQuickActions();
    await dashboardPage.quickActionAddTask.click();

    await test.step('Verify Add task modal opens', async () => {
      const modal = page.locator('#ajaxModal');
      await expect(modal).toBeVisible();
      const modalTitle = page.locator('#ajaxModal .modal-title');
      await expect(modalTitle).toContainText('Add task');
    });
  });

  test('[TC-D026] should open Add event modal via quick action', async ({ dashboardPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Dashboard',
      feature: 'Quick Actions',
      story: 'Add event quick action',
    });

    await dashboardPage.openQuickActions();
    await dashboardPage.quickActionAddEvent.click();

    await test.step('Verify Add event modal opens', async () => {
      const modal = page.locator('#ajaxModal');
      await expect(modal).toBeVisible();
      const modalTitle = page.locator('#ajaxModal .modal-title');
      await expect(modalTitle).toContainText('Add event');
    });
  });

  // ─── 1.17 Open Projects List ─────────────────────────────────

  test('[TC-D027] should display Open Projects list', async ({ dashboardPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Dashboard',
      feature: 'Open Projects',
      story: 'Project list display',
    });

    await expect(dashboardPage.openProjectsSection).toBeVisible();

    await test.step('Click a project link', async () => {
      const projectLink = dashboardPage.openProjectLinks.first();
      if ((await projectLink.count()) > 0) {
        await projectLink.click();
        await expect(page).toHaveURL(/projects\/view\//);
      }
    });
  });

  // ─── 1.18 Dashboard Management ───────────────────────────────

  test('[TC-D028] should display "Add new dashboard" option', async ({ dashboardPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'minor',
      epic: 'Dashboard',
      feature: 'Dashboard Management',
      story: 'Add new dashboard',
    });

    await dashboardPage.dashboardOptionsDropdown.click();
    await expect(dashboardPage.addNewDashboardOption).toBeVisible();
  });
});
