// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const HTMLString = list.map(templateFn)

  if (clear === false) {
    parentElement.insertAdjacentHTML(position, HTMLString.join(""))

  } else {
    parentElement.innerHTML = ""
    parentElement.insertAdjacentHTML(position, HTMLString.join(""))
  }

}

export function renderWithTemplate(templateFn, parentElement, data, callback) {
  parentElement.innerHTML = templateFn;
  if(callback){
    callback(data);
  }    
}

export async function loadTemplate(path){
    const response = await fetch(path);
    const template = await response.text();
    return template;
}

export async function loadHeaderFooter(){
  const header =  await loadTemplate("../public/partials/header.html");
  const footer = await loadTemplate("../public/partials/footer.html");

  const headerTemplate = document.getElementById("header");
  const footerTemplate = document.getElementById("footer");

  renderWithTemplate(header,headerTemplate)
  renderWithTemplate(footer,footerTemplate)


}


