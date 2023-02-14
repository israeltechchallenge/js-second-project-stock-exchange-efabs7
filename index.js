const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const loader = document.getElementById("spinner");
const resultsList = document.getElementById("results-list");
const baseLink = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/`


async function getResults() {
    try {
        showLoader()
        const response = await fetch (`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput.value}&limit=10&exchange=NASDAQ`)
    
        if (!response.ok) {
            handleResponseError(response)
            hideLoader()
            return
        }
        const json = await response.json()
        hideLoader()
        const valuesArray = Object.values(json); 
        generateResultList(valuesArray)
        
     } catch (err) {
            console.log(err);
            hideLoader()
        }
    }
    function generateResultList(response) {  
        resultsList.innerHTML = ""
        const temporaryContainer = document.createDocumentFragment()
        for (let i = 0; i< response.length; i++) {
            const companyInfo = response[i]
            const companyValues = Object.values(companyInfo);
            const name = companyValues[1]
            const symbol = companyValues[0]
            const a = document.createElement('a')
            const newItem = document.createElement("li");
            newItem.innerHTML = `${name}  ${symbol}`
            a.appendChild(newItem)
            a.href = `./company.html?symbol=${symbol}`
            a.target = "blank"
            temporaryContainer.appendChild(a)
        }
        resultsList.appendChild(temporaryContainer)
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

searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    getResults()
});