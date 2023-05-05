import Notiflix from "notiflix";
export function fetchCountries(name) {
    
const BASE_URL = 'https://restcountries.com/v2/name';
    const url = `${BASE_URL}/${name}?fields=name,capital,languages,population,flag`;
    return fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error('Not found!');
            }
            const result = res.json();
            return result;
        })
};