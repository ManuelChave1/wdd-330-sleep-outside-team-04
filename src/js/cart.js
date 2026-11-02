import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  // Get saved cart items or use an empty array.
  const cartItems = getLocalStorage("so-cart") || [];

  // Convert each cart item into HTML.
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  // Display the products on the cart page.
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  // Convert the saved image path to a root-relative URL.
  // Example: ../images/tents/photo.jpg becomes /images/tents/photo.jpg
  const imagePath = item.Image.replace(/^(\.\.\/)+/, "/");

  // Get the product color, with a fallback if unavailable.
  const color = item.Colors?.[0]?.ColorName || "N/A";

  // Create the HTML for one cart product.
  const newItem = `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${imagePath}"
          alt="${item.Name}"
        />
      </a>

      <a href="#" class="cart-card__name">
        <h2 class="card__name">${item.Name}</h2>
      </a>

      <p class="cart-card__color">${color}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">
        $${Number(item.FinalPrice).toFixed(2)}
      </p>
    </li>
  `;

  return newItem;
}

renderCartContents();
