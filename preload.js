const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('userData',{
    data:()=>ipcRenderer.invoke('getUserData')
});

contextBridge.exposeInMainWorld('blockData',{
    sendData:(coords)=>ipcRenderer.invoke('getRenderData',coords),
    getData:()=>ipcRenderer.invoke('getBlockData'),
});

contextBridge.exposeInMainWorld('logData',{
    sendData:(log)=>ipcRenderer.invoke('getLogData',log),
});

