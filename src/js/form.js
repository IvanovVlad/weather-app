import { WeatherApi } from './WeatherApi';
import { WeatherData } from './WeatherData';

WeatherApi.getCurrentWeather('Izhevsk').then(data => {
    renderPage(new WeatherData(data));
});

function renderPage(weatherData) {
    document.querySelector('#weather-now').innerText = weatherData.weather.temp + '°';
    document.querySelector('#feels-now').innerText = weatherData.weather.feelsTemp + '°';
    document.querySelector('#environment-now').innerText = weatherData.weather.description;
    document.querySelector('#wind-now').innerText = weatherData.weather.windSpeed + ' m/s';
    document.querySelector('#humidity-now').innerText = weatherData.weather.humidity + '%';
}