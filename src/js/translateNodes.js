import { translate } from './API/translateApi';
import * as language from '../json/language.json';
import * as countriesShorts from '../json/countries.json';

export function languageRenderForecast(wdArray) {
    const tileNodes = document.querySelectorAll('.forecast .weather-tile');
    wdArray.forEach((wd, index) => {
        const date = new Date(wd.date);
        tileNodes[index].firstElementChild.innerText =
            language.day[_currentLanguage][date.getDay()];
    })
}

export function languageSetWeatherNow(weatherData) {
    translate(`${weatherData.location.cityName}, ${countriesShorts.default[weatherData.location.country]}`, _currentLanguage)
        .then(city => {
            document.querySelector('.weather__location').innerText = city;
        });
    document.querySelector('.weather__sub-description').innerHTML = `
    <div class="weather__sub-description">
        <div class="feels font-montserrat-normal font-px22"><span id="environment-now">${language.weather.description[weatherData.weather.code][_currentLanguage]}</span></div>
        <div class="temperature font-montserrat-normal font-px22">${language.weather.temperature[_currentLanguage]}: <span id="feels-now">${weatherData.weather.feelsTemp}</span></div>
        <div class="wind font-montserrat-normal font-px22">${language.weather.wind[_currentLanguage]}: <span id="wind-now">${weatherData.weather.windSpeed} m/s</span></div>
        <div class="humidity font-montserrat-normal font-px22">${language.weather.humidity[_currentLanguage]}: <span id="humidity-now">${weatherData.weather.humidity}%</span></div>
    </div>
    `;
}

export function translateSelect() {
    document.querySelectorAll('#language option').forEach((op, index) => {
        op.innerText = language.options[_currentLanguage][`option${index+1}`];
    });
}

export function translateSearch() {
    document.querySelector('#search-field').placeholder = language.search.placeholder[_currentLanguage];
    document.querySelector('#search-button').innerText = language.search.button[_currentLanguage];
}