import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import { ProductDetails } from "./ProductDetails.mjs";

// Create a data source for tent products.
const dataSource = new ProductData("tents");
const productsID = getParam("product");
const ProductDetail = new ProductDetails(productsID, dataSource)
ProductDetail.init()



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
