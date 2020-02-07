export class WeatherData {
    constructor(data) {
        this.location = {};
        this.location.lon = data.lon;
        this.location.lat = data.lat;
        this.location.cityName = data.city_name;
        this.location.country = data.country_code;
        this.weather = {}
        this.weather.description = data.weather.description;
        this.weather.temp = data.temp;
        this.weather.feelsTemp = data.app_temp;
        this.weather.humidity = data.rh;
        this.weather.windSpeed = data.wind_spd;
        this.time = data.datetime;
    }
}