import ExternalServices from "./ExternalServices.mjs"; "./ProductData.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import { ProductDetails } from "./ProductDetails.mjs";
import { renderBreadcrumbs } from "./Breadcrumbs.mjs";

// Create a data source for tent products.
const dataSource = new ExternalServices();
const productsID = getParam("product");
const ProductDetail = new ProductDetails(productsID, dataSource);

ProductDetail.init().then((product) => {
  const categoryName = product.Category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  renderBreadcrumbs([{ label: categoryName }]);
});

loadHeaderFooter();
//async function addToCartHandler(e) {
//   // Get the selected product ID.
//  const productId = e.currentTarget.dataset.id;

//   // Find the product using its ID.
//  const product = await dataSource.findProductById(productId);

//   // Only add the product if it exists.
//  if (product) {
//    addProductToCart(product);
//  }
//}

// // add listener to Add to Cart button
//document
//  .getElementById("addToCart")
//  .addEventListener("click", addToCartHandler);
