import { type Locator, type Page } from "@playwright/test";

export class addToCartPage {
  readonly page: Page;
  readonly backPackElement: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backPackElement = page
      .locator("div")
      .filter({ hasText: /^\$29\.99ADD TO CART$/ })
      .getByRole("button");
    this.cartIcon = page.getByRole("link", { name: "1" });
  }

  async addProductToCart() {
    await this.backPackElement.click();
  }
  async addToCartSection() {
    await this.cartIcon.click();
  }
}
