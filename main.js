const os = require('os');
const fs = require('fs');
const path = require('path');
const users = require('./users.json');
const {app,BrowserWindow} = require('electron');
const {ipcMain} = require('electron');

const {WeatherData} = require('./blockParser.js');

function getUserInfo(){ // обробка специфічного користувача
    const user = os.userInfo().username;
    const userArray = Object.keys(users.user);

    if(!userArray.includes(user)){
        users.user[user]=[];
        let json = JSON.stringify(users);
        fs.writeFileSync('./users.json',json);
    }

    return users.user[user];
}

let userData = getUserInfo();
let coords = [];
//console.log(userData);

const createWindow = ()=>{
    const win = new BrowserWindow({
        width:410,
        height:600,
        title:'Weather',
        webPreferences:{
            preload:path.join(__dirname, 'preload.js'),
        },
    });
    ipcMain.handle('getUserData',()=>{
        console.log(userData)
        return userData
    }); // відправка даних користувача на рендер
    ipcMain.on('getRenderData',(event,args)=>{ // отримання пари координат
        coords=args;
        console.log(coords);
    });

    ipcMain.on('getErrorData',(event,args)=>{ // отримання пари координат
        console.log(args);
    });

    ipcMain.handle('getBlockData',()=>{ // відправка даних з погодою
        console.log('send');
        const wd = new WeatherData(coords[0],coords[1]);
        return wd.getData();
    });
    win.loadFile('index.html');
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
