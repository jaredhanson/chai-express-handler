var Response = require('./response');


module.exports = function(chai, utils) {
  
  /**
   * Expose handler test
   */
  var Test = require('./test');
  
  chai.express = chai.express || {};
  chai.express.handler = function(callbacks) {
    return new Test(callbacks);
  };
  
  
  /**
   * Aliases.
   */
  var Assertion = chai.Assertion;
  
  /**
   * Assert that a response has a supplied status.
   *
   * ```js
   * expect(res).to.have.status(200);
   * ```
   *
   * @function
   * @name status
   * @param {Number} code
   * @access public
   */
  Assertion.addMethod('status', function(code) {
    var obj = this._obj;
    
    new Assertion(obj).to.be.instanceof(Response);

    this.assert(
        obj.statusCode == code
      , 'expected response to have status code #{exp} but got #{act}'
      , 'expected response to not have status code #{act}'
      , code  // expected
      , obj.statusCode  // actual
    );
  });
  
  /**
   * ### .body (data)
   *
   * Assert that a response has a supplied body.
   *
   * ```js
   * expect(res).to.have.body('hello, world');
   * ```
   *
   * @param {String} data
   * @name status
   * @api public
   */
  Assertion.addMethod('body', function(data) {
    new Assertion(this._obj).to.have.property('body');
    var body = this._obj.body;

    this.assert(
        body === data
      , 'expected #{this} to have body #{exp} but got #{act}'
      , 'expected #{this} to not have body #{act}'
      , data  // expected
      , body  // actual
    );
  });
  
  /**
   * Assert that a response has rendered the supplied view.
   *
   * ```js
   * expect(res).to.render('home');
   * ```
   *
   * @function
   * @name status
   * @param {String} view
   * @access public
   */
  Assertion.addMethod('render', function(view) {
    var obj = this._obj;
    
    new Assertion(obj).to.be.instanceof(Response);
    
    this.assert(
        obj._view == view
      , 'expected response to render view #{exp} but rendered #{act}'
      , 'expected response to not render view #{act}'
      , view  // expected
      , obj._view  // actual
    );
  });
  
  Assertion.addMethod('locals', function(locals) {
    new Assertion(this._obj).to.be.instanceof(Response);
    var actLocals = this._obj.locals;
    
    var deep = utils.flag(this, 'deep');
    if (deep) {
      new Assertion(actLocals).to.deep.equal(locals);
    } else {
      new Assertion(actLocals).to.include(locals);
    }
  });
  
};
