const mongoose = require('mongoose'); // ES5
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({ // we can't use methods on User so we need to switch to UserSchema
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: { // custom validators - http://mongoosejs.com/docs/validation.html
      // install this - https://www.npmjs.com/package/validator
      validator: validator.isEmail, // this will return true if valid, false if invalid. Example from validator npmjs website
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

// UserSchema.methods is an object and let's us add any methods we want. These are instance methods. e.g. we add .generateAuthToken
UserSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token}); // line 23, tokens is an array and we're pushing variables access & token from line 38&39

  return user.save().then(() => { // we have a 'return' because we want server.js to access this
    return token; // success. token from line 39
  })
} // not using arrow function because arrow function doesn't have 'this' keyword. We need this keyword because 'this' stores the individual document

// User
// email -require, trim, type, minlength 1
var User = mongoose.model('User', UserSchema);  // Originally UserEmail but we required it as 'User' in mongoose-quries in /playground

// creating new instance of UserEmail
// var newUser = new UserEmail({
//   email: '     olivia@example.com.au    '
// })

// newUser.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (error) => {
//   console.log('Unable to save new user');
// });

module.exports = {
  User
};
