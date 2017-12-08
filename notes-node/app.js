console.log('starting app.js');

// to use FileSystem module,  do require('fs').
const fs = require('fs');

// to use OS module,  do require('os').
const os = require('os');

// we're requiring a file in the same directory
const notes = require('./notes');

// this returns the result from the function addNotes from notes.js
var result = notes.addNotes();
console.log(result);

// this returns the number sum from the function add from notes.js
var number = notes.add(9, 3); // we're passing 2 numbers as arguments to the add function in notes.js
console.log(`Results: ${number}`);

// we store userInfo in variable user
var user = os.userInfo();

console.log(user);

fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}. `, (err) => {
  if (err) {
    console.log('error, unable to write to file');
  }
});
