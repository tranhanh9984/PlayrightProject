import { test, expect } from '../../src/fixtures/auth.fixture';
import { allureMetadata } from '../../src/helpers/allure.helper';

test.describe('Leads Page Tests', () => {
  test.beforeEach(async ({ leadsPage }) => {
    await leadsPage.navigate();
    await leadsPage.waitForPageLoad();
  });

  // ─── Page Display Tests ───────────────────────────────────

  test('[TC-LD001] should display the leads page', async ({ leadsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Leads',
      feature: 'Lead List',
      story: 'Page display',
    });

    await expect(page).toHaveURL(/leads/);
    await leadsPage.expectVisible(leadsPage.leadTable);
  });

  test('[TC-LD002] should display action buttons', async ({ leadsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Leads',
      feature: 'Lead List',
      story: 'Action buttons',
    });

    await leadsPage.expectVisible(leadsPage.addLeadButton);
    await leadsPage.expectVisible(leadsPage.manageLabelsButton);
    await leadsPage.expectVisible(leadsPage.importLeadsButton);
  });

  test('[TC-LD003] should display view tabs (Leads, Kanban)', async ({ leadsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Leads',
      feature: 'Lead Views',
      story: 'View tabs',
    });

    await leadsPage.expectVisible(leadsPage.leadsTab);
    await leadsPage.expectVisible(leadsPage.kanbanTab);
  });

  test('[TC-LD004] should display lead table with correct headers', async ({ leadsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Leads',
      feature: 'Lead List',
      story: 'Table headers',
    });

    const headers = await leadsPage.getTableHeaders();
    expect(headers).toContain('Name');
    expect(headers).toContain('Owner');
    expect(headers).toContain('Status');
  });

  test('[TC-LD005] should display lead data rows', async ({ leadsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Leads',
      feature: 'Lead List',
      story: 'Table data',
    });

    const rowCount = await leadsPage.getLeadRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  // ─── View Switching Tests ─────────────────────────────────

  test('[TC-LD006] should switch to Kanban view', async ({ leadsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Leads',
      feature: 'Lead Views',
      story: 'Kanban view',
    });

    await leadsPage.clickKanbanTab();
    await expect(page).toHaveURL(/kanban/);
  });

  test('[TC-LD007] should switch back to Leads list view', async ({ leadsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Leads',
      feature: 'Lead Views',
      story: 'List view',
    });

    await leadsPage.clickKanbanTab();
    await leadsPage.clickLeadsTab();
    await expect(page).toHaveURL(/leads$/);
  });

  // ─── Search Tests ─────────────────────────────────────────

  test('[TC-LD008] should search leads by keyword', async ({ leadsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Leads',
      feature: 'Lead Search',
      story: 'Search by keyword',
    });

    const initialCount = await leadsPage.getLeadRowCount();

    await test.step('Search for keyword', async () => {
      await leadsPage.searchLead('tech');
    });

    await test.step('Verify search filters results', async () => {
      const filteredCount = await leadsPage.getLeadRowCount();
      expect(filteredCount).toBeLessThanOrEqual(initialCount);
    });
  });

  test('[TC-LD009] should display export buttons', async ({ leadsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'minor',
      epic: 'Leads',
      feature: 'Lead List',
      story: 'Export buttons',
    });

    await leadsPage.expectVisible(leadsPage.excelButton);
    await leadsPage.expectVisible(leadsPage.printButton);
  });

  // ─── Add Lead Modal Tests ─────────────────────────────────

  test('[TC-LD010] should open Add lead modal', async ({ leadsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Leads',
      feature: 'Add Lead',
      story: 'Open modal',
    });

    await leadsPage.clickAddLead();
    const title = await leadsPage.modalTitle.textContent();
    expect(title).toContain('Add lead');
  });

  test('[TC-LD011] should display form fields in Add lead modal', async ({ leadsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Leads',
      feature: 'Add Lead',
      story: 'Form fields',
    });

    await leadsPage.clickAddLead();
    await expect(leadsPage.companyNameInput).toBeVisible();
    await expect(leadsPage.typeOrganizationRadio).toBeVisible();
    await expect(leadsPage.typePersonRadio).toBeVisible();
    await expect(leadsPage.cityInput).toBeVisible();
    await expect(leadsPage.phoneInput).toBeVisible();
    await expect(leadsPage.saveButton).toBeVisible();
  });

  test('[TC-LD012] should close Add lead modal', async ({ leadsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Leads',
      feature: 'Add Lead',
      story: 'Close modal',
    });

    await leadsPage.clickAddLead();
    await leadsPage.closeModal();
    await leadsPage.modal.waitFor({ state: 'hidden' });
  });

  test('[TC-LD013] should validate required fields when saving lead', async ({ leadsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Leads',
      feature: 'Add Lead',
      story: 'Required field validation',
    });

    await test.step('Open modal and save without filling fields', async () => {
      await leadsPage.clickAddLead();
      await leadsPage.saveLead();
    });

    await test.step('Verify validation error is shown', async () => {
      await expect(leadsPage.modal).toBeVisible();
      await expect(page.locator('.form-group.has-error').first()).toBeVisible();
    });
  });

  test('[TC-LD014] should default to Organization type', async ({ leadsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Leads',
      feature: 'Add Lead',
      story: 'Default type',
    });

    await leadsPage.clickAddLead();
    await expect(leadsPage.typeOrganizationRadio).toBeChecked({ timeout: 10000 });
    await expect(leadsPage.typePersonRadio).not.toBeChecked();
  });

  test('[TC-LD019] should switch type to Person', async ({ leadsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Leads',
      feature: 'Add Lead',
      story: 'Switch to Person type',
    });

    await leadsPage.clickAddLead();

    await test.step('Click Person radio', async () => {
      await leadsPage.typePersonRadio.click({ force: true });
      await expect(leadsPage.typePersonRadio).toBeChecked();
      await expect(leadsPage.typeOrganizationRadio).not.toBeChecked();
    });

    await test.step('Verify label changes to Name', async () => {
      const label = page.locator('label[for="company_name"]');
      await expect(label).toContainText('Name');
    });
  });

  // ─── Validation Tests ─────────────────────────────────────

  test('[TC-LD020] should validate Company name with only whitespace', async ({ leadsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Leads',
      feature: 'Add Lead',
      story: 'Whitespace validation',
    });

    await leadsPage.clickAddLead();
    await leadsPage.companyNameInput.fill('   ');
    await leadsPage.saveLead();
    await expect(leadsPage.modal).toBeVisible();
  });

  // ─── Create Lead: Organization ──────────────────────────────

  test('[TC-LD015] should create Organization lead with mandatory fields only', async ({ leadsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Leads',
      feature: 'Add Lead',
      story: 'Create organization - mandatory',
    });

    await test.step('Open modal and fill mandatory fields', async () => {
      await leadsPage.clickAddLead();
      await leadsPage.fillLeadDetails({
        companyName: `Lead Org Mandatory ${Date.now()}`,
        type: 'organization',
      });
    });

    await test.step('Save and verify modal closes', async () => {
      await leadsPage.saveLead();
      await leadsPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
    });
  });

  test('[TC-LD016] should create Organization lead with all fields', async ({ leadsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Leads',
      feature: 'Add Lead',
      story: 'Create organization - all fields',
    });

    await test.step('Open modal and fill all fields', async () => {
      await leadsPage.clickAddLead();
      await leadsPage.fillLeadDetails({
        companyName: `Lead Org Full ${Date.now()}`,
        type: 'organization',
        address: '789 Tran Hung Dao Street',
        city: 'Ha Noi',
        state: 'HN',
        zip: '100000',
        phone: '0987654321',
        website: 'https://lead-org-full.com',
      });
    });

    await test.step('Save and verify modal closes', async () => {
      await leadsPage.saveLead();
      await leadsPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
    });
  });

  // ─── Create Lead: Person ────────────────────────────────────

  test('[TC-LD017] should create Person lead with mandatory fields only', async ({ leadsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Leads',
      feature: 'Add Lead',
      story: 'Create person - mandatory',
    });

    await test.step('Open modal and fill person details', async () => {
      await leadsPage.clickAddLead();
      await leadsPage.fillLeadDetails({
        companyName: `Lead Person Mandatory ${Date.now()}`,
        type: 'person',
      });
    });

    await test.step('Verify person type selected and save', async () => {
      await expect(leadsPage.typePersonRadio).toBeChecked();
      await leadsPage.saveLead();
      await leadsPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
    });
  });

  test('[TC-LD018] should create Person lead with all fields', async ({ leadsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Leads',
      feature: 'Add Lead',
      story: 'Create person - all fields',
    });

    await test.step('Open modal and fill all person fields', async () => {
      await leadsPage.clickAddLead();
      await leadsPage.fillLeadDetails({
        companyName: `Lead Person Full ${Date.now()}`,
        type: 'person',
        address: '321 Hai Ba Trung Street',
        city: 'Da Nang',
        state: 'DN',
        zip: '550000',
        phone: '0976543210',
        website: 'https://lead-person-full.com',
      });
    });

    await test.step('Verify person type selected and save', async () => {
      await expect(leadsPage.typePersonRadio).toBeChecked();
      await leadsPage.saveLead();
      await leadsPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
    });
  });

  // ─── Boundary Value & Special Data ────────────────────────

  test('[TC-LD021] should handle very long company name (255+ characters)', async ({ leadsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Leads',
      feature: 'Add Lead',
      story: 'Boundary - max length',
    });

    const longName = 'A'.repeat(256);
    await leadsPage.clickAddLead();
    await leadsPage.fillLeadDetails({
      companyName: longName,
      type: 'organization',
    });
    await leadsPage.saveLead();
    // Either created with truncated name or error about max length
  });

  // ─── Business Rule - Status Verification ──────────────────

  test('[TC-LD022] should verify lead status displays correctly after creation', async ({ leadsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Leads',
      feature: 'Add Lead',
      story: 'Status verification',
    });

    const leadName = `Lead Status Test ${Date.now()}`;

    await test.step('Create lead with Qualified status', async () => {
      await leadsPage.clickAddLead();
      await leadsPage.fillLeadDetails({
        companyName: leadName,
        type: 'organization',
      });
      await leadsPage.statusDropdown.selectOption({ label: 'Qualified' });
      await leadsPage.saveLead();
      await leadsPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
    });

    await test.step('Search and verify status', async () => {
      await leadsPage.searchLead(leadName);
      const statusCell = leadsPage.leadTableRows.first().locator('td').last();
      await expect(statusCell).toContainText('Qualified');
    });
  });

  // ─── Security Tests ──────────────────────────────────────

  test('[TC-LD023] should prevent XSS in Company name field', async ({ leadsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Leads',
      feature: 'Security',
      story: 'XSS prevention',
    });

    await leadsPage.clickAddLead();
    await leadsPage.fillLeadDetails({
      companyName: "<img src=x onerror=alert('XSS')>",
      type: 'organization',
    });
    await leadsPage.saveLead();

    await test.step('Verify no script execution', async () => {
      const dialogTriggered = await Promise.race([
        new Promise<boolean>((resolve) => {
          page.once('dialog', () => resolve(true));
          setTimeout(() => resolve(false), 3000);
        }),
      ]);
      expect(dialogTriggered).toBeFalsy();
    });
  });
});
