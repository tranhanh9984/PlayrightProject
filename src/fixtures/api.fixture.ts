import { test as base } from '@playwright/test';
import { AuthApiClient } from '../api/clients/auth.api-client';
import { UsersApiClient } from '../api/clients/users.api-client';

/** Custom fixtures that inject API clients */
type ApiFixtures = {
  authApi: AuthApiClient;
  usersApi: UsersApiClient;
};

export const test = base.extend<ApiFixtures>({
  authApi: async ({ request }, use) => {
    await use(new AuthApiClient(request));
  },
  usersApi: async ({ request }, use) => {
    await use(new UsersApiClient(request));
  },
});

export { expect } from '@playwright/test';
