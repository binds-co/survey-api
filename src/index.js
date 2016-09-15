require('es6-promise').polyfill();
require('isomorphic-fetch');
var _ = require('./vendor/lodashWrapper.js');
var q = require('q');
var pubsub = require('radio');

var API = function(sendingID) {
  var config = {
    apiURL: 'http://app.binds.co/api/',
  };

  //pubsub survey
  var survey;
  pubsub('get:survey').subscribe(function(e) {
    survey = e;
  });

  //pubsub sending
  var lastSendingID;
  pubsub('get:sending').subscribe(function(e) {
    lastSendingID = e;
  });
  var getSurveyCache = require('./getSurvey/getSurveyCache.js')(config);

  var deferred = q.defer();
  getSurveyCache(sendingID).then(function(survey) {
    var api = {
      respond: respond,
      get: get
    };
    return deferred.resolve(api);
  });
  return deferred.promise;

  function respond(questionID, answer) {
    var responseBuilder = require('./responseBuilder.js');
    var getNextQuestion = require('./getNextQuestion.js');

    var deferred = q.defer();

    if (!questionID || !answer) {
      throw new Error('Missing arguments: respond(question._id, answer)');
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
      throw 'Invalid question _id for current survey: ' +
      questionID + ' not found in survey';
      return false;
    }

    var response = responseBuilder(question, answer);

    //add sendingID into response
    _.set(response, 'sending', _.get(survey, '_id'));

    fetch(config.apiURL + 'surveyResponses/', {
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
  }

  function get() {
    var arg = arguments;
    var options = [
      'question',
      'endMessage',
      'theme',
      'contact',
      'status',
    ];

    if (_.size(arg) === 2 && options.indexOf(arg[0]) > -1) {
      switch (true) {
        case arg[0] === 'question':
        case arg[0] === 'endMessage':
          //plurarize question & endMessage
          var searchIn = _.get(survey, 'survey.' + arg[0] + 's');
          return _.find(searchIn, {
              id: arg[1]
            }) || false;
          break;
        case arg[0] === 'theme':
          if (arg[1] === 'colors') {
            return _.get(survey, 'survey.colors');
          } else if (arg[1] === 'images') {
            return _.get(survey, 'survey.images');
          } else if (arg[1] === 'fonts') {
            return _.get(survey, 'survey.fonts');
          } else {
            return false;
          }

          return false;
          break;
        case arg[0] === 'contact':
          return _.get(_.get(survey, 'contact'), arg[1]);
          break;
        case arg[0] === 'status':
          break;
        default:

      }
    }
    ;

    //searchs for question/endmessage get(id);
    if (_.isString(arguments[0])) {
      var questions = _.get(survey, 'survey.questions');
      var endMessages = _.get(survey, 'survey.endMessages');
      var all2getha = _.concat(questions, endMessages);
      return _.find(all2getha, {
          id: arguments[0]
        }) || false;
    }

    return survey;
  }

};

module.exports = global.binds = API;
