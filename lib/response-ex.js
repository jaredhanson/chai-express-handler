var Response = require('./response')


var res = Object.create(Response.prototype)

module.exports = res;

res.status = function status(code) {
  this.statusCode = code;
  return this;
};

res.location = function location(url) {
  this.setHeader('Location', url);
  return this;
};
