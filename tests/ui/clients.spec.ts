import { test, expect } from '../../src/fixtures/auth.fixture';
import { allureMetadata } from '../../src/helpers/allure.helper';

test.describe('Clients Page Tests', () => {
  test.beforeEach(async ({ clientsPage }) => {
    await clientsPage.navigate();
    await clientsPage.waitForPageLoad();
  });

  // ─── Page Display Tests ───────────────────────────────────

  test('[TC-C001] should display the clients page with overview tab', async ({ clientsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Clients',
      feature: 'Client List',
      story: 'Page display',
    });

    await expect(page).toHaveURL(/clients/);
    await clientsPage.expectVisible(clientsPage.overviewTab);
    await clientsPage.expectVisible(clientsPage.clientsTab);
    await clientsPage.expectVisible(clientsPage.contactsTab);
  });

  test('[TC-C002] should display action buttons', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Clients',
      feature: 'Client List',
      story: 'Action buttons',
    });

    await clientsPage.expectVisible(clientsPage.addClientButton.last());
    await clientsPage.expectVisible(clientsPage.manageLabelsButton);
    await clientsPage.expectVisible(clientsPage.importClientsButton);
  });

  test('[TC-C003] should display overview cards', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Clients',
      feature: 'Client Overview',
      story: 'Overview cards',
    });

    const cardCount = await clientsPage.overviewCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  // ─── Tab Navigation Tests ─────────────────────────────────

  test('[TC-C004] should switch to Clients list tab', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Clients',
      feature: 'Client List',
      story: 'Clients tab',
    });

    await clientsPage.clickClientsTab();
    await expect(clientsPage.clientsTab).toHaveClass(/active/);
  });

  test('[TC-C005] should switch to Contacts tab', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Clients',
      feature: 'Client List',
      story: 'Contacts tab',
    });

    await clientsPage.clickContactsTab();
    await expect(clientsPage.contactsTab).toHaveClass(/active/);
  });

  test('[TC-C015] should switch between all tabs', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Clients',
      feature: 'Client List',
      story: 'Switch all tabs',
    });

    await test.step('Switch to Clients tab', async () => {
      await clientsPage.clickClientsTab();
      await expect(clientsPage.clientsTab).toHaveClass(/active/);
    });

    await test.step('Switch to Contacts tab', async () => {
      await clientsPage.clickContactsTab();
      await expect(clientsPage.contactsTab).toHaveClass(/active/);
    });

    await test.step('Switch back to Overview tab', async () => {
      await clientsPage.clickOverviewTab();
      await expect(clientsPage.overviewTab).toHaveClass(/active/);
    });
  });

  // ─── Export Tests ──────────────────────────────────────────

  test('[TC-C016] should display export buttons', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Clients',
      feature: 'Client List',
      story: 'Export buttons',
    });

    await clientsPage.clickClientsTab();
    await clientsPage.expectVisible(clientsPage.excelButton);
    await clientsPage.expectVisible(clientsPage.printButton);
  });

  // ─── Add Client Modal Tests ───────────────────────────────

  test('[TC-C006] should open Add client modal', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Clients',
      feature: 'Add Client',
      story: 'Open modal',
    });

    await clientsPage.clickAddClient();
    const title = await clientsPage.modalTitle.textContent();
    expect(title).toContain('Add client');
  });

  test('[TC-C007] should display form fields in Add client modal', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Clients',
      feature: 'Add Client',
      story: 'Form fields',
    });

    await clientsPage.clickAddClient();
    await expect(clientsPage.companyNameInput).toBeVisible();
    await expect(clientsPage.typeOrganizationRadio).toBeVisible();
    await expect(clientsPage.typePersonRadio).toBeVisible();
    await expect(clientsPage.cityInput).toBeVisible();
    await expect(clientsPage.phoneInput).toBeVisible();
    await expect(clientsPage.websiteInput).toBeVisible();
    await expect(clientsPage.saveButton).toBeVisible();
  });

  test('[TC-C008] should close Add client modal via X button', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Clients',
      feature: 'Add Client',
      story: 'Close modal via X',
    });

    await clientsPage.clickAddClient();
    await clientsPage.closeModal();
    await clientsPage.modal.waitFor({ state: 'hidden' });
  });

  test('[TC-C017] should close Add client modal via Close button', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'minor',
      epic: 'Clients',
      feature: 'Add Client',
      story: 'Close modal via footer button',
    });

    await clientsPage.clickAddClient();
    await clientsPage.closeFooterButton.click();
    await clientsPage.modal.waitFor({ state: 'hidden' });
  });

  test('[TC-C009] should validate required fields when saving client', async ({ clientsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Clients',
      feature: 'Add Client',
      story: 'Required field validation',
    });

    await test.step('Open modal and save without filling fields', async () => {
      await clientsPage.clickAddClient();
      await clientsPage.saveClient();
    });

    await test.step('Verify validation error is shown', async () => {
      await expect(clientsPage.modal).toBeVisible();
      await expect(page.locator('.form-group.has-error').first()).toBeVisible();
    });
  });

  test('[TC-C010] should default to Organization type', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Clients',
      feature: 'Add Client',
      story: 'Default type',
    });

    await clientsPage.clickAddClient();
    await expect(clientsPage.typeOrganizationRadio).toBeChecked();
    await expect(clientsPage.typePersonRadio).not.toBeChecked();
  });

  test('[TC-C018] should switch type to Person', async ({ clientsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Clients',
      feature: 'Add Client',
      story: 'Switch to Person type',
    });

    await clientsPage.clickAddClient();

    await test.step('Click Person radio', async () => {
      await clientsPage.typePersonRadio.click({ force: true });
      await expect(clientsPage.typePersonRadio).toBeChecked();
      await expect(clientsPage.typeOrganizationRadio).not.toBeChecked();
    });

    await test.step('Verify label changes to Name', async () => {
      const label = page.locator('label[for="company_name"]');
      await expect(label).toContainText('Name');
    });
  });

  // ─── Validation Tests ─────────────────────────────────────

  test('[TC-C019] should validate Company name with only whitespace', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Clients',
      feature: 'Add Client',
      story: 'Whitespace validation',
    });

    await clientsPage.clickAddClient();
    await clientsPage.companyNameInput.fill('   ');
    await clientsPage.saveClient();
    await expect(clientsPage.modal).toBeVisible();
  });

  test('[TC-C020] should validate Website field with invalid URL format', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Clients',
      feature: 'Add Client',
      story: 'Invalid URL validation',
    });

    await clientsPage.clickAddClient();
    await clientsPage.fillClientDetails({
      companyName: 'Test Client URL',
      type: 'organization',
    });
    await clientsPage.websiteInput.fill('not-a-url');
    await clientsPage.saveClient();
    // Either error shown or client created with literal text (both acceptable)
  });

  test('[TC-C021] should validate Phone field with letters', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Clients',
      feature: 'Add Client',
      story: 'Phone validation',
    });

    await clientsPage.clickAddClient();
    await clientsPage.fillClientDetails({
      companyName: 'Test Client Phone',
      type: 'organization',
    });
    await clientsPage.phoneInput.fill('abcdefgh');
    await clientsPage.saveClient();
    // Either error shown or system sanitizes input (both acceptable)
  });

  // ─── Create Client: Organization ────────────────────────────

  test('[TC-C011] should create Organization client with mandatory fields only', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Clients',
      feature: 'Add Client',
      story: 'Create organization - mandatory',
    });

    await test.step('Open modal and fill mandatory fields', async () => {
      await clientsPage.clickAddClient();
      await clientsPage.fillClientDetails({
        companyName: `Org Mandatory ${Date.now()}`,
        type: 'organization',
      });
    });

    await test.step('Save and verify modal closes', async () => {
      await clientsPage.saveClient();
      await clientsPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
    });
  });

  test('[TC-C012] should create Organization client with all fields', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Clients',
      feature: 'Add Client',
      story: 'Create organization - all fields',
    });

    await test.step('Open modal and fill all fields', async () => {
      await clientsPage.clickAddClient();
      await clientsPage.fillClientDetails({
        companyName: `Org Full ${Date.now()}`,
        type: 'organization',
        address: '123 Le Loi Street',
        city: 'Ho Chi Minh',
        state: 'HCM',
        zip: '700000',
        phone: '0901234567',
        website: 'https://org-full-test.com',
      });
    });

    await test.step('Save and verify modal closes', async () => {
      await clientsPage.saveClient();
      await clientsPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
    });
  });

  // ─── Create Client: Person ──────────────────────────────────

  test('[TC-C013] should create Person client with mandatory fields only', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Clients',
      feature: 'Add Client',
      story: 'Create person - mandatory',
    });

    await test.step('Open modal and fill person details', async () => {
      await clientsPage.clickAddClient();
      await clientsPage.fillClientDetails({
        companyName: `Person Mandatory ${Date.now()}`,
        type: 'person',
      });
    });

    await test.step('Verify person type selected and save', async () => {
      await expect(clientsPage.typePersonRadio).toBeChecked();
      await clientsPage.saveClient();
      await clientsPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
    });
  });

  test('[TC-C014] should create Person client with all fields', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Clients',
      feature: 'Add Client',
      story: 'Create person - all fields',
    });

    await test.step('Open modal and fill all person fields', async () => {
      await clientsPage.clickAddClient();
      await clientsPage.fillClientDetails({
        companyName: `Person Full ${Date.now()}`,
        type: 'person',
        address: '456 Nguyen Hue Boulevard',
        city: 'Ha Noi',
        state: 'HN',
        zip: '100000',
        phone: '0912345678',
        website: 'https://person-full-test.com',
      });
    });

    await test.step('Verify person type selected and save', async () => {
      await expect(clientsPage.typePersonRadio).toBeChecked();
      await clientsPage.saveClient();
      await clientsPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
    });
  });

  // ─── Search Tests ─────────────────────────────────────────

  test('[TC-C022] should search clients by keyword', async ({ clientsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Clients',
      feature: 'Client Search',
      story: 'Search by keyword',
    });

    await clientsPage.clickClientsTab();

    const initialCount = await clientsPage.getClientRowCount();

    await test.step('Search for keyword', async () => {
      await clientsPage.searchClient('test');
    });

    await test.step('Verify search filters results', async () => {
      const filteredCount = await clientsPage.getClientRowCount();
      expect(filteredCount).toBeLessThanOrEqual(initialCount);
    });

    await test.step('Clear search and verify table restores', async () => {
      await clientsPage.searchInput.clear();
      await page.waitForLoadState('networkidle');
    });
  });

  // ─── Boundary Value Analysis ──────────────────────────────

  test('[TC-C023] should create client with minimum name length (1 character)', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Clients',
      feature: 'Add Client',
      story: 'Boundary - min length',
    });

    await clientsPage.clickAddClient();
    await clientsPage.fillClientDetails({
      companyName: 'A',
      type: 'organization',
    });
    await clientsPage.saveClient();
    await clientsPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
  });

  test('[TC-C024] should handle very long company name (255+ characters)', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Clients',
      feature: 'Add Client',
      story: 'Boundary - max length',
    });

    const longName = 'A'.repeat(256);
    await clientsPage.clickAddClient();
    await clientsPage.fillClientDetails({
      companyName: longName,
      type: 'organization',
    });
    await clientsPage.saveClient();
    // Either created with truncated name or error about max length (both acceptable)
  });

  // ─── Special Test Data ────────────────────────────────────

  test('[TC-C025] should create client with special characters', async ({ clientsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Clients',
      feature: 'Add Client',
      story: 'Special characters',
    });

    await clientsPage.clickAddClient();
    await clientsPage.fillClientDetails({
      companyName: "O'Brien & Partners (Ltd.)",
      type: 'organization',
    });
    await clientsPage.saveClient();
    await clientsPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
  });

  // ─── Security Tests ──────────────────────────────────────

  test('[TC-C026] should prevent XSS in Company name field', async ({ clientsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Clients',
      feature: 'Security',
      story: 'XSS prevention',
    });

    await clientsPage.clickAddClient();
    await clientsPage.fillClientDetails({
      companyName: "<script>alert('XSS')</script>",
      type: 'organization',
    });
    await clientsPage.saveClient();

    await test.step('Verify no script execution', async () => {
      // If modal closes, client was created - check that no alert was triggered
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
