export default class Autocomplete {
  constructor(rootEl, options = {}) {
    options = Object.assign({ numOfResults: 10, data: [], api: null}, options);
    Object.assign(this, { rootEl, options });

    this.init();
  }

  onQueryChange(query) {
    // Get data for the dropdown
    if(this.options.data.length == 0 && this.options.api != null){      
      this.fetchData(query, this.options.api);
    }else{
      let results = this.getResults(query, this.options.data);
      results = results.slice(0, this.options.numOfResults);
      this.updateDropdown(results);
    }    
  }

  /**
   * Given an array and a query, return a filtered array based on the query.
   */
  getResults(query, data) {
    if (!query) return [];

    // Filter for matching strings
    let results = data.filter((item) => {
      return item.text.toLowerCase().includes(query.toLowerCase());
    });

    return results;
  }

  async fetchData(query, api){
    let url = `${api.url}?${api.queryParameterKey}=${query}`;
    if(api.perPageParameterKey){
      url += `&${api.perPageParameterKey}=${this.options.numOfResults}`;
    }
    await fetch(url)
    .then(response => response.json())
    .then(data => {       
      const items = this.extractJson(data);
      this.updateDropdown(items);      
    });
  }

  extractJson(data){
    let items = [];
    if(!data) return [];
    switch(this.options.api.key){
      case 'github':
        items = data.items.map(item => ({
          text: item.login,
          value: item.id
        }));
        return items;
      
      case 'gorest':
        items = data.data.map(item => ({
          text: item.name,
          value: item.id
        }));
        return items;
      
        //todo based on each api we should implement the way of extraction
      case 'api_public':
        return items;
    }
  }

  updateDropdown(results) {
    this.listEl.innerHTML = '';
    this.listEl.appendChild(this.createResultsEl(results));
  }

  createResultsEl(results) {
    const fragment = document.createDocumentFragment();
    results.forEach((result) => {
      const el = document.createElement('li');
      Object.assign(el, {
        className: 'result',
        textContent: result.text,
      });

      // Pass the value to the onSelect callback
      el.addEventListener('click', (event) => {
        const { onSelect } = this.options;
        if (typeof onSelect === 'function') onSelect(result.value);
      });

      fragment.appendChild(el);
    });
    return fragment;
  }

  createQueryInputEl() {
    const inputEl = document.createElement('input');
    Object.assign(inputEl, {
      type: 'search',
      name: 'query',
      autocomplete: 'off',
    });

    inputEl.addEventListener('input', event =>
      this.onQueryChange(event.target.value));

    return inputEl;
  }

  init() {
    // Build query input
    this.inputEl = this.createQueryInputEl();
    this.rootEl.appendChild(this.inputEl)

    // Build results dropdown
    this.listEl = document.createElement('ul');
    Object.assign(this.listEl, { className: 'results' });
    this.rootEl.appendChild(this.listEl);
  }
}
