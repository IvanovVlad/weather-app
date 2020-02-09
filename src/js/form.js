import { renderPage, languageRenderForecast, setGeoLocation, languageSetWeatherNow, setTimeLocation, translateSelect } from './renderWeatherData';
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

document.querySelector('#language').onchange = (e) => {
    switch (e.target.selectedIndex) {
        case 0:
            _currentLanguage = 'en';
            languageRenderForecast(_weatherDataArray);
            setGeoLocation(_weatherData);
            languageSetWeatherNow(_weatherData);
            setTimeLocation(_weatherData);
            translateSelect();
            break;
        case 1:
            _currentLanguage = 'ru';
            languageRenderForecast(_weatherDataArray);
            setGeoLocation(_weatherData);
            languageSetWeatherNow(_weatherData);
            setTimeLocation(_weatherData);
            translateSelect();
            break;
        case 2:
            _currentLanguage = 'be';
            languageRenderForecast(_weatherDataArray);
            setGeoLocation(_weatherData);
            languageSetWeatherNow(_weatherData);
            setTimeLocation(_weatherData);
            translateSelect();
            break;
    }
};