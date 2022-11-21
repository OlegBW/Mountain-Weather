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
const {WeatherData} = require('./current_weather.js');


async function foo(){
    let x = new WeatherData(42,29);
    let res = await x.getData();
    console.log(res);
}

foo();