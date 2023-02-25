

class Marquee {
    constructor(element) {
        this.element = element;
    }
    async getMarqueeResults() {
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
            const abbStockList = stockList.slice(0, 30)
            const temporaryBox = document.createDocumentFragment()
           abbStockList.forEach((element) => {
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
}
}