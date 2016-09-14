require('es6-promise').polyfill();
require('isomorphic-fetch');
var q = require('q');
var sinon = require('sinon');

//mocking global.fetch method
var mock = require('../mocks/index.js')();

describe('getSurvey()', function() {
  var apiURL = 'http://app.binds.co/api/';
  var surveyID = '57c8388cbca4b403007afef7';
  var getSurvey;
  var config = {
    apiURL: apiURL
  };

  beforeEach(function() {
    getSurvey = require('../src/getSurvey/getSurvey.js')(config);
    var expected = require('../mocks/sendings/57c8388cbca4b403007afef7.json');
    mock.get(apiURL + 'sendings/' + surveyID, expected);
  });

  afterEach(function() {
    mock.restore();
  });

  it('should return a promise', function() {
    var survey = getSurvey(surveyID);
    expect(survey).to.have.property('then');
  });

  it('should get the survey', function() {
    var survey = getSurvey(surveyID);
    return q.all([
      expect(survey).to.eventually.have.property('_id'),
      expect(survey).to.eventually.have.property('survey'),
      expect(survey).to.eventually.have.property('contact'),
      expect(survey).to.eventually.have.property('seed'),
    ]);
  });
});
