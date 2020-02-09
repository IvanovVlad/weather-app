import { renderPage } from './renderWeatherData';
import { getLocation } from './location';
import { renderImage } from './imageApi';

document.querySelector('#search-button').onclick =
    () => renderPage(document.querySelector('#search-field').value);

document.querySelector('#search-field').onkeypress = (e) => {
    if (e.key === 'Enter') {
       renderPage(e.target.value);
    }
}

getLocation().then(loc => renderPage(loc));

document.querySelector('#refresh').onclick = renderImage;