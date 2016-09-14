var _ = require('../src/vendor/lodashWrapper.js');
var mocks = [
  {
    "_id": "57c9fab8a60be403a8176d71",
    "question": {
      "id": "wkqyk53sskbv6uyu",
      "title": "Título da pergunta aqui",
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
  },
  {
    "_id": "57c9fab8a60be403a8176d70",
    "question": {
      "title": "Pq vc gosta de limão?",
      "question": "Comente a respeito",
      "type": "text",
      "ui": "text",
      "_id": "57c8a8170bb2faca240824fe"
    },
    "text": "teste",
    "rating": 100,
    "seed": "57c9fa80ee469acd219f647e",
    "createdAt": "2016-09-06T13:26:09.761Z",
    "contact": {
      "_id": "56532904b8402d9009003d03",
      "phone": "6792135347",
      "email": "jonatas@binds.co",
      "name": "Jonatas Hashimoto",
      "account": "56532700b8402d9009003cf0",
      "__v": 0,
      "opt": true,
      "updatedAt": "2016-09-02T22:17:45.079Z",
      "createdAt": "2015-11-23T14:56:04.809Z"
    },
    "survey": {
      "_id": "57c8a8170bb2faca240824ec",
      "title": "Limão para todos",
      "images": [
        {
          "alias": "logo",
          "value": "https://binds-cdn.surge.sh/mail/example/logo-example.png"
        }
      ],
      "answeredMessage": "Pesquisa já respondida",
      "account": "56532700b8402d9009003cf0",
      "__v": 1,
      "updatedAt": "2016-09-02T14:41:39.969Z",
      "createdAt": "2016-09-01T22:13:43.023Z",
      "fonts": [],
      "colors": [
        {
          "alias": "headerBg",
          "value": "#fff",
          "_id": "57c8a8170bb2faca240824f7"
        },
        {
          "alias": "headerColor",
          "value": "#000",
          "_id": "57c8a8170bb2faca240824f6"
        },
        {
          "alias": "footerBg",
          "value": "#fff",
          "_id": "57c8a8170bb2faca240824f5"
        },
        {
          "alias": "footerColor",
          "value": "#ffffff",
          "_id": "57c8a8170bb2faca240824f4"
        },
        {
          "alias": "arrowColor",
          "value": "#ababab",
          "_id": "57c8a8170bb2faca240824f3"
        },
        {
          "alias": "buttonColor",
          "value": "#ffffff",
          "_id": "57c8a8170bb2faca240824f2"
        },
        {
          "alias": "buttonBg",
          "value": "rgb(103, 58, 183)",
          "_id": "57c8a8170bb2faca240824f1"
        },
        {
          "alias": "endMessageBg",
          "value": "#fff",
          "_id": "57c8a8170bb2faca240824f0"
        },
        {
          "alias": "bodyColor",
          "value": "#000",
          "_id": "57c8a8170bb2faca240824ef"
        },
        {
          "alias": "titleColor",
          "value": "#000",
          "_id": "57c8a8170bb2faca240824ee"
        }
      ],
      "endMessages": [
        {
          "id": "7dafha8hnj6lmgry",
          "message": "Obrigado",
          "_id": "57c8a8170bb2faca240824ed"
        }
      ],
      "startMessage": {
        "title": {
          "value": "Títutlo da pesquisa",
          "hiddenTitle": false
        }
      },
      "questions": [
        {
          "id": "f5gx00pocw2i4yfp",
          "title": "Pq vc gosta de limão?",
          "question": "Comente a respeito",
          "type": "text",
          "ui": "text",
          "_id": "57c8a8170bb2faca240824fe",
          "notificate": [],
          "then": [
            {
              "goTo": "m8mhrirbr91l1ogq"
            }
          ],
          "randomOptions": false,
          "options": [],
          "maxLength": 0
        },
        {
          "id": "m8mhrirbr91l1ogq",
          "title": "Qual Parte do limão vc gosta mais?",
          "question": "Qual?",
          "type": "text",
          "ui": "text",
          "_id": "57c8a8170bb2faca240824fd",
          "notificate": [],
          "then": [
            {
              "goTo": "7dafha8hnj6lmgry"
            }
          ],
          "randomOptions": false,
          "options": [],
          "maxLength": 0
        },
        {
          "id": "6tdsid0k406l2bc0",
          "title": "Quais Receitas vc gosta?",
          "question": "Escolha 1 ou mais",
          "type": "enum",
          "ui": "multiple",
          "_id": "57c8a8170bb2faca240824f8",
          "notificate": [],
          "then": [],
          "randomOptions": false,
          "options": [
            {
              "label": "Bolo de limão",
              "_id": "57c8a8170bb2faca240824fc"
            },
            {
              "label": "Torta de limão",
              "_id": "57c8a8170bb2faca240824fb"
            },
            {
              "label": "Pave de limão",
              "_id": "57c8a8170bb2faca240824fa"
            },
            {
              "label": "Limonada Suíça",
              "_id": "57c8a8170bb2faca240824f9"
            }
          ],
          "maxLength": 0
        }
      ],
      "language": "pt-br",
      "isLocked": true
    }
  }
]

module.exports = function(questionID) {
  var a =_.find(mocks, function(e) {
    return _.get(e, 'question._id') === questionID;
  })
  return _.get(a, 'question');
};
