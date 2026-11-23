/*import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";



const checkout = new CheckoutProcess();

checkout.calculateSubtotal();

document.querySelector("#zipcode").addEventListener("change", () => {
    checkout.calculateOrderTotal();
});*/

import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const checkout = new CheckoutProcess();
loadHeaderFooter();

// Calculate subtotal when page loads
checkout.calculateSubtotal();

// Listen for ZIP code entry
document.querySelector("#zip").addEventListener("input", () => {

    const zip = document.querySelector("#zip").value.trim();

    if (zip !== "") {
        checkout.calculateOrderDetails();
    }

});

// Listen for form submission
const form = document.querySelector("#checkoutbtn");

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const response = await checkout.checkout(form);

    console.log("Server response:", response);

});