require('es6-promise').polyfill();
require('isomorphic-fetch');
var _ = require('./lodashWrapper.js');

var API = function(surveyID) {
  var survey;
  var lastSurveyID;
  var apiURL = 'https://app.binds.co/api/';

  return {
    get: function(forceRequest) {
      var q = require('q');
      var deferred = q.defer();
      //caches survey by default
      if (!lastSurveyID || forceRequest) {
        fetch(apiURL + 'sendings/' + surveyID + '')
          .then(function(r) {
            return r.json();
          }).then(function(data) {
          survey = data;
          deferred.resolve(data);
        });
      } else {
        deferred.resolve(survey);
      }
      lastSurveyID = surveyID;
      return deferred.promise;
    },
    respond: function(questionID, answer) {

      var q = require('q');
      var deferred = q.defer();

      if (!questionID || !answer) {
        throw new Error('Missing arguments: respond(questionId, answer)');
        return false;
      }
      if (!survey) {
        throw new Error('Survey not set, get() first');
        return false;
      }


      var question = _.find(survey.survey.questions, function(e) {
        return e._id === questionID;
      });
      if (!question) {
        throw 'Invalid questionID for current survey';
        return false;
      }

      setTimeout(function() {
        deferred.resolve(question);
      }, 200);

      var responseBuilder = require('./responseBuilder.js');

      return deferred.promise;
    },
  };
};

module.exports = global.binds = API;
