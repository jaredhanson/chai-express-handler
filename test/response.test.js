/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');


describe('Response', function() {
  
  describe('#setHeader', function() {
  
    it('should set header', function(done) {
      chai.express.use(function(req, res, next) {
        var rv = res.setHeader('Cache-Control', 'no-store');
        expect(rv).to.equal(res);
        expect(res.getHeader('Cache-Control')).to.equal('no-store');
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
  
}); // Response
