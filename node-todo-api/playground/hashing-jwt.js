const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken'); // JWT

//jwt.sign // jwt.sign takes the object (ie the data with userID) and it signs it. It creates that hash and then it returns the token value
//jwt.verify // jwt.verify does the opposite of jwt.sign. It takes the token and the secret and makes sure the data was not manipulated.

let data = {
  id: 10
};

let token = jwt.sign(data, '123abc'); // our secret is '123abc'. token is the value we're going to send back to the user when they sign up/login. It's also the value we're going to store inside of the tokens array (in user model).
console.log(token);

let decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);
