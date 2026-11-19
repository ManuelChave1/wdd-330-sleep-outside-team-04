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