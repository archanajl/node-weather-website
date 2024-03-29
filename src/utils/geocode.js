const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJjaGFuYWpsIiwiYSI6ImNrYTMzMGdhMjBjNDUzZWw5eWhxaWk4bTMifQ.zmFvRslN2fDqQPxmwTOvMg&limit=1'
    request ({url,json:true},(err,{body}) =>{
        if(err)
        {
            callback('Geocoding App could not be connected',undefined)
        }
        else if(body.features.length === 0 )
        {
            callback('Location not found',undefined)
        }
        else
        {
            callback(undefined,{
                longtitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
        }
        )}
         
    }
)}

module.exports = geocode