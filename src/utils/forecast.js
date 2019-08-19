const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9f9b0cad9460f236cb99a57e683336ee/' + latitude + ',' + longitude + '?units=si'
    
    request({url, json: true}, (error, {body}) => {
            if (error){
                callback('Unable to connect to weather service!', undefined)
            } else if (body.error) {
                callback("Unable to find location", undefined)
            } else {
                callback(undefined, body.daily.data[0].summary +
                    'It is currently ' + body.currently.temperature + ' degrees out. ' + 
                    'There is a ' + body.currently.precipProbability * 100 + '% chance of rain. ' +
                    'The daily high is ' + body.daily.data[0].temperatureHigh + ' degrees, and daily low is ' + body.daily.data[0].temperatureLow + ' degrees. '
                )
            }
        })
}

module.exports = forecast