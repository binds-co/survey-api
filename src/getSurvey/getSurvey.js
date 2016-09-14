require('es6-promise').polyfill();
require('isomorphic-fetch');
var q = require('q');
var radio = require('radio');
var _ = require('../vendor/lodashWrapper.js');

var get = function(config) {
  var apiURL = _.get(config, 'apiURL');
  return function(sendingID) {
    var deferred = q.defer();

    fetch(apiURL + 'sendings/' + sendingID + '')
      .then(function(r) {
        return r.json();
      }).then(function(data) {

      radio('get:survey').broadcast(data);
      return deferred.resolve(data);

    }).catch(function(e) {
      return deferred.reject(e);
    });
    radio('get:sending').broadcast(sendingID);
    return getPromise = deferred.promise;
  };
};
module.exports = get;
