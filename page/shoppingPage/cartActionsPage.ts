import { expect, Page } from "@playwright/test";

export default class cartActionsPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async validateItemAddedToCart(itemName: string) {
    const itemInCart = this.page.getByRole("link", { name: itemName });
    await expect(itemInCart).toBeVisible();
  }
  async ValidateTitle (title: string){
    const text = this.page.getByText(title);
    await expect(text).toBeVisible();
  }
}
