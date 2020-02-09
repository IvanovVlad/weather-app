const selector = document.querySelector('#units-selector');
let units = 'c';

selector.addEventListener('change', changeLanguage);

function toFahrenheit(celsius) {
    return Math.round(parseInt(celsius) * 9 / 5 + 32) + 'F';
}

function toCelsius(fahrenheit) {
    return Math.round((parseInt(fahrenheit) - 32) * 5 / 9) + '°';
}

function changeLanguage() {
    if (units === 'c') {
        document.querySelector('#weather-now').innerText =
            toFahrenheit(document.querySelector('#weather-now').innerText);
        document.querySelector('#feels-now').innerText =
            toFahrenheit(document.querySelector('#feels-now').innerText);

        const tileNodes = document.querySelectorAll('.forecast .weather-tile');

        tileNodes.forEach(node => {
            node.firstElementChild.nextElementSibling.innerText =
                toFahrenheit(node.firstElementChild.nextElementSibling.innerText);
        });

        units = 'f';
    } else if (units === 'f') {
        document.querySelector('#weather-now').innerText =
            toCelsius(document.querySelector('#weather-now').innerText);
        document.querySelector('#feels-now').innerText =
            toCelsius(document.querySelector('#feels-now').innerText);

        const tileNodes = document.querySelectorAll('.forecast .weather-tile');

        tileNodes.forEach(node => {
            node.firstElementChild.nextElementSibling.innerText =
                toCelsius(node.firstElementChild.nextElementSibling.innerText);
        });

        units = 'c';
    }
}