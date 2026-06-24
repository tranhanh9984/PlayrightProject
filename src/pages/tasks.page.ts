import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '../core/base.page';
import { logger } from '../helpers/logger';

export class TasksPage extends BasePage {
  protected readonly path = '/tasks/all_tasks';

  // ─── Page Header ──────────────────────────────────────────
  readonly addTaskButton: Locator;
  readonly addMultipleTasksButton: Locator;
  readonly manageLabelsButton: Locator;
  readonly importTasksButton: Locator;

  // ─── Tabs ─────────────────────────────────────────────────
  readonly listTab: Locator;
  readonly kanbanTab: Locator;
  readonly ganttTab: Locator;

  // ─── Filters ──────────────────────────────────────────────
  readonly filtersButton: Locator;
  readonly statusFilterTodo: Locator;
  readonly statusFilterInProgress: Locator;
  readonly statusFilterReview: Locator;
  readonly statusFilterDone: Locator;
  readonly deadlineDropdown: Locator;
  readonly searchInput: Locator;

  // ─── Quick Filter Buttons ─────────────────────────────────
  readonly allTasksButton: Locator;
  readonly myTasksButton: Locator;

  // ─── Task Table ───────────────────────────────────────────
  readonly taskTable: Locator;
  readonly taskTableRows: Locator;
  readonly tableHeaders: Locator;

  // ─── Export ───────────────────────────────────────────────
  readonly excelButton: Locator;
  readonly printButton: Locator;

  // ─── Add Task Modal ───────────────────────────────────────
  readonly modal: Locator;
  readonly modalTitle: Locator;
  readonly titleInput: Locator;
  readonly descriptionTextarea: Locator;
  readonly projectDropdown: Locator;
  readonly assignedToInput: Locator;
  readonly collaboratorsInput: Locator;
  readonly statusDropdown: Locator;
  readonly priorityDropdown: Locator;
  readonly startDateInput: Locator;
  readonly deadlineInput: Locator;
  readonly relatedToDropdown: Locator;
  readonly recurringCheckbox: Locator;
  readonly repeatEveryInput: Locator;
  readonly repeatTypeDropdown: Locator;
  readonly cyclesInput: Locator;
  readonly saveButton: Locator;
  readonly closeButton: Locator;

  // ─── Confirmation Modal ───────────────────────────────────
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header buttons
    this.addTaskButton = page.locator('.title-button-group a[data-title="Add task"]');
    this.addMultipleTasksButton = page.locator('a[data-title="Add multiple tasks"]');
    this.manageLabelsButton = page.locator('.title-button-group a[data-title="Manage labels"]');
    this.importTasksButton = page.locator('a[data-title="Import tasks"]');

    // Tabs
    this.listTab = page.locator('.nav a:has-text("List")');
    this.kanbanTab = page.locator('.nav a:has-text("Kanban")');
    this.ganttTab = page.locator('.nav a:has-text("Gantt")');

    // Filters
    this.filtersButton = page.locator('button:has-text("Filters"), a:has-text("Filters")');
    const statusFilter = page.locator('.filter-multi-select .list-group');
    this.statusFilterTodo = statusFilter.locator('[data-value="1"]');
    this.statusFilterInProgress = statusFilter.locator('[data-value="2"]');
    this.statusFilterReview = statusFilter.locator('[data-value="4"]');
    this.statusFilterDone = statusFilter.locator('[data-value="3"]');
    this.deadlineDropdown = page.locator('button:has-text("- Deadline -")');
    this.searchInput = page.locator('#dt-search-0');

    // Quick filters
    this.allTasksButton = page.locator('a:has-text("All tasks")');
    this.myTasksButton = page.locator('a:has-text("My Tasks")');

    // Table
    this.taskTable = page.locator('#task-table');
    this.taskTableRows = page.locator('#task-table tbody tr');
    this.tableHeaders = page.locator('#task-table th');

    // Export
    this.excelButton = page.locator('button:has-text("Excel"), a:has-text("Excel")');
    this.printButton = page.locator('button:has-text("Print"), a:has-text("Print")');

    // Add Task Modal
    this.modal = page.locator('#ajaxModal');
    this.modalTitle = page.locator('#ajaxModal .modal-title');
    this.titleInput = page.locator('#ajaxModal #title');
    this.descriptionTextarea = page.locator('#ajaxModal #description');
    this.projectDropdown = page.locator('#ajaxModal #project_id');
    this.assignedToInput = page.locator('#assigned_to');
    this.collaboratorsInput = page.locator('#collaborators');
    this.statusDropdown = page.locator('#task_status_id');
    this.priorityDropdown = page.locator('#priority_id');
    this.startDateInput = page.locator('#ajaxModal #start_date');
    this.deadlineInput = page.locator('#ajaxModal #deadline');
    this.relatedToDropdown = page.locator('#related_to');
    this.recurringCheckbox = page.locator('#recurring');
    this.repeatEveryInput = page.locator('#repeat_every');
    this.repeatTypeDropdown = page.locator('#repeat_type');
    this.cyclesInput = page.locator('#no_of_cycles');
    this.saveButton = page.locator('#ajaxModal button[type="submit"]');
    this.closeButton = page.locator('#ajaxModal button.btn-close');

    // Confirmation modal
    this.confirmDeleteButton = page.locator('#confirmDeleteButton');
  }

  // ─── Actions ──────────────────────────────────────────────

  async clickAddTask(): Promise<void> {
    logger.info('Opening Add task modal');
    await this.click(this.addTaskButton);
    await this.modal.waitFor({ state: 'visible' });
    await this.titleInput.waitFor({ state: 'visible' });
  }

  async fillTaskDetails(options: {
    title: string;
    startDate?: string;
    deadline?: string;
  }): Promise<void> {
    await this.titleInput.fill(options.title);
    if (options.startDate) await this.startDateInput.fill(options.startDate);
    if (options.deadline) await this.deadlineInput.fill(options.deadline);
  }

  async saveTask(): Promise<void> {
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async closeModal(): Promise<void> {
    await this.closeButton.click();
  }

  async searchTask(query: string): Promise<void> {
    logger.info(`Searching task: ${query}`);
    await this.searchInput.fill(query);
    await this.page.waitForLoadState('networkidle');
  }

  async getTaskRowCount(): Promise<number> {
    return this.taskTableRows.count();
  }

  async getTableHeaders(): Promise<string[]> {
    const headers = await this.tableHeaders.allTextContents();
    return headers.map((h) => h.trim()).filter(Boolean);
  }

  // ─── Tab Actions ──────────────────────────────────────────

  async clickListTab(): Promise<void> {
    await this.click(this.listTab);
    await this.page.waitForLoadState('networkidle');
  }

  async clickKanbanTab(): Promise<void> {
    logger.info('Switching to Kanban view');
    await this.click(this.kanbanTab);
    await this.page.waitForLoadState('networkidle');
  }

  async clickGanttTab(): Promise<void> {
    logger.info('Switching to Gantt view');
    await this.click(this.ganttTab);
    await this.page.waitForLoadState('networkidle');
  }

  async toggleStatusFilter(status: 'todo' | 'in_progress' | 'review' | 'done'): Promise<void> {
    logger.info(`Toggling status filter: ${status}`);
    const filterMap = {
      todo: this.statusFilterTodo,
      in_progress: this.statusFilterInProgress,
      review: this.statusFilterReview,
      done: this.statusFilterDone,
    };
    await filterMap[status].click();
    await this.page.waitForLoadState('networkidle');
  }
}
