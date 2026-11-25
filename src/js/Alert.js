export default class Alert {
  constructor(mainElement) {
    this.mainElement = mainElement;
  }

  async loadAlerts() {
    const response = await fetch("/json/alerts.json");
    const alerts = await response.json();
    return alerts;
  }

  createAlertSection() {
    const section = document.createElement("section");
    section.classList.add("alert-list");
    return section;
  }

  createAlertParagraph(alert) {
    const paragraph = document.createElement("p");
    paragraph.textContent = alert.message;
    paragraph.style.backgroundColor = alert.background;
    paragraph.style.color = alert.color;
    return paragraph;
  }

  renderAlerts(alerts) {
    const section = this.createAlertSection();
    alerts.forEach((alert) => {
      const paragraph = this.createAlertParagraph(alert);
      section.appendChild(paragraph);
    });
    return section;
  }

  async showAlerts() {
    const alerts = await this.loadAlerts();

    if (alerts.length > 0) {
      const section = this.renderAlerts(alerts);
      this.mainElement.prepend(section);
    }
  }
}
