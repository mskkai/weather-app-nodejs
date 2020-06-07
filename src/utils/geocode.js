const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=2&access_token=pk.eyJ1IjoibXNra2FpIiwiYSI6ImNrYjBubWtzNDA0a2sycm1pbmtxY2oyMTYifQ.w1hLZmefESC1jjIeVytuJA';
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services!');
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please try another search.');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geocode;