// npm i crypto-js@3.1.6 --save

const {SHA256} = require('crypto-js');

let message = 'I am user number 3'; // message to be hashed
let hash = SHA256(message).toString(); // storing hashed message in 'hash'. SHA256(message) is an object, so we're converting it to string

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

let data = {
  id: 4
};
let token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'some secret').toString() //'some secret' will salt our hash. This will prevent getting the same hash twice. Basically 'salting' makes it more secure
}

// if someone was trying to manipulate the data!
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
// end

let resultHash = SHA256(JSON.stringify(token.data) + 'some secret').toString();

if (token.hash === resultHash) {
  console.log('Data was not changed.');
} else {
  console.log('Data was changed. Do not trust!');
}
