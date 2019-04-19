/**
 * Creates an instance of `Request`.
 *
 * This class is used as a mock when testing Express handlers, substituted in
 * place of of a Node's `http.IncomingMessage`.
 *
 * @constructor
 * @api protected
 */
function Request() {
  this.method = 'GET';
  this.url = '/';
  this.headers = {};
  this.params = {};
}


/**
 * Expose `Request`.
 */
module.exports = Request;
