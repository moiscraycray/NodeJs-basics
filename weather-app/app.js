const yargs = require('yargs');

// we're requiring a file in another directory
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

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
  .argv; // this takes all the above configuration runs through our arguments and stores the result in the argv variable on line 7

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address)
    // console.log(JSON.stringify(results, undefined, 2)); // JSON stringify converts json object to human-readable string. 2nd argument is used to filter out properties but we're not doing anything with it so it's set to undefined. 3rd argument  specifies how many spaces you want in your indentation
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) { // results.lat/long from geocode.js line 16 & 17
        console.log(errorMessage);
      } else {
        // console.log(JSON.stringify(weatherResults, undefined, 2));
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`) // from weather.js line 14 & 15
      }
    });
  }
});
// Here we're calling the function geocodeAddress from the geocode file defined on line 4. We're passing the user input 'address' to the geocodeAddress function
// We're also doing a callback function. This function will get called after the request comes back.
