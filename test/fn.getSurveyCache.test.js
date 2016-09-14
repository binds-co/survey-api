require('es6-promise').polyfill();
require('isomorphic-fetch');
var q = require('q');
var sinon = require('sinon');

//mocking global.fetch method
var mock = require('../mocks/index.js')();

describe('getSurveyCache()', function() {
  var apiURL = 'http://app.binds.co/api/';
  var surveyID = '57c8388cbca4b403007afef7';
  var getSurvey;
  var config = {
    apiURL: apiURL
  };

  beforeEach(function() {
    getSurvey = require('../src/getSurvey/getSurveyCache.js')(config);
    var expected = require('../mocks/sendings/57c8388cbca4b403007afef7.json');
    mock.get(apiURL + 'sendings/' + surveyID, expected);
  });

  afterEach(function() {
    mock.restore();
  });

  it('should cache the survey', function() {
    sinon.spy(global, 'fetch');
    getSurvey(surveyID);
    getSurvey(surveyID);
    expect(global.fetch.calledTwice).to.be.false;
    global.fetch.restore();
  });

  it('should clear cache call on force', function() {
    sinon.spy(global, 'fetch');
    getSurvey(surveyID);
    getSurvey(surveyID, true);
    getSurvey(surveyID);
    getSurvey(surveyID);
    expect(global.fetch.calledTwice).to.be.true;
    global.fetch.restore();
  });
});
