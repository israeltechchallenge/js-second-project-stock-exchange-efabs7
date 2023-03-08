class Marquee {
  constructor(div) {
    this.div = div;
  }
  async getMarqueeResults() {
    try {
      const response = await fetch(allStocksLink);
      showLoader();

      if (!response.ok) {
        handleResponseError(response);
        hideLoader();
        return;
      }
      const stockList = await response.json();
      hideLoader();
      const abbStockList = stockList.slice(0, 30);
      const temporaryBox = document.createDocumentFragment();
      abbStockList.forEach((element) => {
        const marqText = document.createElement("p");
        const marqNum = document.createElement("p");
        const symbol = element.symbol;
        const price = element.price;
        marqText.innerHTML = `${symbol}: `;
        marqNum.innerHTML = ` ($${price})`;
        marqNum.style.color = "green";
        temporaryBox.appendChild(marqText);
        temporaryBox.appendChild(marqNum);
        this.div.appendChild(temporaryBox);
      });
    } catch (err) {
      console.log(err);
    }
  }
}
