import { type Page, type Locator } from '@playwright/test';
import { BaseComponent } from '../../core/base.component';

export class EventFormModalComponent extends BaseComponent {
  // ─── Locators ─────────────────────────────────────────────
  readonly modalTitle: Locator;
  readonly titleInput: Locator;
  readonly descriptionTextarea: Locator;
  readonly startDateInput: Locator;
  readonly startTimeInput: Locator;
  readonly endDateInput: Locator;
  readonly endTimeInput: Locator;
  readonly locationInput: Locator;
  readonly labelsInput: Locator;
  readonly clientDropdown: Locator;
  readonly onlyMeCheckbox: Locator;
  readonly allTeamMembersCheckbox: Locator;
  readonly specificMembersCheckbox: Locator;
  readonly recurringCheckbox: Locator;
  readonly repeatEveryInput: Locator;
  readonly repeatTypeSelect: Locator;
  readonly cyclesInput: Locator;
  readonly colorInput: Locator;
  readonly saveButton: Locator;
  readonly closeButton: Locator;
  readonly uploadFileButton: Locator;

  constructor(page: Page) {
    super(page, '#ajaxModal');
    this.modalTitle = this.locator('.modal-title');
    this.titleInput = this.locator('#title');
    this.descriptionTextarea = this.locator('#description');
    this.startDateInput = this.locator('#start_date');
    this.startTimeInput = this.locator('#start_time');
    this.endDateInput = this.locator('#end_date');
    this.endTimeInput = this.locator('#end_time');
    this.locationInput = this.locator('#location');
    this.labelsInput = this.locator('#event_labels');
    this.clientDropdown = this.locator('#clients_dropdown');
    this.onlyMeCheckbox = this.locator('#only_me');
    this.allTeamMembersCheckbox = this.locator('#all_team_members');
    this.specificMembersCheckbox = this.locator('#specific_members_and_teams');
    this.recurringCheckbox = this.locator('#event_recurring');
    this.repeatEveryInput = this.locator('#repeat_every');
    this.repeatTypeSelect = this.locator('#repeat_type');
    this.cyclesInput = this.locator('#no_of_cycles');
    this.colorInput = this.locator('#custom-color');
    this.saveButton = this.locator('button[type="submit"]');
    this.closeButton = this.locator('#ajaxModalContent button.btn-default:has-text("Close")').first();
    this.uploadFileButton = this.locator('.upload-file-button');
  }

  // ─── Actions ──────────────────────────────────────────────

  async getModalTitle(): Promise<string> {
    return (await this.modalTitle.textContent()) ?? '';
  }

  async fillEventDetails(options: {
    title: string;
    description?: string;
    startDate: string;
    startTime?: string;
    endDate?: string;
    endTime?: string;
    location?: string;
  }): Promise<void> {
    await this.titleInput.fill(options.title);

    if (options.description) {
      await this.descriptionTextarea.fill(options.description);
    }

    await this.startDateInput.fill(options.startDate);

    if (options.startTime) {
      await this.startTimeInput.fill(options.startTime);
    }

    if (options.endDate) {
      await this.endDateInput.fill(options.endDate);
    }

    if (options.endTime) {
      await this.endTimeInput.fill(options.endTime);
    }

    if (options.location) {
      await this.locationInput.fill(options.location);
    }
  }

  async selectShareWith(option: 'only_me' | 'all_team_members' | 'specific_members'): Promise<void> {
    switch (option) {
      case 'only_me':
        await this.onlyMeCheckbox.click({ force: true });
        break;
      case 'all_team_members':
        await this.allTeamMembersCheckbox.click({ force: true });
        break;
      case 'specific_members':
        await this.specificMembersCheckbox.click({ force: true });
        break;
    }
  }

  async enableRecurring(repeatEvery: number, repeatType: string, cycles?: number): Promise<void> {
    await this.recurringCheckbox.check();
    await this.repeatEveryInput.fill(String(repeatEvery));
    await this.page.locator('#repeat_type').selectOption(repeatType);
    if (cycles !== undefined) {
      await this.cyclesInput.fill(String(cycles));
    }
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }
}
