console.log = function() {};
const fs = require('fs');
const expect = require('chai').expect;
const code = fs.readFileSync('app.js', 'utf8');
const rewire = require('rewire');
const request = require('supertest');

describe('', function() {
  it('', function(done) {
    const bodyParserMatch = code.match(/bodyParser/g);
    expect(bodyParserMatch).to.not.be.null;
    expect(bodyParserMatch.length, 'Did you add the `bodyParser` middleware to all POST routes?').to.equal(4);

    let appModule;
    try {
      process.env.PORT = 8001;
      appModule = rewire('../app.js');
    } catch(e) {
      expect(e, 'Whoops, looks like your app has a syntax error.').to.not.exist;
    }
    const app = appModule.__get__('app');
    request(app)
    .post('/beans')
    .send({ name: 'test', number: 1 })
    .then(response => response.body)
    .then((body) => {
      expect(body, 'After refactoring, your POST /beans route should still work as intended.').to.have.property('number', 1);
    })
    .then(() => {
      return request(app)
      .post('/beans/lemon/add')
      .send({ number: 1 });
    })
    .then(response => response.body)
    .then((body) => {
      expect(body, 'After refactoring, your POST /beans/:beanName/add should still work as intended.').to.have.property('number', 6);
    })
    .then(() => {
      return request(app)
      .post('/beans/lemon/remove')
      .send({ number: 1 })
    })
    .then(response => response.body)
    .then((body) => {
      expect(body, 'After refactoring, your POST /beans/:beanName/remove should still work as intended.').to.have.property('number', 5);
      done();
    })
    .catch(done);
  });
});