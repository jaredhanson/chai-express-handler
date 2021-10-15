/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var helper = require('..');
var Response = require('../lib/response');


describe('chai-express-handler', function() {
  
  it('should export function', function() {
    expect(helper).to.be.a('function');
  });
  
  describe('when used', function() {
    before(function() {
      chai.use(helper);
    })
  
    it('should add express helper to chai', function() {
      expect(chai.express).to.be.an('object');
      expect(chai.express.handler).to.be.a('function');
    });
    
    describe('chai.Assertion', function() {
      
      it('status method', function() {
        var res = new Response();
        expect(res).to.have.status(200);
        
        expect(function () {
          expect(res).to.have.status(500);
        }).to.throw("expected response to have status code 500 but got 200");
        
        expect(function () {
          expect(res).to.not.have.status(200);
        }).to.throw("expected response to not have status code 200");
        
        expect(function () {
          expect({}).to.have.status(200);
        }).to.throw("expected {} to be an instance of Response");
      }); // status method
      
      it('render method', function() {
        var res = new Response();
        res._view = 'home';
        expect(res).to.render('home');
        
        expect(function () {
          expect(res).to.render('index');
        }).to.throw("expected response to render view 'index' but rendered 'home'");
        
        expect(function () {
          expect(res).to.not.render('home');
        }).to.throw("expected response to not render view 'home'");
        
        expect(function () {
          expect({}).to.render('home');
        }).to.throw('expected {} to be an instance of Response');
      }); // render method
      
    }); // chai.Assertion
    
  }); // when used
  
});
