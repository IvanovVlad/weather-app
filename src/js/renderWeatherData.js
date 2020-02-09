import { WeatherApi } from './WeatherApi';
import { WeatherData } from './WeatherData';
import { renderMap } from './mapApi';
import { renderImage } from './imageApi';
import { translate } from './translateApi';
import * as countriesShorts from './countries.json';
import * as language from './language.json';

export function renderPage(city) {
    if (city === '') { return }

    WeatherApi.getCurrentWeather(city).then(data => {
        if (data !== undefined) {
            const wd = new WeatherData(data);
            _weatherData = wd;
            renderCurrentWeather(wd);
            renderMap(wd.location.lat, wd.location.lon);
        }
    });

    WeatherApi.getForecastWeather(city).then(data => {
        renderForecast(data);
    });
}

function setWeatherNow(weatherData) {
    document.querySelector('#weather-now').innerText = weatherData.weather.temp;
    document.querySelector('.weather__icon').src =
        `https://www.weatherbit.io/static/img/icons/${weatherData.icon}.png`;
    document.querySelector('#feels-now').innerText = weatherData.weather.feelsTemp;
    document.querySelector('#environment-now').innerText = language.weather.description[weatherData.weather.code][_currentLanguage];
    document.querySelector('#wind-now').innerText = weatherData.weather.windSpeed + ' m/s';
    document.querySelector('#humidity-now').innerText = weatherData.weather.humidity + '%';

    _weatherDescription = weatherData.weather.description;
}

export function setTimeLocation(weatherData) {
    const topElement = document.querySelector('.weather__dateinfo');
    const country = topElement.firstElementChild;
    const date = country.nextElementSibling;
    const time = date.nextElementSibling;

    translate(`${weatherData.location.cityName}, ${countriesShorts.default[weatherData.location.country]}`, _currentLanguage)
    .then(city => country.innerText =city);

    const dt = new Date(weatherData.date)

    date.innerText =
        `${_currentLanguage === 'ru' ? language.day["ru-short"][dt.getDay()]
            : language.day[_currentLanguage][dt.getDay()].slice(0, 3)} ` +
        `${dt.getDate()} ${language.month[_currentLanguage][dt.getMonth()]}`;
    time.innerText = weatherData.time;
}

export function setGeoLocation(weatherData) {
    const location = document.querySelector('.geolocation-info');
    const degreeLat = parseInt(weatherData.location.lat);
    const minutesLat = parseInt((weatherData.location.lat - degreeLat) * 60);
    const degreeLon = parseInt(weatherData.location.lon);
    const minutesLon = parseInt((weatherData.location.lon - degreeLon) * 60);

    location.firstElementChild.innerText =
        `${language.geolocation[_currentLanguage].lat}: ${degreeLat}°${minutesLat}'`;
    location.lastElementChild.innerText =
        `${language.geolocation[_currentLanguage].lon}: ${degreeLon}°${minutesLon}'`;
}

export function renderCurrentWeather(weatherData) {
    setWeatherNow(weatherData);
    setTimeLocation(weatherData);
    setGeoLocation(weatherData);
    renderImage();
}

function renderForecast(weatherDataArray) {
    if (weatherDataArray !== undefined) {
        const tileNodes = document.querySelectorAll('.forecast .weather-tile');
        const wdArray = [];

        for (let i = 1; i <= 3; i++) {
            wdArray.push(new WeatherData(weatherDataArray[i]));
        }

        _weatherDataArray = wdArray;

        wdArray.forEach((wd, index) => {
            const date = new Date(wd.date);
            tileNodes[index].firstElementChild.innerText =
                language.day[_currentLanguage][date.getDay()];
            tileNodes[index].firstElementChild.nextElementSibling.innerText = wd.weather.temp;
            tileNodes[index].querySelector('img').src =
                `https://www.weatherbit.io/static/img/icons/${wd.icon}.png`;
        })
    }
}

export function languageRenderForecast(wdArray) {
    const tileNodes = document.querySelectorAll('.forecast .weather-tile');
    wdArray.forEach((wd, index) => {
        const date = new Date(wd.date);
        tileNodes[index].firstElementChild.innerText =
            language.day[_currentLanguage][date.getDay()];
    })
}

export function translateSelect() {
    document.querySelectorAll('#language option').forEach((op, index) => {
        op.innerText = language.options[_currentLanguage][`option${index+1}`];
    });
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