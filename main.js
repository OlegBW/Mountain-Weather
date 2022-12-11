const os = require('os');
const fs = require('fs');
const path = require('path');
const users = require('./users.json');
const {app,BrowserWindow} = require('electron');
const {ipcMain} = require('electron');

const {BlockData} = require('./block_parser');
const {GeoData} = require('./geocoding');
const {ForecastData} = require('./forecast_parser');
const {WeatherData} = require('./weather_parser');
const user = os.userInfo().username;

function getUserInfo(){ // обробка специфічного користувача
    // const user = os.userInfo().username;
    const userArray = Object.keys(users.user);

    if(!userArray.includes(user)){
        users.user[user]=[];
        let json = JSON.stringify(users);
        fs.writeFileSync('./users.json',json);
    }

    return users.user[user];
}

let userData;
let coords = [];
let city = '';

const createWindow = ()=>{
    const win = new BrowserWindow({
        width:400,
        height:600,
        title:'Weather',
        icon:path.join(__dirname, 'src/img/Logo.png'),

        webPreferences:{
            preload:path.join(__dirname, 'preload.js'),
        },
    });
    win.loadFile('index.html');

    ipcMain.handle('getUserData',()=>{
        userData = getUserInfo()
        // console.log('Send to preload',userData)
        return userData
    }); // відправка даних користувача на рендер
    ipcMain.handle('setCoords',(event,args)=>{ 
        coords=args;
        // console.log('Received coords :',coords);
    });// отримання пари координат

    ipcMain.handle('setCity',(event,args)=>{
        city=args;
        // console.log('Received city :',city);
    })// отримання міста

    ipcMain.handle('getLogData',(event,args)=>{ 
        console.log(args);
    }); // виведення повідомлення з рендеру в консоль

    ipcMain.handle('getBlockData',async ()=>{ 
        // console.log('Send block data');
        const bd = new BlockData(coords[0],coords[1]);
        return await bd.getData();
    }); // відправка даних з погодою для блоків 

    ipcMain.handle('getGeoData',async ()=>{
        // console.log('Send geo data');
        const gd = new GeoData(city);
        return await gd.getData();
    }) // відправка даних з геоданими

    ipcMain.handle('writeJsonData',(event,coords)=>{ // ToDo додати запис в JSON , розібрати баг
        // console.log('received',coords);
        if(!(users.user[user]).includes(coords)){
        users.user[user].push(coords);
        // console.log(users.user[user]);
        }
    })

    ipcMain.handle('saveJsonData',(event)=>{ // ToDo додати запис в JSON , розібрати баг
        let data = JSON.stringify(users);
        fs.writeFileSync('./users.json',data);
        // console.log('saved');
    })

    ipcMain.handle('clearJsonData',(event)=>{ // ToDo додати запис в JSON , розібрати баг
        users.user[user]=new Array();
        // console.log(users.user);
        // console.log('cleared');
    })

    ipcMain.handle('getForecastData',async (event)=>{
        // console.log('Send forecast data');
        const fd = new ForecastData(coords[0],coords[1]);
        return await fd.getData();
    }) // відправка даних з прогнозом на рендер

    ipcMain.handle('getWeatherData',async (event)=>{
        // console.log('Send weather data');
        const wd = new WeatherData(coords[0],coords[1]);
        return await wd.getData();
    }) // відпрака даних з погодою на рендер

    ipcMain.handle('getLocationData',async (event)=>{
        // console.log('Send location data');
        const wd = new WeatherData(coords[0],coords[1]);
        return await wd.getLocation();
    }) // відправка даних з локацією
}

app.whenReady().then(()=>{
    createWindow();
})

app.on('window-all-closed',()=>{
    if(process.platform!=='darwin'){
        app.quit();
    }
})

app.on('activate',()=>{
    if(BrowserWindow.getAllWindows()===0){
        createWindow();
    }
})
