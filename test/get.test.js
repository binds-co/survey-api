require('es6-promise').polyfill();
require('isomorphic-fetch');

var q = require('q');
var sinon = require('sinon');
var chai = require('./helpers/chaiWrapper.js');
var api = require('../src/index.js');
//mocking global.fetch method
var mock = require('../mocks/index.js')();

describe('api()', function() {
  //increase timeout
  this.timeout(5000);

  var apiURL = 'http://app.binds.co/api/';
  var sendingID = '57cf07d3d1fc6603004278e0';

  beforeEach(function() {
    //mocking GET api/sendings/:id
    var getPath = apiURL + 'sendings/' + sendingID;
    mock.route('GET', getPath, function() {
      return require('../mocks/sendings/57c8388cbca4b403007afef7.json');
    });
  });

  afterEach(function() {
    mock.restore();
  });

  it('should exist in api ;)', function() {
    var result = api(sendingID);
    return q.all([
      expect(result).to.eventually.have.property('get')
    ]);
  });

  it('get(): return the sending obj if no params', function() {
    return api(sendingID).then(function(api) {
      expect(api.get()).to.have.property('_id');
      expect(api.get()).to.have.property('survey');
    });
  });

  it('get(index:number):', function() {
    return api(sendingID).then(function(api) {
      expect(api.get(2)).property('title').to.equal('Pergunta Randomica');
      expect(api.get(1)).property('question').equal('Go To');
      expect(api.get(90)).to.equal(undefined);
    });
  });

  it('get(id): endMessage or question', function() {
    return api(sendingID).then(function(api) {

      //questions
      expect(api.get('xlh8lq1980i442t9'))
        .property('title').equal('Atendimento');
      expect(api.get('28qvnu2sz600y66r'))
        .property('question').equal('Comente pls!');

      //endMessage
      expect(api.get('q4xyhi9na3mobt9'))
        .property('message').equal('Obrigado.');
      expect(api.get('123455')).to.be.false;
    });
  });

  it('get(\'question\', id)', function() {
    return api(sendingID).then(function(api) {
      //questions
      expect(api.get('question', 'xlh8lq1980i442t9'))
        .property('title').equal('Atendimento');
      expect(api.get('question', '28qvnu2sz600y66r'))
        .property('question').equal('Comente pls!');
      expect(api.get('question', '123455')).to.be.false;
    });
    expect().to.be.true;
  });

  it('get(\'endMessage\', id)', function() {
    return api(sendingID).then(function(api) {
      //questions
      expect(api.get('endMessage', 'q4xyhi9na3mobt9'))
        .property('message').equal('Obrigado.');
      expect(api.get('endMessage', 'q4xyhi9na3mobt9'))
        .property('details')
        .property('value').equal('adasdasdas');
      expect(api.get('endMessage', '123455')).to.be.false;
    });
    expect().to.be.true;
  });

  it('get(\'theme\', id)', function() {
    return api(sendingID).then(function(api) {
      //questions
      expect(api.get('theme', 'images'))
        .to.be.instanceof(Array);
      expect(api.get('theme', 'images'))
        .to.have.deep.property('[0].alias', 'logo');
      expect(api.get('theme', 'images'))
        .to.have.deep.property('[0].value').contains('http://');

      expect(api.get('theme', 'fonts'))
        .to.be.instanceof(Array);
      expect(api.get('theme', 'fonts'))
        .to.be.empty;

      expect(api.get('theme', 'colors'))
        .to.be.instanceof(Array);
      expect(api.get('theme', 'colors'))
        .to.have.deep.property('[0].alias', 'headerBg');
      expect(api.get('theme', 'colors'))
        .to.have.deep.property('[1].alias', 'headerColor');

    });
  });

  it('get(\'contact\', id)', function() {
    return api(sendingID).then(function(api) {
      expect(api.get('contact', 'email')).to.equal('jonatas@binds.co');
      expect(api.get('contact', 'name')).to.equal('Jonatas Hashimoto');
      expect(api.get('contact', 'phone')).to.equal('6792135347');
    });
  });

  //it('get(\'status\', id)', function() {
  //expect().to.be.true;
  //});

});
