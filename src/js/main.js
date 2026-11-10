import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const productHtmlRender = document.querySelector("#product-list");
const data = new ProductData("tents");
const product = new ProductList(data.category, data, productHtmlRender);
product.init();

loadHeaderFooter();
