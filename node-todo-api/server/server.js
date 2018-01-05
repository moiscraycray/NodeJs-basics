var mongoose = require('mongoose');

// line 6 connects to database
// The difference between MongoClient and Mongoose is that the MongoClient connect method takes a callback and that is when we have access to the database. Mongoose is a lot more complex. This is good because it means our code can be a lot simpler. Mongoose is maintaining this connection over time. We don’t have to micromanage the order things happen in, mongoose takes care of that for us.
mongoose.Promise = global.Promise; // only need to set line5&6 once, no need to put it in any other file. line 5 lets us use promise in mongoose
mongoose.connect('mongodb://localhost: 27017/TodoApp');

// Here we're creating a mongoose.model so mongoose knows how to store our data.
var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

var newTodo = new Todo({ // we're creating a new instance of the Todo model from line 9
  text: 'Cook dinner'
});
// Creating an instance will not update the database, we need to use .save which returns a promise
newTodo.save().then((doc) => {
  console.log('Saved todo', doc); //success promise (ie resolve)
}, (error) => {
  console.log('Unable to save todo'); // failed promise (ie reject)
});

// new todo instance
let anotherTodo = new Todo({
  text: 'Send a cute message to babe',
  completed: true,
  completedAt: 1900
});

anotherTodo.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}, (error) => {
  console.log('Unable to save todo');
});
