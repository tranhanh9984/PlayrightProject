import { type Page, type Locator } from '@playwright/test';
import { BaseComponent } from '../../core/base.component';

export class NavbarComponent extends BaseComponent {
  readonly logo: Locator;
  readonly profileMenu: Locator;
  readonly logoutButton: Locator;
  readonly notificationBell: Locator;

  constructor(page: Page) {
    super(page, 'nav, [role="navigation"]');
    this.logo = this.locator('.logo, [data-testid="logo"]');
    this.profileMenu = this.locator('.profile-menu, [data-testid="profile-menu"]');
    this.logoutButton = this.locator('.logout, [data-testid="logout"]');
    this.notificationBell = this.locator('.notifications, [data-testid="notifications"]');
  }

  async clickLogo(): Promise<void> {
    await this.logo.click();
  }

  async openProfileMenu(): Promise<void> {
    await this.profileMenu.click();
  }

  async logout(): Promise<void> {
    await this.openProfileMenu();
    await this.logoutButton.click();
  }

  async getNotificationCount(): Promise<number> {
    const badge = this.locator('.notification-badge');
    if (await badge.isVisible()) {
      const text = await badge.textContent();
      return parseInt(text ?? '0', 10);
    }
    return 0;
  }
}
