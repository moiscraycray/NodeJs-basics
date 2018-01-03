const expect = require('expect');
const utils = require('./utils.js')

it('should add two numbers', () => {
  let result = utils.add(33, 11);
  expect(result).toBe(44).toBeA('number'); // we can chain on anotehr call
});

it('should square a number', () => {
  let result = utils.square(3);
  expect(result).toBe(9).toBeA('number'); // this works with strings too
});

it('should expect the same number', () => {
  expect(12).toBe(12);
});

it('should expect some values', () => {
  expect({name: 'Olivia'}).toEqual({name: 'Olivia'});
});
// This checks whether the object properties are the same. Will not work with toBe. We need to use toEqual for objects and arrays

it('should expect something different', () => {
  expect(['Olivia']).toNotEqual(['olivia']);
})

it('should have some values', () => {
  expect([2,3,4]).toInclude(2);
});
// toInclude checks if an array/object includes some things.

it('should have some different key values', () => {
  expect({
    name: 'Olivia',
    age: 23,
    location: 'Australia'
  }).toExclude({
    age: 25
  })
});

it('should set firstName and lastName', () => {
  let user = {
    location: 'Australia',
    age: 23
  }
  let res = utils.setName(user, 'Olivia Mo')
  expect(res).toInclude({
    firstName: 'Olivia',
    lastName: 'Mo'
  }); // user object includes firstName and lastName from the util
});
