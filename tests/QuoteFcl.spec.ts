import { test, expect } from "@playwright/test";
import LoginPage from "../page/login/loginPage";
import LoginData from "../fixture/homePage/HomePage.json";
import { precondition, story } from "../page/login/TestBase";
import QuoteFcl from "../page/InstructionCardPage/InstructionCardFcl";
import quoteData from "../fixture/homePage/Quote.json";

story("When create inst", () => {
  let login: LoginPage;
  let quotefcl: QuoteFcl;

  precondition(async ({ page }) => {
    login = new LoginPage(page);
    await login.authenticateUser(LoginData.userName, LoginData.password);
    await expect(page).toHaveURL(/dashboard/);
  });
  test("Validate data", async ({ page }) => {
    quotefcl = new QuoteFcl(page);
    const MovementType = quoteData.quote[0].movementType;
    const TripType = quoteData.quote[0].tripType;
    const Service = quoteData.quote[0].service;
    const productType = quoteData.quote[0].productType;
    const Office = quoteData.quote[0].office;
    const Incoterm = quoteData.quote[0].incoterm;
    const OriginPort = quoteData.trayectos.originPort;
    const DestinationPort = quoteData.trayectos.destinationPort;
    const ContainerType = quoteData.quote[0].containerType;
    const Quantity = quoteData.quote[0].quantity;
    const Weight = quoteData.quote[0].weight;
    const Commodity = quoteData.commodities.name;
    const product = quoteData.commodities.productName;
    const Values = quoteData.commodities.merchandiseValue;

    await quotefcl.fillGeneralInformation(
      quoteData.business,
      MovementType,
      TripType,
      Service,
      productType,
      Office,
      Incoterm
    );
    await quotefcl.fillRouteMaritime(OriginPort, DestinationPort);
    await quotefcl.addContainerType(ContainerType, Quantity, Weight);
    await quotefcl.fillMerchandiseDateFcl(Commodity, product, Values);
    await quotefcl.acceptFares();
    await quotefcl.validateCreation();
  });
});
