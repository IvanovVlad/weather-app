export class WeatherApi {
    // weatherbit
    static key = 'f3bc4b45fafe49e6bbce959d7597197b';
    
    constructor() {}

    static async getCurrentWeather(city) {
        const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${WeatherApi.key}`);
        const json = await response.json();
        const data = json.data[0];
        return data;
    }
}