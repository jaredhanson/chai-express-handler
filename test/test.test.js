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
    .end(function() {
      expect(this).to.be.an.instanceof(Response);
      done();
    })
    .listen();
  }); // #end
  
  it('#end', function(done) {
    chai.express.use(function(req, res, next) {
      res.end();
    })
    .end(function() {
      expect(this).to.be.an.instanceof(Response);
      done();
    })
    .listen();
  }); // #end
  
});
