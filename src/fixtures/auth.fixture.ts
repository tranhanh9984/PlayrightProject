import { test as base } from './base.fixture';
import { envConfig } from '../config/env.config';

/** Fixture that provides a pre-authenticated page context via ci_session cookie */
type AuthFixtures = {
  authenticatedPage: ReturnType<typeof base['extend']> extends infer T ? T : never;
};

export const test = base.extend<AuthFixtures>({
  /** Override the default page to inject ci_session cookie for authentication */
  page: async ({ page, context }, use) => {
    const ciSession = process.env.CI_SESSION || '';

    if (ciSession) {
      // Use ci_session cookie to bypass reCAPTCHA login
      await context.addCookies([
        {
          name: 'ci_session',
          value: ciSession,
          domain: new URL(envConfig.baseUrl).hostname,
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'Lax',
        },
      ]);
    } else {
      // Fallback: form login (works when reCAPTCHA is disabled)
      await page.goto('/signin');
      await page.locator('#email').fill(envConfig.adminUsername);
      await page.locator('#password').fill(envConfig.adminPassword);
      await page.locator('button[type="submit"]').click();
      await page.waitForURL('**/dashboard', { timeout: envConfig.timeout });
    }

    await use(page);
  },
});

export { expect } from '@playwright/test';
