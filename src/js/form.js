import { renderPage } from './renderWeatherData';
import { getLocation } from './location';

document.querySelector('#search-button').onclick =
    () => renderPage(document.querySelector('#search-field').value);

getLocation().then(loc => renderPage(loc));