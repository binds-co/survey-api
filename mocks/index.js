var q = require('q');
var _ = require('../src/vendor/lodashWrapper.js');
//manual mocking (overriding fetch method to do so)
var mock = function() {
  var paths = [];

  function init(path, expectedData, method) {
    method = method ? method : 'GET';
    var found = _.findIndex(paths, function(e) {
      return path === e.path && method === e.method;
    });
    if (found === -1) {
      paths.push({
        path: path,
        method: method,
        data: expectedData
      });
    } else {
      _.set(paths[found], 'data', expectedData);
    }

    global.fetch = function(path, options) {
      var method = _.get(options, 'method') ? options.method : 'GET';
      var matchedPath = _.find(paths, function(e) {
        return path === e.path && method === e.method;
      });
      var expectedData;
      if (matchedPath) {
        expectedData = matchedPath.data;
      }
      var result = {
        json: function() {
          var deferred = q.defer();
          setTimeout(function() {
            deferred.resolve(expectedData);
          }, 50);
          return deferred.promise;
        }
      };

      var deferred = q.defer();
      setTimeout(function() {
        deferred.resolve(result);
      }, 50);
      return deferred.promise;
    };
  };

  return {
    route: function(method, path, fnData) {
      return init(path, fnData(), method.toUpperCase());
    },
    get: function(path, expectedData) {
      return init(path, expectedData, 'GET');
    },
    post: function(path, expectedData) {
      return init(path, expectedData, 'POST');
    },
    restore: function() {
      require('es6-promise').polyfill();
      global.fetch = require('isomorphic-fetch');
    }
  };
};

module.exports = mock;
