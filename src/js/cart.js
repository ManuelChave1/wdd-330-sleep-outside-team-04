import { getLocalStorage, loadHeaderFooter, cartCount } from "./utils.mjs";

loadHeaderFooter();
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
    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.FinalPrice) * (item.quantity || 1), 0,);

    document.querySelector(".cart-total").textContent =
      `Total Price: $${total.toFixed(2)}`;
  }

  const cartCards = document.querySelectorAll(".cart-card");

  function updateCartTotal() {

    const total = cartItems.reduce((sum, item) => {

      const quantity = item.quantity || 1;

      return sum + (item.FinalPrice * quantity);

    }, 0);

    document.querySelector(".cart-total").textContent = total.toFixed(2);
  }

  cartCards.forEach((card, index) => {

    const item = cartItems[index];

    let quantity = 1;

    const btnQtydecrease = card.querySelector(".qty-decrease");
    const btnQtyAdd = card.querySelector(".qty-add");
    const qtyInfor = card.querySelector(".qty-infor");
    const priceInfor = card.querySelector(".cart-card__price");

    btnQtyAdd.addEventListener("click", () => {

      quantity++;

      item.quantity = quantity;

      qtyInfor.textContent = quantity;

      priceInfor.textContent = item.FinalPrice.toFixed(2) * quantity;
      updateCartTotal()

    });

    btnQtydecrease.addEventListener("click", () => {

      if (quantity > 1) {

        quantity--;

        item.quantity = quantity;

        qtyInfor.textContent = quantity;

        priceInfor.textContent = item.FinalPrice.toFixed(2) * quantity;
        updateCartTotal()

      }

    });

  });
  updateCartTotal()


}

function cartItemTemplate(item, index) {
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
      <p class="cart-card__quantity">Quantity <br> <br>
        <span class = "cart-cart_qty-infor">
        <button class = "qty-decrease">-</button> <span class = "qty-infor">1</span><button class = "qty-add">+</button>
        </span>
      </p>
    
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
  cartCount();
});

