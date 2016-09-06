require('es6-promise').polyfill();
require('isomorphic-fetch');
var _ = require('./vendor/lodashWrapper.js');
var q = require('q');

var API = function(sendingID) {
  var survey;
  var lastSendingID;
  var apiURL = 'http://app.binds.co/api/';
  return {
    get: function(forceRequest) {
      var deferred = q.defer();
      //caches survey by default
      if (!sendingID || sendingID !== lastSendingID || forceRequest) {
        fetch(apiURL + 'sendings/' + sendingID + '')
          .then(function(r) {
            return r.json();
          }).then(function(data) {
            survey = data;
            deferred.resolve(data);
          });
      } else {
        deferred.resolve(survey);
      }
      lastSendingID = sendingID;
      return deferred.promise;
    },
    respond: function(questionID, answer) {
      var responseBuilder = require('./responseBuilder.js');
      var deferred = q.defer();

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
        throw 'Invalid questionID for current survey';
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
          body: JSON.stringify({
            name: 'Hubot',
            login: 'hubot',
          })
      });

      setTimeout(function() {
        deferred.resolve(question);
      }, 200);

      return deferred.promise;
    },
  };
};

module.exports = global.binds = API;
