import { getLocalStorage, loadHeaderFooter, wishlistCartCounter } from "./utils.mjs";

loadHeaderFooter();
function renderWishlistContents() {
  // Get saved cart items or use an empty array.
  const wishlistItems = getLocalStorage("so-cart-wishlist") || [];

  // Convert each cart item into HTML.
  const htmlItems = wishlistItems.map((item, index) =>
    wishlistItemTemplate(item, index),
  );

  // Display the products on the cart page.
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

}

function wishlistItemTemplate(item, index) {
  // Convert the saved image path to a root-relative URL.
  // Example: ../images/tents/photo.jpg becomes /images/tents/photo.jpg
  const imagePath = (
    item.Images?.PrimarySmall ||
    item.Images?.PrimaryLarge ||
    item.Image ||
    ""
  ).replace(/^(\.\.\/)+/, "/");
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
      <button type="button" class="removeFromCart" data-index="${index}">X</button>
    </li>
  `;

  return newItem;
}

renderWishlistContents();

//add evet listener to every buton in the .product_list
document.querySelector(".product-list").addEventListener("click", (event) => {
  //sets the button to any clicked .removefromcart clas
  const button = event.target.closest(".removeFromCart");
  if (!button) return;
  //get the position of the btn
  const index = Number(button.dataset.index);
  const cartItems = getLocalStorage("so-cart-wishlist") || [];
  //remove the item in the list using the position of the btn
  cartItems.splice(index, 1);
  // set the new cart after removing the delete item
  localStorage.setItem("so-cart-wishlist", JSON.stringify(cartItems));
  // rerender the cart for fresh results
  renderWishlistContents();
  wishlistCartCounter("so-cart-wishlist",".wishlistCounter");
});
