const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => { // we wrapped 'request' inside Promise
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Google servers.');
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find that address')
      } else if (body.status === 'OK') {
        resolve({ // resolve only takes 1 argument. Here we use an object with properties to pass in multiple values
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        })
      }
    });
  })
};

geocodeAddress('coogee sydney nsw').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
