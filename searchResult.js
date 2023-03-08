class SearchResult {
  constructor(div, divToAppend) {
    this.div = div;
    this.divToAppend = divToAppend;
    this.bind();
  }

  bind = () => {
    this.div.appendChild(this.divToAppend);
  };
}
