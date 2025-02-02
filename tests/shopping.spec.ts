import { test, expect } from "@playwright/test";
import { loginPage } from "../page/login/loginPage";
import homePage from "../fixture/homePage/HomePage.json";
import { addToCartPage } from "../page/shoppingPage/addToCartPage";
import cartActionsPage from '../page/shoppingPage/cartActionsPage';
import Elements from '../fixture/homePage/Elements.json';

test.describe("Shopping Cart", () => {

  let login: loginPage;
  let addToCart: addToCartPage;
  let cartActions: cartActionsPage;

  test.beforeEach(async ({ page }) => {
    login = new loginPage(page);
    addToCart = new addToCartPage(page);
    cartActions = new cartActionsPage(page);

    await login.navigateTo(homePage.url);
    await login.authenticateUser(homePage.userName, homePage.password);
  });

  test("Should successfully add a product to the cart", async ({ page }) => {
    await test.step("Add product to cart", async () => {
      await addToCart.addProductToCart();
      await addToCart.addToCartSection();
    });

    await test.step("Validate item in cart", async () => {
      await cartActions.validateItemAddedToCart(Elements.backPack);
    });
  });
});