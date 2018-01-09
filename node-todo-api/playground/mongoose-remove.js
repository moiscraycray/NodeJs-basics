// Mongoose queries and ID validation section 7, lecture 77
const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}); you pass in a query, that query matches multiple records, removing them all. You can't pass in an empty remove() and expect all the documents will get removed. To get everything removed, you need to run it like this:
Todo.remove({}).then((result) => {
  console.log(result);
});

//Todo.findOneAndRemove;  this will fine the very first matching document and remove it. This also returns the removed document so you can do something with the removed data

// Todo.findByIdAndRemove; you pass in the id and removes it. This will also return the removed document

Todo.findOneAndRemove({_id: '5a543c90395a39d75b01c8c1'}).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove('5a543c90395a39d75b01c8c1').then((todo) => {
  console.log(todo);
});
