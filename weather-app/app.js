const yargs = require('yargs');

// we're requiring a file in another directory
const geocode = require('./geocode/geocode.js');

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

geocode.geocodeAddress(argv.address); // Here we're calling the function geocodeAddress from the geocode file defined on line 4. We're passing the user input 'address' tot he geocodeAddress function
