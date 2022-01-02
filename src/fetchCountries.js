// export default function fetchCountries(e) {
//   e.preventDefault();
//   let country = e.target.value.trim();

//   if (country === '') {
//     onCleaningMarkup();
//     return;
//   }

//   fetch(
//     `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`,
//   )
//     .then(response => {
//       if (!response.ok) {
//         throw new Notiflix.Notify.failure('Oops, there is no country with that name');
//       }
//       return response.json();
//     })
//     .then(data => {
//       if (data.length > 10) {
//         onCleaningMarkup();
//         return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
//       }
//       if ((data.length > 1) & (data.length < 11)) {
//         return onRenderCountryList(data);
//       }
//       onRenderCountryInfo(data);
//     })
//     .catch(error => {
//       onCleaningMarkup();
//       return Notiflix.Notify.warning('Something went wrong, try again');
//     });
// }
