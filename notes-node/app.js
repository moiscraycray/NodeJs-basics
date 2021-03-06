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

const titleOptions = {
  describe: 'Title of note',
  demand: true, // demand tells yargs whether the argument 'title' is required. So if someone tries to add a note without a title, it's going to fail
  alias: 't' // alias lets you provide a shortcut so you don't have to typ '--title'. You can set the alias to a single character like 't', now in the terinal you can use the new syntax just type -t=flagTitle
}
const bodyOptions = {
  describe: 'Body of the note',
  demand: true,
  alias: 'b'
}

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes') // this requires no arguments because we're just listing all the existing notes
  .command('read', 'Read a note', {
    title: titleOptions
  }) // this command needs the title argument otherwise it doesn't which note to read
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help() // help() is a method so we're calling it as a function and we don't need to pass in any arguments. This sets up yargs to return some really useful info when someone runs the program. EG in terminal $ node app.js --help will list all commands available listed above like 'add' 'add a new note'
  .argv; // yargs.argv is where the yargs library stores its version of the arguments that your app ran with. There are 3 arguments the command takes; 1st is exactly what the user types into the terminal, 2nd is the description of what that command does, 3rd is an options objects that lets us specify what arguments this command requires.





var command = process.argv[2]; // We're accessing the 3rd element of the arguments array
console.log('Command: ', command);
console.log('Process', process.argv); // prints out the process in an array
console.log('Yargs', argv);





if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body); // we're passing the title and the body
  if (note) { // this will only run if the note has been defined (not return as 'undefined') in notes.js in the addNote()
    console.log('Note created');
    notes.logNote(note); // Passing in note which is defined in addNote() in notes.js
  } else {
    console.log('Note title taken');
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`); // allNotes is an array. allNotes > getAll() > fetchNotes()
  allNotes.forEach( note => notes.logNote(note));
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) { // This will run if note is returned as defined in getNote() in notes.js
    console.log('Note found');
    notes.logNote(note);
  } else { // This will run if note was returned as undefined in getNote() in notes.js
    console.log('Note not found');
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
}  else {
  console.log('Not recognised');
}
