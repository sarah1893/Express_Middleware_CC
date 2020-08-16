console.log = function() {};
const fs = require('fs');
const expect = require('chai').expect;
const code = fs.readFileSync('app.js', 'utf8');
const rewire = require('rewire');
const request = require('supertest');

describe('', function() {
  it('', function(done) {
    process.env.PORT = 3000;
    const appModule = rewire('../app.js');
    const logged = [];
    appModule.__set__('console', {
      log: function(...args) {
        logged.push(...args);
      }
    });

    request(appModule.__get__('app'))
    .get('/beans')
    .then(res => res.body)
    .then(data => {
      expect(logged, 'Did you add the `next` call after you log the request?').to.include('GET Request Received');
      done();
    })
    .catch(done);
  });
});