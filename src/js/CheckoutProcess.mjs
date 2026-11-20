import ExternalServices from "./ExternalServices.mjs";

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


}

function formDataToJSON(formData) {
    const json = {};

    formData.forEach((value, key) => {
        json[key] = value;
    });

    return json;
}

function packageItems(items) {
    return items.map(item => {
        return {
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: item.Quantity
        };
    });
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

});