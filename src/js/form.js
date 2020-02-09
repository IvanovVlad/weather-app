import { WeatherApi } from './WeatherApi';
import { WeatherData } from './WeatherData';
import { renderMap } from './mapApi';
import * as countriesShorts from './countries.json';

WeatherApi.getCurrentWeather('Izhevsk').then(data => {
    const wd = new WeatherData(data);
    renderCurrentWeather(wd);
    renderMap(wd.location.lat, wd.location.lon);
});

WeatherApi.getForecastWeather('Izhevsk').then(data => {
    renderForecast(data);
});

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

function renderCurrentWeather(weatherData) {
    function setWeatherNow(weatherData) {
        document.querySelector('#weather-now').innerText = weatherData.weather.temp + '°';
        document.querySelector('.weather__icon').src =
            `https://www.weatherbit.io/static/img/icons/${weatherData.icon}.png`;
        document.querySelector('#feels-now').innerText = weatherData.weather.feelsTemp + '°';
        document.querySelector('#environment-now').innerText = weatherData.weather.description;
        document.querySelector('#wind-now').innerText = weatherData.weather.windSpeed + ' m/s';
        document.querySelector('#humidity-now').innerText = weatherData.weather.humidity + '%';
    }

    function setTimeLocation(weatherData) {
        const topElement = document.querySelector('.weather__dateinfo');
        const country = topElement.firstElementChild;
        const date = country.nextElementSibling;
        const time = date.nextElementSibling;

        country.innerText =
            `${weatherData.location.cityName}, ${countriesShorts.default[weatherData.location.country]}`;

        const dt = new Date(weatherData.date)

        date.innerText = `${days[dt.getDay()].slice(0, 3)} ${dt.getDate()} ${months[dt.getMonth()]}`;
        time.innerText = weatherData.time;
    }

    function setGeoLocation(weatherData) {
        const location = document.querySelector('.geolocation-info');
        const degreeLat = parseInt(weatherData.location.lat);
        const minutesLat = parseInt((weatherData.location.lat - degreeLat) * 60);
        const degreeLon = parseInt(weatherData.location.lon);
        const minutesLon = parseInt((weatherData.location.lon - degreeLon) * 60);

        location.firstElementChild.innerText =
            `Latitude: ${degreeLat}°${minutesLat}'`;
        location.lastElementChild.innerText =
            `Longitude: ${degreeLon}°${minutesLon}'`;
    }

    setWeatherNow(weatherData);
    setTimeLocation(weatherData);
    setGeoLocation(weatherData);
}

function renderForecast(weatherDataArray) {
    const tileNodes = document.querySelectorAll('.forecast .weather-tile');
    const wdArray = [];

    for (let i = 1; i <= 3; i++) {
        wdArray.push(new WeatherData(weatherDataArray[i]));
    }

    wdArray.forEach((wd, index) => {
        const date = new Date(wd.date);
        tileNodes[index].firstElementChild.innerText = days[date.getDay()];
        tileNodes[index].firstElementChild.nextElementSibling.innerText = wd.weather.temp + '°';
        tileNodes[index].querySelector('img').src =
            `https://www.weatherbit.io/static/img/icons/${wd.icon}.png`;
    })

}