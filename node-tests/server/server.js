const express = require('express');

let app = express();

app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not found.',
    name: 'Todo App v1.0'
  });
});

// give users a name property and age property
app.get('/users', (req, res) => {
  res.send([{
    name: 'Olivia',
    age: 23
  }, {
    name: 'Christie',
    age: 18
  }, {
    name: 'Alice',
    age: 22
  }]);
});

app.listen(3000);

module.exports.app = app; // we're exporting 'app = express()' because we need it in our server.test.js file
