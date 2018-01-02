// using 'axios' instead of 'request' to get HTTP because axios supports Promise natively
const axios = require('axios');
const yargs = require('yargs');


const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'address to fetch weather for',
      string: true // this tells yargs to always parse the address as string
    }
  })
  .help()
  .alias('help', 'h') // takes 2 arguments: The actual argument that you want to set an alias for, and the alias
  .argv; // this takes all the above configuration runs through our arguments and stores the result in the argv variable on line 8

let encodedAddress = encodeURIComponent(argv.address); // can be either '.a' or '.address' because of line 8 & 10
let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL).then((response /* this arg is the success case to line 30. this is also convention to include 'response' as argument */) => {
  if (response.data.status === 'ZERO_RESULTS') { // .data is similar to the body property in 'request' library
    throw new Error('Unable to find that address'); // stops line26-29 from running and skips to catch error on line 34
  }
  let lat = response.data.results[0].geometry.location.lat; // see geocode.js
  let lng = response.data.results[0].geometry.location.lng;
  let weatherURL = `https://api.darksky.net/forecast/c37ef8772392edd1fafcc111bf91c2bc/${lat},${lng}`; // interpolating 'key' to protect my api key
  console.log(response.data.results[0].formatted_address); // see geocode.js line 15
  return axios.get(weatherURL); // returning a new promise (line 31). we're chaining this axios.get to line 22.
}).then((response) => { // This .then is for chaining the 2nd axios.get on line 30. This function will get called with the weather data comes back
  let temperature = response.data.currently.temperature;
  let apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((error /*this arg is the fail case*/) => {
  if (error.code === 'ENOTFOUND') { // .code is found in the output terminal. Try deleting a dot from geocodeURL to see the error output in the terminal.
    console.log('Unable to connect to API servers.');
  } else {
    console.log(error.message); // printing line 24
  }
}); // get is a method that lets us make HTTP get requests, passing in JSON data (geocodeURL). axios automatically knows how to parse JSON data. 'Get' returns a Promise which we means we can use .then to run code.

// Using Promise instead of callbacks because we can chain promises instead of indenting callbacks to crazy levels
