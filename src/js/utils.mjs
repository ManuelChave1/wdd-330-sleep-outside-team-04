// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const HTMLString = list.map(templateFn)

  if (clear === false) {
    parentElement.insertAdjacentHTML(position, HTMLString.join(""))

  }

}

export function renderWithTemplate(templateFn, parentElement, data, callback) {
  parentElement.innerHTML = templateFn;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

export async function loadHeaderFooter() {
  const header = await loadTemplate("/partials/header.html");
  const footer = await loadTemplate("/partials/footer.html");

  const headerTemplate = document.getElementById("header");
  const footerTemplate = document.getElementById("footer");

  renderWithTemplate(header, headerTemplate)
  renderWithTemplate(footer, footerTemplate)

  await wishlistCartCounter("so-cart", ".cartCount");
  await wishlistCartCounter("so-cart-wishlist", ".wishlistCount");
}


export async function wishlistCartCounter(localStorageKey, counterDisplay) {
  const items = await getLocalStorage(localStorageKey);

  const displayCount = document.querySelector(counterDisplay);

  if (items.length > 0) {
    displayCount.textContent = items.length;
  } else {
    displayCount.hidden = true;
  }

}

export function addProductToWishlist(product) {
  // Retrieve existing cart items or start with an empty array.
  const wishlist = getLocalStorage("so-cart-wishlist") || [];

  const existingProduct = wishlist.find((item) => item.Id === product.Id);

  // Add the selected product without removing existing items.
  if (existingProduct) {
    return;
  }
  else {
    product.quantity = 1;
    wishlist.push(product);
  }
  // Save the updated cart array to localStorage.
  setLocalStorage("so-cart-wishlist", wishlist);
  loadHeaderFooter();
}

export function removeFromCartWishlist(event,targetBtn,localStorageKey,renderFn,counterTemplate) {

  //sets the button to any clicked .removefromcart clas
  const button = event.target.closest(targetBtn);
  
  if (!button) return;
  
  //get the position of the btn
  const index = Number(button.dataset.index);
  const Items = getLocalStorage(localStorageKey) || [];
  
  //remove the item in the list using the position of the btn
  Items.splice(index, 1);
  
  // set the new cart after removing the delete item
  setLocalStorage(localStorageKey,Items);
  
  // rerender the cart for fresh results
  renderFn();
  wishlistCartCounter(localStorageKey, counterTemplate);
};