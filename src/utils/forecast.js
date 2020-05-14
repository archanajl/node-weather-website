const request = require('request')

const forecast = (latitude,longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f60a816128751acb812f14a91f75dbe6&query=' + latitude + ',' + longtitude

    request({url, json:true},(err,{body}) => {
        if (err)
        {
            callback('Weather App could not be connected',undefined)
            
        }
        else if( body.err)
        {
            callback('Unable to find location',undefined)
        } 
        else
        {
            console.log(body.current)
            const windData = 'The wind speed is ' + body.current.wind_speed + ' mph and the temperature feels like ' + body.current.feelslike + ' degrees.'
            const forecastData = ' The temperature is ' + body.current.temperature + ' degrees with humidity of ' + body.current.humidity + ' and is ' + body.current.weather_descriptions[0] + '. ' + windData
            callback(undefined, {forecastData})
        }
    })

}

module.exports = forecast