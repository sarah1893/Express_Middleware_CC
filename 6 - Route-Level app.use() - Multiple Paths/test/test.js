console.log = function() {};
const fs = require('fs');
const expect = require('chai').expect;
const rewire = require('rewire');
const request = require('supertest');

const code = fs.readFileSync('app.js', 'utf8');

describe('', function() {
  it('', function(done) {
    let appModule;
    try {
      process.env.PORT = 8001;
      appModule = rewire('../app.js');
    } catch(e) {
      expect(e, 'Whoops, looks like your app has a syntax error.').to.not.exist;
    }
    let jsonRegex = /JSON\.parse/g

    let jsonMatch = code.match(jsonRegex);

    expect(jsonMatch).to.not.be.null;
    expect(jsonMatch.length, 'Did you remove the duplicate `JSON.parse` calls?').to.equal(1);

    const app = appModule.__get__('app');
    request(app)
    .get('/beans/lemon')
    .expect(200)
    .then(response => response.body)
    .then(body => {
      expect(body, 'Did you update the GET /beans/:beanName route?').to.have.property('number', 5);
    })
    .then(() => {
      return request(app)
      .post('/beans/')
      .send({ name: 'test', number: 1 })
    })
    .then(response => response.body)
    .then((body) => {
      expect(body, 'Did you update the POST /beans/ route?').to.have.property('number', 1);
    })
    .then(() => {
      return request(app)
      .post('/beans/lemon/add')
      .send({ number: 1 });
    })
    .then(response => response.body)
    .then((body) => {
      expect(body, 'Did you update the POST /beans/:beanName/add route?').to.have.property('number', 6);
    })
    .then(() => {
      return request(app)
      .post('/beans/lemon/remove')
      .send({ number: 1 })
    })
    .then(response => response.body)
    .then((body) => {
      expect(body, 'Did you update the POST /beans/:beanName/remove route?').to.have.property('number', 5);
    })
    .then(() => {
      return request(app)
      .del('/beans/lemon');
    })
    .then(response => {
      expect(response.status, 'Did you update the DELETE /beans/:beanName route?').to.equal(204);
      done();
    })
    .catch(done);
  });
});