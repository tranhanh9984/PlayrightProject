import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '../core/base.page';
import { logger } from '../helpers/logger';

export class LoginPage extends BasePage {
  protected readonly path = '/signin';

  // ─── Locators ─────────────────────────────────────────────

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signUpLink: Locator;
  readonly demoAdminBox: Locator;
  readonly demoClientBox: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.getByRole('button', { name: /sign in|log in|login/i });
    this.errorMessage = page.locator('.alert');
    this.forgotPasswordLink = page.locator('a[href*="reset_password"]');
    this.signUpLink = page.locator('a[href*="signup"]');
    this.demoAdminBox = page.locator('.fill-login').first();
    this.demoClientBox = page.locator('.fill-login').nth(1);
  }

  // ─── Actions ──────────────────────────────────────────────

  async login(username: string, password: string): Promise<void> {
    logger.info(`Logging in with user: ${username}`);
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async clickDemoAdmin(): Promise<void> {
    await this.click(this.demoAdminBox);
  }

  async clickDemoClient(): Promise<void> {
    await this.click(this.demoClientBox);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }

  async clickForgotPassword(): Promise<void> {
    await this.click(this.forgotPasswordLink);
  }
}
