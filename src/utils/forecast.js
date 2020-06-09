const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d363e552b8e7d3e508efde82b7f5f6eb&query=' + latitude + ',' + longitude;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!!');
        } else if (body.error) {
            callback('Unable to find location');
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out.' + ' It feels like ' + body.current.feelslike + ' degress out. Humidity is ' + body.current.humidity);
        }
    });
}

module.exports = forecast;