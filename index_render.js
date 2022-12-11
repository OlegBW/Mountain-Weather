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
    let response = await window.blockData.getData();
    return response;
}

async function saveData(){
    let response = await window.jsonData.saveData();
}

async function clearData(){
    let response = await window.jsonData.clearData();
}

async function getWeatherContent(userCoords){ // відправка пари координат -> отримання з хоста інформації з погодою
    await send(userCoords);
    let x = await getWeatherJSON();
    log(`Received from main.js ${x.city}`);
    return x;
}

function createBlock(weather){
    try{
        const wrapper = document.querySelector('.weather_wrapper');
        let blockWrapper = document.createElement('div');
        let blockCity = document.createElement('p');
        let blockLink = document.createElement('a');
        blockLink.className='weather_wrapper__block__city_link';
        blockLink.setAttribute('href','forecast.html');
        blockLink.textContent = weather.city;
        
        let blockInfo = document.createElement('div');
        let blockTemp = document.createElement('p');
        blockTemp.textContent = weather.temp;
        let blockImg = document.createElement('img');
        blockWrapper.className = 'weather_wrapper__block';
        blockCity.className = 'weather_wrapper__block__city';
        blockInfo.className = 'weather_wrapper__block__weather_info';
        blockTemp.className = 'weather_wrapper__block__temp';
        blockImg.className = 'weather_wrapper__block__image';
        let imgPath = `./src/icons/${weather.weatherIcon}.png`;
        blockImg.setAttribute("src",imgPath);
        wrapper.append(blockWrapper);
        blockWrapper.append(blockCity);
        blockCity.append(blockLink);
        blockWrapper.append(blockInfo);
        blockInfo.append(blockTemp);
        blockInfo.append(blockImg);
    }
    catch(err){
        log(err);
    }
}

class Block{  // блок даних
    constructor(obj){
        this.weatherObj=obj;
    }

    add(){ // створює блок і додає його в DOM сутність obj
        try{
            createBlock(this.weatherObj);
        }
        catch(err){
            log(err);
        }
    }
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

async function preload(){ // початковий рендеринг сторінки
    disableScroll();
    let userArr = await getData();
    let weatherArr = new Array();
    for(let i = 0 ; i<userArr.length; i++){
        weatherArr.push(await getWeatherContent(userArr[i]));
    }

    // console.log(weatherArr);

    const wrapper = document.querySelector('.weather_wrapper');
    for(let i = 0; i<weatherArr.length; i++){
        let b = new Block(weatherArr[i])
        b.add(wrapper);
    }

    // log('Preloading done!');
    const screenSaver = document.querySelector('.screensaver');
    screenSaver.style.display = 'none';
    enableScroll();

    let blocks = Array.from(document.querySelectorAll('.weather_wrapper__block__city_link'));
    document.addEventListener('click',async (event)=>{
    if(blocks.includes(event.target)){
        let res = undefined;
        
        for(let i = 0 ; i<blocks.length; i++){
            if(event.target===blocks[i]){
                res = i;
            }
        }

        //console.log(res);
        event.preventDefault();
        await send(userArr[res]);
        window.location = 'forecast.html';
    }
});
    btn_save.addEventListener('click',async (event)=>{
        await saveData();
        // console.log('saved');
    })

    btn_clear.addEventListener('click',async (event)=>{
        await clearData();
        // console.log('cleared');
        window.location = 'index.html';
    })
}


preload();