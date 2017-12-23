console.log('starting notes.js');

module.exports.age = 23;

const fs = require('fs'); // no need to install fs through npm because it's a core module

var fetchNotes = () => { // this is arrow function, no arguments since it's going to be fetching notes from the file system (fs)
  try {
    var notesString = fs.readFileSync('notes-data.json',); // We need to read the file first so the writeFileSync doesn't overwrite what's already in the file. However, if the file doesn't exist, the program will crash
    return JSON.parse(notesString); // Here we're returning value of JSON.parse(notesString). So JSON.parse will take a string from the file we read and it's going to parse it into an array. When fetchNotes function is called, we'll get the notes array.
  } catch (e) { // error arg
    // this code block in catch will only run if one of my errors try actually occurs. If the 'notes-data.json' file exists, this block will never run. But if it fails, catch will run and try to recover from that error
    return []; // If there's an error, return an empty array
  } // this is similar to begin/rescue
};

var saveNotes = (notes) => { // another function, take argument of 'notes' array saved to the file system (fs). This function doesn't need to return anything
  fs.writeFileSync('notes-data.json', JSON.stringify(notes)); // 2 args, 1st: name of file, 2nd: content of data (in this case, it's the stringified version of notes array)
};

// notes.js
// yargs
// we're exporting a function that doesn't take arguments
var addNote = (title, body) => {
  var notes = fetchNotes(); //calling fecthNotes function
  var note = {
    title,
    body
  };

  // var duplicateNotes = notes.filter((note) => {
  //   return note.title === title;
  // }) This is is same as below
  var duplicateNotes = notes.filter((note) => note.title === title);
  // The filter() method creates an array filled with all array elements that pass a test (provided as a function)
  // If the current note.title is the same as any title in the notes array, return note.title === title, this means duplicateNotes.length will be > 0


  if (duplicateNotes.length === 0) {
    notes.push(note); // we push the note to the array because the note doesn't exist in the notes array yet by checking if duplicateNotes is empty (if empty, it means no duplicates exist)
    saveNotes(notes); //calling saveNotes function; passing in 'notes' variable which is defined up above on line 25.
    return note; // this note is going to return to whoever called the function. This line also means if there are no duplicate notes, it will return note as defined, however if there was a duplicate, this line will never run so it will return as undefined, which will be used in app.js in the if/else state at the bottom
  }
}; // run $ node app.js add --title=secret4 --body="Some body here"
// check notes-data.json file

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
