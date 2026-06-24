import { type Page, type Locator } from '@playwright/test';
import { testConfig } from '../config/test.config';

export abstract class BaseComponent {
  protected readonly root: Locator;

  constructor(
    protected readonly page: Page,
    rootSelector: string,
  ) {
    this.root = page.locator(rootSelector);
  }

  async isVisible(): Promise<boolean> {
    return this.root.isVisible();
  }

  async waitForVisible(): Promise<void> {
    await this.root.waitFor({ state: 'visible', timeout: testConfig.defaultTimeout });
  }

  async waitForHidden(): Promise<void> {
    await this.root.waitFor({ state: 'hidden', timeout: testConfig.defaultTimeout });
  }

  /** Helper to scope locators within this component */
  protected locator(selector: string): Locator {
    return this.root.locator(selector);
  }
}
