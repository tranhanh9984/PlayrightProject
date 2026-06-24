import { type Page, type Locator, expect } from '@playwright/test';
import { testConfig } from '../config/test.config';
import { logger } from '../helpers/logger';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /** Override in subclass to define the page path */
  protected abstract readonly path: string;

  // ─── Navigation ───────────────────────────────────────────

  async navigate(): Promise<void> {
    logger.info(`Navigating to: ${this.path}`);
    await this.page.goto(this.path, {
      waitUntil: 'domcontentloaded',
      timeout: testConfig.navigationTimeout,
    });
  }

  async navigateTo(url: string): Promise<void> {
    logger.info(`Navigating to URL: ${url}`);
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: testConfig.navigationTimeout,
    });
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle', {
      timeout: testConfig.navigationTimeout,
    });
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  // ─── Element Actions ──────────────────────────────────────

  async click(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: testConfig.defaultTimeout });
    await locator.click();
  }

  async doubleClick(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: testConfig.defaultTimeout });
    await locator.dblclick();
  }

  async fill(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: testConfig.defaultTimeout });
    await locator.clear();
    await locator.fill(text);
  }

  async type(locator: Locator, text: string, delay = 50): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: testConfig.defaultTimeout });
    await locator.pressSequentially(text, { delay });
  }

  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  async check(locator: Locator): Promise<void> {
    await locator.check();
  }

  async uncheck(locator: Locator): Promise<void> {
    await locator.uncheck();
  }

  // ─── Element State ────────────────────────────────────────

  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible', timeout: testConfig.defaultTimeout });
    return (await locator.textContent()) ?? '';
  }

  async getInputValue(locator: Locator): Promise<string> {
    return locator.inputValue();
  }

  async getAttribute(locator: Locator, attribute: string): Promise<string | null> {
    return locator.getAttribute(attribute);
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async isEnabled(locator: Locator): Promise<boolean> {
    return locator.isEnabled();
  }

  async isChecked(locator: Locator): Promise<boolean> {
    return locator.isChecked();
  }

  // ─── Waits ────────────────────────────────────────────────

  async waitForElement(locator: Locator, state: 'visible' | 'hidden' | 'attached' | 'detached' = 'visible'): Promise<void> {
    await locator.waitFor({ state, timeout: testConfig.defaultTimeout });
  }

  async waitForUrl(url: string | RegExp): Promise<void> {
    await this.page.waitForURL(url, { timeout: testConfig.navigationTimeout });
  }

  // ─── Assertions ───────────────────────────────────────────

  async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible({ timeout: testConfig.expectTimeout });
  }

  async expectHidden(locator: Locator): Promise<void> {
    await expect(locator).toBeHidden({ timeout: testConfig.expectTimeout });
  }

  async expectText(locator: Locator, text: string): Promise<void> {
    await expect(locator).toHaveText(text, { timeout: testConfig.expectTimeout });
  }

  async expectContainText(locator: Locator, text: string): Promise<void> {
    await expect(locator).toContainText(text, { timeout: testConfig.expectTimeout });
  }

  // ─── Utilities ────────────────────────────────────────────

  async screenshot(name: string): Promise<Buffer> {
    return this.page.screenshot({
      path: `test-results/screenshots/${name}.png`,
      fullPage: true,
    });
  }

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async acceptDialog(): Promise<void> {
    this.page.on('dialog', (dialog) => dialog.accept());
  }

  async dismissDialog(): Promise<void> {
    this.page.on('dialog', (dialog) => dialog.dismiss());
  }
}
