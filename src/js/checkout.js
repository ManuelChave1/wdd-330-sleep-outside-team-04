import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const checkout = new CheckoutProcess();
loadHeaderFooter();

checkout.calculateSubtotal();

document.querySelector("#zip").addEventListener("input", () => {
  const zip = document.querySelector("#zip").value.trim();

  if (zip !== "") {
    checkout.calculateOrderDetails();
  }
});

const form = document.querySelector(".checkout-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await checkout.checkout(form);
});
