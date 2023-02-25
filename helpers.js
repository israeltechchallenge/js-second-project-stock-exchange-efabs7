const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const loader = document.getElementById("spinner");
const resultsList = document.getElementById("results-list");
const baseLink = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/`
const getCompanyDetails = `${baseLink}company/profile/`
const allStocksLink = `${baseLink}stock/list`
const marquee = document.getElementById("marquee")
const loadingText = document.getElementById("loading-text")
const urlBaseProfile = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/`
const urlSearch = window.location.search
const params = new URLSearchParams(urlSearch)
const companyCode = params.get('symbol')
const companyInfoLink = `${urlBaseProfile}${companyCode}`
const companyImg = document.getElementById("img")
const compName = document.getElementById("company-name")
const stockInfo = document.getElementById("stock-info")
const companyInfo = document.getElementById("company-info")
const ctx = document.getElementById("myChart");
const spinner = document.getElementById("spinner2");

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

function handleResponseError (response) {
    response.text().then(text => {
        const badMessage = document.createElement("li");
        badMessage.innerText = `There's been an error: ${text}`
        resultsList.appendChild(badMessage);
    })
}