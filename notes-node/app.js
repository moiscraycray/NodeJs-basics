console.log('starting app.js');

// to use FileSystem module,  do require('fs').
const fs = require('fs');

// to use OS module,  do require('os').
const os = require('os');

// run this command in root directory $ npm install lodash --save
// ^ this installs into the node_modules
// requiring a third party module 'lodash', same exact name as in package.json
const _ = require('lodash');

// we're requiring a file in the same directory
const notes = require('./notes');

// this returns the result from the function addNotes from notes.js
var result = notes.addNote();
console.log(result);

// this returns the number sum from the function add from notes.js
var number = notes.add(9, 3); // we're passing 2 numbers as arguments to the add function in notes.js
console.log(`Results: ${number}`);

// https://lodash.com/docs/4.17.4#isString
// this test whether it's a string or not and returns true/false
console.log(_.isString(true)); // output: false (this is a boolean, not string)
console.log(_.isString('Olivia')); // output: true

// https://lodash.com/docs/4.17.4#uniq
// this makes the array unique
var filteredArray = _.uniq(['Olivia', 1, 'Olivia', 1, 2, 3, 4]);
console.log(filteredArray);
// ['Olivia', 1, 2, 3, 4]

// // we store userInfo in variable user
var user = os.userInfo();

console.log(user);

fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}. `, (err) => {
  if (err) {
    console.log('error, unable to write to file');
  }
});

// #################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################

// Get input/output from terminal

for (let i = 0; i < 5; i++) {
  console.log('# # # # # # # # #');
}

// app.js
// require yargs into file to use the module
const yargs = require('yargs');

console.log(process.argv) // argv is short of argments vector (in js, it's more like arguments array; this is going to be an array of all the command line arguments passed in) e.g. node app.js hello
// hello is the 3rd argument passed in

const argv = yargs.argv; // yargs.argv is where the yargs library stores its version of the arguments that your app ran with.
var command = process.argv[2]; // We're accessing the 3rd element of the arguments array
console.log('Command: ', command);
console.log('Process', process.argv); // prints out the process in an array
console.log('Yargs', argv);

if (command === 'add') {
  notes.addNote(argv.title, argv.body); // we're passing the title and the body
} else if (command === 'list') {
  notes.getAll();
} else if (command === 'read') {
  notes.getNote(argv.title);
} else if (command === 'remove') {
  notes.removeNote(argv.title);
}  else {
  console.log('Not recognised');
}
