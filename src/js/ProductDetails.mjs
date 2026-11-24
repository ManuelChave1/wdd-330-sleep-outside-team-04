import { getLocalStorage, setLocalStorage, wishlistCartCounter, addProductToWishlist, loadHeaderFooter } from "./utils.mjs";

export class ProductDetails {
    constructor(productsID, dataSource) {
        this.productsID = productsID;
        this.dataSource = dataSource;
    }

    async getProduct() {
        return await this.dataSource.findProductById(this.productsID);
    }
    async init() {
        const product = await this.getProduct()
        renderProductDetails(product)

        return product;
    }
}

export function addProductToCart(product) {
    // Retrieve existing cart items or start with an empty array.
    const cartItems = getLocalStorage("so-cart") || [];

    const existingProduct = cartItems.find((item) => item.Id === product.Id);


    // Add the selected product without removing existing items.
    if (existingProduct) {
        existingProduct.quantity++;
    }
    else {
        product.quantity = 1;
        cartItems.push(product);
    }
    // Save the updated cart array to localStorage.
    setLocalStorage("so-cart", cartItems);
    loadHeaderFooter();
}




function renderProductDetails(product) {
    const maincontainer = document.querySelector("#main-container")
    const template = document.querySelector("#myTemplate")
    const clone = template.content.cloneNode(true)

    clone.querySelector("#brand-name").textContent = product.Brand.Name;
    clone.querySelector("#nameWithoutbrand").textContent = product.NameWithoutBrand;
    const image = clone.querySelector("#image");
    image.src = product.Images.PrimaryLarge;
    image.alt = product.name;
    clone.querySelector("#product-price").textContent = product.FinalPrice;
    clone.querySelector("#product-color").textContent = product.Colors.ColorName;
    clone.querySelector("#product-description").innerHTML = product.DescriptionHtmlSimple;
    const divBtnAdd = clone.querySelector("#product-detail__add")
    const btnAddToCart = clone.querySelector("#addToCart");
    btnAddToCart.textContent = "Add to Cart";
    btnAddToCart.addEventListener("click", () => {
        addProductToCart(product)
    })
    divBtnAdd.appendChild(btnAddToCart);
    maincontainer.appendChild(clone)
    document.querySelector('.addToWishList').addEventListener('click', (e) => {
        const btn = e.currentTarget;
        const next = btn.getAttribute('aria-pressed') !== 'true';
        btn.setAttribute('aria-pressed', String(next));
        btn.setAttribute('aria-label', next ? 'Remove from wishlist' : 'Add to wishlist');
        addProductToWishlist(product);
    });


}