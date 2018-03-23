/**
 * Module dependencies.
 */
var Request = require('./request')
  , Response = require('./response')
  , flatten = require('utils-flatten');


/**
 * Creates an instance of `Test`.
 *
 * @constructor
 * @api protected
 */
function Test(callbacks) {
  this._callbacks = flatten(callbacks);
}

/**
 * Register a callback to be invoked when request is prepared.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.req = function(cb) {
  this._req = cb;
  return this;
};

/**
 * Register a callback to be invoked when response is prepared.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.res = function(cb) {
  this._res = cb;
  return this;
};

Test.prototype.render = function(cb) {
  this._render = cb;
  return this;
};

/**
 * Register a callback to be invoked when handler `end()`s response.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.end = function(cb) {
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
Test.prototype.dispatch = function(err) {
  var self = this
    , req = new Request()
    , before = this._req;
  
  function ready() {
    var res = new Response(
      function onrender(layout) {
        if (!self._render) { throw new Error('res#render should not be called'); }
        self._render.call(this, res, layout);
      },
      function() {
        if (!self._end) { throw new Error('res#end should not be called'); }
        self._end.call(this, res);
      });
    
    if (self._res) { self._res(res); }
    
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
    callbacks();
  }
  
  if (before && before.length == 2) {
    before(req, ready);
  } else if (before) {
    before(req);
    ready();
  } else {
    ready();
  }
};


/**
 * Expose `Test`.
 */
module.exports = Test;
