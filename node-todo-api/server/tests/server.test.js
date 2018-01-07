// npm i expect@1.20.2 mocha@3.0.2 nodemon@1.10.2 supertest@2.0.0 --save-dev

const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js'); // ES6 destructuring
const {Todo} = require('./../models/todo.js');

// this is going to let us run some code before every single test case. We're going to use beforeEach to set up the database in a way that's useful. For now, we're going to make sure the database is empty because in the test, we assume there'll be only 1 item (but in reality, there'll be more than one todo item)
beforeEach((done) => {
  Todo.remove({}).then(() => { // passing in empty object in remove() will delete all todos
    done();
  });
}); // This block of code will delete all the todos before every single test case (every it())

describe('POST /todos', () => {
  it('should create a new todo', (done) => { // need to pass 'done' because this is an async test
    let text = 'Test todo text';

    // the following is supertest
    request(app) // passed in 'app' we want to make the request on
      .post('/todos')
      .send({text}) //object will get converted to JSON by supertest so there's no need for manual conversion
      .expect(200) // expect status to be 200 when sent valid data
      .expect((res) => {
        expect(res.body.text).toBe(text) //res is from server.js line 22. We're testing that the response body has a text property and that text property equals to text above on line 18
      })
      .end((error, res) => { // instead of passing done, we want to handle errors
        if (error) {
          return done(error); //this will wrap up the test and print the error to the screen
        } // return will end the program and stop executing anything below

        Todo.find().then((todos) => { // here is making a request to the database, fetching all the todos and verifying that the todo was indeed added. Passing nothing in find() to fetch everything the Todo collection.
          expect(todos.length).toBe(1); // length should === 1 because we added 1 todo item.
          expect(todos[0].text).toBe(text); // testing the previous item^ has a text property equal to the text variable on line 18.
          done(); // wrapping the test case
        }).catch((error) => done(error)) // catch is going to get any errors that might occur inside of a callback, then we're gonna take that error argument and pass it into done();
      })
  });

  // this test case verifies that a todo doesn't get created when we send bad data
  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({}) // we didn't pass any data, we passed an empty object which is invalid
      .expect(400) // since we get invalid data, we should expect 400
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          Todo.find().then((todos) => {
            expect(todos.length).toBe(0); // there shouldn't be any todos before this test case runs due to line 10-14
            done();
          }).catch((error) => done(error));
        }
      });
  });
});
