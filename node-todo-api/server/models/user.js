const mongoose = require('mongoose'); // ES5
const validator = require('validator');

// User
// email -require, trim, type, minlength 1
var User = mongoose.model('User', { // Originally UserEmail but we required it as 'User' in mongoose-quries in /playground
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
