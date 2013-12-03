module.exports = function(chai, _) {
  var Test = require('./test');
  
  chai.express = chai.express || {};
  chai.express.handler = function(callbacks) {
    return new Test(callbacks);
  };
};
