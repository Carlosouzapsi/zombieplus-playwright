import { expect } from "@playwright/test";

export class Toast {
  constructor(page) {
    this.page = page;
  }
  async containText(message) {
    const toast = this.page.locator(".toast");
    await expect(toast).toContainText(message);
    // not to be visible - pode não estar visivel mas ainda existe no HTML
    await expect(toast).not.toBeVisible({ timeout: 5000 });
  }
}
