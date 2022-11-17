const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('userData',{
    data:()=>ipcRenderer.invoke('getData')
});