function getCelsius(temp){
    temp=(+temp).toFixed();
    return String(((temp)-273))+'°C';
}

function getFahrenheit(temp){
    temp=(+temp).toFixed();
    return String((1.8 * (temp-273) + 32).toFixed())+'°F';
}

module.exports = {getCelsius,getFahrenheit};


