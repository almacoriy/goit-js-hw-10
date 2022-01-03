export default class CountryApiService {
  constructor() {
    this.searchForm = '';
  }

  fetchCountries() {
    const url = `https://restcountries.com/v3.1/name/${this.searchForm}?fields=name,capital,population,flags,languages`;

    return fetch(url)
      .then(response => response)
      .then(data => data);
  }
  get form() {
    return this.searchForm;
  }

  set form(newForm) {
    this.searchForm = newForm;
  }
}
