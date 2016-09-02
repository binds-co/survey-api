/* @flow */
require('es6-promise').polyfill();
require('isomorphic-fetch');

var API = function(surveyID) {
  var survey;
  var lastSurveyID;
  var apiURL = 'https://app.binds.co/api/sendings/';

  return {
    get: function(forceRequest) {
      var q = require('q');
      var deferred = q.defer();
      //caches survey by default
      if (!lastSurveyID || forceRequest) {
        fetch(apiURL + surveyID + '').then(function(r) {
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

    yolot: function(e) {
      return [];
    },
  };
};
global.binds = API;
module.exports = API;
