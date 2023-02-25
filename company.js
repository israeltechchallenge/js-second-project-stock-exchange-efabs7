
(async function getCompanyInfo() {

    try {
       showSpinner()
        const response = await fetch(companyInfoLink)
        if (!response.ok) {
            handleResponseError(response)
            hideSpinner()
            return
        }
        const data = await response.json()
        hideSpinner()
        displayCompanyInfo(data.profile)
    }
    catch (err) {
        console.log(err)
      
    }
 
})()



function displayCompanyInfo (data) {
    companyImg.innerHTML = ""
    companyInfo.innerHTML = ""
    compName.innerHTML = ""
    stockInfo.innerHTML = ""

    const { price, image, companyName, changesPercentage, description } = data
    const percentageInt = parseFloat(changesPercentage)
    companyImg.src = image
    companyInfo.innerHTML = description
    compName.innerHTML = companyName
 
  if (percentageInt < 0) {
    stockInfo.innerHTML = ` Stock price: ${price}, ( ${changesPercentage.fontcolor("red")})`}
    else {
      stockInfo.innerHTML = ` Stock price: ${price}, ( ${changesPercentage.fontcolor("lightgreen")})`
    }


   
}

(async function fetchStockHistory() {
    try {
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${companyCode}?serietype=line`)
        if (!response.ok) {
            handleResponseError(response)
            return
        }
        const data = await response.json()
        
        length = data.historical.length;
        let labels = [];
        let values = [];
        for (i= 0; i < length; i++) {
          labels.push(data.historical[i].date);
          values.push(data.historical[i].close);
        }
       
        new Chart (ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Price at Close',
                data: values,
                
                
              }
            ]
          },
          options: {
            legend: { display: false},
          responsive: true,
          plugins: {
          title: {
            display: true,
            text: (ctx) => 'Stock Price History: ' + 'Historical Data',
          }
          }
          }
            }) 
        

    } catch (err) {
        console.log(err)
    }

})()






