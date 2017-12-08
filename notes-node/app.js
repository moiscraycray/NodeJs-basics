console.log('starting app');

// to use FileSystem module,  do require('fs').
const fs = require('fs');

// to use OS module,  do require('os').
const os = require('os');

var user = os.userInfo();

// console.log(user);

fs.appendFile('greetings.txt', `Hello ${user.username}! `, (err) => {
  if (err) {
    console.log('error, unable to write to file');
  }
});
