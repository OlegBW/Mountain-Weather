const fetch = require('node-fetch2');

function getCelsius(temp){
    return String(((+temp)-273).toFixed())+'°C';
}

class ForecastParser{
    constructor(lat, lon, key){
        this.lat = lat;
        this.lon = lon;
        this.key = key;
    }

    getJSON = async()=>{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&appid=${this.key}`);
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
            city:this.json.city.name,
            country:this.json.city.country,
        }
        return data;
    }

    getData(){
        let data = new Array();

        for(let i = 0 ; i<this.json.list.length; i++){
            let obj = {
                    temp:getCelsius(this.json.list[i].main.temp),
                    tempFeels:getCelsius(this.json.list[i].main.feels_like),
                    tempMin:getCelsius(this.json.list[i].main.temp_min),
                    tempMax:getCelsius(this.json.list[i].main.temp_max),
                    pressure:this.json.list[i].main.pressure,
                    weatherName:this.json.list[i].weather[0].main,
                    weatherDesc:this.json.list[i].weather[0].description,
                    weatherIcon:this.json.list[i].weather[0].icon,
                    clouds:this.json.list[i].clouds.all,
                    windSpeed:this.json.list[i].wind.speed,
                    windDeg:this.json.list[i].wind.deg,
                    date:this.json.list[i].dt_txt,
                }

            data.push(obj);
        }

        return data;
    }
}

class ForecastData{
    constructor(lat,lon){
        this.lat = lat;
        this.lon = lon;
        this.key = 'a1ffdd83e9d1cf8bff5eb8fcd2cdf7af';
    }

    async getData(){
        let parser = new ForecastParser(this.lat,this.lon,this.key);
        let json = await parser.getJSON();
        let handler = new JsonHandler(json);
        let data = handler.getData();
        // console.log(data);
        return data;
    };

    async getLocation(){
        let parser = new ForecastParser(this.lat,this.lon,this.key);
        let json = await parser.getJSON();
        let handler = new JsonHandler(json);
        let data = handler.getLocation();
        // console.log(data);
        return data;
    }
}

// let res = new ForecastData(47.66,36.27)
// res.getData();
// res.getLocation();

module.exports = { ForecastData };
