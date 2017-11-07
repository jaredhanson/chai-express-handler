/**
 * Module dependencies.
 */
var EventEmitter = require('events').EventEmitter
  , http = require('http')
  , util = require('util');


/**
 * Creates an instance of `Response`.
 *
 * This class is used as a mock when testing Express handlers, substituted in
 * place of of a Node's `http.ServerResponse`.
 *
 * @constructor
 * @api protected
 */
function Response(onrender, cb) {
  EventEmitter.call(this);
  
  this.statusCode = 200;
  this._headers = {};
  this._data = '';
  this.__onrender = onrender;
  this.__cb = cb;
}

util.inherits(Response, EventEmitter);

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

Response.prototype.getHeader = function(name) {
  return this._headers[name];
};

Response.prototype.setHeader = function(name, value) {
  this._headers[name] = value;
};

Response.prototype.status = function(num) {
  this.statusCode = num;
  return this;
}

Response.prototype.location = function(url) {
  this.setHeader('Location', url);
  return this;
};

Response.prototype.send = function(body) {
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

Response.prototype.json = function(obj) {
  if (!this.getHeader('Content-Type')) {
    this.setHeader('Content-Type', 'application/json');
  }
  
  var body = JSON.stringify(obj);
  return this.send(body);
}

Response.prototype.redirect = function(url, status) {
  this.statusCode = status || 302;
  this.setHeader('Location', url);
  this.end();
};

Response.prototype.render = function(layout) {
  this.__onrender(layout);
}

Response.prototype.end = function(data, encoding) {
  if (data) { this._data += data; }
  if (this._data.length) {
    this.data = this._data;
    
    switch (this.getHeader('Content-Type')) {
    case 'text/plain':
      this.body = this.data;
      break;
    case 'application/json':
      this.body = JSON.parse(this.data);
      break;
    }
  }
  
  this.emit('finish');
  if (this.__cb) { this.__cb(); }
};


/**
 * Expose `Response`.
 */
module.exports = Response;
