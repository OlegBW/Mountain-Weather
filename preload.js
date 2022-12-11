const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('sendData',{
    sendCoords:(coords)=>ipcRenderer.invoke('setCoords',coords),
    sendCity:(city)=>ipcRenderer.invoke('setCity',city),
});

contextBridge.exposeInMainWorld('userData',{
    data:()=>ipcRenderer.invoke('getUserData')
});

contextBridge.exposeInMainWorld('blockData',{
    getData:()=>ipcRenderer.invoke('getBlockData'),
});

contextBridge.exposeInMainWorld('geoData',{
    getData:()=>ipcRenderer.invoke('getGeoData'),
});

contextBridge.exposeInMainWorld('logData',{
    sendData:(log)=>ipcRenderer.invoke('getLogData',log),
});

contextBridge.exposeInMainWorld('jsonData',{
    writeData:(coords)=>ipcRenderer.invoke('writeJsonData',coords),
    saveData:()=>ipcRenderer.invoke('saveJsonData'),
    clearData:()=>ipcRenderer.invoke('clearJsonData'),
});

contextBridge.exposeInMainWorld('forecastData',{
    getData:()=>ipcRenderer.invoke('getForecastData'),
})

contextBridge.exposeInMainWorld('weatherData',{
    getData:()=>ipcRenderer.invoke('getWeatherData'),
    getLocation:()=>ipcRenderer.invoke('getLocationData'),
})