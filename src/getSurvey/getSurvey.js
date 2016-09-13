require('es6-promise').polyfill();
require('isomorphic-fetch');
var q = require('q');
var radio = require('radio');
var apiURL = 'http://app.binds.co/api/';

var get = function(sendingID) {
  var deferred = q.defer();
  fetch(apiURL + 'sendings/' + sendingID + '')
    .then(function(r) {
      return r.json();
    }).then(function(data) {
    //survey = data;
    radio('get:survey').broadcast(data);
    deferred.resolve(data);
  }).catch(function(e) {
    deferred.reject(e);
  });
  radio('get:sending').broadcast(sendingID);
  return getPromise = deferred.promise;
};
module.exports = get;
