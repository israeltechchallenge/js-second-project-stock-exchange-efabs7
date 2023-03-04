class SearchForm {
  constructor(form, input, button) {
    this.form = form;
    this.input = input;
    this.button = button;
    this.createDomElements();
  }
  createDomElements = () => {
    const box = document.createDocumentFragment();
    const formDiv = document.getElementById("form");
    this.form = document.createElement("form");
    this.button = document.createElement("button");
    this.button.innerHTML = `Search`;
    this.input = document.createElement("input");
    this.input.type = Text;
    this.input.placeholder = `Type your query here...`;
    this.input.classList.add("search-input");
    this.form.classList.add("flex-container");
    this.button.classList.add("search-btn");
    this.bind();
    box.appendChild(this.form);
    box.appendChild(this.input);
    box.appendChild(this.button);
    formDiv.appendChild(box);
  };

  bind = () => {
    this.button.addEventListener("click", (e) => {
      e.preventDefault();
      this.getResults();
    });
  };

  async getResults() {
    try {
      const results = document.getElementById("results");
      results.innerHTML = "";

      showLoader();

      const response = await fetch(
        `${baseLink}search?query=${this.input.value}&limit=10&exchange=NASDAQ`
      );

      if (!response.ok) {
        handleResponseError(response);
        hideLoader();
        return;
      }
      const json = await response.json();
      hideLoader();
      const valuesArray = Object.values(json);
      this.generateResultList(valuesArray);
    } catch (err) {
      console.log(err);
      hideLoader();
    }
  }

  async generateResultList(response) {
    try {
      for (let i = 0; i < response.length; i++) {
        const { symbol } = response[i];
        showLoader();
        const resp = await fetch(`${getCompanyDetails}${symbol}`);
        if (!resp.ok) {
          handleResponseError(resp);
          hideLoader();
        }
        const compData = await resp.json();
        hideLoader();
        const { image, changesPercentage, companyName } = compData.profile;

        handleImgError(image);

        const symb = compData.symbol;
        this.showResultList(symb, image, companyName, changesPercentage);
      }
    } catch (err) {
      console.log(err);
    }
  }
  showResultList = (smbl, img, compName, changeP) => {
    const temporaryContainer = document.createDocumentFragment();
    const resultsList = document.createElement("ul");
    const a = document.createElement("a");
    const newItem = document.createElement("li");
    const percentageNum = parseFloat(changeP);
    let searchTerm = this.input.value;

    if (percentageNum < 0) {
      newItem.innerHTML = `<img src=${img}></img>  ${compName}  (${smbl}) (${changeP.fontcolor(
        "red"
      )})`;
    } else {
      newItem.innerHTML = `<img src= ${img}></img>  ${compName}  (${smbl}) (${changeP.fontcolor(
        "lightgreen"
      )})`;
    }

    showHighlighted(searchTerm, newItem.innerHTML);

    a.appendChild(newItem);
    a.href = `./company.html?symbol=${smbl}`;
    resultsList.appendChild(a);
    resultsList.classList.add("results-list");
    temporaryContainer.appendChild(resultsList);
    const resultsDiv = document.getElementById("results");
    const newList = new SearchResult(resultsDiv, temporaryContainer);
  };
}
