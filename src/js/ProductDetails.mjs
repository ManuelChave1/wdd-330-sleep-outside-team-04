import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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

    }
}

function addProductToCart(product) {
    // Retrieve existing cart items or start with an empty array.
    const cartItems = getLocalStorage("so-cart") || [];

    // Add the selected product without removing existing items.
    cartItems.push(product);

    // Save the updated cart array to localStorage.
    setLocalStorage("so-cart", cartItems);
}


function renderProductDetails(product) {
    const maincontainer = document.querySelector("#main-container")
    const template = document.querySelector("#myTemplate")
    const clone = template.content.cloneNode(true)

    clone.querySelector("#brand-name").textContent = product.Brand.Name;
    clone.querySelector("#nameWithoutbrand").textContent = product.NameWithoutBrand;
    const image = clone.querySelector("#image");
    image.src = product.Image;
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

}