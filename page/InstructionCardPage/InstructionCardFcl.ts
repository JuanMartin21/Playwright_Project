import { type Locator, type Page, expect } from "@playwright/test";
import exp from "constants";

export default class QuoteFcl {
  readonly page: Page;
  readonly txtComapanyName: Locator;
  readonly txtOptionTable: Locator;
  readonly btnAddQuote: Locator;
  readonly txtTypeMoviment: Locator;
  readonly txtTripType: Locator;
  readonly txtService: Locator;
  readonly txtTypeProduct: Locator;
  readonly txtOffice: Locator;
  readonly txtIncoterm: Locator;
  readonly txtOriginPort: Locator;
  readonly txtDestinationPort: Locator;
  readonly optOriginPort: Locator;
  readonly optDestinationPort: Locator;
  readonly typeContainer: Locator;
  readonly txtquantityOfContainers: Locator;
  readonly txtWeightContainer: Locator;
  readonly txtCommodity: Locator;
  readonly optCommodity: Locator;
  readonly txtProduct: Locator;
  readonly txtMerchandiseValues: Locator;
  readonly optMerchandiseValues: Locator;
  readonly btnSerchFares: Locator;
  readonly optFares: (index: number) => Locator;
  readonly btnAcceptSelection: Locator;
  readonly btnCreateQuote: Locator;
  readonly btnCreateQuoteModal: Locator;
  readonly lblMenssenger: Locator;
  readonly btnDetail: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtComapanyName = page.locator(".typeahead-input");
    this.txtOptionTable = page.locator("li");
    this.btnAddQuote = page.getByRole("button", { name: "Agregar cotización" });
    this.txtTypeMoviment = page.locator("#type-of-movement");
    this.txtTripType = page.locator("#trip-type");
    this.txtService = page.locator("#nowports-select-multiple");
    this.txtTypeProduct = page.locator("#load-type");
    this.txtOffice = page.locator("#nowportsOffice");
    this.txtIncoterm = page.locator("#incoterm");
    this.txtOriginPort = page.getByTestId("origin-port-select");
    this.optOriginPort = page
      .getByTestId("origin-port-select-default")
      .locator("#origin-port");
    this.txtDestinationPort = page.getByTestId("destination-port-select");
    this.optDestinationPort = page
      .getByTestId("destination-port-select-default")
      .locator("#destination-port");
    this.typeContainer = page
      .locator(".css-1wa3eu0-placeholder")
      .filter({ hasText: "Tipo de contenedor" });
    this.txtquantityOfContainers = page.getByPlaceholder("Cantidad");
    this.txtWeightContainer = page.getByPlaceholder("Peso");
    this.txtCommodity = page.getByTestId("commodity-typeahead");
    this.optCommodity = page
      .getByTestId("commodity-typeahead")
      .getByRole("textbox");
    this.txtProduct = page.locator("#productName");
    this.txtMerchandiseValues = page.getByTestId("cq-marchandise-value");
    this.optMerchandiseValues = page
      .getByTestId("productValue")
      .getByTestId("single-input");
    this.btnSerchFares = page.locator("#katalon-search-fare");
    this.optFares = (index) =>
      page.getByTestId(`cq-af-step_0_available_fare_${index}`);
    this.btnAcceptSelection = page.locator("#katalon-accept-selection");
    this.btnCreateQuote = page.locator("#katalon-create-quoteRequest");
    this.btnCreateQuoteModal = page.getByTestId("create-quote-button");
    this.lblMenssenger = page.getByText("Éxito");
    this.btnDetail = page.locator("button").filter({ hasText: "Ver detalles" });
  }

  async fillGeneralInformation(
    company: string,
    movementType: string,
    tripType: string,
    service: string,
    typeProduct: string,
    Office: string,
    incorterm: string
  ) {
    await this.btnAddQuote.click();
    await this.txtComapanyName.click();
    await this.txtComapanyName.fill(company);
    await this.page.locator("li", { hasText: company }).click();
    await this.txtTypeMoviment.click();
    await this.page.getByText(movementType, { exact: true }).click();
    await this.txtTripType.click();
    await this.page.getByText(tripType, { exact: true }).click();
    await this.txtService.click();
    await this.page.getByText(service, { exact: true }).click();
    await this.txtTypeProduct.click();
    await this.page.getByText(typeProduct, { exact: true }).click();
    await this.txtOffice.click();
    await this.page.getByText(Office, { exact: true }).click();
    await this.txtIncoterm.click();
    await this.page.getByText(incorterm, { exact: true }).click();
  }

  async fillRouteMaritime(originPort: string, destinationPort: string) {
    await this.txtOriginPort.click();
    await this.optOriginPort.fill(originPort);
    await this.page.getByText(originPort).press("Enter");
    await this.txtDestinationPort.click();
    await this.optDestinationPort.fill(destinationPort);
    await this.page.getByText(destinationPort).press("Enter");
  }

  async addContainerType(
    containerType: string,
    quantity: string,
    weight: string
  ) {
    await this.typeContainer.click();
    await this.page.getByText(containerType, { exact: true }).click();
    await this.txtquantityOfContainers.fill(quantity);
    await this.txtWeightContainer.fill(weight);
  }
  async fillMerchandiseDateFcl(name: string, product: string, values: string) {
    await this.txtCommodity.click();
    await this.optCommodity.fill(name);
    await this.page.getByText(name, { exact: true }).click();
    await this.txtProduct.fill(product);
    await this.txtMerchandiseValues.click();
    await this.optMerchandiseValues.fill(values);
  }
  async acceptFares() {
    await this.btnSerchFares.click();
    await this.optFares(1).click();
    await this.btnAcceptSelection.click();
    await this.btnCreateQuote.click();
    await this.btnCreateQuoteModal.click();
  }
  async validateCreation() {
    await this.page.waitForTimeout(5000);
    await expect(this.lblMenssenger).toBeVisible();
    await expect(this.lblMenssenger).toHaveText("Éxito");
    await this.btnDetail.click();
  }
}
