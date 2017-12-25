const request = require('request');

var geocodeAddress = (address, callback) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`, // we're encoding the user input (from string to %20)
    json: true // this tells request that the data coming back is going to be json data and that it should go ahead take that json string and convert it to an object for us
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers.'); //callback is a function in app.js on line 19
      // error returns true when url is incorrect
    } else if (body.status === 'ZERO_RESULTS') { // status property is from the google geocode api, check google api in json view. this will run if user types in random things
      callback('Unable to find that address')
    } else if (body.status === 'OK') {
      callback(undefined, { // we're setting the first argument (errorMessage parameter) as undefined becase if everything goes well, there should be no errors
        address: body.results[0].formatted_address, // The results[0].formatted_address is from the json view in your chrome browser. It is the blue box that appears when you hover over a piece of data.
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
    }
  });
  // request takes 2 arguments:
  // first argument is going to be an options object where we can configure all sorts of information
  // second argument is a callback function. This is going to get called once the data comes back from the HTTP endpoint. In this case, it's going to get called once that json data comes back to node app
  // body is the data that comes back from the request
  // error is useful for displaying what errors are there in the node app
};

module.exports.geocodeAddress = geocodeAddress;
