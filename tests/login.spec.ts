import { test} from "@playwright/test";
import  loginPage  from "../page/login/loginPage";
import homePage from "../fixture/homePage/HomePage.json";
import Title from "../fixture/homePage/Title.json"
import cartActionsPage from "../page/shoppingPage/cartActionsPage";


test.describe("When logging in on the homepage", () => {
  test.beforeEach(async ({ page }) => {
    const navigate = new loginPage(page);
    await navigate.navigateTo(homePage.url);
  });
  test("Should login with valid credentials", async ({ page }) => {
    const login = new loginPage(page);
    const product = new cartActionsPage(page);
    await login.authenticateUser(homePage.userName, homePage.password);
    await product.ValidateTitle(Title.text);
  });
  test.afterEach(async ({ page }) => {
    const Logout = new loginPage(page);
    await Logout.logout();
  });
  
});
