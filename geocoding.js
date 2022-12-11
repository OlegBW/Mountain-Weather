const fetch = require('node-fetch');

class Geocoding{
    constructor(city,limit,key){
        this.city = city;
        this.limit = limit;
        this.key = key;
    }

    getJSON = async()=>{
        let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=${this.limit}&appid=${this.key}`);
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

    getCoords(){
        let obj = {};
        let counter = 0;
        for(let i of this.json){
            obj[counter] = {
                name:i.name,
                lat:i.lat,
                lon:i.lon,
                country:i.country,
                state:i.state,
            }
            counter++;
        }

        return obj;
    }
}

class GeoData{
    constructor(city,limit=5){
        this.city = city;
        this.limit = limit;
        this.key = 'a1ffdd83e9d1cf8bff5eb8fcd2cdf7af';
    }

    async getData(){
        let parser = new Geocoding(this.city,this.limit,this.key);
        let json = await parser.getJSON();
        let handler = new JsonHandler(json);
        let data = handler.getCoords();
        return data;
    }
}

// async function control(){
//     let g = new GeoData('Запоріжжя');
//     let data = await g.getData();
//     console.log(data);
// }
// control();
module.exports = { GeoData };

