const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url:`https://api.darksky.net/forecast/c37ef8772392edd1fafcc111bf91c2bc/${lat},${lng}`,
    json: true
  }, (error, response, body) => { // error, response, body is 'request' convention
    if (!error && response.statusCode === 200) {
      let fah = body.currently.temperature;
      let cel = (fah - 32) * 0.5556;
      let appFah = body.currently.apparentTemperature;
      let appCel = (appFah - 32) * 0.5556;
      callback(undefined, {
        temperature: Math.floor(cel),
        apparentTemperature: Math.floor(appCel)
      })
    } else {
      callback('Unable to fetch weather');
    }
  });
}

module.exports = {
  getWeather
} // same as module.exports.getWeather = getWeather;
