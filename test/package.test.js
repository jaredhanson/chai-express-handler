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
        
        // TODO: test if view isn't defined
        
      }); // render method
      
      it('locals method', function() {
        var res = new Response();
        res.locals = { greeting: 'Hello', name: 'World' };
        expect(res).to.have.locals({ name: 'World' });
        expect(res).to.have.deep.locals({ greeting: 'Hello', name: 'World' });
        expect(res).to.include.locals({ name: 'World' });
        expect(res).to.include.deep.locals({ greeting: 'Hello', name: 'World' });
        
        expect(function () {
          expect(res).to.have.locals({ foo: 'bar' });
        }).to.throw("expected { greeting: 'Hello', name: 'World' } to have property 'foo'");
        
        expect(function () {
          expect(res).to.have.deep.locals({ greeting: 'Hello', name: 'World', foo: 'bar' });
        }).to.throw("expected { greeting: 'Hello', name: 'World' } to deeply equal { Object (greeting, name, ...) }");
        
        expect(function () {
          expect(res).to.not.have.locals({ greeting: 'Hello' });
        }).to.throw("expected { greeting: 'Hello', name: 'World' } to not have property 'greeting' of 'Hello'");
        
        expect(function () {
          expect(res).to.not.have.deep.locals({ greeting: 'Hello', name: 'World' });
        }).to.throw("expected { greeting: 'Hello', name: 'World' } to not deeply equal { greeting: 'Hello', name: 'World' }");
        
        expect(function () {
          expect(res).to.include.locals({ foo: 'bar' });
        }).to.throw("expected { greeting: 'Hello', name: 'World' } to have property 'foo'");
        
        expect(function () {
          expect(res).to.include.deep.locals({ greeting: 'Hello', name: 'World', foo: 'bar' });
        }).to.throw("expected { greeting: 'Hello', name: 'World' } to deeply equal { Object (greeting, name, ...) }");
        
        expect(function () {
          expect(res).to.not.include.locals({ greeting: 'Hello' });
        }).to.throw("expected { greeting: 'Hello', name: 'World' } to not have property 'greeting' of 'Hello'");
        
        expect(function () {
          expect(res).to.not.include.deep.locals({ greeting: 'Hello', name: 'World' });
        }).to.throw("expected { greeting: 'Hello', name: 'World' } to not deeply equal { greeting: 'Hello', name: 'World' }");
        
        expect(function () {
          expect({}).to.have.locals({ foo: 'bar' });
        }).to.throw('expected {} to be an instance of Response');
        
        expect(function () {
          expect(new Response()).to.have.locals({ foo: 'bar' });
        }).to.throw("expected { Object (_events, _eventsCount, ...) } to have property 'locals'");
      }); // locals method
      
    }); // chai.Assertion
    
  }); // when used
  
});
