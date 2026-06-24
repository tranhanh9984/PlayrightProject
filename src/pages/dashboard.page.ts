import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '../core/base.page';
import { NavbarComponent } from './components/navbar.component';

export class DashboardPage extends BasePage {
  protected readonly path = '/dashboard';

  // ─── Components ───────────────────────────────────────────
  readonly navbar: NavbarComponent;

  // ─── Locators ─────────────────────────────────────────────
  readonly welcomeMessage: Locator;
  readonly statsCards: Locator;
  readonly recentActivity: Locator;
  readonly searchInput: Locator;

  // ─── Summary Widgets ────────────────────────────────────────
  readonly myOpenTasksWidget: Locator;
  readonly eventsTodayWidget: Locator;
  readonly dueWidget: Locator;

  // ─── Projects Overview ──────────────────────────────────────
  readonly projectsOverviewSection: Locator;
  readonly projectsOpenCount: Locator;
  readonly projectsCompletedCount: Locator;
  readonly projectsHoldCount: Locator;

  // ─── Invoice Overview ───────────────────────────────────────
  readonly invoiceOverviewSection: Locator;
  readonly invoiceOverviewChart: Locator;

  // ─── Income vs Expenses ─────────────────────────────────────
  readonly incomeExpensesSection: Locator;
  readonly incomeExpenseChart: Locator;
  readonly dashboardIncomeVsExpensesChart: Locator;

  // ─── All Tasks Overview ─────────────────────────────────────
  readonly allTasksOverviewSection: Locator;
  readonly allTasksOverviewChart: Locator;

  // ─── Team Members ───────────────────────────────────────────
  readonly teamMembersSection: Locator;
  readonly teamMembersLink: Locator;
  readonly membersClockedInLink: Locator;

  // ─── Ticket Status ──────────────────────────────────────────
  readonly ticketStatusSection: Locator;
  readonly ticketStatusChart: Locator;
  readonly ticketNewLink: Locator;
  readonly ticketOpenLink: Locator;

  // ─── Charts ─────────────────────────────────────────────────
  readonly allCharts: Locator;

  // ─── Clock In/Out ───────────────────────────────────────────
  readonly clockWidget: Locator;
  readonly clockInButton: Locator;
  readonly clockOutButton: Locator;

  // ─── Project Timeline ───────────────────────────────────────
  readonly projectTimelineSection: Locator;
  readonly loadMoreButton: Locator;

  // ─── Events Widget ──────────────────────────────────────────
  readonly eventsSection: Locator;
  readonly viewOnCalendarLink: Locator;

  // ─── My Tasks Table ─────────────────────────────────────────
  readonly myTasksTable: Locator;
  readonly myTasksRows: Locator;

  // ─── To Do Widget ───────────────────────────────────────────
  readonly todoSection: Locator;
  readonly todoItems: Locator;

  // ─── Sticky Note Widget ─────────────────────────────────────
  readonly stickyNoteSection: Locator;

  // ─── Quick Actions ──────────────────────────────────────────
  readonly quickActionsDropdown: Locator;
  readonly quickActionAddTask: Locator;
  readonly quickActionAddEvent: Locator;

  // ─── Open Projects ──────────────────────────────────────────
  readonly openProjectsSection: Locator;
  readonly openProjectLinks: Locator;

  // ─── Dashboard Management ───────────────────────────────────
  readonly dashboardOptionsDropdown: Locator;
  readonly addNewDashboardOption: Locator;

  constructor(page: Page) {
    super(page);
    this.navbar = new NavbarComponent(page);
    this.welcomeMessage = page.locator('.welcome-message');
    this.statsCards = page.locator('.stats-card');
    this.recentActivity = page.locator('.recent-activity');
    this.searchInput = page.locator('input[placeholder*="Search"]');

    // Summary widgets
    this.myOpenTasksWidget = page.locator('a:has-text("My open tasks")').first();
    this.eventsTodayWidget = page.locator('a:has-text("Events today")').first();
    this.dueWidget = page.locator('a:has-text("Due")').first();

    // Projects Overview
    this.projectsOverviewSection = page.locator(':has-text("Projects Overview")').first();
    this.projectsOpenCount = page.locator('a[href*="projects/all_projects/1"]');
    this.projectsCompletedCount = page.locator('a[href*="projects/all_projects/2"]');
    this.projectsHoldCount = page.locator('a[href*="projects/all_projects/3"]');

    // Invoice Overview
    this.invoiceOverviewSection = page.locator(':has-text("Invoice Overview")').first();
    this.invoiceOverviewChart = page.locator('#invoice-overview-chart');

    // Income vs Expenses
    this.incomeExpensesSection = page.locator(':has-text("Income vs Expenses")').first();
    this.incomeExpenseChart = page.locator('#income-expense-chart');
    this.dashboardIncomeVsExpensesChart = page.locator('#dashboard-income-vs-expenses-chart');

    // All Tasks Overview
    this.allTasksOverviewSection = page.locator(':has-text("All Tasks Overview")').first();
    this.allTasksOverviewChart = page.locator('#all-tasks-overview-chart-all_tasks_overview');

    // Team Members
    this.teamMembersSection = page.locator(':has-text("Team Members")').first();
    this.teamMembersLink = page.locator('a[href*="team_members/index"]');
    this.membersClockedInLink = page.locator('a[href*="attendance/index/members_clocked_in"]');

    // Ticket Status
    this.ticketStatusSection = page.locator(':has-text("Ticket Status")').first();
    this.ticketStatusChart = page.locator('#ticket-status-chart');
    this.ticketNewLink = page.locator('a[href*="tickets/index/new"]');
    this.ticketOpenLink = page.locator('a[href*="tickets/index/open"]');

    // Charts
    this.allCharts = page.locator('canvas');

    // Clock In/Out
    this.clockWidget = page.locator('.clock-widget, [class*="clock"]').first();
    this.clockInButton = page.locator('button:has-text("Clock In"), a:has-text("Clock In")');
    this.clockOutButton = page.locator('button:has-text("Clock Out"), a:has-text("Clock Out")');

    // Project Timeline
    this.projectTimelineSection = page.locator(':has-text("Project Timeline")').first();
    this.loadMoreButton = page.locator('button:has-text("Load more"), a:has-text("Load more")');

    // Events Widget
    this.eventsSection = page.locator('.card:has-text("Events")').first();
    this.viewOnCalendarLink = page.locator('a[href*="/events"]');

    // My Tasks Table
    this.myTasksTable = page.locator('#task-table');
    this.myTasksRows = page.locator('#task-table tbody tr');

    // To Do Widget
    this.todoSection = page.locator('.card:has-text("To do")').first();
    this.todoItems = page.locator('.to-do-list li, .todo-list li');

    // Sticky Note Widget
    this.stickyNoteSection = page.locator('.card:has-text("Sticky Note")').first();

    // Quick Actions
    this.quickActionsDropdown = page.locator('button:has-text("Quick actions"), a:has-text("Quick actions")');
    this.quickActionAddTask = page.locator('a[data-title="Add task"]').first();
    this.quickActionAddEvent = page.locator('a[data-title="Add event"]').first();

    // Open Projects
    this.openProjectsSection = page.locator('.card:has-text("Open Projects")').first();
    this.openProjectLinks = page.locator('a[href*="projects/view/"]');

    // Dashboard Management
    this.dashboardOptionsDropdown = page.locator('.dashboard-options, button[data-bs-toggle="dropdown"]').first();
    this.addNewDashboardOption = page.locator('a:has-text("Add new dashboard")');
  }

  // ─── Actions ──────────────────────────────────────────────

  async getWelcomeText(): Promise<string> {
    return this.getText(this.welcomeMessage);
  }

  async getStatsCardCount(): Promise<number> {
    return this.statsCards.count();
  }

  async search(query: string): Promise<void> {
    await this.fill(this.searchInput, query);
    await this.page.keyboard.press('Enter');
  }

  async openQuickActions(): Promise<void> {
    await this.click(this.quickActionsDropdown);
  }
}
