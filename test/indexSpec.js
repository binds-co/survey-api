require('es6-promise').polyfill();
require('isomorphic-fetch');






var q = require('q');
var sinon = require('sinon');

var chai = require('chai');
var chaiHttp = require('chai-http');
var chaiPromise = require('chai-as-promised');
chai.use(chaiHttp);
chai.use(chaiPromise);
//wrapping chai
var expect = chai.expect;
chai.should();


//MOCK section
//console.log('hello', fetch);
//fetch = function(e) {
  //console.log(e);
//};


var api = require('../src/index.js');
var instance;


beforeEach(function() {
  sinon.mock(this).e
  var surveyID = '57c8388cbca4b403007afef7';
  instance = api(surveyID);
});
describe('get()', function() {

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
    //var mock = sinon.mock(this);
    expect(fetch).be.a('function');
    var survey = instance.get().then(function(e) {

    });
  });

  it('should set internal survey object', function() {
    var survey = instance.get();
    return expect(survey).to.eventually.have.property('_id');
  });

});
