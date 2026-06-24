import { type Page } from '@playwright/test';
import { testConfig } from '../config/test.config';

/** Wait for a specific amount of time (use sparingly) */
export async function waitFor(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/** Wait until a condition returns true */
export async function waitUntil(
  condition: () => Promise<boolean>,
  options: { timeout?: number; interval?: number; message?: string } = {},
): Promise<void> {
  const { timeout = testConfig.defaultTimeout, interval = 500, message = 'Condition not met' } = options;
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return;
    }
    await waitFor(interval);
  }

  throw new Error(`Timeout after ${timeout}ms: ${message}`);
}

/** Wait for no network requests for a specified duration */
export async function waitForNetworkIdle(page: Page, idleTime = 500): Promise<void> {
  await page.waitForLoadState('networkidle', {
    timeout: testConfig.navigationTimeout,
  });
  await waitFor(idleTime);
}

/** Wait for API response matching a URL pattern */
export async function waitForApiResponse(
  page: Page,
  urlPattern: string | RegExp,
  options: { status?: number; timeout?: number } = {},
): Promise<void> {
  const { status, timeout = testConfig.defaultTimeout } = options;

  await page.waitForResponse(
    (response) => {
      const urlMatch =
        typeof urlPattern === 'string'
          ? response.url().includes(urlPattern)
          : urlPattern.test(response.url());
      const statusMatch = status ? response.status() === status : true;
      return urlMatch && statusMatch;
    },
    { timeout },
  );
}
