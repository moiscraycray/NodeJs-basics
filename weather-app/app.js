// const yargs = require('yargs');
//
// // we're requiring a file in another directory
// const geocode = require('./geocode/geocode.js');
//
// const argv = yargs
//   .options({
//     a: {
//       demand: true,
//       alias: 'address',
//       describe: 'address to fetch weather for',
//       string: true // this tells yargs to always parse the address as string
//     }
//   })
//   .help()
//   .alias('help', 'h') // takes 2 arguments: The actual argument that you want to set an alias for, and the alias
//   .argv; // this takes all the above configuration runs through our arguments and stores the result in the argv variable on line 7
//
// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//   if (errorMessage) {
//     console.log(errorMessage);
//   } else {
//     console.log(JSON.stringify(results, undefined, 2)); // JSON stringify converts json object to human-readable string. 2nd argument is used to filter out properties but we're not doing anything with it so it's set to undefined. 3rd argument  specifies how many spaces you want in your indentation
//   }
// });
// // Here we're calling the function geocodeAddress from the geocode file defined on line 4. We're passing the user input 'address' tot he geocodeAddress function
// // We're also doing a callback function. This function will get called after the request comes back.
//
// // c37ef8772392edd1fafcc111bf91c2bc

const request = require('request');

request({
  url:`https://api.darksky.net/forecast/c37ef8772392edd1fafcc111bf91c2bc/-33.894444,150.9375`,
  json: true
}, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    let fah = body.currently.temperature;
    let cel = (fah - 32) * 0.5556;
    console.log(`Temperature in Cabramatta: ${Math.floor(cel)}C`);
  } else {
    console.log('Unable to fetch weather');
  }
});
