const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=d5be88ce50378cc354eafb2de1323331&query="+ 
        latitude + ","+ longitude + "&units=f";

    request({url, json: true}, (error, {body}) => {
    if(error) {
        callback("Unable to connect to weather service", undefined)
        //console.log(chalk.red.inverse ("Unable to connect to weather service"));
    } else if (body.error) {
        callback("Unable to find location", undefined);
    } else {
        //console.log(response.body.current);
        current_weather = body.current;
        const location = current_weather.weather_descriptions[0]
        const temporature = current_weather.temperature
        const feelsLike =  current_weather.feelslike
        const result = `${location}. It is ${temporature} degrees right now. It feels like ${feelsLike} degrees.`
        callback(undefined, result)
        //console.log("%s. It is %s degrees right now. It feels like %s degrees.", 
        //current_weather.weather_descriptions[0], current_weather.temperature, current_weather.feelslike);
    }
})
}

module.exports = forecast