import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".checkout-form");
checkout.init();

const form = document.querySelector(".checkout-form");
const zipInput = form.elements.zip;

zipInput.addEventListener("input", () => {
  checkout.calculateOrderTotal();
});

zipInput.addEventListener("change", () => {
  checkout.calculateOrderTotal();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = document.querySelector("#checkout-message");

  try {
    const response = await checkout.checkout(form);
    console.log("Checkout response:", response);
    message.textContent = "Order submitted successfully.";
  } catch (error) {
    console.error("Checkout failed:", error);
    message.textContent = "Checkout failed. Please try again.";
  }
});
