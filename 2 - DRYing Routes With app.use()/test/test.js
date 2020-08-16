console.log = function() {};
const fs = require('fs');
const assert = require('chai').assert;
const expect = require('chai').expect;
const code = fs.readFileSync('app.js', 'utf8');
const request = require('supertest');

describe('', function() {
  it('', function() {
    let logRequestMatch = code.match(/logRequest/);
    expect(logRequestMatch, 'Did you remove all instances of `logRequest`?').to.be.null;
  });
});