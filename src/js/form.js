import { renderPage, setGeoLocation, setTimeLocation } from './renderWeatherData';
import { languageRenderForecast, languageSetWeatherNow, translateSelect, translateSearch } from './translateNodes';
import { getLocation } from './location';
import { renderImage } from './API/imageApi';

document.querySelector('#search-button').onclick =
    () => renderPage(document.querySelector('#search-field').value);

document.querySelector('#search-field').onkeypress = (e) => {
    if (e.key === 'Enter') {
        renderPage(e.target.value);
    }
}

getLocation().then(loc => renderPage(loc))
    .catch(e => {
        alert('Can not get your location. ' + e);
        renderPage('Moscow');
    });

document.querySelector('#refresh').onclick = renderImage;

document.querySelector('#language').onchange = (e) => {
    function renderPage(lang) {
        _currentLanguage = lang;
        languageRenderForecast(_weatherDataArray);
        setGeoLocation(_weatherData);
        languageSetWeatherNow(_weatherData);
        setTimeLocation(_weatherData);
        translateSelect();
        translateSearch();
    }

    switch (e.target.selectedIndex) {
        case 0:
            renderPage('en');
            break;
        case 1:
            renderPage('ru');
            break;
        case 2:
            renderPage('be');
            break;
    }
};