import { test, expect } from '../../src/fixtures/api.fixture';
import { allureMetadata } from '../../src/helpers/allure.helper';
import { envConfig } from '../../src/config/env.config';
import { randomUserData } from '../../src/utils/random.utils';

test.describe('Auth API Tests', () => {
  test('[TC-AA001] POST /auth/login - should login with valid credentials', async ({ authApi }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'blocker',
      epic: 'API',
      feature: 'Authentication',
      story: 'Login',
    });

    const { status, body } = await authApi.login({
      username: envConfig.adminUsername,
      password: envConfig.adminPassword,
    });

    expect(status).toBe(200);
    expect(body.data.token).toBeTruthy();
    expect(body.data.user).toBeDefined();
  });

  test('[TC-AA002] POST /auth/login - should reject invalid credentials', async ({ authApi }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'API',
      feature: 'Authentication',
      story: 'Login validation',
    });

    const { status } = await authApi.login({
      username: 'invalid@example.com',
      password: 'wrongpassword',
    });

    expect(status).toBe(401);
  });

  test('[TC-AA003] POST /auth/register - should register a new user', async ({ authApi }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'API',
      feature: 'Authentication',
      story: 'Registration',
    });

    const newUser = randomUserData();

    await test.step('Register new user', async () => {
      const { status, body } = await authApi.register({
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      });

      expect(status).toBe(201);
      expect(body.data.username).toBe(newUser.username);
    });
  });

  test('[TC-AA004] POST /auth/logout - should logout successfully', async ({ authApi }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'API',
      feature: 'Authentication',
      story: 'Logout',
    });

    await test.step('Login first', async () => {
      await authApi.login({
        username: envConfig.adminUsername,
        password: envConfig.adminPassword,
      });
    });

    await test.step('Logout and verify', async () => {
      const { status } = await authApi.logout();
      expect(status).toBe(200);
    });
  });
});
