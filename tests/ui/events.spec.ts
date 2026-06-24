import { test, expect } from '../../src/fixtures/auth.fixture';
import { allureMetadata } from '../../src/helpers/allure.helper';

test.describe('Events Page Tests', () => {
  test.beforeEach(async ({ eventsPage }) => {
    await eventsPage.navigate();
    await eventsPage.waitForPageLoad();
  });

  // ─── Page Display Tests ───────────────────────────────────

  test('[TC-E001] should display the event calendar page', async ({ eventsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Events',
      feature: 'Event Calendar',
      story: 'Page display',
    });

    await expect(page).toHaveURL(/events/);
    const title = await eventsPage.getPageTitle();
    expect(title).toContain('Event calendar');
  });

  test('[TC-E002] should display calendar with correct month title', async ({ eventsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Events',
      feature: 'Event Calendar',
      story: 'Calendar month title',
    });

    const calendarTitle = await eventsPage.getCalendarTitle();
    expect(calendarTitle).toBeTruthy();
    expect(calendarTitle).toMatch(/\w+ \d{4}/);
  });

  test('[TC-E003] should display calendar navigation buttons', async ({ eventsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Events',
      feature: 'Event Calendar',
      story: 'Navigation buttons',
    });

    await eventsPage.expectVisible(eventsPage.prevButton);
    await eventsPage.expectVisible(eventsPage.nextButton);
    await eventsPage.expectVisible(eventsPage.todayButton);
  });

  test('[TC-E004] should display calendar view buttons (month/week/day/list)', async ({ eventsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Events',
      feature: 'Event Calendar',
      story: 'View mode buttons',
    });

    await eventsPage.expectVisible(eventsPage.monthViewButton);
    await eventsPage.expectVisible(eventsPage.weekViewButton);
    await eventsPage.expectVisible(eventsPage.dayViewButton);
    await eventsPage.expectVisible(eventsPage.listViewButton);
  });

  test('[TC-E005] should display action buttons (Add event, Manage labels, Event type)', async ({ eventsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Events',
      feature: 'Event Calendar',
      story: 'Action buttons',
    });

    await eventsPage.expectVisible(eventsPage.addEventButton);
    await eventsPage.expectVisible(eventsPage.manageLabelsButton);
    await eventsPage.expectVisible(eventsPage.eventTypeFilterButton);
  });

  test('[TC-E006] should display day headers (Sun-Sat) in month view', async ({ page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Events',
      feature: 'Event Calendar',
      story: 'Day headers',
    });

    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (const day of dayHeaders) {
      await expect(page.locator('.fc-col-header-cell', { hasText: day })).toBeVisible();
    }
  });

  // ─── Calendar Navigation Tests ────────────────────────────

  test('[TC-E007] should navigate to next month', async ({ eventsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Events',
      feature: 'Event Calendar',
      story: 'Next month navigation',
    });

    const currentTitle = await eventsPage.getCalendarTitle();
    await eventsPage.clickNextMonth();
    const newTitle = await eventsPage.getCalendarTitle();
    expect(newTitle).not.toBe(currentTitle);
  });

  test('[TC-E008] should navigate to previous month', async ({ eventsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Events',
      feature: 'Event Calendar',
      story: 'Previous month navigation',
    });

    const currentTitle = await eventsPage.getCalendarTitle();
    await eventsPage.clickPrevMonth();
    const newTitle = await eventsPage.getCalendarTitle();
    expect(newTitle).not.toBe(currentTitle);
  });

  test('[TC-E009] should navigate back to today after navigating away', async ({ eventsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Events',
      feature: 'Event Calendar',
      story: 'Today navigation',
    });

    const originalTitle = await eventsPage.getCalendarTitle();

    await test.step('Navigate away from current month', async () => {
      await eventsPage.clickNextMonth();
      await eventsPage.clickNextMonth();
      const awayTitle = await eventsPage.getCalendarTitle();
      expect(awayTitle).not.toBe(originalTitle);
    });

    await test.step('Navigate back to today', async () => {
      await eventsPage.clickToday();
      const todayTitle = await eventsPage.getCalendarTitle();
      expect(todayTitle).toBe(originalTitle);
    });
  });

  // ─── Calendar View Switching Tests ────────────────────────

  test('[TC-E010] should switch to week view', async ({ eventsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Events',
      feature: 'Event Calendar',
      story: 'Week view',
    });

    await eventsPage.switchToWeekView();
    await expect(page.locator('.fc-timeGridWeek-view')).toBeVisible();
    await expect(eventsPage.weekViewButton).toHaveClass(/fc-button-active/);
  });

  test('[TC-E011] should switch to day view', async ({ eventsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Events',
      feature: 'Event Calendar',
      story: 'Day view',
    });

    await eventsPage.switchToDayView();
    await expect(page.locator('.fc-timeGridDay-view')).toBeVisible();
    await expect(eventsPage.dayViewButton).toHaveClass(/fc-button-active/);
  });

  test('[TC-E012] should switch to list view', async ({ eventsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Events',
      feature: 'Event Calendar',
      story: 'List view',
    });

    await eventsPage.switchToListView();
    await expect(page.locator('.fc-listMonth-view, .fc-list')).toBeVisible();
    await expect(eventsPage.listViewButton).toHaveClass(/fc-button-active/);
  });

  test('[TC-E013] should switch back to month view', async ({ eventsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Events',
      feature: 'Event Calendar',
      story: 'Switch back to month view',
    });

    await eventsPage.switchToWeekView();
    await eventsPage.switchToMonthView();
    await expect(page.locator('.fc-dayGridMonth-view')).toBeVisible();
    await expect(eventsPage.monthViewButton).toHaveClass(/fc-button-active/);
  });

  // ─── Event Type Filter Tests ──────────────────────────────

  test('[TC-E014] should open event type filter dropdown', async ({ eventsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Events',
      feature: 'Event Filters',
      story: 'Event type filter dropdown',
    });

    await eventsPage.openEventTypeFilter();
    await expect(page.locator('#calendar-filter-dropdown .dropdown-menu')).toBeVisible();

    await expect(eventsPage.filterEvents).toBeVisible();
    await expect(eventsPage.filterLeave).toBeVisible();
    await expect(eventsPage.filterTaskStartDate).toBeVisible();
    await expect(eventsPage.filterTaskDeadline).toBeVisible();
    await expect(eventsPage.filterProjectStartDate).toBeVisible();
    await expect(eventsPage.filterProjectDeadline).toBeVisible();
  });

  test('[TC-E015] should filter by event type - Events', async ({ eventsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Events',
      feature: 'Event Filters',
      story: 'Filter by events',
    });

    await eventsPage.openEventTypeFilter();
    await expect(eventsPage.filterEvents).toHaveClass(/active/);
  });

  // ─── Add Event Modal Tests ────────────────────────────────

  test('[TC-E016] should open Add event modal', async ({ eventsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Events',
      feature: 'Add Event',
      story: 'Open modal',
    });

    await eventsPage.clickAddEvent();
    const title = await eventsPage.eventFormModal.getModalTitle();
    expect(title).toContain('Add event');
  });

  test('[TC-E017] should display all form fields in Add event modal', async ({ eventsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Events',
      feature: 'Add Event',
      story: 'Form fields display',
    });

    await eventsPage.clickAddEvent();
    const modal = eventsPage.eventFormModal;

    await expect(modal.titleInput).toBeVisible();
    await expect(modal.startDateInput).toBeVisible();
    await expect(modal.startTimeInput).toBeVisible();
    await expect(modal.endDateInput).toBeVisible();
    await expect(modal.endTimeInput).toBeVisible();
    await expect(modal.locationInput).toBeVisible();
    await expect(modal.saveButton).toBeVisible();
    await expect(modal.closeButton).toBeVisible();
  });

  test('[TC-E018] should close Add event modal', async ({ eventsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Events',
      feature: 'Add Event',
      story: 'Close modal',
    });

    await eventsPage.clickAddEvent();
    await eventsPage.eventFormModal.close();
    await eventsPage.eventFormModal.waitForHidden();
  });

  test('[TC-E019] should validate required fields when saving event', async ({ eventsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Events',
      feature: 'Add Event',
      story: 'Required field validation',
    });

    await test.step('Open modal and save without filling fields', async () => {
      await eventsPage.clickAddEvent();
      await eventsPage.eventFormModal.save();
    });

    await test.step('Verify validation error on title field', async () => {
      const titleError = page.locator('#title-error, label.error[for="title"]');
      await expect(titleError).toBeVisible();
    });
  });

  test('[TC-E020] should create a new event successfully', async ({ eventsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Events',
      feature: 'Add Event',
      story: 'Create event',
    });

    const eventTitle = `Test Event ${Date.now()}`;

    await test.step('Open modal and fill event details', async () => {
      await eventsPage.clickAddEvent();
      await eventsPage.eventFormModal.fillEventDetails({
        title: eventTitle,
        startDate: '06/25/2026',
        startTime: '10:00 AM',
        endDate: '06/25/2026',
        endTime: '11:00 AM',
        location: 'Conference Room A',
      });
    });

    await test.step('Select share option and save', async () => {
      await eventsPage.eventFormModal.selectShareWith('only_me');
      await eventsPage.eventFormModal.save();
    });

    await test.step('Verify modal closes after save', async () => {
      await page.waitForLoadState('networkidle');
      await eventsPage.eventFormModal.waitForHidden();
    });
  });

  // ─── View Event Details Tests ─────────────────────────────

  test('[TC-E021] should open event detail modal when clicking an event', async ({ eventsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Events',
      feature: 'Event Details',
      story: 'View event details',
    });

    const eventCount = await eventsPage.getEventCount();
    if (eventCount === 0) {
      test.skip();
      return;
    }

    await eventsPage.clickEvent(0);
    const modalTitle = await eventsPage.eventDetailModal.getModalTitle();
    expect(modalTitle).toContain('Event details');
  });

  test('[TC-E022] should display event information in detail modal', async ({ eventsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Events',
      feature: 'Event Details',
      story: 'Event information display',
    });

    const eventCount = await eventsPage.getEventCount();
    if (eventCount === 0) {
      test.skip();
      return;
    }

    await eventsPage.clickEvent(0);
    const detail = eventsPage.eventDetailModal;

    const modalTitle = await detail.getModalTitle();
    expect(modalTitle).toContain('Event details');

    const eventTitle = await detail.getEventTitle();
    expect(eventTitle).toBeTruthy();
  });

  test('[TC-E023] should close event detail modal', async ({ eventsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Events',
      feature: 'Event Details',
      story: 'Close detail modal',
    });

    const eventCount = await eventsPage.getEventCount();
    if (eventCount === 0) {
      test.skip();
      return;
    }

    await eventsPage.clickEvent(0);
    await eventsPage.eventDetailModal.waitForVisible();
    await eventsPage.eventDetailModal.close();
    await eventsPage.eventDetailModal.waitForHidden();
  });

  // ─── Calendar Display Tests ───────────────────────────────

  test('[TC-E024] should display calendar grid with day cells', async ({ eventsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Events',
      feature: 'Event Calendar',
      story: 'Calendar grid display',
    });

    const dayCellCount = await eventsPage.calendarDayCells.count();
    expect(dayCellCount).toBeGreaterThanOrEqual(28);
    expect(dayCellCount).toBeLessThanOrEqual(42);
  });

  test('[TC-E025] should highlight today in the calendar', async ({ page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'minor',
      epic: 'Events',
      feature: 'Event Calendar',
      story: 'Today highlight',
    });

    const todayCell = page.locator('.fc-day-today');
    await expect(todayCell).toBeVisible();
  });
});
