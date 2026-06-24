import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '../core/base.page';
import { EventFormModalComponent } from './components/event-form-modal.component';
import { EventDetailModalComponent } from './components/event-detail-modal.component';
import { logger } from '../helpers/logger';

export class EventsPage extends BasePage {
  protected readonly path = '/events';

  // ─── Components ───────────────────────────────────────────
  readonly eventFormModal: EventFormModalComponent;
  readonly eventDetailModal: EventDetailModalComponent;

  // ─── Page Header Locators ─────────────────────────────────
  readonly pageTitle: Locator;
  readonly addEventButton: Locator;
  readonly manageLabelsButton: Locator;
  readonly eventTypeFilterButton: Locator;
  readonly eventLabelDropdown: Locator;

  // ─── Event Type Filter Options ────────────────────────────
  readonly filterEvents: Locator;
  readonly filterLeave: Locator;
  readonly filterTaskStartDate: Locator;
  readonly filterTaskDeadline: Locator;
  readonly filterProjectStartDate: Locator;
  readonly filterProjectDeadline: Locator;

  // ─── Calendar Locators ────────────────────────────────────
  readonly calendar: Locator;
  readonly calendarTitle: Locator;
  readonly prevButton: Locator;
  readonly nextButton: Locator;
  readonly todayButton: Locator;
  readonly monthViewButton: Locator;
  readonly weekViewButton: Locator;
  readonly dayViewButton: Locator;
  readonly listViewButton: Locator;
  readonly calendarEvents: Locator;
  readonly calendarDayCells: Locator;

  // ─── Confirmation Modal ───────────────────────────────────
  readonly confirmDeleteButton: Locator;
  readonly cancelDeleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.eventFormModal = new EventFormModalComponent(page);
    this.eventDetailModal = new EventDetailModalComponent(page);

    // Page header
    this.pageTitle = page.locator('h1');
    this.addEventButton = page.locator('a.add-btn');
    this.manageLabelsButton = page.locator('a[data-title="Manage labels"]');
    this.eventTypeFilterButton = page.locator('#calendar-filter-dropdown button.dropdown-toggle');
    this.eventLabelDropdown = page.locator('#s2id_event-labels-dropdown');

    // Event type filter options
    const filterList = page.locator('#calendar-filter-dropdown .list-group');
    this.filterEvents = filterList.locator('[data-value="events"]');
    this.filterLeave = filterList.locator('[data-value="leave"]');
    this.filterTaskStartDate = filterList.locator('[data-value="task_start_date"]');
    this.filterTaskDeadline = filterList.locator('[data-value="task_deadline"]');
    this.filterProjectStartDate = filterList.locator('[data-value="project_start_date"]');
    this.filterProjectDeadline = filterList.locator('[data-value="project_deadline"]');

    // Calendar (FullCalendar)
    this.calendar = page.locator('#event-calendar');
    this.calendarTitle = page.locator('.fc-toolbar-title');
    this.prevButton = page.locator('.fc-prev-button');
    this.nextButton = page.locator('.fc-next-button');
    this.todayButton = page.locator('.fc-today-button');
    this.monthViewButton = page.locator('.fc-dayGridMonth-button');
    this.weekViewButton = page.locator('.fc-timeGridWeek-button');
    this.dayViewButton = page.locator('.fc-timeGridDay-button');
    this.listViewButton = page.locator('.fc-listMonth-button');
    this.calendarEvents = page.locator('.fc-event');
    this.calendarDayCells = page.locator('.fc-daygrid-day');

    // Confirmation modal
    this.confirmDeleteButton = page.locator('#confirmDeleteButton');
    this.cancelDeleteButton = page.locator('#confirmationModal button.btn-default:has-text("Cancel")');
  }

  // ─── Page Actions ─────────────────────────────────────────

  async getPageTitle(): Promise<string> {
    return this.getText(this.pageTitle);
  }

  async getCalendarTitle(): Promise<string> {
    return this.getText(this.calendarTitle);
  }

  // ─── Calendar Navigation ──────────────────────────────────

  async clickPrevMonth(): Promise<void> {
    logger.info('Navigating to previous month');
    await this.click(this.prevButton);
    await this.page.waitForLoadState('networkidle');
  }

  async clickNextMonth(): Promise<void> {
    logger.info('Navigating to next month');
    await this.click(this.nextButton);
    await this.page.waitForLoadState('networkidle');
  }

  async clickToday(): Promise<void> {
    logger.info('Navigating to today');
    await this.click(this.todayButton);
    await this.page.waitForLoadState('networkidle');
  }

  // ─── Calendar View Switching ──────────────────────────────

  async switchToMonthView(): Promise<void> {
    logger.info('Switching to month view');
    await this.click(this.monthViewButton);
    await this.page.waitForLoadState('networkidle');
  }

  async switchToWeekView(): Promise<void> {
    logger.info('Switching to week view');
    await this.click(this.weekViewButton);
    await this.page.waitForLoadState('networkidle');
  }

  async switchToDayView(): Promise<void> {
    logger.info('Switching to day view');
    await this.click(this.dayViewButton);
    await this.page.waitForLoadState('networkidle');
  }

  async switchToListView(): Promise<void> {
    logger.info('Switching to list view');
    await this.click(this.listViewButton);
    await this.page.waitForLoadState('networkidle');
  }

  // ─── Event Actions ────────────────────────────────────────

  async clickAddEvent(): Promise<void> {
    logger.info('Opening Add event modal');
    await this.click(this.addEventButton);
    await this.eventFormModal.waitForVisible();
  }

  async clickEvent(index = 0): Promise<void> {
    logger.info(`Clicking event at index ${index}`);
    await this.calendarEvents.nth(index).click();
    await this.eventDetailModal.waitForVisible();
  }

  async getEventCount(): Promise<number> {
    return this.calendarEvents.count();
  }

  // ─── Filter Actions ───────────────────────────────────────

  async openEventTypeFilter(): Promise<void> {
    await this.click(this.eventTypeFilterButton);
  }

  async toggleEventTypeFilter(filterType: 'events' | 'leave' | 'task_start_date' | 'task_deadline' | 'project_start_date' | 'project_deadline'): Promise<void> {
    logger.info(`Toggling event type filter: ${filterType}`);
    await this.openEventTypeFilter();
    const filterMap = {
      events: this.filterEvents,
      leave: this.filterLeave,
      task_start_date: this.filterTaskStartDate,
      task_deadline: this.filterTaskDeadline,
      project_start_date: this.filterProjectStartDate,
      project_deadline: this.filterProjectDeadline,
    };
    await filterMap[filterType].click();
    await this.page.waitForLoadState('networkidle');
  }

  // ─── Manage Labels ────────────────────────────────────────

  async clickManageLabels(): Promise<void> {
    logger.info('Opening Manage labels modal');
    await this.click(this.manageLabelsButton);
    await this.eventFormModal.waitForVisible();
  }

  // ─── Confirmation Modal ───────────────────────────────────

  async confirmDelete(): Promise<void> {
    await this.confirmDeleteButton.click();
  }

  async cancelDelete(): Promise<void> {
    await this.cancelDeleteButton.click();
  }
}
