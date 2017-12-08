console.log('starting notes.js');

// we're exporting a function that doesn't take arguments
module.exports.addNotes = () => {
  console.log('addNotes');
  return 'new note'
};

// we're exporting a function that takes arguments
module.exports.add = (a, b) => {
  return a + b;
};
