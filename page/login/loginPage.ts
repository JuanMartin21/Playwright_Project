import { type Locator, type Page } from "@playwright/test";

export class loginPage {
  readonly page: Page;
  readonly txtUser: Locator;
  readonly txtPassword: Locator;
  readonly loginButton: Locator;
  readonly menuButton: Locator;
  readonly exitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtUser = page.locator('[data-test="username"]');
    this.txtPassword = page.locator('[data-test="password"]');
    this.loginButton = page.getByRole("button", { name: "LOGIN" });
    this.menuButton = page.getByRole('button', { name: 'Open Menu' })
    this.exitButton = page.locator('#logout_sidebar_link');
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async authenticateUser(username: string, password: string) {
    await this.txtUser.fill(username);
    await this.txtPassword.fill(password);
    await this.loginButton.click();
  }
  async logout (){
    await this.menuButton.click();
    await this.exitButton.click();

  }
}
