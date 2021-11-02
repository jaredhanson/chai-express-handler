var setPrototypeOf = require('setprototypeof');
var reqx = require('../request-ex');
var resx = require('../response-ex');


exports = module.exports = function() {
  var request = Object.create(reqx);
  var response = Object.create(resx);

  return function init(req, res, next) {
    req.res = res;
    res.req = req;
    
    setPrototypeOf(req, request);
    setPrototypeOf(res, response);
    
    req.params = req.params || {};
    res.locals = res.locals || Object.create(null);
    next();
  };
};
