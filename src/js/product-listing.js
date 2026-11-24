import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";
import { renderCategoryBreadcrumbs } from "./Breadcrumbs.mjs";
import Alert from "./Alert.js";

const productHtmlRender = document.querySelector("#product-list");
const productCategoryTitle = document.querySelector("#products-category");
const data = new ProductData();
const category = getParam("category");
const product = new ProductList(category, data, productHtmlRender);
const mainElement = document.querySelector ("main");
const alert = new Alert(mainElement);
alert.showAlerts();

product.init().then((products) => {
  if (category) {
    renderCategoryBreadcrumbs(category, products);
  }
});

switch (category) {
  case "tents":
    productCategoryTitle.textContent = ": Tents";
    break;
  case "backpacks":
    productCategoryTitle.textContent = ": Backpacks";
    break;
  case "sleeping-bags":
    productCategoryTitle.textContent = ": Sleeping Bags";
    break;
  case "hammocks":
    productCategoryTitle.textContent = ": Hammocks";
    break;

  default:
    break;
}
