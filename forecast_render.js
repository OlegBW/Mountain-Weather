let locationObj;
let weatherObj;
let forecastObj;
let img;

async function getData(){ // отримання інформації користувача
    let response = await window.userData.data();
    return response;
}

async function send(arr){ // відправка пари координат на хост
    let response = await window.sendData.sendCoords(arr);
    return response;
}

async function log(args){ // відправка повідомлення в консоль хосту 
    let response = await window.logData.sendData(args);
    return response;
}

async function getWeatherJSON(){ // отримання з хоста інформації з погодою
    let response = await window.weatherData.getData();
    return response;
}

async function getWeatherContent(){ // відправка пари координат -> отримання з хоста інформації з погодою
    let x = await getWeatherJSON();
    // log(`Received from main.js ${x}`);
    return x;
}

async function getLocationJSON(){ // отримання з хоста інформації з локацією
    let response = await window.weatherData.getLocation();
    return response;
}

async function getLocationContent(){ // відправка пари координат -> отримання з хоста інформації з локацією
    let x = await getLocationJSON();
    // log(`Received from main.js ${x}`);
    return x;
}

async function getForecastJSON(){ // отримання з хоста інформації з прогнозом
    let response = await window.forecastData.getData();
    return response;
}

async function getForecastContent(){
    let x = await getForecastJSON();
    return x;
}

function formatStr(string){
    let strArr = string.split(' ');
    return strArr.join('_')
}

function choseImg(name,desc){
    if(name==='Thunderstorm'){
        return 'thunderstorm';
    }

    else if(name==='Drizzle'){
        return 'drizzle';
    }

    else if(name==='Rain' && (desc==='light rain' || desc==='moderate rain')){
        return 'moderate_rain';
    }

    else if(name==='Rain' && !(desc==='light rain' || desc==='moderate rain')){
        return 'shower_rain';
    }

    else if(name==='Snow'){
        return 'light_snow';
    }

    else if(name==='Clear'){
        return 'clear_sky';
    }

    else if(name==='Clouds'){
        return formatStr(desc);
    }

    else if(name==='sand/ dust whirls'){
        return 'whirls'
    }

    else{
        return formatStr(desc);
    }
}

async function load(){ // підвантаження потрібних даних з хосту
    locationObj = await getLocationContent();
    weatherObj = await getWeatherContent();
    let name = weatherObj.weatherName;
    let desc = weatherObj.weatherDesc;
    img = choseImg(name,desc)
    // console.log(img);
    forecastObj = await getForecastContent();
}



function setMain(){ // заповнення основного блоку
    let city = document.querySelector('.forecast__wrapper__main__geolocation__city');
    let country = document.querySelector('.forecast__wrapper__main__geolocation__country');
    let weatherName = document.querySelector('.forecast__wrapper__main__weather__desc_name');
    let weatherDescription = document.querySelector('.forecast__wrapper__main__weather__desc_about');
    let temp = document.querySelector('.forecast__wrapper__main__weather__temp__temp');
    let ftemp = document.querySelector('.forecast__wrapper__main__weather__temp__feels');
    let maxTemp = document.querySelector('.forecast__wrapper__main__weather__temp__max');
    let minTemp = document.querySelector('.forecast__wrapper__main__weather__temp__min');
    let pressure = document.querySelector('.forecast__wrapper__main__weather__air__pressure');
    let clouds = document.querySelector('.forecast__wrapper__main__weather__air__clouds');
    let windSpeed = document.querySelector('.forecast__wrapper__main__weather__air__windspeed');
    let windDirection = document.querySelector('.forecast__wrapper__main__weather__air__winddeg');

    city.textContent=locationObj.city;
    country.textContent=locationObj.country;
    weatherName.textContent=weatherObj.weatherName;
    weatherDescription.textContent=weatherObj.weatherDesc;
    temp.textContent=`Temperature : ${weatherObj.temp}`;
    ftemp.textContent=`Feels like : ${weatherObj.tempFeels}`;
    maxTemp.textContent=`Max temperature : ${weatherObj.tempMax}`;
    minTemp.textContent=`Min temperature : ${weatherObj.tempMin}`;
    pressure.textContent=`Pressure : ${weatherObj.pressure}`;
    clouds.textContent=`Clouds : ${weatherObj.clouds}`;
    windSpeed.textContent=`Wind speed : ${weatherObj.windSpeed} m/s`;
    windDirection.textContent=`Wind direction : ${weatherObj.windDeg}°`;
}




function disableScroll() {
    // Отримуємо величини прокрутки
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  
        // Якщо відбулась зміна повертаємось назад
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function enableScroll() {
    window.onscroll = function() {};
}


async function control(){ // контрольна функція
    disableScroll();
    await load();
    let mainWrapper = document.querySelector('.forecast__wrapper__main');
    mainWrapper.style.backgroundImage = `url(./src/forecast_img/${img}.png)`;
    setMain();
    const screenSaver = document.querySelector('.screensaver');
    screenSaver.style.display = 'none';
    enableScroll();
    forecast();

    let blocks = Array.from(document.querySelectorAll('.forecast__wrapper__days__group__block_data'));
    document.addEventListener("click",(event)=>{
        if(blocks.includes(event.target)){
            let pressed = (event.target.classList[1]);
            let pressedNum = pressed.slice(pressed.length-1,pressed.length);
            // console.log(pressedNum);
            let blockClass = ".forecast__wrapper__days__group__block__wrapper_"+pressedNum;
            let block = document.querySelector(blockClass);
            //console.log(block.style.display);
            if(block.style.display === ''){
            block.style.display='block';
            }
            else{
                block.style.display='';
            }
        }
    })
}

async function forecast(){
    const blockData1 = document.querySelector(".forecast__wrapper__days__group__block_data_1");
    const blockData1Wrapper = document.querySelector(".forecast__wrapper__days__group__block__wrapper_1");
    const blockData2 = document.querySelector(".forecast__wrapper__days__group__block_data_2");
    const blockData2Wrapper = document.querySelector(".forecast__wrapper__days__group__block__wrapper_2");
    const blockData3 = document.querySelector(".forecast__wrapper__days__group__block_data_3");
    const blockData3Wrapper = document.querySelector(".forecast__wrapper__days__group__block__wrapper_3");
    const blockData4 = document.querySelector(".forecast__wrapper__days__group__block_data_4");
    const blockData4Wrapper = document.querySelector(".forecast__wrapper__days__group__block__wrapper_4");
    const blockData5 = document.querySelector(".forecast__wrapper__days__group__block_data_5");
    const blockData5Wrapper = document.querySelector(".forecast__wrapper__days__group__block__wrapper_5");

    let date1 = 'From '+forecastObj[0].date+' to '+forecastObj[8].date
    blockData1.textContent=date1;
    let date2 = 'From '+forecastObj[8].date+' to '+forecastObj[16].date
    blockData2.textContent=date2;
    let date3 = 'From '+forecastObj[16].date+' to '+forecastObj[24].date
    blockData3.textContent=date3;
    let date4 = 'From '+forecastObj[24].date+' to '+forecastObj[32].date
    blockData4.textContent=date4;
    let date5 = 'From '+forecastObj[32].date+' to '+forecastObj[39].date
    blockData5.textContent=date5;
    // console.log(date1,date2,date3,date4,date5);

    for(let i = 0 ; i<=8 ; i++){
        let fb = new ForecastBlock(forecastObj[i]);
        fb.add(blockData1Wrapper);
    }

    for(let i = 8 ; i<=16 ; i++){
        let fb = new ForecastBlock(forecastObj[i]);
        fb.add(blockData2Wrapper);
    }

    for(let i = 16 ; i<=24 ; i++){
        let fb = new ForecastBlock(forecastObj[i]);
        fb.add(blockData3Wrapper);
    }

    for(let i = 24 ; i<=32 ; i++){
        let fb = new ForecastBlock(forecastObj[i]);
        fb.add(blockData4Wrapper);
    }

    for(let i = 32 ; i<=39 ; i++){
        let fb = new ForecastBlock(forecastObj[i]);
        fb.add(blockData5Wrapper);
    }
}


class ForecastBlock{
    constructor(object){
        this.forecastObj = object;
    }

    add(place){
        let block = document.createElement('div');
        block.className='forecast__wrapper__days__block';

        let blockTop = document.createElement('div');
        blockTop.className='forecast__wrapper__days__block__top';
        let blockTopData = document.createElement('p');
        blockTopData.textContent = this.forecastObj.date;
        let blockDesc = document.createElement('div');
        blockDesc.className='forecast__wrapper__days__block__desc';
        let blockDescName = document.createElement('p');
        blockDescName.textContent = this.forecastObj.weatherName;
        let blockDescInfo = document.createElement('p');
        blockDescInfo.textContent = this.forecastObj.weatherDesc;

        let blockData = document.createElement('div');
        blockData.className = 'forecast__wrapper__days__block__data';
        let blockTemp = document.createElement('div');
        blockTemp.className = 'forecast__wrapper__days__block__temp';
        let blockTempTemp = document.createElement('p');
        blockTempTemp.className = 'forecast__wrapper__days__block__temp__temp';
        blockTempTemp.textContent = 'Temperature : '+this.forecastObj.temp;
        let blockTempFeels = document.createElement('p');
        blockTempFeels.className = 'forecast__wrapper__days__block__temp__feels';
        blockTempFeels.textContent = 'Feels like : '+this.forecastObj.tempFeels;
        let blockTempMax = document.createElement('p');
        blockTempMax.className = 'forecast__wrapper__days__block__temp__max';
        blockTempMax.textContent = 'Max temperature : '+this.forecastObj.tempMax;
        let blockTempMin = document.createElement('p');
        blockTempMin.className = 'forecast__wrapper__days__block__temp__min';
        blockTempMin.textContent = 'Min temperature : '+this.forecastObj.tempMin;

        let blockAir = document.createElement('div');
        blockAir.className = 'forecast__wrapper__days__block__air';


        let blockAirPressure = document.createElement('p');
        blockAirPressure.className = 'forecast__wrapper__days__block__air__pressure';
        blockAirPressure.textContent = 'Pressure : '+this.forecastObj.pressure;

        let blockAirClouds = document.createElement('p');
        blockAirClouds.className = 'forecast__wrapper__days__block__air__clouds';
        blockAirClouds.textContent = 'Clouds : '+this.forecastObj.clouds;

        let blockAirWindspeed = document.createElement('p');
        blockAirWindspeed.className = 'forecast__wrapper__days__block__air__windspeed';
        blockAirWindspeed.textContent = 'Wind speed : '+this.forecastObj.windSpeed;

        let blockAirWindDeg = document.createElement('p');
        blockAirWindDeg.className = 'forecast__wrapper__days__block__air__winddeg';
        blockAirWindDeg.textContent = 'Wind direction : '+this.forecastObj.windDeg;

        block.append(blockTop);
        blockTop.append(blockTopData);
        blockTop.append(blockDesc);
        blockDesc.append(blockDescName);
        blockDesc.append(blockDescInfo);

        block.append(blockData);
        blockData.append(blockTemp);
        blockTemp.append(blockTempTemp);
        blockTemp.append(blockTempFeels);
        blockTemp.append(blockTempMax);
        blockTemp.append(blockTempMin);
        blockData.append(blockAir);
        blockAir.append(blockAirPressure);
        blockAir.append(blockAirClouds);
        blockAir.append(blockAirWindspeed);
        blockAir.append(blockAirWindDeg);

        place.append(block);
    }
}



control();