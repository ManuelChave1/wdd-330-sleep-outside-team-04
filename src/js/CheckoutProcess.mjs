import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";


function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
    this.calculateOrderTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + Number(item.FinalPrice),
      0,
    );

    document.querySelector(
      `${this.outputSelector} #itemCount`,
    ).textContent = String(this.list.length);

    document.querySelector(
      `${this.outputSelector} #subTotal`,
    ).textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.tax = Number((this.itemTotal * 0.06).toFixed(2));
    this.shipping = this.list.length
      ? 10 + 2 * (this.list.length - 1)
      : 0;
    this.orderTotal = Number(
      (this.itemTotal + this.tax + this.shipping).toFixed(2),
    );

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(
      `${this.outputSelector} #tax`,
    ).textContent = `$${this.tax.toFixed(2)}`;

    document.querySelector(
      `${this.outputSelector} #shipping`,
    ).textContent = `$${this.shipping.toFixed(2)}`;

    document.querySelector(
      `${this.outputSelector} #total`,
    ).textContent = `$${this.orderTotal.toFixed(2)}`;

  }

  packageItems(items) {
    return items.map((item) => ({
      id: item.Id,
      name: item.Name,
      price: Number(item.FinalPrice),
      quantity: 1,
    }));
  }

  async checkout(form) {
    this.calculateOrderTotal();

    const order = formDataToJSON(form);
    order.orderDate = new Date().toISOString();
    order.items = this.packageItems(this.list);
    order.orderTotal = this.orderTotal.toFixed(2);
    order.shipping = this.shipping;
    order.tax = this.tax.toFixed(2);

    const services = new ExternalServices();
    return services.checkout(order);
  }
}