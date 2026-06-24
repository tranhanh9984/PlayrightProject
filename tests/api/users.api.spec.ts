import { test, expect } from '../../src/fixtures/api.fixture';
import { allureMetadata } from '../../src/helpers/allure.helper';
import { randomUserData } from '../../src/utils/random.utils';

test.describe('Users API Tests', () => {
  test('[TC-AU001] GET /users - should return list of users', async ({ usersApi }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'API',
      feature: 'Users',
      story: 'List users',
    });

    const { status, body } = await usersApi.getUsers({ page: '1', perPage: '10' });

    expect(status).toBe(200);
    expect(body.data).toBeInstanceOf(Array);
    expect(body.pagination).toBeDefined();
  });

  test('[TC-AU002] POST /users - should create a new user', async ({ usersApi }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'critical',
      epic: 'API',
      feature: 'Users',
      story: 'Create user',
    });

    const userData = randomUserData();

    await test.step('Create user and verify response', async () => {
      const { status, body } = await usersApi.createUser({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });

      expect(status).toBe(201);
      expect(body.data.username).toBe(userData.username);
      expect(body.data.email).toBe(userData.email);
    });
  });

  test('[TC-AU003] GET /users/:id - should get user by ID', async ({ usersApi }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'API',
      feature: 'Users',
      story: 'Get user details',
    });

    const { status, body } = await usersApi.getUserById('1');

    expect(status).toBe(200);
    expect(body.data.id).toBe('1');
  });

  test('[TC-AU004] PUT /users/:id - should update user', async ({ usersApi }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'API',
      feature: 'Users',
      story: 'Update user',
    });

    const { status, body } = await usersApi.updateUser('1', {
      firstName: 'Updated',
      lastName: 'Name',
    });

    expect(status).toBe(200);
    expect(body.data.firstName).toBe('Updated');
  });

  test('[TC-AU005] DELETE /users/:id - should delete user', async ({ usersApi }, testInfo) => {
    allureMetadata(testInfo, {
      severity: 'normal',
      epic: 'API',
      feature: 'Users',
      story: 'Delete user',
    });

    await test.step('Create user to delete', async () => {
      const userData = randomUserData();
      const createResult = await usersApi.createUser({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });

      expect(createResult.status).toBe(201);

      await test.step('Delete the created user', async () => {
        const { status } = await usersApi.deleteUser(createResult.body.data.id);
        expect(status).toBe(200);
      });
    });
  });
});
