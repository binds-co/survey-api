var expect = require('chai').expect;
var api = require('../src/index.js');
var instance;

beforeEach(function() {
  instance = api('id');
});
describe('api:methods', function() {
  it('get()', function() {
    var survey = instance.get();
    expect(survey).to.be.an('array');
  });
});
