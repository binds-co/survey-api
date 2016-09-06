var _ = require('./vendor/lodashWrapper.js');

var types = _.get(require('./question.json'), 'types');
var uis = _.get(require('./question.json'), 'uis');

function validate(type, ui, answer) {
  if (!ui || !type) { return false; }
  if (!~types.indexOf(type)) { return false; }
  if (!~uis.indexOf(ui)) { return false; }
  if (ui === 'multiple' && !_.isArray(answer)) { return false; }
  return true;
}

var responseBuilder = function(question, answer) {
  var type = _.get(question, 'type');
  var ui = _.get(question, 'ui');

  if (!validate(type, ui, answer)) {
    return false;
  }

  var response = {
    question: question._id
  };
  var label;

  if (type === 'text') {
    label = 'text';
  } else if (type === 'kpi' || type === 'nps') {
    label = 'rating';
    answer = parseInt(answer, 10);
    answer = _.isNaN(answer) ? 0 : answer;
  } else if (type === 'enum') {
    label = 'value';
    //converts value(s) into string
    answer = (ui === 'multiple') ?
      _.map(answer, function(a) { return a += ''; }) :
      answer += '';
  }

  _.set(response, label, answer);
  return response;

};

module.exports = responseBuilder;
