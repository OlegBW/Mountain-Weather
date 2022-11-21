async function getData(){ // отримання інформації з preload.js
    let response = await window.userData.data();
    return response;
}

async function send(arr){ // відправка пари координат на хост
    let response = await window.blockData.sendData(arr);
    return response;
}

async function erlog(err){
    let response = await window.errorData.sendData(err);
    return response;
}

async function getWeatherJSON(){ // отримання з хоста інформації з погодою
    let response = await window.blockData.getData();
    return response;
}


async function getWeatherContent(userCoords){ // відправка пари координат -> отримання з хоста інформації з погодою
    await send(userCoords);
    let x = await getWeatherJSON();
    return x;
}

async function control(){ // початковий рендеринг сторінки
    let userArr = await getData();
    const wrapper = document.querySelector('.weather_wrapper');

    for(let i = 0; i<userArr.length; i++){
        let b = new Block(userArr[i][0],userArr[i][1])
        await b.add(wrapper);
    }
}


control();

async function createBlock(weather){
    const wrapper = document.querySelector('.weather_wrapper');
    let blockWrapper = document.createElement('div');
    let blockCity = document.createElement('p');
    blockCity.textContent = weather.city;
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
    //let imgPath = './src/icons/01d.png';
    blockImg.setAttribute("src",imgPath);
    wrapper.append(blockWrapper);
    blockWrapper.append(blockCity);
    blockWrapper.append(blockInfo);
    blockInfo.append(blockTemp);
    blockInfo.append(blockImg);
}

class Block{  // блок даних
    constructor(lat,lon){
        this.lat = lat;
        this.lon = lon;
    }

    async add(){ // створює блок і додає його в DOM сутність obj
        // await erlog('add_start');
        let bufArr = new Array(this.lat,this.lon);
        let weather = await getWeatherContent(bufArr);

        await createBlock(weather);

        // await erlog('add_end');
    }
}

let addBtn = document.querySelector('.navigation__addbutton'); //обробка натискання на кнопку "+"
addBtn.addEventListener('click',async function(event){
    let block = new Block(47.5,35.07);
    await block.add();
})

