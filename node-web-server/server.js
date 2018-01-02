const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); // This is going to take the directory you want to use for all your handlebar partial files
app.set('view engine', 'hbs'); // this lets us set some various express related configurations. We're passing a key value pair, the key is the thing you want to set and the value is the value you want to use; so here we're setting the 'view engine' to 'hbs'
app.use(express.static(__dirname + '/public')); // to use middleware, add this line. Middleware lets you make tweaks to how express works. Static() takes the absolute path to the folder you want to serve up (the complete path) so we use __dirname - it's a variable that stores the path to your projects directory ie node-web-server. We're concatenating the 'public' folder to the end of the file path to access the folder 'public'

// app.get('/', (req, res) => { //sets up handler for HTTP get request. 1st arg: url (e.g.root of app) 2nd arg: what to send back to the person who made the request (req, res). (Req)uest stores info on things coming in like headers that were used, body information, methods that were made with the request to the path. (Res)ponse has a lot of methods available, so you can respond to the HTTP request in whatever way you like.
//   //res.send('<h1>Hello Express!</h1>') // This lets us respond to the request, sending some data back.
//   res.send({ // this sends json data
//     name: 'Olivia',
//     likes: ['Christina',
//     'cats',
//     'dogs',
//     'food']
//   })
// });

hbs.registerHelper('getCurrentYear', () => { // 'getCurrentYear' will be called inside partials
  return new Date().getFullYear();
}); // 2 arguments: 1st arg: name of the helper. 2nd arg: function to run
// we're using a helper here because we don't want to write currentYear new Date().getFullYear() everytime in the app.get methods. Instead, we are calling this helper method directly from the partial

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome friend!'
    // currentYear new Date().getFullYear()
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', { // render lets you render any of the templates you have set up with your current view engine. The default directory is 'views' for express, our about.hbs in that folder is the template
    pageTitle: 'About page'
    // currentYear new Date().getFullYear()
  }); // The 2nd argument of render is an object. We pass the keys (pageTitle, currentYear) to the about.hbs to create a dynamic page with dynamic data. To use these, in our about.hbs we need to use handlebars syntax {{}}
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
}); // app.listen is going to bind the application to a port on our machine e.g. 3000
