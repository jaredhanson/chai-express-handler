/**
 * Module dependencies.
 */
var Request = require('./request')
  , Response = require('./response')
  , middleware = require('./middleware')
  , flatten = require('array-flatten')
  , slice = Array.prototype.slice;


/**
 * Creates an instance of `Test`.
 *
 * @constructor
 * @api protected
 */
function Test(callbacks) {
  this._callbacks = flatten(slice.call(arguments, 0));
  this._callbacks.unshift(middleware.query());
  this._callbacks.unshift(middleware.init());
}

/**
 * Register a callback to be invoked when request is prepared.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.request = function(cb) {
  this._request = cb;
  return this;
};

/**
 * Register a callback to be invoked when handler `end()`s response.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.finish = function(cb) {
  this._end = cb;
  return this;
};

/**
 * Register a callback to be invoked when handler calls `next()`.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.next = function(cb) {
  this._next = cb;
  return this;
};

/**
 * Dispatch mock request to handler.
 *
 * @api public
 */
Test.prototype.listen = function() {
  var self = this
    , req = new Request()
    , res = new Response(function() {
        if (!self._end) { throw new Error('res#end should not be called'); }
        self._end.call(this);
      })
    , prepare = this._request;
  
  function ready(err) {
    function next(err) {
      if (!self._next) { throw new Error('next should not be called'); }
      self._next.call(this, err);
    }
    
    var i = 0;
    function callbacks(err) {
      var fn = self._callbacks[i++];
      if (!fn) { return next(err); }
      try {
        if (err) {
          if (fn.length < 4) { return callbacks(err); }
          fn(err, req, res, callbacks);
        } else {
          if (fn.length < 4) { return fn(req, res, callbacks); }
          callbacks();
        }
      } catch (err) {
        // NOTE: Route handlers are not expected to throw exceptions.  So, in
        //       the context of a unit test, exceptions are re-thrown, rather
        //       than being caught and passed to `next`.
        throw err;
      }
    }
    callbacks(err);
  }
  
  if (prepare && prepare.length == 3) {
    prepare(req, res, ready);
  } else if (prepare) {
    prepare(req, res);
    ready();
  } else {
    ready();
  }
};


/**
 * Expose `Test`.
 */
module.exports = Test;
