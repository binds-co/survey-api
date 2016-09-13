var q = require('q');
var pubsub = require('radio');

var survey;
pubsub('get:survey').subscribe(function(e) {
  survey = e;
});

var lastSendingID;
pubsub('get:sending').subscribe(function(e) {
  lastSendingID = e;
});

var getSurveyCache = function(forceRequest, sendingID) {
  var getSurvey = require('./getSurvey.js');
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

module.exports = getSurveyCache;
