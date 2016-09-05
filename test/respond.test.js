require('es6-promise').polyfill();
require('isomorphic-fetch');

var q = require('q');
var sinon = require('sinon');
var chai = require('./helpers/chaiWrapper.js');
var api = require('../src/index.js');
//mocking global.fetch method
var mock = require('../mocks/index.js');

describe('respond()', function() {
  var apiURL = 'http://app.binds.co/api/sendings/';
  var surveyID = '57c8388cbca4b403007afef7';

  beforeEach(function() {
    instance = api(surveyID);
    var expected = require('../mocks/sendings/57c8388cbca4b403007afef7.json');
    mock.init(apiURL + surveyID, expected);
  });

  afterEach(function() {
    mock.restore();
  });
  var questionID = '5776e1cefca70003001bc5d8';

  it('should call with params: questionID & answer', function() {
    //var survey = instance.respond();
    expect(instance.respond.bind(instance))
      .to.throw('Missing arguments: respond(questionId, answer)');
  });

  it('should have survey object filled / get() first', function() {
    expect(instance.respond.bind(instance, questionID, 'answer'))
      .to.throw('Survey not set, get() first');
  });

  it('should warn if question id is invalid', function() {
    return instance.get().then(function() {
      expect(instance.respond.bind(instance, 'randomID' , 1))
        .to.throw('Invalid questionID for current survey');
    });
  });

  it('should return a promise', function() {
    return instance.get().then(function() {
      var survey = instance.respond(questionID, 100);
      return expect(survey).to.have.property('then');
    });
  });

  it('should post to /api/surveyresponses', function() {
    //expect(false).to.be.true;
  });

});
