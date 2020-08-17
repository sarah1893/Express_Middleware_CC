console.log = function() {};
const fs = require('fs');
const expect = require('chai').expect;
const code = fs.readFileSync('app.js', 'utf8');

describe('', function() {
  it('', function() {
    const morganMatch = /const\s+morgan\s*=\s*require\s*\(\s*('|"|`)morgan('|"|`)\s*\)/
    expect(code.match(morganMatch), 'Did you require `morgan` and save it to a const `morgan`?').to.not.be.null;
  });
});