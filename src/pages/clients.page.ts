import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '../core/base.page';
import { logger } from '../helpers/logger';

export class ClientsPage extends BasePage {
  protected readonly path = '/clients';

  // ─── Page Header ──────────────────────────────────────────
  readonly addClientButton: Locator;
  readonly manageLabelsButton: Locator;
  readonly importClientsButton: Locator;

  // ─── Tabs ─────────────────────────────────────────────────
  readonly overviewTab: Locator;
  readonly clientsTab: Locator;
  readonly contactsTab: Locator;

  // ─── Overview Cards ───────────────────────────────────────
  readonly overviewCards: Locator;

  // ─── Client Table (Clients tab) ───────────────────────────
  readonly clientTable: Locator;
  readonly clientTableRows: Locator;
  readonly searchInput: Locator;

  // ─── Add Client Modal ─────────────────────────────────────
  readonly modal: Locator;
  readonly modalTitle: Locator;
  readonly companyNameInput: Locator;
  readonly typeOrganizationRadio: Locator;
  readonly typePersonRadio: Locator;
  readonly ownerInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipInput: Locator;
  readonly countryInput: Locator;
  readonly phoneInput: Locator;
  readonly websiteInput: Locator;
  readonly vatNumberInput: Locator;
  readonly gstNumberInput: Locator;
  readonly saveButton: Locator;
  readonly closeButton: Locator;
  readonly closeFooterButton: Locator;

  // ─── Export ─────────────────────────────────────────────────
  readonly excelButton: Locator;
  readonly printButton: Locator;

  // ─── Confirmation Modal ───────────────────────────────────
  readonly confirmDeleteButton: Locator;
  readonly cancelDeleteButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header buttons
    this.addClientButton = page.locator('a[data-title="Add client"]');
    this.manageLabelsButton = page.locator('.title-button-group a[data-title="Manage labels"]');
    this.importClientsButton = page.locator('a[data-title="Import clients"]');

    // Tabs
    this.overviewTab = page.locator('.nav a[data-bs-target="#overview"]');
    this.clientsTab = page.locator('.nav a[data-bs-target="#clients_list"]');
    this.contactsTab = page.locator('.nav a[data-bs-target="#contacts"]');

    // Overview
    this.overviewCards = page.locator('.card h1');

    // Table
    this.clientTable = page.locator('#client-table');
    this.clientTableRows = page.locator('#client-table tbody tr');
    this.searchInput = page.locator('#dt-search-0');

    // Add Client Modal
    this.modal = page.locator('#ajaxModal');
    this.modalTitle = page.locator('#ajaxModal .modal-title');
    this.companyNameInput = page.locator('#company_name');
    this.typeOrganizationRadio = page.locator('#type_organization');
    this.typePersonRadio = page.locator('#type_person');
    this.ownerInput = page.locator('#owner_id');
    this.addressInput = page.locator('#address');
    this.cityInput = page.locator('#city');
    this.stateInput = page.locator('#state');
    this.zipInput = page.locator('#zip');
    this.countryInput = page.locator('#country');
    this.phoneInput = page.locator('#phone');
    this.websiteInput = page.locator('#website');
    this.vatNumberInput = page.locator('#vat_number');
    this.gstNumberInput = page.locator('#gst_number');
    this.saveButton = page.locator('#ajaxModal button[type="submit"]');
    this.closeButton = page.locator('#ajaxModal button.btn-close');
    this.closeFooterButton = page.locator('#ajaxModal .modal-footer button:has-text("Close")');

    // Export
    this.excelButton = page.locator('button:has-text("Excel"), a:has-text("Excel")');
    this.printButton = page.locator('button:has-text("Print"), a:has-text("Print")');

    // Confirmation modal
    this.confirmDeleteButton = page.locator('#confirmDeleteButton');
    this.cancelDeleteButton = page.locator('#confirmationModal button:has-text("Cancel")');
  }

  // ─── Tab Actions ──────────────────────────────────────────

  async clickOverviewTab(): Promise<void> {
    await this.click(this.overviewTab);
    await this.page.waitForLoadState('networkidle');
  }

  async clickClientsTab(): Promise<void> {
    await this.click(this.clientsTab);
    await this.page.waitForLoadState('networkidle');
  }

  async clickContactsTab(): Promise<void> {
    await this.click(this.contactsTab);
    await this.page.waitForLoadState('networkidle');
  }

  // ─── Modal Actions ────────────────────────────────────────

  async clickAddClient(): Promise<void> {
    logger.info('Opening Add client modal');
    await this.addClientButton.last().click();
    await this.modal.waitFor({ state: 'visible' });
    await this.companyNameInput.waitFor({ state: 'visible' });
  }

  async fillClientDetails(options: {
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

  async saveClient(): Promise<void> {
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async closeModal(): Promise<void> {
    await this.closeButton.click();
  }

  // ─── Table Actions ────────────────────────────────────────

  async searchClient(query: string): Promise<void> {
    logger.info(`Searching client: ${query}`);
    await this.searchInput.fill(query);
    await this.page.waitForLoadState('networkidle');
  }

  async getClientRowCount(): Promise<number> {
    return this.clientTableRows.count();
  }
}
