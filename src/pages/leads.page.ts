import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '../core/base.page';
import { logger } from '../helpers/logger';

export class LeadsPage extends BasePage {
  protected readonly path = '/leads';

  // ─── Page Header ──────────────────────────────────────────
  readonly addLeadButton: Locator;
  readonly manageLabelsButton: Locator;
  readonly importLeadsButton: Locator;

  // ─── Tabs ─────────────────────────────────────────────────
  readonly leadsTab: Locator;
  readonly kanbanTab: Locator;

  // ─── Filters ──────────────────────────────────────────────
  readonly filtersButton: Locator;
  readonly searchInput: Locator;
  readonly ownerFilter: Locator;
  readonly statusFilter: Locator;
  readonly labelFilter: Locator;
  readonly sourceFilter: Locator;

  // ─── Lead Table ───────────────────────────────────────────
  readonly leadTable: Locator;
  readonly leadTableRows: Locator;
  readonly tableHeaders: Locator;

  // ─── Export ───────────────────────────────────────────────
  readonly excelButton: Locator;
  readonly printButton: Locator;

  // ─── Add Lead Modal ───────────────────────────────────────
  readonly modal: Locator;
  readonly modalTitle: Locator;
  readonly typeOrganizationRadio: Locator;
  readonly typePersonRadio: Locator;
  readonly companyNameInput: Locator;
  readonly ownerInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipInput: Locator;
  readonly countryInput: Locator;
  readonly phoneInput: Locator;
  readonly websiteInput: Locator;
  readonly statusDropdown: Locator;
  readonly saveButton: Locator;
  readonly closeButton: Locator;

  // ─── Confirmation Modal ───────────────────────────────────
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header buttons
    this.addLeadButton = page.locator('.title-button-group a[data-title="Add lead"]');
    this.manageLabelsButton = page.locator('.title-button-group a[data-title="Manage labels"]');
    this.importLeadsButton = page.locator('a[data-title="Import leads"]');

    // Tabs
    this.leadsTab = page.locator('.nav a:text-is("Leads")');
    this.kanbanTab = page.locator('.nav a:has-text("Kanban")');

    // Filters
    this.filtersButton = page.locator('button:has-text("Filters"), a:has-text("Filters")');
    this.searchInput = page.locator('#dt-search-0');
    this.ownerFilter = page.locator('input[name="owner_id"]');
    this.statusFilter = page.locator('input[name="status"]');
    this.labelFilter = page.locator('input[name="label_id"]');
    this.sourceFilter = page.locator('input[name="source"]');

    // Table
    this.leadTable = page.locator('#lead-table');
    this.leadTableRows = page.locator('#lead-table tbody tr');
    this.tableHeaders = page.locator('#lead-table th');

    // Export
    this.excelButton = page.locator('button:has-text("Excel"), a:has-text("Excel")');
    this.printButton = page.locator('button:has-text("Print"), a:has-text("Print")');

    // Add Lead Modal
    this.modal = page.locator('#ajaxModal');
    this.modalTitle = page.locator('#ajaxModal .modal-title');
    this.typeOrganizationRadio = page.locator('#type_organization');
    this.typePersonRadio = page.locator('#type_person');
    this.companyNameInput = page.locator('#company_name');
    this.ownerInput = page.locator('#owner_id');
    this.addressInput = page.locator('#address');
    this.cityInput = page.locator('#city');
    this.stateInput = page.locator('#state');
    this.zipInput = page.locator('#zip');
    this.countryInput = page.locator('#country');
    this.phoneInput = page.locator('#phone');
    this.websiteInput = page.locator('#website');
    this.statusDropdown = page.locator('#status_id');
    this.saveButton = page.locator('#ajaxModal button[type="submit"]');
    this.closeButton = page.locator('#ajaxModal button.btn-close');

    // Confirmation modal
    this.confirmDeleteButton = page.locator('#confirmDeleteButton');
  }

  // ─── Actions ──────────────────────────────────────────────

  async clickAddLead(): Promise<void> {
    logger.info('Opening Add lead modal');
    await this.click(this.addLeadButton);
    await this.modal.waitFor({ state: 'visible' });
    await this.companyNameInput.waitFor({ state: 'visible' });
  }

  async fillLeadDetails(options: {
    companyName: string;
    type?: 'organization' | 'person';
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    phone?: string;
    website?: string;
  }): Promise<void> {
    if (options.type === 'person') {
      await this.typePersonRadio.click({ force: true });
    } else if (options.type === 'organization') {
      await this.typeOrganizationRadio.click({ force: true });
    }
    await this.companyNameInput.fill(options.companyName);
    if (options.address) await this.addressInput.fill(options.address);
    if (options.city) await this.cityInput.fill(options.city);
    if (options.state) await this.stateInput.fill(options.state);
    if (options.zip) await this.zipInput.fill(options.zip);
    if (options.country) await this.countryInput.fill(options.country);
    if (options.phone) await this.phoneInput.fill(options.phone);
    if (options.website) await this.websiteInput.fill(options.website);
  }

  async saveLead(): Promise<void> {
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async closeModal(): Promise<void> {
    await this.closeButton.click();
  }

  async searchLead(query: string): Promise<void> {
    logger.info(`Searching lead: ${query}`);
    await this.searchInput.fill(query);
    await this.page.waitForLoadState('networkidle');
  }

  async getLeadRowCount(): Promise<number> {
    return this.leadTableRows.count();
  }

  async getTableHeaders(): Promise<string[]> {
    const headers = await this.tableHeaders.allTextContents();
    return headers.map((h) => h.trim()).filter(Boolean);
  }

  // ─── Tab Actions ──────────────────────────────────────────

  async clickKanbanTab(): Promise<void> {
    logger.info('Switching to Kanban view');
    await this.click(this.kanbanTab);
    await this.page.waitForLoadState('networkidle');
  }

  async clickLeadsTab(): Promise<void> {
    await this.click(this.leadsTab);
    await this.page.waitForLoadState('networkidle');
  }
}
