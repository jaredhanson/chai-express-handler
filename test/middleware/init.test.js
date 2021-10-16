/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var Request = require('../../lib/request');
var Response = require('../../lib/response');


describe('middleware/init', function() {
  
  it('initializes locals', function(done) {
    chai.express.use(function(req, res, next) {
      res.end();
    })
    .request(function(req, res) {
      expect(res.locals).to.be.undefined;
    })
    .end(function() {
      expect(this).to.be.an.instanceof(Response);
      expect(this).to.have.deep.locals({});
      done();
    })
    .listen();
  }); // initializes locals
  
  it('preserves initialized locals', function(done) {
    chai.express.use(function(req, res, next) {
      res.end();
    })
    .request(function(req, res) {
      res.locals = { name: 'Alice' };
    })
    .end(function() {
      expect(this).to.be.an.instanceof(Response);
      expect(this).to.have.deep.locals({ name: 'Alice' });
      done();
    })
    .listen();
  }); // preserves initialized locals
  
});
