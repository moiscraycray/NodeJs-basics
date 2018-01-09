// install express & Body-parser in terminal
// npm i express@4.14.0 body-parser@1.15.2 --save
// body-parse let us send JSON to the server. The server can then take that JSON and do something with it. Body-parser essentiall parses the body. It takes that string body and turns it into a javascript object.
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js'); //destructing object
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json()); // this sends json to our express application. All it does is parse the body of a POST request as JSON, if the 'content type' of the request is 'application/json'

// POST /todos
app.post('/todos', (req, res) => { // 2 args: 1st URL, 2nd callback. We use forward-slash is convention for resource creation (creating a new todo)
  // console.log(req.body); // body is stored by bodyParser on line 14
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc); // sends the todo info back to user like ID and completed status
  }, (error) => {
    res.status(400).send(error); // .status(400) is optional but we want to let the user know what happened to their get request (400 is bad request)
  });
});

// GET /todos
app.get('/todos', (req, res) => { // get all todos
  Todo.find().then((todos) => { // not passing in anything will get ALL todos. Success case will get called with all the todos (passed in todos)
    res.send({ // we're sending an object back (instead of an array which would just 'todos'). objects let us add properties whereas an array will limit what we can do
      todos
    })
  }, (err) => {
    res.status(400).send(err);
  })
});

// GET /todos/1234556
var {ObjectID} = require('mongodb');
app.get('/todos/:id', (req, res) => { // :id is a URL parameter, this creates an id variable. so when sombody makes a request like 'GET todos/12345', this will fire
  var id = req.params.id; // we're storing id with /todos/:id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send(); //sending back status 404 with empty body 'send()'.
  }

  Todo.findById(id).then((todo) => {
    if (!todo) { // check if there is no todo
      return res.status(404).send();
    }
    res.send({todo}) // success case
  }).catch((error) => {
    res.status(400).send();
  });
  //res.send(req.params) //req.params is an object, it has key/value pairs. Key is URL parameter and value is whatever value passed to :id
  // we're sending(req.params) so we can test it in postman
});

// DELETE /todo
app.delete('/todos/:id', (req, res) => {
  // get the id
  var id = req.params.id; // req.params is where our URL parameters are stored and then we get it by value .id

  // validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((error) => {
    res.status(400).send();
  });
});

// PATCH - update a resource
app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']) // here, we're choosing only some properties we want to update. We don't want to let users to update id or completedAt properties

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) { // checking if body.completed is a boolean and if boolean is true (meaning the todo has been completed)
    body.completedAt = new Date().getTime(); // date fom Jan 1st 1970, if positive number it is time after that; if negative number , time is before that
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => { // $set: body; body is from line 84. new: true is similar to returnOriginal: false, we want to return the new updated data
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((error) => {
    res.status(400).send();
  })
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {
  app // exporting app for server.test.js
};
