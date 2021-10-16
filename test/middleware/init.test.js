/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var Request = require('../../lib/request');
var Response = require('../../lib/response');


describe('middleware/init', function() {
  
  it('initializes req.params', function(done) {
    chai.express.use(function(req, res, next) {
      expect(req.params).to.deep.equal({});
      res.end();
    })
    .request(function(req, res) {
      expect(req.params).to.be.undefined;
    })
    .end(function() {
      expect(this).to.be.an.instanceof(Response);
      expect(this).to.have.deep.locals({});
      done();
    })
    .listen();
  }); // initializes req.params
  
  it('preserves initialized req.params', function(done) {
    chai.express.use(function(req, res, next) {
      expect(req.params).to.deep.equal({ username: 'alice' });
      res.end();
    })
    .request(function(req, res) {
      req.params = { username: 'alice' };
    })
    .end(function() {
      expect(this).to.be.an.instanceof(Response);
      expect(this).to.have.deep.locals({});
      done();
    })
    .listen();
  }); // preserves initialized req.params
  
  it('initializes res.locals', function(done) {
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
  }); // initializes res.locals
  
  it('preserves initialized res.locals', function(done) {
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
  }); // preserves initialized res.locals
  
});
