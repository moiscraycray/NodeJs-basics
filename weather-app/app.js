const request = require('request');

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=170%20avoca%20street%20sydney',
  json: true // this tells request that the data coming back is going to be json data and that it should go ahead take that json string and convert it to an object for us
}, (error, response, body) => {
  console.log(`Address: ${body.results[0].formatted_address}`); // The results[0].formatted_address is from the json view in your chrome browser. It is the blue box that appears when you hover over a piece of data.
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
  //console.log(JSON.stringify(body, undefined, 2)); // JSON stringify converts json object to human-readable string. 2nd argument is used to filter out properties but we're doing anything with it so it's set to undefined. 3rd argument  specifies how many spaces you want in your indentation
});
// request takes 2 arguments:
// first argument is going to be an options object where we can configure all sorts of information
// second argument is a callback function. This is going to get called once the data comes back from the HTTP endpoint. In this case, it's going to get called once that json data comes back to node app
// body is the data that comes back from the request
// error is useful for displaying what errors are there in the node app
