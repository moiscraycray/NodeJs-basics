console.log('starting notes.js');

module.exports.age = 23;

// notes.js
// yargs
// we're exporting a function that doesn't take arguments
var addNote = (title, body) => {
  console.log('Adding note', title, body);
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
