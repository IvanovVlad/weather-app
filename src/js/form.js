import { WeatherApi } from './WeatherApi';
import { WeatherData } from './WeatherData';

WeatherApi.getCurrentWeather('Izhevsk').then(data => console.log(new WeatherData(data)));