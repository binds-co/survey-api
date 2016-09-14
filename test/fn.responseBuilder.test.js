describe('responseBuilder()', function() {
  var rb = require('../src/responseBuilder.js');

  it('should valitate the question with type/ui', function() {
    expect(rb({type: ''}, 1)).to.be.false;
    expect(rb({ui: ''}, 1)).to.be.false;
    //wrong type/ui
    expect(rb({type: 'kp', ui: '5emo'}, 1)).to.be.false;
    expect(rb({type: 'jojo', ui: 'jojolitos'}, 1)).to.be.false;
    expect(rb({type: 'kpi', ui: '5emo'}, 1)).to.be.an('object');
  });

  describe('answer assignment by type/ui', function() {

    var question = {_id: 'idy'};

    it('text ui:text', function() {
      question.type = 'text';
      question.ui = 'text';
      expect(rb(question, 'meu teste'))
        .deep.equal({text: 'meu teste', question: 'idy'});
    });

    it('kpi ui:5emo', function() {
      question.type = 'kpi';
      question.ui = '5emo';
      expect(rb(question, 90))
        .deep.equal({rating: 90, question: 'idy'});
    });

    it('kpi ui:yn', function() {
      question.type = 'kpi';
      question.ui = 'yn';
      expect(rb(question, 100))
        .deep.equal({rating: 100, question: 'idy'});
    });
    it('kpi ui:ynd', function() {
      question.type = 'kpi';
      question.ui = 'ynd';
      expect(rb(question, 50))
        .deep.equal({rating: 50, question: 'idy'});
    });

    it('nps ui:ymn', function() {
      question.type = 'nps';
      question.ui = 'ynm';

      expect(rb(question, 25))
        .deep.equal({rating: 25, question: 'idy'});
      expect(rb(question, 75))
        .deep.equal({rating: 75, question: 'idy'});
      expect(rb(question, 100))
        .deep.equal({rating: 100, question: 'idy'});
    });

    it('nps ui:10num', function() {
      question.type = 'nps';
      question.ui = '10num';

      expect(rb(question, 0))
        .deep.equal({rating: 0, question: 'idy'});
      expect(rb(question, 100))
        .deep.equal({rating: 100, question: 'idy'});

      expect(rb(question, '75'))
        .deep.equal({rating: 75, question: 'idy'});
    });

    it('kpi/nps convert string into integer', function() {
      question.type = 'kpi';
      question.ui = '5emo';

      //convert string into int
      expect(rb(question, '90'))
        .deep.equal({rating: 90, question: 'idy'});
      expect(rb(question, 'hello'))
        .deep.equal({rating: 0, question: 'idy'});

      question.type = 'nps';
      question.ui = 'ynm';

      expect(rb(question, '75'))
        .deep.equal({rating: 75, question: 'idy'});
      expect(rb(question, 'hello'))
        .deep.equal({rating: 0, question: 'idy'});
    });

    it('enum ui:single', function() {
      question.type = 'enum';
      question.ui = 'single';

      expect(rb(question, 'hello'))
        .deep.equal({value: 'hello', question: 'idy'});

      //convert number into string
      expect(rb(question, 75))
        .deep.equal({value: '75', question: 'idy'});
    });

    it('enum ui:10num', function() {
      question.type = 'enum';
      question.ui = '10num';

      expect(rb(question, '10'))
        .deep.equal({value: '10', question: 'idy'});

      //convert number into string
      expect(rb(question, 9))
        .deep.equal({value: '9', question: 'idy'});
    });

    it('enum ui:multiple', function() {
      question.type = 'enum';
      question.ui = 'multiple';

      expect(rb(question, [1, 2, 3, 5]))
        .deep.equal({value: ['1', '2', '3', '5'], question: 'idy'});

      expect(rb(question, ['dog','cat', 'fish']))
        .deep.equal({value: ['dog','cat', 'fish'], question: 'idy'});
    });

  });
});
