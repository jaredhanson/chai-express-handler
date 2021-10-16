var setPrototypeOf = require('setprototypeof');
var resx = require('../response-ex');


exports = module.exports = function() {
  var response = Object.create(resx);

  return function init(req, res, next) {
    setPrototypeOf(res, response);
    
    req.params = req.params || {};
    res.locals = res.locals || Object.create(null);
    next();
  };
};
