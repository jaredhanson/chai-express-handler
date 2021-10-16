/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');


describe('Response', function() {
  
  describe('#writeHead', function() {
  
    it('should set status code and headers', function(done) {
      chai.express.use(function(req, res, next) {
        var rv = res.writeHead(404, {
          'Content-Length': 42,
          'Content-Type': 'text/plain'
        });
        expect(rv).to.equal(res);
        expect(res.statusCode).to.equal(404);
        expect(res.getHeader('Content-Length')).to.equal(42);
        expect(res.getHeader('Content-Type')).to.equal('text/plain');
        res.end();
      })
      .finish(done)
      .listen();
    }); // should set status code and headers
  
  }); // #writeHead
  
  describe('#setHeader', function() {
  
    it('should set header', function(done) {
      chai.express.use(function(req, res, next) {
        var rv = res.setHeader('Content-Type', 'text/html');
        expect(rv).to.equal(res);
        expect(res.getHeader('Content-Type')).to.equal('text/html');
        res.end();
      })
      .finish(done)
      .listen();
    }); // should set header
  
  }); // #setHeader
  
  describe('#status', function() {
  
    it('should set status code', function(done) {
      chai.express.use(function(req, res, next) {
        var rv = res.status(404);
        expect(rv).to.equal(res);
        expect(res.statusCode).to.equal(404);
        res.end();
      })
      .finish(done)
      .listen();
    }); // should set status
  
  }); // #status
  
  describe('#location', function() {
  
    it('should set location header', function(done) {
      chai.express.use(function(req, res, next) {
        var rv = res.location('http://example.com');
        expect(rv).to.equal(res);
        expect(res.getHeader('Location')).to.equal('http://example.com');
        res.end();
      })
      .finish(done)
      .listen();
    }); // should set status
  
  }); // #status
  
}); // Response
