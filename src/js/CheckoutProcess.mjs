
import ExternalServices from "./ExternalServices.mjs";

function formDataToJSON(formElement) {
    const formData = new FormData(formElement);

    const data = {};

    formData.forEach((value, key) => {

        data[key] = value;

    });

    return data;
}

export default class CheckoutProcess {

    constructor() {
        this.externalServices = new ExternalServices();

        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.orderTotal = 0;
    }

    calculateSubtotal() {

        const cart = JSON.parse(localStorage.getItem("so-cart")) || [];

        this.subtotal = cart.reduce((total, item) => {
            return total + Number(item.FinalPrice) * (Number(item.quantity) || 1);
        }, 0);

        document.querySelector("#subTotal").textContent =
            `$${this.subtotal.toFixed(2)}`;

        return this.subtotal;
    }

    calculateOrderDetails() {

        const cart = JSON.parse(localStorage.getItem("so-cart")) || [];

        const totalItems = cart.reduce((total, item) => {
            return total + (Number(item.quantity) || 1);
        }, 0);

        this.tax = this.subtotal * 0.06;

        this.shipping = totalItems > 0 ? 10 + (totalItems - 1) * 2 : 0;

        this.orderTotal = this.subtotal + this.tax + this.shipping;

        document.querySelector("#tax").textContent = `$${this.tax.toFixed(2)}`;

        document.querySelector("#shipping").textContent = `$${this.shipping.toFixed(2)}`;

        document.querySelector("#total").textContent = `$${this.orderTotal.toFixed(2)}`;
    }

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

    async checkout(form) {

        const formData = formDataToJSON(form);

        const cart = JSON.parse(localStorage.getItem("so-cart")) || [];

        const order = {

            ...formData,

            orderDate: new Date().toISOString(),

            orderTotal: this.orderTotal.toFixed(2),

            shipping: this.shipping,

            tax: this.tax.toFixed(2),

            items: this.packageItems(cart)

        };

        const response = await this.externalServices.checkout(order);

        // console.log("Im the response", response)
        return response;
    }
}