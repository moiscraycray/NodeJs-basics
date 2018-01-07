// install express & Body-parser in terminal
// npm i express@4.14.0 body-parser@1.15.2 --save
// body-parse let us send JSON to the server. The server can then take that JSON and do something with it. Body-parser essentiall parses the body. It takes that string body and turns it into a javascript object.
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js'); //destructing object
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json()); // this sends json to our express application. All it does is parse the body of a POST request as JSON, if the 'content type' of the request is 'application/json'

app.post('/todos', (req, res) => { // 2 args: 1st URL, 2nd callback. We use forward-slash is convention for resource creation (creating a new todo)
  // console.log(req.body); // body is stored by bodyParser on line 13
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc); // sends the todo info back to user like ID and completed status
  }, (error) => {
    res.status(400).send(error); // .status(400) is optional but we want to let the user know what happened to their get request (400 is bad request)
  });
});

app.get('/todos', (req, res) => { // get all todos
  Todo.find().then((todos) => { // not passing in anything will get ALL todos. Success case will get called with all the todos (passed in todos)
    res.send({ // we're sending an object back (instead of an array which would just 'todos'). objects let us add properties whereas an array will limit what we can do
      todos
    })
  }, (err) => {
    res.status(400).send(err);
  })
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {
  app // exporting app for server.test.js
};
