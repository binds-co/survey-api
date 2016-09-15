var _ = require('../src/vendor/lodashWrapper.js');
var mocks = [
  {
    "_id": "jojo",
    "question": {
      "id": "jojo2",
      "title": "Fake question",
      "question": "Pergunta aqui",
      "type": "kpi",
      "ui": "5emo",
      "_id": "576d3640bd229eb2df765b5a",
      "notificate": [],
      "then": [],
      "randomOptions": false,
      "options": [],
      "maxLength": 0,
      "response": {}
    }
  },
  {
    "_id": "57c9fab8a60be403a8176d71",
    "question": {
      "id": "wkqyk53sskbv6uyu",
      "title": "Título da pergunta aqui",
      "question": "Pergunta aqui",
      "type": "kpi",
      "ui": "5emo",
      "_id": "5776e1cefca70003001bc5d8",
      "notificate": [],
      "then": [],
      "randomOptions": false,
      "options": [],
      "maxLength": 0,
      "response": {}
    }
  }
]

module.exports = function(questionID) {
  var a =_.find(mocks, function(e) {
    return _.get(e, '_id') === questionID;
  })
  var b =_.get(a, 'question');
  return b;
};
