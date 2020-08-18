console.log = function() {};
const fs = require('fs');
const code = fs.readFileSync('app.js', 'utf8');
const assert = require('chai').assert;
const expect = require('chai').expect;

const Structured = require('structured');

describe('', function() {
  it('', function() {
    const bodyParserRegex = /bodyParser/g;
    const parserMatch = code.match(bodyParserRegex);
    expect(parserMatch, 'Did you use the bodyParser?').to.not.be.null;
    expect(parserMatch.length, 'Did you remove `bodyParser` from the middleware stacks in your routes?').to.not.be.greaterThan(2);
    let bpStruct = function() {
      app.use(bodyParser.json());
    }
    let isMatch = Structured.match(code, bpStruct);
    assert.isOk(isMatch, 'Did you use `bodyParser.json()` in an `app.use`?')
  });
});