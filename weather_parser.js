const fetch = require('node-fetch');

const {getCelsius,getMMHG} = require('./converters.js');

class WeatherParser{
    constructor(lat, lon, key){
        this.lat = lat;
        this.lon = lon;
        this.key = key;
    }

    getJSON = async()=>{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.key}`);
        if(response.ok){
            let res = response.json();
            return res
        }
    }
}

class JsonHandler{
    constructor(json){
        this.json = json;
    }

    getLocation(){
        let data = {
            city:this.json.name,
            country:this.json.sys.country,
        }
        return data;
    }

    getData(){
        let obj = {
            temp:getCelsius(this.json.main.temp),
            tempFeels:getCelsius(this.json.main.feels_like),
            tempMin:getCelsius(this.json.main.temp_min),
            tempMax:getCelsius(this.json.main.temp_max),
            pressure:getMMHG(this.json.main.pressure),
            weatherName:this.json.weather[0].main,
            weatherDesc:this.json.weather[0].description,
            weatherIcon:this.json.weather[0].icon,
            clouds:this.json.clouds.all+'%',
            windSpeed:this.json.wind.speed,
            windDeg:this.json.wind.deg,
        };

        return obj;
    }
}

class WeatherData{
    constructor(lat,lon){
        this.lat = lat;
        this.lon = lon;
        this.key = 'a1ffdd83e9d1cf8bff5eb8fcd2cdf7af';
        // console.log('constructor');
    }

    async getData(){
        let parser = new WeatherParser(this.lat,this.lon,this.key);
        let json = await parser.getJSON();
        let handler = new JsonHandler(json);
        let data = handler.getData();
        return data;
    };

    async getLocation(){
        let parser = new WeatherParser(this.lat,this.lon,this.key);
        let json = await parser.getJSON();
        let handler = new JsonHandler(json);
        let data = handler.getLocation();
        return data;
    }
}

// async function test(){
// let wd = new WeatherData(41,29);
// let data = await wd.getData();
// console.log(data);
// }
// test();

module.exports = { WeatherData };