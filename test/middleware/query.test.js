/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var Request = require('../../lib/request');
var Response = require('../../lib/response');


describe('middleware/query', function() {
  
  it('initializes req.query', function(done) {
    chai.express.use(function(req, res, next) {
      expect(req.query).to.deep.equal({});
      res.end();
    })
    .request(function(req, res) {
      expect(req.query).to.be.undefined;
    })
    .finish(done)
    .listen();
  }); // initializes req.query
  
  it('initializes req.query with parameters', function(done) {
    chai.express.use(function(req, res, next) {
      expect(req.query).to.deep.equal({ a: '1', b: '2', c: '3' });
      res.end();
    })
    .request(function(req, res) {
      req.url = '/?a=1&b=2&c=3';
    })
    .finish(done)
    .listen();
  }); // initializes req.query with parameters
  
  it('preserves initialized req.query', function(done) {
    chai.express.use(function(req, res, next) {
      expect(req.query).to.deep.equal({ a: '1', b: '2', c: '3' });
      res.end();
    })
    .request(function(req, res) {
      req.query = { a: '1', b: '2', c: '3' };
    })
    .finish(done)
    .listen();
  }); // preserves initialized req.query
  
  it('preserves initialized req.query over parameters', function(done) {
    chai.express.use(function(req, res, next) {
      expect(req.query).to.deep.equal({ a: '1', b: '2', c: '3' });
      res.end();
    })
    .request(function(req, res) {
      req.url = '/?x=1&y=2&z=3';
      req.query = { a: '1', b: '2', c: '3' };
    })
    .finish(done)
    .listen();
  }); // preserves initialized req.query over parameters
  
});
