const os = require('os');
const fs = require('fs');
const path = require('path');
const users = require('./users.json');
const {app,BrowserWindow} = require('electron');
const {ipcMain} = require('electron');

const {BlockData} = require('./block_parser');

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

const createWindow = ()=>{
    const win = new BrowserWindow({
        width:410,
        height:600,
        title:'Weather',
        icon:path.join(__dirname, 'src/img/Logo.png'),

        webPreferences:{
            preload:path.join(__dirname, 'preload.js'),
        },
    });
    win.loadFile('index.html');

    ipcMain.handle('getUserData',()=>{
        console.log('Send to preload',userData)
        return userData
    }); // відправка даних користувача на рендер
    ipcMain.handle('getRenderData',(event,args)=>{ 
        coords=args;
        console.log('Received from preload',coords);
    });// отримання пари координат з рендеру

    ipcMain.handle('getLogData',(event,args)=>{ 
        console.log(args);
    }); // виведення повідомлення з рендеру в консоль

    ipcMain.handle('getBlockData',()=>{ 
        console.log('Send data to preload');
        const wd = new BlockData(coords[0],coords[1]);
        return wd.getData();
    }); // відправка даних з погодою
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
