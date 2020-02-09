export class WeatherData {
    constructor(data) {
        this.location = {};
        this.location.lon = data.lon;
        this.location.lat = data.lat;
        this.location.cityName = data.city_name;
        this.location.country = data.country_code;
        this.weather = {}
        this.weather.description = data.weather.description;
        this.weather.temp = Math.round(data.temp);
        this.weather.feelsTemp = Math.round(data.app_temp);
        this.weather.humidity = data.rh;
        this.weather.windSpeed = data.wind_spd;
        this.setDateTime(data.ob_time, data.datetime)
        this.icon = data.weather.icon;
    }

    setDateTime(dt, otherdt) {
        if (dt !== undefined) {
            const tmp = dt.split(' ');
            this.date = tmp[0];
            this.time = tmp[1];
        } else {
            this.date = otherdt;
        }
    }
}