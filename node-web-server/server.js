const express = require('express');

var app = express();

app.get('/', (req, res) => { //sets up handler for HTTP get request. 1st arg: url (e.g.root of app) 2nd arg: what to send back to the person who made the request (req, res). (Req)uest stores info on things coming in like headers that were used, body information, methods that were made with the request to the path. (Res)ponse has a lot of methods available, so you can respond to the HTTP request in whatever way you like.
  //res.send('<h1>Hello Express!</h1>') // This lets us respond to the request, sending some data back.
  res.send({ // this sends json data
    name: 'Olivia',
    likes: ['Christina',
    'cats',
    'dogs',
    'food']
  })
});

app.get('/about', (req, res) => {
  res.send('About page');
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000); // app.listen is going to bind the application to a port on our machine e.g. 3000
