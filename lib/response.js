/**
 * Module dependencies.
 */
var EventEmitter = require('events').EventEmitter
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
function Response() {
  EventEmitter.call(this);
  
  this.statusCode = 200;
  this._headers = {};
  this._data = '';
}

util.inherits(Response, EventEmitter);

Response.prototype.writeHead = function(statusCode, statusMessage, headers) {
  if (typeof statusMessage == 'object') {
    headers = statusMessage;
    statusMessage = undefined;
  }
  
  this.statusCode = statusCode;
  
  var self = this;
  Object.keys(headers).forEach(function(key) {
    self.setHeader(key, headers[key]);
  });
  return this;
}

Response.prototype.getHeader = function(name) {
  return this._headers[name];
};

Response.prototype.setHeader = function(name, value) {
  this._headers[name] = value;
  return this;
};

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
};


/**
 * Expose `Response`.
 */
module.exports = Response;
