import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { EventsPage } from '../pages/events.page';
import { ClientsPage } from '../pages/clients.page';
import { ProjectsPage } from '../pages/projects.page';
import { TasksPage } from '../pages/tasks.page';
import { LeadsPage } from '../pages/leads.page';

/** Custom test fixtures that inject page objects */
type PageFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  eventsPage: EventsPage;
  clientsPage: ClientsPage;
  projectsPage: ProjectsPage;
  tasksPage: TasksPage;
  leadsPage: LeadsPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  eventsPage: async ({ page }, use) => {
    await use(new EventsPage(page));
  },
  clientsPage: async ({ page }, use) => {
    await use(new ClientsPage(page));
  },
  projectsPage: async ({ page }, use) => {
    await use(new ProjectsPage(page));
  },
  tasksPage: async ({ page }, use) => {
    await use(new TasksPage(page));
  },
  leadsPage: async ({ page }, use) => {
    await use(new LeadsPage(page));
  },
});

export { expect } from '@playwright/test';
