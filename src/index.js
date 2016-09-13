require('es6-promise').polyfill();
require('isomorphic-fetch');
var _ = require('./vendor/lodashWrapper.js');
var q = require('q');
var pubsub = require('radio');

var API = function(sendingID) {
  var apiURL = 'http://app.binds.co/api/';
  var getPromise;

  var survey;
  pubsub('get:survey').subscribe(function(e) {
    survey = e;
  });

  var lastSendingID;
  pubsub('get:sending').subscribe(function(e) {
    lastSendingID = e;
  });

  return {
    get: function(forceRequest) {
      var getSurvey = require('./getSurvey/getSurvey.js');
      var deferred = q.defer();
      //caches survey by default
      if (!sendingID || sendingID !== lastSendingID || forceRequest) {
        return getSurvey(sendingID);
      } else {
        deferred.resolve(survey);
      }
      lastSendingID = sendingID;
      return getPromise = deferred.promise;
    },
    respond: function(questionID, answer) {
      var responseBuilder = require('./responseBuilder.js');
      var getNextQuestion = require('./getNextQuestion.js');

      var deferred = q.defer();

      q.when(getPromise, function(e) {

      });
      if (!questionID || !answer) {
        throw new Error('Missing arguments: respond(questionId, answer)');
        return false;
      }
      if (!survey) {
        throw new Error('Survey not set, get() first');
        return false;
      }
      var questions = _.get(survey.survey, 'questions');
      var question = _.find(questions, {
        '_id': questionID
      });
      if (!question) {
        throw 'Invalid questionID for current survey: ' +
          questionID + ' not found in survey';
        return false;
      }

      var response = responseBuilder(question, answer);

      //add sendingID into response
      _.set(response, 'sending', _.get(survey, '_id'));

      fetch(apiURL + 'surveyResponses/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(response)
      }).then(function(r) {
        return r.json();
      }).then(function(response) {
        //should return in resolve the next question
       var nextQuestion = getNextQuestion(
         questions,
         _.get(survey.survey, 'endMessages'),
         question,
         answer
       );
        deferred.resolve(nextQuestion);
      });


      return deferred.promise;
    },
  };
};

module.exports = global.binds = API;
