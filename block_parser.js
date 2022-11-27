const fetch = require('node-fetch');

const {getCelsius} = require('./temp_converter.js');

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
    getData(){
        let obj = {
            city:this.json.name,
            temp:getCelsius(this.json.main.temp),
            weatherName:this.json.weather[0].main,
            weatherDesc:this.json.weather[0].description,
            weatherIcon:this.json.weather[0].icon,
        };

        return obj;
    }
}

class BlockData{
    constructor(lat,lon){
        this.lat = lat;
        this.lon = lon;
        this.key = 'a1ffdd83e9d1cf8bff5eb8fcd2cdf7af';
    }

    async getData(){
        let parser = new WeatherParser(this.lat,this.lon,this.key);
        let json = await parser.getJSON();
        let handler = new JsonHandler(json);
        let data = handler.getData();
        return data;
    };
}

module.exports = { BlockData };