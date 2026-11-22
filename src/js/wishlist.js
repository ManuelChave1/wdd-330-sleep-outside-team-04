import { getLocalStorage, loadHeaderFooter, removeFromCartWishlist, wishlistCartCounter } from "./utils.mjs";
import { addProductToCart } from "./ProductDetails.mjs";

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

      <button type="button" class="addToCartFromWishlist" data-index="${index}" aria-label="Add ${item.Name} to cart">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </button>
    </li>
  `;
  return newItem;
}

renderWishlistContents();

//add evet listener to every buton in the .product_list
document.querySelector(".wishlist-list").addEventListener("click", (event) => {
  removeFromCartWishlist(event, ".removeFromWishlist", "so-cart-wishlist", renderWishlistContents, ".wishlistCount");
});

document.querySelector(".wishlist-list").addEventListener("click", (event) => {
  const button = event.target.closest(".addToCartFromWishlist");
  
  if (!button) return;

  const index = Number(button.dataset.index);
  const wishlist = getLocalStorage("so-cart-wishlist") || [];
  
  const item = wishlist[index];
  if (!item) return;

  addProductToCart(item);
  wishlistCartCounter("so-cart", ".cartCount");
});
