/*import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem("so-cart")) || [];
    }

    calculateSubtotal() {
        const subtotal = this.cart.reduce((total, item) => {
            return total + (item.FinalPrice * item.quantity);
        }, 0);

        document.querySelector("#subTotal").textContent =
            `$${subtotal.toFixed(2)}`;

        return subtotal;
    }

    calculateOrderTotal() {

        const subtotal = this.calculateSubtotal();

        const tax = subtotal * 0.06;

        const numberOfItems = this.cart.reduce((total, item) => {
            return total + item.quantity;
        }, 0);

        const shipping = numberOfItems > 0
            ? 10 + (numberOfItems - 1) * 2
            : 0;

        const total = subtotal + tax + shipping;

        document.querySelector("#tax").textContent =
            `$${tax.toFixed(2)}`;

        document.querySelector("#shipping").textContent =
            `$${shipping.toFixed(2)}`;

        document.querySelector("#total").textContent =
            `$${total.toFixed(2)}`;
    }

    packageItems(items) {

        return items.map(item => {

            return {
                id: item.Id,
                name: item.Name,
                price: item.FinalPrice,
                quantity: item.quantity || 1
            };

        });

    }


}




async function checkout(form) {

    // 1. Get form information
    const formData = new FormData(form);

    // 2. Convert form information into JSON
    const json = formDataToJSON(formData);

    // 3. Add the order date
    json.orderDate = new Date().toISOString();

    // 4. Add order totals
    json.orderTotal = orderTotal;
    json.tax = tax;
    json.shipping = shipping;

    // 5. Get products from localStorage
    const cart = getLocalStorage("so-cart");

    // 6. Simplify the cart products
    json.items = packageItems(cart);

    // 7. Send the order to the server
    const response = await ExternalServices.checkout(json);

    // 8. Return the response
    return response;
}

const form = document.querySelector("#checkout-form");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const response = await checkout(form);

    console.log(response);

}); */

import ExternalServices from "./ExternalServices.mjs";

// Converts form information into a JavaScript object
function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    return Object.fromEntries(formData.entries());
}

export default class CheckoutProcess {

    constructor() {
        this.externalServices = new ExternalServices();

        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.orderTotal = 0;
    }

    // Calculate subtotal
    calculateSubtotal() {

        const cart = JSON.parse(localStorage.getItem("so-cart")) || [];

        this.subtotal = cart.reduce((total, item) => {
            return total + Number(item.FinalPrice) * (Number(item.quantity) || 1);
        }, 0);

        document.querySelector("#subTotal").textContent =
            `$${this.subtotal.toFixed(2)}`;

        return this.subtotal;
    }

    // Calculate tax, shipping and order total
    calculateOrderDetails() {

        const cart = JSON.parse(localStorage.getItem("so-cart")) || [];

        const totalItems = cart.reduce((total, item) => {
            return total + (Number(item.quantity) || 1);
        }, 0);

        this.tax = this.subtotal * 0.06;

        this.shipping = totalItems > 0
            ? 10 + (totalItems - 1) * 2
            : 0;

        this.orderTotal = this.subtotal + this.tax + this.shipping;

        document.querySelector("#tax").textContent =
            `$${this.tax.toFixed(2)}`;

        document.querySelector("#shipping").textContent =
            `$${this.shipping.toFixed(2)}`;

        document.querySelector("#total").textContent =
            `$${this.orderTotal.toFixed(2)}`;
    }

    // Simplify the cart products
    packageItems(items) {

        return items.map(item => {

            return {
                id: item.Id,
                name: item.Name,
                price: Number(item.FinalPrice),
                quantity: Number(item.quantity) || 1
            };

        });

    }

    // Prepare and submit the order
    async checkout(form) {

        // Get form information
        const formData = formDataToJSON(form);

        // Get shopping cart
        const cart = JSON.parse(localStorage.getItem("so-cart")) || [];

        // Prepare the order object
        const order = {

            ...formData,

            orderDate: new Date().toISOString(),

            orderTotal: this.orderTotal.toFixed(2),

            shipping: this.shipping,

            tax: this.tax.toFixed(2),

            items: this.packageItems(cart)

        };

        // Send order to the server
        const response = await this.externalServices.checkout(order);

        return response;
    }
}
