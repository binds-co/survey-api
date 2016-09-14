var _ = require('./vendor/lodashWrapper.js');
var getNextQuestion = function(questions, endMessages, question, answer) {

  var qIndex = _.findIndex(questions, {
    '_id': question._id
  });
  var then = _.get(question, 'then');

  //then was not set; move next!
  if (!then.length) {
    if (qIndex < questions.length) {
      return questions[qIndex + 1];
    } else {
      return endMessages[0];
    }
  }

  var id2Go = _.find(question.then, function(e) {
    return _.get(e, 'if.value') == answer;
  });
  var wasFoundInQuestions = true;
  var found = _.find(questions, {
    id: id2Go.goTo
  });
  if (!found) {
    wasFoundInQuestions = false;
    //search in endMessages for destination
    found = _.find(endMessages, {
      id: id2Go.goTo
    });
  }

  return !found ? endMessages : found;

};

module.exports = getNextQuestion;
