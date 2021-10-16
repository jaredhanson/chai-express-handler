var parseUrl = require('parseurl');
var qs = require('qs');


exports = module.exports = function() {
  var queryparse = qs.parse;

  return function query(req, res, next) {
    if (!req.query) {
      var val = parseUrl(req).query;
      req.query = queryparse(val, {});
    }

    next();
  };
};
