import { type Page, type Locator } from '@playwright/test';
import { BaseComponent } from '../../core/base.component';

export class ModalComponent extends BaseComponent {
  readonly title: Locator;
  readonly body: Locator;
  readonly closeButton: Locator;
  readonly confirmButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page, rootSelector = '.modal, [role="dialog"]') {
    super(page, rootSelector);
    this.title = this.locator('.modal-title, [data-testid="modal-title"]');
    this.body = this.locator('.modal-body, [data-testid="modal-body"]');
    this.closeButton = this.locator('.modal-close, [data-testid="modal-close"]');
    this.confirmButton = this.locator('.btn-confirm, [data-testid="modal-confirm"]');
    this.cancelButton = this.locator('.btn-cancel, [data-testid="modal-cancel"]');
  }

  async getTitle(): Promise<string> {
    return (await this.title.textContent()) ?? '';
  }

  async getBodyText(): Promise<string> {
    return (await this.body.textContent()) ?? '';
  }

  async confirm(): Promise<void> {
    await this.confirmButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }
}
