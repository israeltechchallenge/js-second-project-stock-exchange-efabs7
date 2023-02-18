const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const loader = document.getElementById("spinner");
const resultsList = document.getElementById("results-list");
const baseLink = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/`
const getCompanyDetails = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/`
const allStocksLink = `${baseLink}stock/list`
const marquee = document.getElementById("marquee")
const loadingText = document.getElementById("loading-text")




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
        for (let i = 0; i< response.length; i++) {
            const { symbol } = response[i]
        
            getMoreDetails(`${getCompanyDetails}${symbol}`)
           
}
    }
    
    async function getMoreDetails(link) {   
        const temporaryContainer = document.createDocumentFragment()
        try {
        showLoader()
         const resp = await fetch (link)
         if (!resp.ok) {
             handleResponseError(resp)
             hideLoader()
         }
         const compData = await resp.json()
         hideLoader()
         const { image, changesPercentage, companyName } = compData.profile 
         const { symbol } = compData
         const a = document.createElement('a')
         const newItem = document.createElement("li");
         const percentageNum = parseFloat(changesPercentage)

         if (percentageNum < 0) {

         newItem.innerHTML = `<img src=${image}></img>  ${companyName}  (${symbol}) (${changesPercentage.fontcolor("red")})` } 

         else {
              newItem.innerHTML = `<img src= ${image}></img>  ${companyName}  (${symbol}) (${changesPercentage.fontcolor("lightgreen")})`
         }
         a.appendChild(newItem)
         a.href = `./company.html?symbol=${symbol}`
         temporaryContainer.appendChild(a)
         resultsList.appendChild(temporaryContainer)
     } catch (err) {
         console.log(err)
     } 
 }

(async function getMarqueeResults() {
    try {
        const response = await fetch (allStocksLink)
        showLoader()
        loadingText.classList.remove("hidden")
        if (!response.ok) {
            handleResponseError(response)
            hideLoader()
            return
        }
        const stockList = await response.json()
        loadingText.classList.add("hidden")
        hideLoader()
       
        const temporaryBox = document.createDocumentFragment()
       stockList.forEach((element) => {
        const marqText = document.createElement("p")
        const marqNum = document.createElement("p")
        const symbol = element.symbol
        const price = element.price
        marqText.innerHTML = `${symbol}: `
        marqNum.innerHTML = ` ($${price})`
        marqNum.style.color = "green"
        temporaryBox.appendChild(marqText)
        temporaryBox.appendChild(marqNum)
        marquee.appendChild(temporaryBox)
        
    })
}
    catch (err) {
        console.log(err)

    }
})()

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