async function send(city){ // відправка міста на хост
    let response = await window.sendData.sendCity(city);
    return response;
}

async function log(args){ // відправка повідомлення в консоль хосту 
    let response = await window.logData.sendData(args);
    return response;
}

async function write(args){
    let response = await window.jsonData.writeData(args);
    return response;
}

async function getGeoJSON(){ // отримання з хоста інформації з координатами
    let response = await window.geoData.getData();
    return response;
}

async function getGeoContent(city){ // відправка пари координат -> отримання з хоста інформації з погодою
    await send(city);
    let x = await getGeoJSON();
    // log(`Received from main.js ${x}`);
    // console.log(x);
    return x;
}

let dataObj = undefined;
let answers = undefined;
const field = document.querySelector('.search__field__city');

const answerWrapper = document.querySelector('.search__answer__field');
function createBlock(obj){

    let block = document.createElement('div');
    block.classList.add('search__answer');

    let city = document.createElement('p');
    block.classList.add('search__answer__name');
    city.textContent = obj.name;

    let country = document.createElement('p');
    block.classList.add('search__answer__country');
    country.textContent = obj.country;

    let state = document.createElement('p');
    block.classList.add('search__answer__state');
    state.textContent = obj.state;

    answerWrapper.append(block);
    block.append(city);
    block.append(country);
    block.append(state);
}


async function blockPress(event){
    if(answers.includes(event.target)){
        event.target.style.display='none';
        let res = undefined;
    
        for(let i = 0 ; i<answers.length; i++){
            if(event.target===answers[i]){
                res = i;
            }
        }
        // console.log(dataObj);
        let coords = new Array(dataObj[res].lat,dataObj[res].lon);
        // console.log(coords);
        await write(coords);
        document.removeEventListener('click',blockPress);
    }
}


let search = document.querySelector('.search__field__submit');
search.addEventListener('click',async ()=>{
    answerWrapper.innerHTML='';
    let data = field.value;
    // field.value='';
    let objects = await getGeoContent(data);
    dataObj = objects;

    for(let i in objects)
    {
    createBlock(objects[i]);
    }

    answers = Array.from(document.querySelectorAll('.search__answer'));
    // console.log(dataObj);
    document.addEventListener('click',blockPress);
});


document.addEventListener('keypress',async (event)=>{
    if(event.key==='Enter'){
        if(field.value!==''){
        search.click();
        }
    }
});