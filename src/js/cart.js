import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  // Get saved cart items or use an empty array.
  const cartItems = getLocalStorage("so-cart") || [];

  // Convert each cart item into HTML.
  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );

  // Display the products on the cart page.
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  //Check if there is anything uploaded on the cart

  if (cartItems.length > 0) {
    document.querySelector(".hide").style.display = "block";
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.querySelector(".cart-total").textContent = `Total Price: ${total}`;
  }
}

function cartItemTemplate(item, index) {
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
      <button type="button" class="removeFromCart" data-index="${index}">X</button>
    </li>
  `;

  return newItem;
}

renderCartContents();

//add evet listener to every buton in the .product_list
document.querySelector(".product-list").addEventListener("click", (event) => {
  //sets the button to any clicked .removefromcart clas
  const button = event.target.closest(".removeFromCart");
  if (!button) return;
  //get the position of the btn
  const index = Number(button.dataset.index);
  const cartItems = getLocalStorage("so-cart") || [];
  //remove the item in the list using the position of the btn
  cartItems.splice(index, 1);
  // set the new cart after removing the delete item
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  // rerender the cart for fresh results
  renderCartContents();
});
