/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var Test = require('../lib/test');
var Request = require('../lib/request');
var Response = require('../lib/response');


describe('Test', function() {
  
  describe('#request', function() {
    
    it('should invoke sync callback', function(done) {
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
        expect(res.getHeader).to.be.a('function');
        expect(res.setHeader).to.be.a('function');
      })
      .finish(done)
      .listen();
    }); // should invoke sync callback
    
    it('should invoke async callback', function(done) {
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
          expect(res.getHeader).to.be.a('function');
          expect(res.setHeader).to.be.a('function');
        
          cb();
        });
      })
      .finish(done)
      .listen();
    }); // should invoke async callback
    
  }); // #request
  
  describe('#finish', function() {
  
    it('should invoke callback', function(done) {
      chai.express.use(function(req, res, next) {
        res.end();
      })
      .finish(function() {
        expect(this).to.be.an.instanceof(Response);
        done();
      })
      .listen();
    }); // should invoke callback
  
  }); // #finish
  
  describe('#next', function() {
  
    it('should invoke callback', function(done) {
      chai.express.use(function(req, res, next) {
        next();
      })
      .next(function(err, req, res) {
        expect(this).to.be.an.instanceof(Test);
        expect(err).to.be.undefined;
        expect(req).to.be.an.instanceof(Request);
        expect(res).to.be.an.instanceof(Response);
        done();
      })
      .listen();
    }); // should invoke callback
    
    it('should invoke callback with error', function(done) {
      chai.express.use(function(req, res, next) {
        next(new Error('something went wrong'));
      })
      .next(function(err, req, res) {
        expect(this).to.be.an.instanceof(Test);
        expect(err).to.be.an.instanceof(Error);
        expect(req).to.be.an.instanceof(Request);
        expect(res).to.be.an.instanceof(Response);
        done();
      })
      .listen();
    }); // should invoke callback with error
  
  }); // #finish
  
});
