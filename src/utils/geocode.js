const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidHJ1dGhzZWVraW5nYnVmZm9vbiIsImEiOiJjanhkb2JxdjUwZzhtM3NtbTIyYXl0anQ0In0.sOov_kTBpiqYGwWpO5EHyg&limit=1'
    
    request({ url, json:true}, (error, {body}) => {
        
        const { features } = body

        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (features.length == 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else{
            const { center, place_name } = features[0]

            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            })
        }
    })
}

module.exports = geocode