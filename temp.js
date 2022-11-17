// const os = require('os');
// const fs = require('fs');
// const users = require('./users.json');

// function getUserInfo(){
//     const user = os.userInfo().username;
//     const userArray = Object.keys(users.user);

//     if(!userArray.includes(user)){
//         users.user[user]=[];
//         let json = JSON.stringify(users);
//         fs.writeFileSync('./users.json',json);
//     }

//     return users.user[user];
// }

// console.log(getUserInfo());
const {weatherData} = require('./current_weather.js');
let x = new weatherData(42,29);

