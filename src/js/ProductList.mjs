import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    const retailPrice = Number(product.SuggestedRetailPrice);
    const finalPrice = Number(product.FinalPrice);

    const hasDiscount =
        Number.isFinite(retailPrice) &&
        Number.isFinite(finalPrice) &&
        retailPrice > 0 &&
        finalPrice >= 0 &&
        finalPrice < retailPrice;

    const discountPercentage = hasDiscount
        ? Math.round(((retailPrice - finalPrice) / retailPrice) * 100)
        : 0;

    return `
    <li class="product-card">
        <a href="/product_pages/?product=${product.Id}">
            <img src="${product.Images.PrimaryMedium}" alt="${product.Name}"/>
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">$${finalPrice.toFixed(2)}</p>
            ${
                hasDiscount
                    ? `
                    <p class="product-card__original-price">
                        Original: $${retailPrice.toFixed(2)}
                    </p>
                    <p class="product-card__price">
                        You save: $${(retailPrice - finalPrice).toFixed(2)}
                    </p>
                    <span class="product-card__discount">
                        ${discountPercentage}% OFF
                    </span>
                    `
                    : ""
            }
        </a>

        <button
            type="button"
            class="quick-view-button"
            data-product-id="${product.Id}"
        >
            Quick View
        </button>
    </li>
    `;
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

        this.listElement.addEventListener("click", async (event) => {
            const button = event.target.closest(".quick-view-button");

            if (!button) return;

            const productId = button.dataset.productId;

            try {
                const product = await this.dataSource.findProductById(productId);
                this.showQuickView(product);
            } catch {
                alert("Unable to load product details. Please try again.");
            }
        });

        return listOfProduct;
    }

    renderList(list) {
        renderListWithTemplate(
            productCardTemplate,
            this.listElement,
            list
        );
    }

    showQuickView(product) {
        let modal = document.querySelector("#quick-view-modal");
        const colorName = product.Colors?.ColorName;
        // Create the modal if it does not already exist.
        if (!modal) {
            modal = document.createElement("dialog");
            modal.id = "quick-view-modal";
            modal.classList.add("quick-view-modal");
            document.body.appendChild(modal);
        }
        modal.innerHTML = `
            <button
                type="button"
                class="quick-view-close"
                aria-label="Close quick view"
            >
                Close
            </button>

            <div class="quick-view-content">
                <img
                    src="${product.Images.PrimaryLarge}"
                    alt="${product.Name}"
                />

                <div class="quick-view-details">
                    <h2>${product.Brand.Name}</h2>
                    <h3>${product.NameWithoutBrand}</h3>
                    <p class="quick-view-price">
                        $${Number(product.FinalPrice).toFixed(2)}
                    </p>
                    ${colorName ? `<p>${colorName}</p>` : ""}
                    <div>${product.DescriptionHtmlSimple}</div>
                </div>
            </div>
        `;

        modal.showModal();

        modal.querySelector(".quick-view-close").addEventListener("click", () => {
            modal.close();
        });

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.close();
            }
        });
    }

}
