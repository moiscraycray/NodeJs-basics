const request = require('supertest');
const expect = require('expect');

var app = require('./server.js').app;

describe('Server', () => {

  describe('GET /', () => {
    it('should return hello world response', (done) => { // need 'done' because it's asynchronous
      request(app)
        .get('/')
        .expect(404) // status code 404 page not found
        .expect((res) => { // res lets us access headers, body, anything we want to access from the HTTP response
          expect(res.body).toInclude({
            error: 'Page not found.'
          });
        }) // this is a chained from the supertest library, (different to expect() function call which is from mjackson expect library)
        .end(done);
    });
  });

  describe('GET /users', () => {
    //assert 200 status code
    //assert that you exist in users array
    it('should return user name', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toInclude({
            name: 'Olivia',
            age: 23
          });
        })
        .end(done);
    });
  });
});
