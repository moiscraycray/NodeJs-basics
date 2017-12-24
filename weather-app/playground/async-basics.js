console.log('Starting app');

setTimeout(() => {
  console.log('Inside of callback'); // This is the callback function, it will run after 2 seconds. This is an asynchronous callback meaning that node can do other things while these 2 seconds are happening
}, 2000);

setTimeout(() => {
  console.log('Still inside of callback');
}, 0);

console.log('Finishing up');
