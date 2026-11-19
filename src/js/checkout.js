import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess();

checkout.calculateSubtotal();

document.querySelector("#zipcode").addEventListener("change", () => {
    checkout.calculateOrderTotal();
});