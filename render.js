async function getData(){ // отримання інформації з preload.js
    let response = await window.userData.data();
    return response;
}

getData();

class Block{
    constructor(lat,lon){
        this.lat = lat;
        this.lon = lon;
    }

    add(obj){ // створює блок і додає його в DOM сутність obj
        const wrapper = document.querySelector('.weather_wrapper');
        let blockWrapper = document.createElement('div');
        let blockCity = document.createElement('p');
        let blockInfo = document.createElement('div');
        let blockTemp = document.createElement('p');
        let blockImg = document.createElement('img');
        blockWrapper.className = 'weather_wrapper__block';
        blockCity.className = 'weather_wrapper__block__city';
        blockInfo.className = 'weather_wrapper__block__weather_info';
        blockTemp.className = 'weather_wrapper__block__temp';
        blockImg.className = 'weather_wrapper__block__image';
        blockImg.setAttribute("src","./src/icons/01n.png");
        wrapper.append(blockWrapper);
        blockWrapper.append(blockCity);
        blockWrapper.append(blockInfo);
        blockInfo.append(blockTemp);
        blockInfo.append(blockImg);
    }
}

let addBtn = document.querySelector('.navigation__addbutton'); //обробка натискання на кнопку "+"
addBtn.addEventListener('click',function(event){
    const wrapper = document.querySelector('.weather_wrapper');
    let block = new Block(1,1);
    block.add(wrapper);
})