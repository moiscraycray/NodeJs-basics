module.exports.add = (a, b) => {
  return a + b;
};

module.exports.asyncAdd = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b)
  }, 1000); // can't be longer than 2 seconds because Mocha will auto fail the test
};

module.exports.square = (x) => x * x;

module.exports.asyncSquare = (x, callback) => {
  setTimeout(() => {
    callback(x * x);
  }, 1000);
};

module.exports.setName = (user, fullName) => {
  var names = fullName.split(' ');
  user.firstName = names[0];
  user.lastName = names[1];
  // console.log(user)
  return user;
};
