const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('userData',{
    data:()=>ipcRenderer.invoke('getUserData')
});

contextBridge.exposeInMainWorld('blockData',{
    sendData:(coords)=>ipcRenderer.sendSync('getRenderData',coords),
    getData:()=>ipcRenderer.invoke('getBlockData'),
});

// contextBridge.exposeInMainWorld('errorData',{
//     sendData:(err)=>ipcRenderer.sendSync('getErrorData',err),
// });