import { test, expect } from "@playwright/test";
import { loginPage } from "../page/login/loginPage";
import homePage from "../fixture/homePage/HomePage.json";

test.describe("When logging in on the homepage", () => {
  test.beforeEach(async ({ page }) => {
    const navigate = new loginPage(page);
    await navigate.navigateTo(homePage.url);
  });
  test("Should login with valid credentials", async ({ page }) => {
    const login = new loginPage(page);
    await login.authenticateUser(homePage.userName, homePage.password);
    await expect(page.getByText('Products')).toBeVisible();
  });
  test.afterEach(async ({ page }) => {
    const Logout = new loginPage(page);
    await Logout.logout();
  });
  
});
