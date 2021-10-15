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
    
    new Assertion(obj).to.be.an.instanceof(Response);

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
   * @name render
   * @param {String} view
   * @access public
   */
  Assertion.addMethod('render', function(view) {
    var obj = this._obj;
    
    new Assertion(obj).to.be.an.instanceof(Response);
    
    this.assert(
        obj._view == view
      , 'expected response to render view #{exp} but rendered #{act}'
      , 'expected response to not render view #{act}'
      , view  // expected
      , obj._view  // actual
    );
  });
  
  /**
   * Assert that a response has the supplied local variables.
   *
   * ```js
   * expect(res).to.have.locals({ name: 'Alice' });
   * ```
   *
   * To assert that a response has defined the supplied local variables, without
   * asserting the values of those variables, use an `include` chain.
   *
   * ```js
   * expect(res).to.include.locals([ 'name' ])
   * ```
   *
   * @function
   * @name locals
   * @param {Object|Array} locals
   * @access public
   */
  Assertion.addMethod('locals', function(locals) {
    var obj = this._obj;
    
    new Assertion(obj).to.be.an.instanceof(Response);
    new Assertion(obj).to.have.property('locals');
    
    var assertion;
    var deep = utils.flag(this, 'deep');
    var contains = utils.flag(this, 'contains');
    
    if (contains) {
      assertion = new Assertion(obj.locals);
      // Default behavior to `any` rather than `all`, which mimics the behavior
      // of `include()` rather than `equal()` when `have` assertion chains are
      // expressed.
      utils.flag(assertion, 'any', true);
      utils.transferFlags(this, assertion, false);
      // If the `contains` flag is set, the value of the `all` flag seems to be
      // ignored by Chai.  Therefore, it is unset explicitly so that `all` and
      // `any` flags are properly respected.
      utils.flag(assertion, 'contains', false);
      assertion.have.keys(locals);
    } else if (deep) {
      assertion = new Assertion(obj.locals);
      utils.transferFlags(this, assertion, false);
      assertion.deep.equal(locals);
    } else {
      assertion = new Assertion(obj.locals);
      utils.transferFlags(this, assertion, false);
      // Use of `include()` in the default condition, rather than `equals()`,
      // is done because testing locals set by the handler for strict equality
      // is nonsensical due to the fact that the test case will never have a
      // reference to the exact object which is owned by the handler.
      //
      // Furthermore, using `include()` in the default condition allows tests
      // which check the value of a (subset of) response local variables to be
      // written concisely in natural language:
      //
      //     expect(res).to.have.locals({ name: 'Alice' });
      //
      // If the test wants to check the value of all response local variables,
      // a deep assertion can be expressed:
      //
      //     expect(res).to.have.deep.locals({
      //       name: 'Alice',
      //       csrfToken: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql'
      //     });
      assertion.include(locals);
    }
  });
  
};
