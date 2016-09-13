var q = require('q');
var pubsub = require('radio');
var _ = require('../vendor/lodashWrapper.js');

var getSurveyCache = function(config) {
  var survey;
  pubsub('get:survey').subscribe(function(e) {
    survey = e;
  });

  var lastSendingID;
  pubsub('get:sending').subscribe(function(e) {
    lastSendingID = e;
  });

  return function(sendingID, forceRequest) {
    var getSurvey = require('./getSurvey.js')(config);
    var deferred = q.defer();
    //caches survey by default
    if (!sendingID || sendingID !== lastSendingID || forceRequest) {
      return getSurvey(sendingID);
    } else {
      deferred.resolve(survey);
    }
    lastSendingID = sendingID;
    return deferred.promise;
  };
};

module.exports = getSurveyCache;
