import { expect } from "@playwright/test";

export class LandingPage {
  constructor(page) {
    // escopo do playwright nessa classe
    this.page = page;
  }
  async visit() {
    await this.page.goto("http://localhost:3000");
  }

  async openLeadModal() {
    await this.page.getByRole("button", { name: /Aperte o play/ }).click();
    // Checkpoint verifica se abriu modal
    expect(
      await this.page.getByTestId("modal").getByRole("heading")
    ).toHaveText("Fila de espera");
  }

  async submitLeadForm(name, email) {
    // submete credenciais do formulário
    await this.page.getByPlaceholder("Informe seu nome").fill(name);
    await this.page.getByPlaceholder("Informe seu email").fill(email);

    await this.page
      .getByTestId("modal")
      .getByText("Quero entrar na fila!")
      .click();
  }

  async toastHaveText(message) {
    const toast = this.page.locator(".toast");
    await expect(toast).toHaveText(message);
    // not to be visible - pode não estar visivel mas ainda existe no HTML
    await expect(toast).not.toBeVisible({ timeout: 5000 });
  }

  async alertHaveText(target) {
    await expect(this.page.locator(".alert")).toHaveText(target);
  }
}
