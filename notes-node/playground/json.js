var obj = {
  name: 'Olivia'
};
var stringObj = JSON.stringify(obj); // JSON.stringify; this takes your object variable (obj object) and returns the JSON stringified version; this means the result stored in a string object is actually a string, it's no longer an object. This means that the var obj (line 1) is no longer an object, it has become a string
console.log(typeof stringObj); // returns string
console.log(stringObj); // returns {"name":"Olivia"}. This looks similar to javascript object but here, JSON automatically wraps the attribute 'name' in double quotes, this is JSON syntax.

for (let i = 0; i < 2; i++) {
  console.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # ');
  console.log('');
}

var personString = '{"name": "Olivia", "age": 23}'; // This is the stringified version of an object, similar to the above.
var person = JSON.parse(personString) // Here we are doing the reverse to the above. We are converting a stringified version of an object back into a javascript object (if it was originally an array, it will convert back to array, same with other datatypes: boolean, number etc).
console.log(typeof person); // returns object (the original form)
console.log(person); // returns { name: 'Olivia', age: 23 }. This is a javascript object because the attribute is not wrapped in double quotes, the '23' isn't wrapped in quotes, and 'Olivia' is wrapped in single quotes which is valid in javascript but it's invalid in JSON

for (let i = 0; i < 2; i++) {
  console.log('# # # # # # # # # # # # # # # # # # # # # # # # # # # # ');
  console.log('');
}

const fs = require('fs');

// The following code adds a note
var originalNote = {
  title: 'Some title',
  body: 'Some body'
};
var originalNoteString = JSON.stringify(originalNote); // Here we're setting the variable originalNoteString to the stingified version of the originalNote object
fs.writeFileSync('notes.json', originalNoteString); // 2 args, first is file name, second is the text content. This saves the value of originalNoteString into the file 'notes.json'.

// The following code below reads the note
var noteString = fs.readFileSync('notes.json');
// Here we read the value of notes.json to create the note variable
var note = JSON.parse(noteString);
// JSON.parse takes the string JSON and converts it back into a regular javascript object or array depending on whatever you save. Here we're going to pass in a 'noteString' which we're getting from the 'notes.json' file

console.log(typeof note); // returns object
console.log(note.title); // returns 'Some title'
