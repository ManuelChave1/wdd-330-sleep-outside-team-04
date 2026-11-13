export function renderBreadcrumbs(items) {
  const container = document.querySelector("#breadcrumbs");

  if (!container) return;

  container.replaceChildren();

  const list = document.createElement("ol");

  items.forEach((item, index) => {
    const listItem = document.createElement("li");
    const isLastItem = index === items.length - 1;

    if (item.url && !isLastItem) {
      const link = document.createElement("a");
      link.href = item.url;
      link.textContent = item.label;
      listItem.appendChild(link);
    } else {
      const span = document.createElement("span");
      span.textContent = item.label;

      if (isLastItem) {
        span.setAttribute("aria-current", "page");
      }

      listItem.appendChild(span);
    }

    list.appendChild(listItem);
  });

  container.appendChild(list);
}

export function renderCategoryBreadcrumbs(category, products) {
  const categoryName =
    category.charAt(0).toUpperCase() + category.slice(1);

  const productCount = products.length;

  renderBreadcrumbs([
    { label: categoryName },
    { label: `${productCount} items` }
  ]);
}