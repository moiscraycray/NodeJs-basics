console.log('starting notes.js');

module.exports.age = 23;

const fs = require('fs'); // no need to install fs through npm because it's a core module

// notes.js
// yargs
// we're exporting a function that doesn't take arguments
var addNote = (title, body) => {
  var notes = [];
  var note = {
    title,
    body
  };
  var notesString = fs.readFileSync('notes-data.json',); // We need to read the file first so the writeFileSync doesn't overwrite what's already in the file. However, if the file doesn't exist, the program will crash
  notes = JSON.parse(notesString); // Here we're setting the notes array to return value of JSON.parse(notesString). So JSON.parse will take a string from the file we read and it's going to parse it into an array

  notes.push(note);
  fs.writeFileSync('notes-data.json', JSON.stringify(notes)); // 2 args, 1st: name of file, 2nd: content of data (in this case, it's the stringified version of notes array)
};

var getAll = () => {
  console.log('Getting all notes');
}

var getNote = (title) => {
  console.log(`Getting the title ${title}`);
}

var removeNote = (title) => {
  console.log(`Removing the title ${title}`);
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
}; // this is ES6; this exports all of the above

// we're exporting a function that takes arguments
module.exports.add = (a, b) => {
  return a + b;
};
