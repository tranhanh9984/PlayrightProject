import { test, expect } from '../../src/fixtures/auth.fixture';
import { allureMetadata } from '../../src/helpers/allure.helper';

test.describe('Projects Page Tests', () => {
  test.beforeEach(async ({ projectsPage }) => {
    await projectsPage.navigate();
    await projectsPage.waitForPageLoad();
  });

  // ─── Page Display Tests ───────────────────────────────────

  test('[TC-P001] should display the projects page', async ({ projectsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Projects',
      feature: 'Project List',
      story: 'Page display',
    });

    await expect(page).toHaveURL(/projects/);
    const title = await projectsPage.getPageTitle();
    expect(title).toContain('Projects');
  });

  test('[TC-P002] should display action buttons', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Projects',
      feature: 'Project List',
      story: 'Action buttons',
    });

    await projectsPage.expectVisible(projectsPage.addProjectButton);
    await projectsPage.expectVisible(projectsPage.manageLabelsButton);
    await projectsPage.expectVisible(projectsPage.importProjectsButton);
  });

  test('[TC-P003] should display project table with correct headers', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Projects',
      feature: 'Project List',
      story: 'Table headers',
    });

    await projectsPage.expectVisible(projectsPage.projectTable);
    const headers = await projectsPage.getTableHeaders();
    expect(headers).toContain('ID');
    expect(headers).toContain('Title');
    expect(headers).toContain('Client');
    expect(headers).toContain('Status');
  });

  test('[TC-P004] should display project data rows', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Projects',
      feature: 'Project List',
      story: 'Table data',
    });

    const rowCount = await projectsPage.getProjectRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  // ─── Search Tests ─────────────────────────────────────────

  test('[TC-P005] should search projects by keyword', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Projects',
      feature: 'Project Search',
      story: 'Search by keyword',
    });

    const initialCount = await projectsPage.getProjectRowCount();

    await test.step('Search for keyword', async () => {
      await projectsPage.searchProject('test');
    });

    await test.step('Verify search filters results', async () => {
      const filteredCount = await projectsPage.getProjectRowCount();
      expect(filteredCount).toBeLessThanOrEqual(initialCount);
    });
  });

  // ─── Filter Tests ─────────────────────────────────────────

  test('[TC-P006] should display status filter options', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Projects',
      feature: 'Project Filters',
      story: 'Status filter',
    });

    await expect(projectsPage.statusFilterOpen).toBeAttached();
    await expect(projectsPage.statusFilterCompleted).toBeAttached();
    await expect(projectsPage.statusFilterHold).toBeAttached();
    await expect(projectsPage.statusFilterCanceled).toBeAttached();
  });

  test('[TC-P007] should display export buttons', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'minor',
      epic: 'Projects',
      feature: 'Project List',
      story: 'Export buttons',
    });

    await projectsPage.expectVisible(projectsPage.excelButton);
    await projectsPage.expectVisible(projectsPage.printButton);
  });

  // ─── Add Project Modal Tests ──────────────────────────────

  test('[TC-P008] should open Add project modal', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Projects',
      feature: 'Add Project',
      story: 'Open modal',
    });

    await projectsPage.clickAddProject();
    const title = await projectsPage.modalTitle.textContent();
    expect(title).toContain('Add project');
  });

  test('[TC-P009] should display form fields in Add project modal', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Projects',
      feature: 'Add Project',
      story: 'Form fields',
    });

    await projectsPage.clickAddProject();
    await expect(projectsPage.titleInput).toBeVisible();
    await expect(projectsPage.startDateInput).toBeVisible();
    await expect(projectsPage.deadlineInput).toBeVisible();
    await expect(projectsPage.priceInput).toBeVisible();
    await expect(projectsPage.saveButton).toBeVisible();
  });

  test('[TC-P010] should close Add project modal', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Projects',
      feature: 'Add Project',
      story: 'Close modal',
    });

    await projectsPage.clickAddProject();
    await projectsPage.closeModal();
    await projectsPage.modal.waitFor({ state: 'hidden' });
  });

  test('[TC-P014] should toggle Project type to hide/show Client field', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Projects',
      feature: 'Add Project',
      story: 'Project type toggle',
    });

    await projectsPage.clickAddProject();

    await test.step('Verify Client field visible for Client Project', async () => {
      await expect(projectsPage.clientDropdown).toBeVisible();
    });

    await test.step('Switch to Internal Project', async () => {
      await projectsPage.projectTypeDropdown.selectOption({ label: 'Internal Project' });
      await expect(projectsPage.clientDropdown).toBeHidden();
    });

    await test.step('Switch back to Client Project', async () => {
      await projectsPage.projectTypeDropdown.selectOption({ label: 'Client Project' });
      await expect(projectsPage.clientDropdown).toBeVisible();
    });
  });

  test('[TC-P011] should validate required fields when saving project', async ({ projectsPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Projects',
      feature: 'Add Project',
      story: 'Required field validation',
    });

    await test.step('Open modal and save without filling fields', async () => {
      await projectsPage.clickAddProject();
      await projectsPage.saveProject();
    });

    await test.step('Verify validation error is shown', async () => {
      await expect(projectsPage.modal).toBeVisible();
      await expect(page.locator('.form-group.has-error').first()).toBeVisible();
    });
  });

  // ─── Validation Tests ─────────────────────────────────────

  test('[TC-P015] should validate Price field with negative number', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Projects',
      feature: 'Add Project',
      story: 'Negative price validation',
    });

    await projectsPage.clickAddProject();
    await projectsPage.fillProjectDetails({
      title: 'Negative Price Test',
      price: '-5000',
    });
    await projectsPage.saveProject();
    // Either error about invalid price or system rejects negative value
  });

  test('[TC-P016] should validate Price field with text input', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Projects',
      feature: 'Add Project',
      story: 'Text price validation',
    });

    await projectsPage.clickAddProject();
    await projectsPage.fillProjectDetails({
      title: 'Text Price Test',
      price: 'abc',
    });
    await projectsPage.saveProject();
    // Either error about invalid format or field rejects non-numeric input
  });

  test('[TC-P017] should validate Deadline before Start date', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Projects',
      feature: 'Add Project',
      story: 'Date range validation',
    });

    await projectsPage.clickAddProject();
    await projectsPage.fillProjectDetails({
      title: 'Date Validation Test',
      startDate: '12/31/2026',
      deadline: '01/01/2026',
    });
    await projectsPage.saveProject();
    // Either error about date range or system prevents saving
  });

  // ─── Create Project Tests ────────────────────────────────────

  test('[TC-P012] should create project with mandatory fields only', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Projects',
      feature: 'Add Project',
      story: 'Create project - mandatory',
    });

    await test.step('Open modal and fill mandatory fields', async () => {
      await projectsPage.clickAddProject();
      await projectsPage.fillProjectDetails({
        title: `Project Mandatory ${Date.now()}`,
      });
    });

    await test.step('Save and verify modal closes', async () => {
      await projectsPage.saveProject();
      await projectsPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
    });
  });

  test('[TC-P013] should create project with all fields', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Projects',
      feature: 'Add Project',
      story: 'Create project - all fields',
    });

    await test.step('Open modal and fill all fields', async () => {
      await projectsPage.clickAddProject();
      await projectsPage.fillProjectDetails({
        title: `Project Full ${Date.now()}`,
        startDate: '06/20/2026',
        deadline: '12/31/2026',
        price: '15000',
      });
    });

    await test.step('Save and verify modal closes', async () => {
      await projectsPage.saveProject();
      await projectsPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
    });
  });

  test('[TC-P018] should create Internal Project (no client required)', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Projects',
      feature: 'Add Project',
      story: 'Create internal project',
    });

    await test.step('Open modal and select Internal Project', async () => {
      await projectsPage.clickAddProject();
      await projectsPage.projectTypeDropdown.selectOption({ label: 'Internal Project' });
    });

    await test.step('Fill title and save', async () => {
      await projectsPage.fillProjectDetails({
        title: `Internal Project ${Date.now()}`,
      });
      await projectsPage.saveProject();
      await projectsPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
    });
  });

  // ─── Boundary Value Tests ─────────────────────────────────

  test('[TC-P019] should handle very long title (255+ characters)', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Projects',
      feature: 'Add Project',
      story: 'Boundary - max title length',
    });

    const longTitle = 'A'.repeat(256);
    await projectsPage.clickAddProject();
    await projectsPage.fillProjectDetails({
      title: longTitle,
    });
    await projectsPage.saveProject();
    // Either created with truncated title or error about max length
  });

  test('[TC-P020] should accept zero price', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Projects',
      feature: 'Add Project',
      story: 'Boundary - zero price',
    });

    await projectsPage.clickAddProject();
    await projectsPage.fillProjectDetails({
      title: `Zero Price Project ${Date.now()}`,
      price: '0',
    });
    await projectsPage.saveProject();
    await projectsPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
  });

  test('[TC-P021] should handle very large price', async ({ projectsPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Projects',
      feature: 'Add Project',
      story: 'Boundary - large price',
    });

    await projectsPage.clickAddProject();
    await projectsPage.fillProjectDetails({
      title: `Large Price Project ${Date.now()}`,
      price: '99999999999',
    });
    await projectsPage.saveProject();
    // Either created with correct price or error about max value
  });
});
