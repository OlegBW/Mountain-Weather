function getCelsius(temp){
    temp=(+temp).toFixed();
    return String(((temp)-273))+'°C';
}

function getFahrenheit(temp){
    temp=(+temp).toFixed();
    return String((1.8 * (temp-273) + 32).toFixed())+'°F';
}

function getMMHG(pressure){ // конвертація в мм ртутного стовпчика
    return ((pressure*0.750063755419211).toFixed(1))+' mmHg';
}

function getDate(date){
    let dateArr = date.split(' ');
    let ymd = dateArr[0];
    let hms = dateArr[1];
    let md = ymd.split('-');
    let hm = hms.split(':');
    return `${md[1]}.${md[2]} ${hm[0]}:${hm[1]}`;
}
// console.log(getDate('2022-12-11 00:00:00'));



module.exports = {getCelsius,getFahrenheit,getMMHG,getDate};


