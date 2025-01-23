import { type Locator, type Page } from "@playwright/test";

export class loginPage {
  readonly page: Page;
  readonly txtUser: Locator;
  readonly txtPassword: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtUser = page.locator('[data-test="username"]');
    this.txtPassword = page.locator('[data-test="password"]');
    this.loginButton = page.getByRole("button", { name: "LOGIN" });
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async authenticateUser(username: string, password: string) {
    await this.txtUser.fill(username);
    await this.txtPassword.fill(password);
    await this.loginButton.click();
  }
}
