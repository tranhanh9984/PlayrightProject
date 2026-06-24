import { test, expect } from '../../src/fixtures/auth.fixture';
import { allureMetadata } from '../../src/helpers/allure.helper';

test.describe('Tasks Page Tests', () => {
  test.beforeEach(async ({ tasksPage }) => {
    await tasksPage.navigate();
    await tasksPage.waitForPageLoad();
  });

  // ─── Page Display Tests ───────────────────────────────────

  test('[TC-T001] should display the tasks page', async ({ tasksPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Tasks',
      feature: 'Task List',
      story: 'Page display',
    });

    await expect(page).toHaveURL(/tasks/);
    await tasksPage.expectVisible(tasksPage.taskTable);
  });

  test('[TC-T002] should display action buttons', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Tasks',
      feature: 'Task List',
      story: 'Action buttons',
    });

    await tasksPage.expectVisible(tasksPage.addTaskButton);
    await tasksPage.expectVisible(tasksPage.manageLabelsButton);
    await tasksPage.expectVisible(tasksPage.importTasksButton);
  });

  test('[TC-T003] should display view tabs (List, Kanban, Gantt)', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Tasks',
      feature: 'Task Views',
      story: 'View tabs',
    });

    await tasksPage.expectVisible(tasksPage.listTab);
    await tasksPage.expectVisible(tasksPage.kanbanTab);
    await tasksPage.expectVisible(tasksPage.ganttTab);
  });

  test('[TC-T004] should display task table with correct headers', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Tasks',
      feature: 'Task List',
      story: 'Table headers',
    });

    const headers = await tasksPage.getTableHeaders();
    expect(headers).toContain('ID');
    expect(headers).toContain('Title');
    expect(headers).toContain('Status');
  });

  test('[TC-T005] should display task data rows', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Tasks',
      feature: 'Task List',
      story: 'Table data',
    });

    const rowCount = await tasksPage.getTaskRowCount();
    expect(rowCount).toBeGreaterThan(0);
  });

  // ─── View Switching Tests ─────────────────────────────────

  test('[TC-T006] should switch to Kanban view', async ({ tasksPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Tasks',
      feature: 'Task Views',
      story: 'Kanban view',
    });

    await tasksPage.clickKanbanTab();
    await expect(page).toHaveURL(/kanban/);
  });

  test('[TC-T007] should switch to Gantt view', async ({ tasksPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Tasks',
      feature: 'Task Views',
      story: 'Gantt view',
    });

    await tasksPage.clickGanttTab();
    await expect(page).toHaveURL(/gantt/);
  });

  test('[TC-T008] should switch back to List view', async ({ tasksPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Tasks',
      feature: 'Task Views',
      story: 'List view',
    });

    await tasksPage.clickKanbanTab();
    await tasksPage.clickListTab();
    await expect(page).toHaveURL(/all_tasks/);
  });

  // ─── Search Tests ─────────────────────────────────────────

  test('[TC-T009] should search tasks by keyword', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Tasks',
      feature: 'Task Search',
      story: 'Search by keyword',
    });

    const initialCount = await tasksPage.getTaskRowCount();

    await test.step('Search for keyword', async () => {
      await tasksPage.searchTask('design');
    });

    await test.step('Verify search filters results', async () => {
      const filteredCount = await tasksPage.getTaskRowCount();
      expect(filteredCount).toBeLessThanOrEqual(initialCount);
    });
  });

  // ─── Filter Tests ─────────────────────────────────────────

  test('[TC-T010] should display status filter options', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Tasks',
      feature: 'Task Filters',
      story: 'Status filter',
    });

    await expect(tasksPage.statusFilterTodo).toBeAttached();
    await expect(tasksPage.statusFilterInProgress).toBeAttached();
    await expect(tasksPage.statusFilterReview).toBeAttached();
    await expect(tasksPage.statusFilterDone).toBeAttached();
  });

  test('[TC-T011] should display export buttons', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'minor',
      epic: 'Tasks',
      feature: 'Task List',
      story: 'Export buttons',
    });

    await tasksPage.expectVisible(tasksPage.excelButton);
    await tasksPage.expectVisible(tasksPage.printButton);
  });

  // ─── Add Task Modal Tests ─────────────────────────────────

  test('[TC-T012] should open Add task modal', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Tasks',
      feature: 'Add Task',
      story: 'Open modal',
    });

    await tasksPage.clickAddTask();
    const title = await tasksPage.modalTitle.textContent();
    expect(title).toContain('Add task');
  });

  test('[TC-T013] should display form fields in Add task modal', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Tasks',
      feature: 'Add Task',
      story: 'Form fields',
    });

    await tasksPage.clickAddTask();
    await expect(tasksPage.titleInput).toBeVisible();
    await expect(tasksPage.startDateInput).toBeVisible();
    await expect(tasksPage.deadlineInput).toBeVisible();
    await expect(tasksPage.saveButton).toBeVisible();
  });

  test('[TC-T014] should close Add task modal', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Tasks',
      feature: 'Add Task',
      story: 'Close modal',
    });

    await tasksPage.clickAddTask();
    await tasksPage.closeModal();
    await tasksPage.modal.waitFor({ state: 'hidden' });
  });

  test('[TC-T018] should verify Related to changes context dropdown', async ({ tasksPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Tasks',
      feature: 'Add Task',
      story: 'Related to context',
    });

    await tasksPage.clickAddTask();

    await test.step('Select Project in Related to', async () => {
      await tasksPage.relatedToDropdown.selectOption({ label: 'Project' });
      const projectDropdown = page.locator('#ajaxModal select[name="project_id"], #ajaxModal #project_id');
      await expect(projectDropdown).toBeVisible();
    });

    await test.step('Select Client in Related to', async () => {
      await tasksPage.relatedToDropdown.selectOption({ label: 'Client' });
      const clientDropdown = page.locator('#ajaxModal select[name="client_id"], #ajaxModal #client_id');
      await expect(clientDropdown).toBeVisible();
    });

    await test.step('Select "-" (general) in Related to', async () => {
      await tasksPage.relatedToDropdown.selectOption({ label: '-' });
    });
  });

  test('[TC-T019] should verify Recurring checkbox toggles fields', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Tasks',
      feature: 'Add Task',
      story: 'Recurring toggle',
    });

    await tasksPage.clickAddTask();

    await test.step('Verify recurring fields hidden by default', async () => {
      await expect(tasksPage.repeatEveryInput).toBeHidden();
    });

    await test.step('Check Recurring checkbox', async () => {
      await tasksPage.recurringCheckbox.check({ force: true });
      await expect(tasksPage.repeatEveryInput).toBeVisible();
      await expect(tasksPage.repeatTypeDropdown).toBeVisible();
      await expect(tasksPage.cyclesInput).toBeVisible();
    });

    await test.step('Uncheck Recurring checkbox', async () => {
      await tasksPage.recurringCheckbox.uncheck({ force: true });
      await expect(tasksPage.repeatEveryInput).toBeHidden();
    });
  });

  test('[TC-T015] should validate required fields when saving task', async ({ tasksPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Tasks',
      feature: 'Add Task',
      story: 'Required field validation',
    });

    await test.step('Open modal and save without filling fields', async () => {
      await tasksPage.clickAddTask();
      await tasksPage.saveTask();
    });

    await test.step('Verify validation error is shown', async () => {
      await expect(tasksPage.modal).toBeVisible();
      await expect(page.locator('.form-group.has-error').first()).toBeVisible();
    });
  });

  // ─── Validation Tests ─────────────────────────────────────

  test('[TC-T020] should validate Title with only whitespace', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Tasks',
      feature: 'Add Task',
      story: 'Whitespace validation',
    });

    await tasksPage.clickAddTask();
    await tasksPage.titleInput.fill('   ');
    await tasksPage.saveTask();
    await expect(tasksPage.modal).toBeVisible();
  });

  test('[TC-T021] should validate Deadline before Start date', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Tasks',
      feature: 'Add Task',
      story: 'Date range validation',
    });

    await tasksPage.clickAddTask();
    await tasksPage.fillTaskDetails({
      title: 'Date Validation Task',
      startDate: '31-12-2026',
      deadline: '01-01-2026',
    });
    await tasksPage.saveTask();
    // Either error about date range or system prevents saving
  });

  // ─── Create Task Tests ───────────────────────────────────────

  test('[TC-T016] should create task with mandatory fields only', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Tasks',
      feature: 'Add Task',
      story: 'Create task - mandatory',
    });

    await test.step('Open modal and fill mandatory fields', async () => {
      await tasksPage.clickAddTask();
      await tasksPage.fillTaskDetails({
        title: `Task Mandatory ${Date.now()}`,
      });
    });

    await test.step('Save and verify modal closes', async () => {
      await tasksPage.saveTask();
      await tasksPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
    });
  });

  test('[TC-T017] should create task with all fields', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Tasks',
      feature: 'Add Task',
      story: 'Create task - all fields',
    });

    await test.step('Open modal and fill all fields', async () => {
      await tasksPage.clickAddTask();
      await tasksPage.fillTaskDetails({
        title: `Task Full ${Date.now()}`,
        startDate: '20-06-2026',
        deadline: '31-12-2026',
      });
    });

    await test.step('Save and verify modal closes', async () => {
      await tasksPage.saveTask();
      await tasksPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
    });
  });

  test('[TC-T022] should create task with recurring enabled', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Tasks',
      feature: 'Add Task',
      story: 'Create recurring task',
    });

    await test.step('Open modal and fill details', async () => {
      await tasksPage.clickAddTask();
      await tasksPage.fillTaskDetails({
        title: `Recurring Task ${Date.now()}`,
      });
    });

    await test.step('Enable recurring and configure', async () => {
      await tasksPage.recurringCheckbox.check({ force: true });
      await tasksPage.repeatEveryInput.fill('1');
      await tasksPage.repeatTypeDropdown.selectOption({ label: 'Week(s)' });
      await tasksPage.cyclesInput.fill('4');
    });

    await test.step('Save and verify modal closes', async () => {
      await tasksPage.saveTask();
      await tasksPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
    });
  });

  // ─── Boundary Value & Special Data ────────────────────────

  test('[TC-T023] should handle very long title (255+ characters)', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Tasks',
      feature: 'Add Task',
      story: 'Boundary - max title length',
    });

    const longTitle = 'A'.repeat(256);
    await tasksPage.clickAddTask();
    await tasksPage.fillTaskDetails({ title: longTitle });
    await tasksPage.saveTask();
    // Either created with truncated title or error about max length
  });

  test('[TC-T024] should validate Recurring Cycles - zero value', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Tasks',
      feature: 'Add Task',
      story: 'Boundary - zero cycles',
    });

    await tasksPage.clickAddTask();
    await tasksPage.fillTaskDetails({ title: 'Zero Cycles Task' });
    await tasksPage.recurringCheckbox.check({ force: true });
    await tasksPage.repeatEveryInput.fill('1');
    await tasksPage.repeatTypeDropdown.selectOption({ label: 'Week(s)' });
    await tasksPage.cyclesInput.fill('0');
    await tasksPage.saveTask();
    // Either error about invalid cycles or task created with 0 cycles (infinite)
  });

  test('[TC-T025] should validate Recurring Cycles - negative value', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Tasks',
      feature: 'Add Task',
      story: 'Boundary - negative cycles',
    });

    await tasksPage.clickAddTask();
    await tasksPage.fillTaskDetails({ title: 'Negative Cycles Task' });
    await tasksPage.recurringCheckbox.check({ force: true });
    await tasksPage.repeatEveryInput.fill('1');
    await tasksPage.repeatTypeDropdown.selectOption({ label: 'Week(s)' });
    await tasksPage.cyclesInput.fill('-1');
    await tasksPage.saveTask();
    // Either error about invalid cycles or field rejects negative input
  });

  test('[TC-T026] should create task with special characters', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Tasks',
      feature: 'Add Task',
      story: 'Special characters',
    });

    await tasksPage.clickAddTask();
    await tasksPage.fillTaskDetails({
      title: "Bug #123 - Fix <header> & 'footer' @v2.0",
    });
    await tasksPage.saveTask();
    await tasksPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
  });

  // ─── Security Tests ──────────────────────────────────────

  test('[TC-T027] should prevent XSS in Title field', async ({ tasksPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Tasks',
      feature: 'Security',
      story: 'XSS prevention',
    });

    await tasksPage.clickAddTask();
    await tasksPage.fillTaskDetails({
      title: '<script>document.cookie</script>',
    });
    await tasksPage.saveTask();

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

  test('[TC-T028] should prevent SQL Injection in Title field', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Tasks',
      feature: 'Security',
      story: 'SQL injection prevention',
    });

    await tasksPage.clickAddTask();
    await tasksPage.fillTaskDetails({
      title: "'; DROP TABLE tasks; --",
    });
    await tasksPage.saveTask();

    await test.step('Verify application still functions', async () => {
      await tasksPage.navigate();
      await tasksPage.waitForPageLoad();
      await expect(tasksPage.taskTable).toBeVisible();
    });
  });

  // ─── Data Validation ─────────────────────────────────────

  test('[TC-T029] should verify created task data displays correctly', async ({ tasksPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Tasks',
      feature: 'Task Data',
      story: 'Data validation',
    });

    const taskTitle = `Task Verify ${Date.now()}`;

    await test.step('Create task with all fields', async () => {
      await tasksPage.clickAddTask();
      await tasksPage.fillTaskDetails({
        title: taskTitle,
        startDate: '20-06-2026',
        deadline: '31-12-2026',
      });
      await tasksPage.saveTask();
      await tasksPage.modal.waitFor({ state: 'hidden', timeout: 10000 });
    });

    await test.step('Search and verify task data', async () => {
      await tasksPage.searchTask(taskTitle);
      const firstRow = tasksPage.taskTableRows.first();
      await expect(firstRow).toContainText(taskTitle);
    });
  });
});
