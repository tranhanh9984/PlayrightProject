import { test, expect } from '../../src/fixtures/base.fixture';
import { readCsv } from '../../src/helpers/data-reader';
import { allureMetadata } from '../../src/helpers/allure.helper';
import { envConfig } from '../../src/config/env.config';

const loginTestData = readCsv<{
  username: string;
  password: string;
  expectedResult: string;
  description: string;
}>('login-data.csv');

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('[TC-L001] should display login form elements', async ({ loginPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Authentication',
      feature: 'Login',
      story: 'Login form display',
    });

    await test.step('Verify form elements are visible', async () => {
      await loginPage.expectVisible(loginPage.usernameInput);
      await loginPage.expectVisible(loginPage.passwordInput);
      await loginPage.expectVisible(loginPage.loginButton);
    });
  });

  test('[TC-L002] should login successfully with valid credentials', async ({ loginPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'Authentication',
      feature: 'Login',
      story: 'Successful login',
    });

    await test.step('Enter credentials and submit', async () => {
      await loginPage.login(envConfig.adminUsername, envConfig.adminPassword);
    });

    await test.step('Verify redirect to dashboard', async () => {
      await page.waitForURL('**/dashboard');
      await expect(page).toHaveURL(/dashboard/);
    });
  });

  test('[TC-L003] should show error with invalid credentials', async ({ loginPage }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'Authentication',
      feature: 'Login',
      story: 'Failed login',
    });

    await test.step('Enter invalid credentials and submit', async () => {
      await loginPage.login('invalid@example.com', 'wrongpassword');
    });

    await test.step('Verify error message is displayed', async () => {
      await loginPage.expectVisible(loginPage.errorMessage);
    });
  });

  test('[TC-L004] should navigate to forgot password page', async ({ loginPage, page }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'Authentication',
      feature: 'Login',
      story: 'Forgot password',
    });

    await test.step('Click forgot password link', async () => {
      await loginPage.clickForgotPassword();
    });

    await test.step('Verify navigation to forgot password page', async () => {
      await expect(page).toHaveURL(/forgot|reset/);
    });
  });

  // ─── Data-Driven Tests ────────────────────────────────────

  for (const data of loginTestData) {
    test(`[TC-L005] Login: ${data.description}`, async ({ loginPage, page }) => {
      await test.step(`Login with ${data.description}`, async () => {
        await loginPage.login(data.username, data.password);
      });

      await test.step('Verify expected result', async () => {
        if (data.expectedResult === 'success') {
          await page.waitForURL('**/dashboard');
          await expect(page).toHaveURL(/dashboard/);
        } else {
          await loginPage.expectVisible(loginPage.errorMessage);
        }
      });
    });
  }
});
