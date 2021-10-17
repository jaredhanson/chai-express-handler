var Response = require('./response')


var res = Object.create(Response.prototype)

module.exports = res;

res.status = function status(code) {
  this.statusCode = code;
  return this;
};

res.send = function(body) {
  // allow status / body
  if (2 == arguments.length) {
    // res.send(body, status) backwards compat
    if ('number' != typeof body && 'number' == typeof arguments[1]) {
      this.statusCode = arguments[1];
    } else {
      this.statusCode = body;
      body = arguments[1];
    }
  }
  
  switch (typeof body) {
    case 'number':
      if (!this.getHeader('Content-Type')) {
        this.setHeader('Content-Type', 'text/plain');
      }
      this.statusCode = body;
      body = http.STATUS_CODES[body];
      break;
    case 'object':
      return this.json(body);
      break;
  }
  
  this.end(body);
  return this;
};

res.json = function(obj) {
  var body = JSON.stringify(obj);
  
  if (!this.getHeader('Content-Type')) {
    this.setHeader('Content-Type', 'application/json');
  }
  
  return this.send(body);
}

res.location = function location(url) {
  this.setHeader('Location', url);
  return this;
};
