console.log = function() {};
const rewire = require('rewire');
const fs = require('fs');
const expect = require('chai').expect;
const request = require('supertest');
process.env.IS_TEST_ENV = true;

describe('', function() {
  it('', function(done) {
    const code = fs.readFileSync('app.js', 'utf8');
    
    process.env.PORT = 8001;
    const appModule = rewire('../app.js');
    const app = appModule.__get__('app');
    const jellybeanBag = appModule.__get__('jellybeanBag');
    const singleBeanName = Object.keys(jellybeanBag)[0];
    
    // Ensure that the server still handles bad requests as intended
    request(app)
    .get('/beans/nonexistent')
    .then((response) => {
      expect(response.status, 'Do you still send a 404 response for nonexistent `/beans/:beanName requests?').to.equal(404);
      expect(response.error.text, 'Does your `app.use` handler for /beans/:beanName still send the same response text for invalid names?').to.equal('Bean with that name does not exist');
    })
    .then(() => {
      return request(app)
      .get(`/beans/${singleBeanName}`);
    })
    .then((response) => {
      expect(response.status).to.equal(200);
    })
    .then(() => {
      return request(app)
      .post(`/beans/${singleBeanName}/remove`)
      .send({
        number: 1230000,
      });
    })
    .then((response) => {
      expect(response.status, 'Do you still send a 400 response for the POST /:beanName/remove route where the request attemps to take out too many beans?').to.equal(400);
      expect(response.error.text, 'Does your POST /:beanName/remove route still send the same error message text?').to.equal('Not enough beans in the jar to remove!');
    })
    .then(() => {
      return request(app)
      .post('/beans/')
      .send({
        name: singleBeanName,
        number: 40,
      });
    })
    .then((response) => {
      expect(response.status, 'Does your POST / route still send a 400 error for requests to create bean names that already exist?').to.equal(400);
      expect(response.error.text, 'Does a POST / request still receive the same error message for invalid requests?').to.equal('Bean with that name already exists!');
    })
    .then(() => {
      // Check that learner created error objects three times.
      const errMatch = code.match(/new\sError/g);
      expect(errMatch, 'Are you creating new Error objects to refactor?').to.not.be.null;
      expect(errMatch.length, 'Are you creating new Errors in the three locations where you need to?').to.equal(3);

      // Check that extra error messages aren't being sent 
      const status400SentMatch = code.match(/res\.status\(\s*40\d\s*\)/g);
      expect(status400SentMatch, 'Did you remove all your extra logic to send error code status and allow your error handler to take over by calling `next` with your new Errors?').to.be.null;
      done();
    })
    .catch(done);
  });
});
