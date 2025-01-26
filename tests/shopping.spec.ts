import { test, expect } from "@playwright/test";
import { loginPage } from "../page/login/loginPage";
import homePage from "../fixture/homePage/HomePage.json";
import { addToCartPage } from "../page/shoppingPage/addToCartPage";

test.describe("When adding a product to the shopping cart", () => {
  test.beforeEach(async ({ page }) => {
    const navigate = new loginPage(page);
    const login = new loginPage(page);

    await navigate.navigateTo(homePage.url);
    await login.authenticateUser(homePage.userName, homePage.password);
  });

  test("Should add a product to the cart successfully", async ({ page }) => {
    const addElements = new addToCartPage(page);
    const sectionCart = new addToCartPage(page);
    await addElements.addProductToCart();
    await sectionCart.addToCartSection();
  });
});
