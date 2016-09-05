var chai = require('chai');
var chaiPromise = require('chai-as-promised');
chai.use(chaiPromise);

global.expect = chai.expect;
global.assert = chai.assert;
chai.should();

module.exports = chai;
