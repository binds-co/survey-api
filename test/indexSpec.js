require('es6-promise').polyfill();
require('isomorphic-fetch');

var q = require('q');
var sinon = require('sinon');
var chai = require('chai');

var chaiPromise = require('chai-as-promised');
chai.use(chaiPromise);

//wrapping chai
var expect = chai.expect;
chai.should();

var api = require('../src/index.js');
var instance;

describe('get()', function() {

  var apiURL = 'http://app.binds.co/api/sendings/';
  var surveyID = '57c8388cbca4b403007afef7';

  beforeEach(function() {
    instance = api(surveyID);
  });

  it('should return a promise', function() {
    var survey = instance.get();
    expect(survey).to.have.property('then');
  });

  it('should get the survey', function() {
    var survey = instance.get();
    return q.all([
      expect(survey).to.eventually.have.property('_id'),
      expect(survey).to.eventually.have.property('survey'),
      expect(survey).to.eventually.have.property('contact'),
      expect(survey).to.eventually.have.property('seed'),
    ]);
  });

  it('should cache the survey', function() {
    sinon.spy(global, 'fetch');
    instance.get();
    instance.get();
    expect(global.fetch.calledTwice).to.be.false;
    global.fetch.restore();
  });

  it('should clear cache call on force', function() {
    sinon.spy(global, 'fetch');
    instance.get();
    instance.get(true);
    instance.get();
    instance.get();
    expect(global.fetch.calledTwice).to.be.true;
    global.fetch.restore();
  });

});
