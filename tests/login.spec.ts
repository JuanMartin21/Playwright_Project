import { test, expect } from "@playwright/test";
import { loginPage } from "../page/login/loginPage";
import homePage from "../fixture/homePage/HomePage.json";

test.describe("When logging in on the homepage", () => {
  test.beforeEach(async ({ page }) => {
    const navegate = new loginPage(page);
    await navegate.navigateTo(homePage.url);
  });
  test("Should login with valid credentials", async ({ page }) => {
    const login = new loginPage(page);
    await login.authenticateUser(homePage.userName, homePage.password);
  });
});
