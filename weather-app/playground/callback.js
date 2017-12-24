// This is example of synchronous programming

var getUser = (id, callback) => {
  var user = {
    id,
    name: 'Olivia'
  }
  setTimeout(() => {
    callback(user);
  }, 3000);
};

getUser(1, (user) => {
  console.log(user);
}) // the 2nd argument is going to be that function that we want to run when that user data comes back
