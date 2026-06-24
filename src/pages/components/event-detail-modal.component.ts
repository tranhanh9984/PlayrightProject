import { type Page, type Locator } from '@playwright/test';
import { BaseComponent } from '../../core/base.component';

export class EventDetailModalComponent extends BaseComponent {
  // ─── Locators ─────────────────────────────────────────────
  readonly modalTitle: Locator;
  readonly eventTitle: Locator;
  readonly eventDateTime: Locator;
  readonly eventDescription: Locator;
  readonly eventCreator: Locator;
  readonly editButton: Locator;
  readonly deleteButton: Locator;
  readonly closeButton: Locator;
  readonly addReminderLink: Locator;

  constructor(page: Page) {
    super(page, '#ajaxModal');
    this.modalTitle = this.locator('.modal-title');
    this.eventTitle = this.locator('.modal-body h4');
    this.eventDateTime = this.locator('.modal-body .col-md-12.pb10').first();
    this.eventDescription = this.locator('.modal-body blockquote');
    this.eventCreator = this.locator('.modal-body .avatar + span a');
    this.editButton = this.locator('a[title="Edit event"]');
    this.deleteButton = this.locator('a[data-action-url*="delete"]');
    this.closeButton = this.locator('button.btn-close');
    this.addReminderLink = this.locator('#event-show-add-reminder-form');
  }

  // ─── Actions ──────────────────────────────────────────────

  async getModalTitle(): Promise<string> {
    return (await this.modalTitle.textContent()) ?? '';
  }

  async getEventTitle(): Promise<string> {
    return (await this.eventTitle.textContent())?.trim() ?? '';
  }

  async getEventDateTime(): Promise<string> {
    return (await this.eventDateTime.textContent())?.trim() ?? '';
  }

  async getEventDescription(): Promise<string> {
    return (await this.eventDescription.textContent())?.trim() ?? '';
  }

  async getCreatorName(): Promise<string> {
    return (await this.eventCreator.textContent())?.trim() ?? '';
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }
}
