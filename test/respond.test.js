require('es6-promise').polyfill();
require('isomorphic-fetch');

var q = require('q');
var chai = require('./helpers/chaiWrapper.js');
var sinon = require('sinon');
var api = require('../src/index.js');
//mocking global.fetch method
var mock = require('../mocks/index.js')();

describe('api.respond()', function() {
  //increase timeout
  this.timeout(5000);

  var apiURL = 'http://app.binds.co/api/';
  var sendingID = '57cf07d3d1fc6603004278e0';

  beforeEach(function() {
    //mocking GET api/sendings/:id
    var getPath = apiURL + 'sendings/' + sendingID;
    mock.route('GET', getPath, function() {
      return require('../mocks/sendings/57c8388cbca4b403007afef7.json');
    });
  });

  afterEach(function() {
    mock.restore();
  });

  it('should exist in api ;)', function() {
    var questionID = '576d3640bd229eb2df765b5a';
    var result = api(sendingID);
    return q.all([
      expect(result).to.eventually.have.property('respond')
    ]);
  });

  it('should call with params: questionID & answer', function() {
    var questionID = '576d3640bd229eb2df765b5a';
    return api(sendingID).then(function(instance) {
      return expect(instance.respond.bind(instance))
        .to.throw('Missing arguments: respond(questionId, answer)');
    });
  });

  it('should warn if question id is invalid', function() {
    var questionID = '576d3640bd229eb2df765b5a';
    return api(sendingID).then(function(instance) {
      return expect(instance.respond.bind(instance, 'randomID', 1))
        .to.throw('Invalid questionID for current survey');
    });
  });

  it('should return a promise', function() {
    var questionID = '576d3640bd229eb2df765b5a';
    //mocking POST result into api/surveyResponses/
    var path = apiURL + 'surveyResponses/';
    mock.route('POST', path, function() {
      var q = require('../mocks/surveyResponses.js')(questionID);
      return q;
    });

    return api(sendingID).then(function(instance) {
      var survey = instance.respond(questionID, 100);
      return expect(survey).to.have.property('then');
    });
  });

  it('should post to /api/surveyResponses', function() {
    var questionID = '576d3640bd229eb2df765b5a';
    //mocking POST result into api/surveyResponses/
    var path = apiURL + 'surveyResponses/';
    mock.route('POST', path, function() {
      return require('../mocks/surveyResponses.js')(questionID);
    });

    return api(sendingID).then(function(instance) {
      var answered = instance.respond(questionID, 10);
      return q.all([
        expect(answered).to.eventually.have.property('_id'),
        expect(answered).to.eventually.have.property('question'),
      ]);
    });
  });

  it('should go to next question in array (empty then)', function() {
    //mocking POST result into api/surveyResponses/
    var path = apiURL + 'surveyResponses/';
    mock.route('POST', path, function() {
      return require('../mocks/surveyResponses.js');
    });
    return api(sendingID).then(function(instance) {
      var questionID = '5776e1cefca70003001bc5d8';
      var answered = instance.respond(questionID, 90);
      return q.all([
        expect(answered)
          .to.eventually.have.property('id').equal('xlh8lq1980i442t9'),
        expect(answered).to.eventually.have.property('question'),
      ]);
    });
  });

  it('should go to corresponding goTo (filled then)', function() {
    //mocking POST result into api/surveyResponses/
    var path = apiURL + 'surveyResponses/';
    mock.route('POST', path, function() {
      return require('../mocks/surveyResponses.js');
    });

    return api(sendingID).then(function(instance) {
      var questionID = '565f4ea639832aa5dd7ec5ef';
      var beagle = instance.respond(questionID, 'Beagle');
      var outro = instance.respond(questionID, 'Outro');
      return q.all([
        expect(beagle)
          .to.eventually.have.property('id').equal('wd1qiw1l8mvaemi'),
        expect(beagle).to.eventually.have.property('question'),
        expect(outro)
          .to.eventually.have.property('id').equal('t9whdcmtgf58w7b9'),
        expect(outro).to.eventually.have.property('question'),
      ]);
    });
  });

  it('should go to the endMessage if', function() {
    //mocking POST result into api/surveyResponses/
    var path = apiURL + 'surveyResponses/';
    mock.route('POST', path, function() {
      return require('../mocks/surveyResponses.js');
    });

    return api(sendingID).then(function(instance) {
      var questionID = '565f4ea639832aa5dd7ec5ef';
      var answered = instance.respond(questionID, 'Beagle');
      return q.all([
        expect(answered)
          .to.eventually.have.property('id').equal('wd1qiw1l8mvaemi'),
        expect(answered).to.eventually.have.property('question'),
      ]);
    });
  });

});
