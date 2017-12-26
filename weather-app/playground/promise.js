var somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hey. It worked.'); // resolve & reject can only take 1 argument. If need multiple argument, use options object e.g. {name:'olivia', age: 23}
    reject('Unable to fulfil promise')
  }, 2500)
});

// .then lets you provide callback functions to both resolve and error cases.
somePromise.then((message) => { // this anonymous function is only going to get called if the promise gets fulfilled, meaning it works as expected. When it does it's going to get called with the value passed to resolve. If it's not fulfilled, it goes to line 11.
  console.log('Success: ', message); // outputs 'Hey. it worked.' From line 8-10, it only works if the promise is fulfilled. If promise is rejected, these lines won't run and will be handle by lines 11-13. These lines handles errors in promises. Try commenting out 'resolve' on line 3.
}, (errorMessage) => {
  console.log('Error: ', errorMessage);
});

// You can only resolve or reject a promise once. If you resolve a promise, you can't reject it later.
// For example, if both line 3 & 4 are uncommented, only the resolve will print, we'll never see the error message because you can only do one of those actions (resolve, reject). You can only resolve or reject once. You can't do both and you can't do either twice. This is an advantage over callbacks because we might accidentally call the callback multiple times.

// Before a promise is resolved or rejected, it is in a state called 'pending'. It means that you're waiting for information to come back or you're waiting for your async computation to finish. In our case, while we're waiting for the weather data to come back, the promise is pending. A promise is 'settled' when it has either been fulfilled or rejected.

// The 'request' library we used to get HTTP requests does not support promises natively, but you can wrap your request call inside of a promise.

// EXAMPLE 2
var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // arbitrary timer
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b); // this is the happy path, if a & b are numbers
      } else {
        reject('Arguments must be numbers');
      }
    }, 1500);
  });
};

asyncAdd(7, 43).then((result) => {
  console.log('Result: ', result);
  return asyncAdd(result, 4); // we're chaining promises. After calling asyncAdd, we're calling it again, passing the result from the first time and a new number
}, (errorMessage) => {
  console.log('Error: ', errorMessage);
}).then((result) => { // After the first then fires (line 35), this will then be fired
  console.log('Second result: ', result);
}, (errorMessage) => {
  console.log(errorMessage);
});
