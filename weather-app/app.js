const request = require('request');

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=173%20avoca%20street%20sydney',
  json: true // this tells request that the data coming back is going to be json data and that it should go ahead take that json string and convert it to an object for us
}, (error, response, body) => {
  console.log(body);
});
