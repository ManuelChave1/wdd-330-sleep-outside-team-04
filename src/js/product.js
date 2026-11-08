import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

// Create a data source for tent products.
const dataSource = new ProductData("tents");


function addProductToCart(product) {
  // Retrieve existing cart items or start with an empty array.
  const cartItems = getLocalStorage("so-cart") || [];

  // Add the selected product.
  cartItems.push(product);

  // Save the updated cart.
  setLocalStorage("so-cart", cartItems);
}

async function addToCartHandler(e) {
  // Get the selected product ID.
  const clickedProductId = e.currentTarget.dataset.id;


  // Find the product using its ID.
  const product = await dataSource.findProductById(clickedProductId);


  // Only add the product if it exists.
  if (product) {
    addProductToCart(product);
  }
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
