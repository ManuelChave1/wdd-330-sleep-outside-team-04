import { renderListWithTemplate, getDiscountPercentage } from "./utils.mjs";

function productCardTemplate(product) {
    // const retailPrice = Number(product.SuggestedRetailPrice);
    // const finalPrice = Number(product.FinalPrice);

    // const hasDiscount =
    //     Number.isFinite(retailPrice) &&
    //     Number.isFinite(finalPrice) &&
    //     retailPrice > 0 &&
    //     finalPrice >= 0 &&
    //     finalPrice < retailPrice;

    const discountPercentage = getDiscountPercentage(product)  // hasDiscount
    // ? Math.round(((retailPrice - finalPrice) / retailPrice) * 100)
    // : 0;
    return `
    <li class="product-card"> 
    <a href="/product_pages/?product=${product.Id}">
    <img src="${product.Images.PrimaryMedium}" alt="${product.Name}"/>
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${Number(product.FinalPrice.toFixed(2))}</p>
    ${discountPercentage > 0
            ? `
            <p class="product-card__original-price">
                Original: $${Number(product.SuggestedRetailPrice.toFixed(2))}
            </p>
             <p class="product-card__price">
                You save: $${Number(product.SuggestedRetailPrice.toFixed(0)) - Number(product.FinalPrice.toFixed(0))}
            </p>
            <span class="product-card__discount">
                ${discountPercentage}% OFF
            </span>
        `
            : ""}
    </a>
    </li>
    `
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const listOfProduct = await this.dataSource.getData(this.category);
        this.renderList(listOfProduct);

    }
    renderList(list) {

        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }
}