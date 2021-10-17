/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');


describe('middleware/init', function() {
  
  it('initializes response prototype', function(done) {
    chai.express.use(function(req, res, next) {
      expect(res.status).to.be.a('function');
      expect(res.send).to.be.a('function');
      expect(res.json).to.be.a('function');
      expect(res.location).to.be.a('function');
      res.end();
    })
    .request(function(req, res) {
      expect(res.status).to.be.undefined;
      expect(res.send).to.be.undefined;
      expect(res.json).to.be.undefined;
      expect(res.location).to.be.undefined;
    })
    .finish(done)
    .listen();
  }); // initializes req.params
  
  it('initializes req.params', function(done) {
    chai.express.use(function(req, res, next) {
      expect(req.params).to.deep.equal({});
      res.end();
    })
    .request(function(req, res) {
      expect(req.params).to.be.undefined;
    })
    .finish(done)
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
    .finish(done)
    .listen();
  }); // preserves initialized req.params
  
  it('initializes res.locals', function(done) {
    chai.express.use(function(req, res, next) {
      res.end();
    })
    .request(function(req, res) {
      expect(res.locals).to.be.undefined;
    })
    .finish(function() {
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
    .finish(function() {
      expect(this).to.have.deep.locals({ name: 'Alice' });
      done();
    })
    .listen();
  }); // preserves initialized res.locals
  
});
