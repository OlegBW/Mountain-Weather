const os = require('os');
const fs = require('fs');
const path = require('path');
const users = require('./users.json');
const {app,BrowserWindow} = require('electron');
const {ipcMain} = require('electron');

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
//console.log(userData);

const createWindow = ()=>{
    const win = new BrowserWindow({
        width:410,
        height:600,
        webPreferences:{
            preload:path.join(__dirname, 'preload.js'),
        },
    });
    ipcMain.handle('getData',()=>userData);
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
