import { getLocalStorage, loadHeaderFooter,removeFromCartWishlist } from "./utils.mjs";

loadHeaderFooter();
function renderWishlistContents() {
  // Get saved cart items or use an empty array.
  const wishlistItems = getLocalStorage("so-cart-wishlist") || [];

  // Convert each cart item into HTML.
  const htmlItems = wishlistItems.map((item, index) =>
    wishlistItemTemplate(item, index),
  );

  // Display the products on the cart page.
  document.querySelector(".wishlist-list").innerHTML = htmlItems.join("");

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
    <li class="wishlist-card">
    <a href="#" class="cart-card__image">
      <img
        src="${imagePath}"
        alt="${item.Name}"
      />
    </a>
    <h2 class="card__name">${item.Name}</h2>

      <p class="cart-card__color">${color}</p>
      <button type="button" class="removeFromWishlist" data-index="${index}">+</button>
    </li>
  `;
  return newItem;
}

renderWishlistContents();

//add evet listener to every buton in the .product_list
document.querySelector(".wishlist-list").addEventListener("click", (event) => {
  removeFromCartWishlist(event,".removeFromWishlist","so-cart-wishlist",renderWishlistContents,".wishlistCount");
});
