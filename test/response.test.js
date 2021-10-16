/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');


describe('Response', function() {
  
  describe('#setHeader', function() {
  
    it('should set header', function(done) {
      chai.express.use(function(req, res, next) {
        res.setHeader('Cache-Control', 'no-store');
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
        res.status(404);
        expect(res.statusCode).to.equal(404);
        res.end();
      })
      .finish(done)
      .listen();
    }); // should set status
  
  }); // #status
  
}); // Response
