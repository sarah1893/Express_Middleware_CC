console.log = function() {};
const fs = require('fs');
const Structured = require('structured');
const assert = require('chai').assert;
const code = fs.readFileSync('app.js', 'utf8');

describe('', function() {
  it('', function() {
    const appUseStruct = function() {
      app.use('/beans/:beanName', (req, res, next) => {
        const beanName = req.params.beanName;
        if (!jellybeanBag[beanName]) {
          console.log('Response Sent');
          return res.status(404).send('Bean with that name does not exist');
        }
      });
    }

    const isMatch =  Structured.match(code, appUseStruct);
    let failureMessage = 'Did did you add the bean-checking logic from a /beans/:beanName route to your `app.use` callback?';
    assert.isOk(isMatch, failureMessage);
  });
});