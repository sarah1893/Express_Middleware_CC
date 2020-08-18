console.log = function() {};
const fs = require('fs');
const assert = require('chai').assert;
const code = fs.readFileSync('app.js', 'utf8');
const Structured = require('structured');

describe('', function() {
  it('', function() {
    const formatStruct = function() {
      app.use(morgan('dev'));
    }
    const isMatch = Structured.match(code, formatStruct);
    assert.isOk(isMatch, 'Did you replace the \'tiny\' format string with the correct format?');
  });
});