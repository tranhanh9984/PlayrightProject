import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '../core/base.page';
import { logger } from '../helpers/logger';

export class ProjectsPage extends BasePage {
  protected readonly path = '/projects/all_projects';

  // ─── Page Header ──────────────────────────────────────────
  readonly pageTitle: Locator;
  readonly addProjectButton: Locator;
  readonly manageLabelsButton: Locator;
  readonly importProjectsButton: Locator;

  // ─── Filters ──────────────────────────────────────────────
  readonly filtersButton: Locator;
  readonly statusFilterOpen: Locator;
  readonly statusFilterCompleted: Locator;
  readonly statusFilterHold: Locator;
  readonly statusFilterCanceled: Locator;
  readonly deadlineDropdown: Locator;
  readonly labelDropdown: Locator;
  readonly searchInput: Locator;

  // ─── Quick Filter Buttons ─────────────────────────────────
  readonly allProjectsButton: Locator;
  readonly completedButton: Locator;

  // ─── Project Table ────────────────────────────────────────
  readonly projectTable: Locator;
  readonly projectTableRows: Locator;
  readonly tableHeaders: Locator;

  // ─── Export ───────────────────────────────────────────────
  readonly excelButton: Locator;
  readonly printButton: Locator;

  // ─── Add Project Modal ────────────────────────────────────
  readonly modal: Locator;
  readonly modalTitle: Locator;
  readonly projectTypeDropdown: Locator;
  readonly titleInput: Locator;
  readonly clientDropdown: Locator;
  readonly descriptionTextarea: Locator;
  readonly startDateInput: Locator;
  readonly deadlineInput: Locator;
  readonly priceInput: Locator;
  readonly labelsInput: Locator;
  readonly saveButton: Locator;
  readonly saveAndContinueButton: Locator;
  readonly closeButton: Locator;

  // ─── Confirmation Modal ───────────────────────────────────
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header
    this.pageTitle = page.locator('h1');
    this.addProjectButton = page.locator('.title-button-group a[data-title="Add project"]');
    this.manageLabelsButton = page.locator('.title-button-group a[data-title="Manage labels"]');
    this.importProjectsButton = page.locator('a[data-title="Import projects"]');

    // Filters
    this.filtersButton = page.locator('button:has-text("Filters"), a:has-text("Filters")');
    const statusFilter = page.locator('.filter-multi-select .list-group');
    this.statusFilterOpen = statusFilter.locator('[data-value="1"]');
    this.statusFilterCompleted = statusFilter.locator('[data-value="2"]');
    this.statusFilterHold = statusFilter.locator('[data-value="3"]');
    this.statusFilterCanceled = statusFilter.locator('[data-value="4"]');
    this.deadlineDropdown = page.locator('button:has-text("- Deadline -")');
    this.labelDropdown = page.locator('input[name="project_label"]');
    this.searchInput = page.locator('#dt-search-0');

    // Quick filters
    this.allProjectsButton = page.locator('a:has-text("All projects")');
    this.completedButton = page.locator('a:has-text("Completed")');

    // Table
    this.projectTable = page.locator('#project-table');
    this.projectTableRows = page.locator('#project-table tbody tr');
    this.tableHeaders = page.locator('#project-table th');

    // Export
    this.excelButton = page.locator('button:has-text("Excel"), a:has-text("Excel")');
    this.printButton = page.locator('button:has-text("Print"), a:has-text("Print")');

    // Add Project Modal
    this.modal = page.locator('#ajaxModal');
    this.modalTitle = page.locator('#ajaxModal .modal-title');
    this.projectTypeDropdown = page.locator('#project_type');
    this.titleInput = page.locator('#ajaxModal #title');
    this.clientDropdown = page.locator('#project_client_id');
    this.descriptionTextarea = page.locator('#ajaxModal #description');
    this.startDateInput = page.locator('#ajaxModal #start_date');
    this.deadlineInput = page.locator('#ajaxModal #deadline');
    this.priceInput = page.locator('#price');
    this.labelsInput = page.locator('#project_labels');
    this.saveButton = page.locator('#ajaxModal button[type="submit"]');
    this.saveAndContinueButton = page.locator('#ajaxModal button:has-text("Save & continue")');
    this.closeButton = page.locator('#ajaxModal button.btn-close');

    // Confirmation modal
    this.confirmDeleteButton = page.locator('#confirmDeleteButton');
  }

  // ─── Actions ──────────────────────────────────────────────

  async getPageTitle(): Promise<string> {
    return this.getText(this.pageTitle);
  }

  async clickAddProject(): Promise<void> {
    logger.info('Opening Add project modal');
    await this.click(this.addProjectButton);
    await this.modal.waitFor({ state: 'visible' });
    await this.titleInput.waitFor({ state: 'visible' });
  }

  async fillProjectDetails(options: {
    title: string;
    startDate?: string;
    deadline?: string;
    price?: string;
  }): Promise<void> {
    await this.titleInput.fill(options.title);
    if (options.startDate) await this.startDateInput.fill(options.startDate);
    if (options.deadline) await this.deadlineInput.fill(options.deadline);
    if (options.price) await this.priceInput.fill(options.price);
  }

  async saveProject(): Promise<void> {
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async closeModal(): Promise<void> {
    await this.closeButton.click();
  }

  async searchProject(query: string): Promise<void> {
    logger.info(`Searching project: ${query}`);
    await this.searchInput.fill(query);
    await this.page.waitForLoadState('networkidle');
  }

  async getProjectRowCount(): Promise<number> {
    return this.projectTableRows.count();
  }

  async getTableHeaders(): Promise<string[]> {
    const headers = await this.tableHeaders.allTextContents();
    return headers.map((h) => h.trim()).filter(Boolean);
  }

  async toggleStatusFilter(status: 'open' | 'completed' | 'hold' | 'canceled'): Promise<void> {
    logger.info(`Toggling status filter: ${status}`);
    const filterMap = {
      open: this.statusFilterOpen,
      completed: this.statusFilterCompleted,
      hold: this.statusFilterHold,
      canceled: this.statusFilterCanceled,
    };
    await filterMap[status].click();
    await this.page.waitForLoadState('networkidle');
  }
}
