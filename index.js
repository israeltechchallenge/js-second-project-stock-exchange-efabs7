
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

searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    getResults()
});