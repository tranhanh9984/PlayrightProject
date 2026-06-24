import { defineConfig, devices } from '@playwright/test';
import { envConfig } from './src/config/env.config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : envConfig.retries,
  workers: process.env.CI ? 2 : undefined,
  timeout: envConfig.timeout,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],

  use: {
    baseURL: envConfig.baseUrl,
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    trace: 'on-first-retry',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  projects: [
    // ─── UI Tests ─────────────────────────────────────────
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      testDir: './tests/ui',
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
      testDir: './tests/ui',
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
      testDir: './tests/ui',
    },

    // ─── Mobile Tests ───────────────────────────────────────
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5'],
      },
      testDir: './tests/ui',
    },
    {
      name: 'mobile-safari',
      use: {
        ...devices['iPhone 13'],
      },
      testDir: './tests/ui',
    },

    // ─── API Tests ──────────────────────────────────────────
    {
      name: 'api',
      use: {
        baseURL: envConfig.apiBaseUrl,
      },
      testDir: './tests/api',
    },
  ],
});
