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



(async function getCompanyInfo() {

    try {
       showLoader()
        const response = await fetch(companyInfoLink)
        if (!response.ok) {
            handleResponseError(response)
            hideLoader()
            return
        }
        const data = await response.json()
        console.log(data)
        hideLoader()
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

    companyImg.src = image
    companyInfo.innerHTML = description
    compName.innerHTML = companyName
    stockInfo.innerHTML = ` Stock price: ${price}, ( ${changesPercentage})`
}

(async function fetchStockHistory() {
    try {
        const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${companyCode}?serietype=line`)
        if (!response.ok) {
            handleResponseError(response)
            return
        }
        const data = await response.json()
        console.log(data)
        
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

function showLoader() {
  spinner.classList.remove("hide");
}

function hideLoader() {
  spinner.classList.add("hide");
}




