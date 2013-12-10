/**
 * Creates an instance of `Response`.
 *
 * This class is used as a mock when testing Express handlers, substituted in
 * place of of a Node's `http.ServerResponse`.
 *
 * @constructor
 * @api protected
 */
function Response(cb) {
  this.statusCode = 200;
  this._headers = {};
  this._data = '';
  this.__cb = cb;
}

Response.prototype.getHeader = function(name) {
  return this._headers[name];
};

Response.prototype.setHeader = function(name, value) {
  this._headers[name] = value;
};

Response.prototype.writeHead = function(statusCode, reasonPhrase, headers) {
  if (typeof reasonPhrase == 'object') {
    headers = reasonPhrase;
    reasonPhrase = undefined;
  }
  
  this.statusCode = statusCode;
  
  var self = this;
  Object.keys(headers).forEach(function(key) {
    self.setHeader(key, headers[key]);
  });
}

Response.prototype.send = function(body) {
  switch (typeof body) {
    case 'object':
      return this.json(body);
      break;
  }
  
  this.end(body);
  return this;
};

Response.prototype.json = function(obj) {
  var body = JSON.stringify(obj);
  return this.send(body);
}

Response.prototype.redirect = function(url, status) {
  this.statusCode = status || 302;
  this.setHeader('Location', url);
  this.end();
};

Response.prototype.end = function(data, encoding) {
  if (data) { this._data += data; }
  if (this._data.length) { this.body = this._data; }
  if (this.__cb) { this.__cb(); }
};


/**
 * Expose `Response`.
 */
module.exports = Response;
