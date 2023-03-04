const loader = document.getElementById("spinner");
const resultsList = document.getElementById("results-list");
const baseLink = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/`;
const getCompanyDetails = `${baseLink}company/profile/`;
const allStocksLink = `${baseLink}stock/list`;
const marquee = document.getElementById("marquee");
const urlBaseProfile = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/`;
const urlSearch = window.location.search;
const params = new URLSearchParams(urlSearch);
const companyCode = params.get("symbol");
const companyInfoLink = `${urlBaseProfile}${companyCode}`;
const companyImg = document.getElementById("img");
const compName = document.getElementById("company-name");
const stockInfo = document.getElementById("stock-info");
const companyInfo = document.getElementById("company-info");
const ctx = document.getElementById("myChart");
const spinner = document.getElementById("spinner2");
const delayDebounce = 1000;

function debounce(func, delay) {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func();
    }, delay);
  };
}

function showSpinner() {
  spinner.classList.remove("hide");
}

function hideSpinner() {
  spinner.classList.add("hide");
}

function showLoader() {
  loader.classList.remove("hide");
}

function hideLoader() {
  loader.classList.add("hide");
}

function handleResponseError() {
  const badMessage = document.createElement("li");
  const errorContainer = document.getElementById("results");
  errorContainer.classList.add("results-list");
  badMessage.innerText = `There's been an error`;
  errorContainer.appendChild(badMessage);
}

function showHighlighted(searchTerm, toHighlight) {
  searchTerm.toLowerCase();
  let replace = new RegExp(searchTerm, "gi");
  let highlighted = toHighlight.replace(replace, `<mark>${searchTerm}</mark>`);
  console.log(highlighted);
  toHighlight.innerHTML = highlighted;
  console.log("i have highlighted");
}

function handleImgError(image) {
  image.onerror = "./rugby.png";
}
