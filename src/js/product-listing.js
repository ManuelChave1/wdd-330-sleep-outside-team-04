import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

const productHtmlRender = document.querySelector("#product-list");
const data = new ProductData();
const category = getParam("category")
const product = new ProductList(category, data, productHtmlRender);
product.init();

console.log(product.init())