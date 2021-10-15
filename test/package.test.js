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
        res.locals = { name: 'Alice', csrfToken: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql' };
        expect(res).to.have.locals({ name: 'Alice' });
        expect(res).to.have.deep.locals({ name: 'Alice', csrfToken: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql' });
        expect(res).to.include.locals({ name: 'Alice' });
        expect(res).to.include.deep.locals({ name: 'Alice', csrfToken: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql' });
        
        expect(function () {
          expect(res).to.have.locals({ beep: 'boop' });
        }).to.throw("expected { Object (name, csrfToken) } to have property 'beep'");
        
        expect(function () {
          expect(res).to.not.have.locals({ name: 'Alice' });
        }).to.throw("expected { Object (name, csrfToken) } to not have property 'name' of 'Alice'");
        
        expect(function () {
          expect(res).to.have.deep.locals({ name: 'Alice' });
        }).to.throw("expected { Object (name, csrfToken) } to deeply equal { name: 'Alice' }");
        
        expect(function () {
          expect(res).to.not.have.deep.locals({ name: 'Alice', csrfToken: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql' });
        }).to.throw("expected { Object (name, csrfToken) } to not deeply equal { Object (name, csrfToken) }");
        
        expect(function () {
          expect(res).to.include.locals({ beep: 'boop' });
        }).to.throw("expected { Object (name, csrfToken) } to have property 'beep'");
        
        expect(function () {
          expect(res).to.not.include.locals({ name: 'Alice' });
        }).to.throw("expected { Object (name, csrfToken) } to not have property 'name' of 'Alice'");
        
        expect(function () {
          expect(res).to.include.deep.locals({ name: 'Alice' });
        }).to.throw("expected { Object (name, csrfToken) } to deeply equal { name: 'Alice' }");
        
        expect(function () {
          expect(res).to.not.include.deep.locals({ name: 'Alice', csrfToken: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql' });
        }).to.throw("expected { Object (name, csrfToken) } to not deeply equal { Object (name, csrfToken) }");
        
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
