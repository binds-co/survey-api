var q = require('q');
//manual mocking (overriding fetch method to do so)
var mock = {
  init: function(path, expectedData) {
    global.fetch = function(path, options) {
      var result = {
        json: function() {
          var deferred = q.defer();
          setTimeout(function() {
            deferred.resolve(expectedData);
          }, 100);
          return deferred.promise;
        }
      };

      var deferred = q.defer();
      setTimeout(function() {
        deferred.resolve(result);
      }, 100);
      return deferred.promise;
    };

  },
  restore: function() {
    require('es6-promise').polyfill();
    global.fetch = require('isomorphic-fetch');
  }
};

module.exports = mock;
