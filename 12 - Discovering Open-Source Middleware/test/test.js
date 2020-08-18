console.log = function() {};
const fs = require('fs');
const expect = require('chai').expect;
const code = fs.readFileSync('app.js', 'utf8');

const assert = require('chai').assert;
const Structured = require('structured');

describe('', function() {
  it('', function() {
    let errorStruct = function() {
      const $name = require('errorhandler');
      app.use($name());
    }
    let isMatch = Structured.match(code, errorStruct);
    assert.isOk(isMatch, 'Did you use your `errorhandler` middleware in an `app.use`?');
  });
});