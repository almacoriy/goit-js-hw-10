import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
// import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

function fetchCountries(e) {
  e.preventDefault();
  let country = e.target.value.trim();

  if (country === '') {
    onCleaningMarkup();
    return;
  }

  fetch(
    `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`,
  )
    .then(response => {
      if (!response.ok) {
        throw new Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        onCleaningMarkup();
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      }
      if ((data.length > 1) & (data.length < 11)) {
        return onRenderCountryList(data);
      }
      onRenderCountryInfo(data);
    })
    .catch(error => {
      onCleaningMarkup();
      return Notiflix.Notify.warning('Something went wrong, try again');
    });
}

function onRenderCountryInfo(item) {
  const countryInfo = item
    .map(({ flags, name, population, capital, languages }) => {
      return `<ul style = "list-style: none">
                <li style = "font-weight: bold; margin-bottom: 20px">
                  <img src = "${flags.svg}" width = "30" height = "20" alt = "flag"/>
                  ${name.official}
                </li>
                <li><span style = "font-weight: bold">Capital</span>: ${capital}</li>
                <li><span style = "font-weight: bold">Population</span>: ${population}</li>
                <li><span style = "font-weight: bold">Languages</span>: ${Object.values(
                  languages,
                )}</li>
              </ul>`;
    })
    .join('');

  onCleaningMarkup();

  //  Делаем новую разметку
  refs.info.insertAdjacentHTML('beforeend', countryInfo);
}

function onRenderCountryList(items) {
  const countryList = items
    .map(({ flags, name }) => {
      return `<li  style = "font-weight: bold; margin-bottom: 10px">
                  <img src = "${flags.svg}" width = "30" height = "20" alt = "flag">
                  ${name.official}
              </li>`;
    })
    .join('');

  onCleaningMarkup();

  //  Делаем новую разметку
  refs.list.insertAdjacentHTML('beforeend', countryList);
  refs.list.style.listStyle = 'none';
}

function onCleaningMarkup() {
  refs.info.innerHTML = '';
  refs.list.innerHTML = '';
}
