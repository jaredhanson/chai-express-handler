var http = require('http')
  , Request = require('./request');


var req = Object.create(Request.prototype)

module.exports = req;

req.get =
req.header = function header(name) {
  var lc = name.toLowerCase();

  switch (lc) {
    case 'referer':
    case 'referrer':
      return this.headers.referrer || this.headers.referer;
    default:
      return this.headers[lc];
  }
};
