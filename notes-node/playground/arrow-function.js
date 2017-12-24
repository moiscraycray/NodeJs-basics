// To illustrate the difference between ES5 and ES6 arrow functions

var square = (x) => x * x;
console.log(square(3));

// this is an object
var user = {
  name: 'Olivia', // property
  // we're defining a method here
  sayHi: () => {
    console.log(`Hi. I'm ${this.name}`);
  },
  sayHiAlt () {
    console.log(arguments);
    console.log(`Hi. I'm ${this.name}`);
  }
};
// arrow function does not bind a 'this' keyword. If you are using a 'this' keyword inside the function, it's not going to work so be careful when switching from regular function to arrow function.

user.sayHiAlt(1, 2, 3);
