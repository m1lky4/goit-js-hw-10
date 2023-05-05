import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.addEventListener('input', debounce(() => {
    list.innerHTML = '';
    info.innerHTML = '';
    const search = input.value.trim();
    if (search !== "") {
        fetchCountries(search).then(countries => {
            if (countries.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            } else if (countries.length >= 2 && countries.length <= 10) {
                countries.forEach(country => {
                    const { flag, name } = country;
                    const markup = `<li class="list-item">
        <img src="${country.flag}" alt="Flag of ${country.name}" />
        <p class="country-name">${country.name}</p>
      </li>`;
                    list.insertAdjacentHTML('afterbegin', markup);
                });
            } else {
                countries.forEach(country => {
                    const { flag, name, languages, population, capital } = country;
                    const markup = ` <div class="country">
        <img src="${country.flag}" alt="Flag of ${country.name}" />
        <h3>${country.name}</h3></div>
        <div class="country-information">
          <p class="country-text">Capital:<span> ${country.capital}</span></p>
          <p class="country-text">Population:<span> ${country.population}</span></p>
          <p class="country-text">Languages:<span> ${languages.map(language => language.name)}</span></p>
        </div>`
                   info.innerHTML = markup
                })
            }
        })
            .catch(err => {
                Notiflix.Notify.failure('Oops, there is no country with that name')
        });
      
    }
},300));
