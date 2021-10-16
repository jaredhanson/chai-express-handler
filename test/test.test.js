/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var Request = require('../lib/request');
var Response = require('../lib/response');


describe('Test', function() {
  
  it('#request', function(done) {
    chai.express.use(function(req, res, next) {
      res.end();
    })
    .request(function(req, res) {
      expect(req).to.be.an.instanceof(Request);
      expect(req.method).to.equal('GET');
      expect(req.url).to.equal('/');
      expect(req.headers).to.deep.equal({});
      
      expect(res).to.be.an.instanceof(Response);
      expect(res.statusCode).to.equal(200);
      expect(res.locals).to.be.undefined;
    })
    .finish(function() {
      expect(this).to.be.an.instanceof(Response);
      done();
    })
    .listen();
  }); // #request
  
  it('#request (async)', function(done) {
    chai.express.use(function(req, res, next) {
      res.end();
    })
    .request(function(req, res, cb) {
      process.nextTick(function() {
        expect(req).to.be.an.instanceof(Request);
        expect(req.method).to.equal('GET');
        expect(req.url).to.equal('/');
        expect(req.headers).to.deep.equal({});
      
        expect(res).to.be.an.instanceof(Response);
        expect(res.statusCode).to.equal(200);
        expect(res.locals).to.be.undefined;
        
        cb();
      });
    })
    .finish(function() {
      expect(this).to.be.an.instanceof(Response);
      done();
    })
    .listen();
  }); // #request (async)
  
  it('#end', function(done) {
    chai.express.use(function(req, res, next) {
      res.end();
    })
    .finish(function() {
      expect(this).to.be.an.instanceof(Response);
      done();
    })
    .listen();
  }); // #end
  
});
