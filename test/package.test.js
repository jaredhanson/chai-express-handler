/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var helper = require('..');
var Response = require('../lib/response');


before(function() {
  chai.use(helper);
});

describe('chai-express-handler', function() {
  
  it('should add express helper to chai', function() {
    expect(chai.express).to.be.an('object');
    expect(chai.express.use).to.be.a('function');
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
    
    it('body method', function() {
      var resText = new Response();
      resText.body = 'some text';
      expect(resText).to.have.body('some text');
      expect(resText).to.have.deep.body('some text');
      
      var resJSON = new Response();
      resJSON.body = { some: 'json' };
      expect(resJSON).to.have.body({ some: 'json' });
      expect(resJSON).to.have.deep.body({ some: 'json' });
      
      expect(function () {
        expect(resText).to.have.body('other text');
      }).to.throw("expected response to have body 'other text' but got 'some text'");
      
      expect(function () {
        expect(resText).to.not.have.body('some text');
      }).to.throw("expected response to not have body 'some text'");
      
      expect(function () {
        expect(resJSON).to.have.body({ other: 'json' });
      }).to.throw("expected { some: 'json' } to deeply equal { other: 'json' }");
      
      expect(function () {
        expect(resJSON).to.not.have.body({ some: 'json' });
      }).to.throw("expected { some: 'json' } to not deeply equal { some: 'json' }");
      
      expect(function () {
        expect({}).to.have.body('some text');
      }).to.throw("expected {} to be an instance of Response");
    }); // body method
    
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
      
      expect(function () {
        expect(new Response()).to.render('home');
      }).to.throw("expected { Object (_events, _eventsCount, ...) } to have property '_view'");
    }); // render method
    
    it('locals method', function() {
      var res = new Response();
      res.locals = Object.create(null);
      res.locals.name = 'Alice';
      res.locals.csrfToken = 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql';
      
      expect(res).to.have.locals({ name: 'Alice' });
      expect(res).to.have.deep.locals({ name: 'Alice', csrfToken: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql' });
      expect(res).to.include.locals([ 'name' ]);
      expect(res).to.include.any.locals([ 'username', 'name' ]);
      expect(res).to.include.all.locals([ 'name', 'csrfToken' ]);
      
      expect(function () {
        expect(res).to.have.locals({ username: 'alice', name: 'Alice' });
      }).to.throw("expected { Object (name, csrfToken) } to have property 'username'");
      
      expect(function () {
        expect(res).to.not.have.locals({ name: 'Alice' });
      }).to.throw("expected { Object (name, csrfToken) } to not have property 'name' of 'Alice'");
      
      expect(function () {
        expect(res).to.have.deep.locals({ username: 'alice', name: 'Alice', csrfToken: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql' });
      }).to.throw("expected { Object (name, csrfToken) } to deeply equal { Object (username, name, ...) }");
      
      expect(function () {
        expect(res).to.not.have.deep.locals({ name: 'Alice', csrfToken: 'i8XNjC4b8KVok4uw5RftR38Wgp2BFwql' });
      }).to.throw("expected { Object (name, csrfToken) } to not deeply equal { Object (name, csrfToken) }");
      
      expect(function () {
        expect(res).to.include.locals([ 'username', 'name' ]);
      }).to.throw("expected { Object (name, csrfToken) } to contain keys 'username', and 'name'");
      
      expect(function () {
        expect(res).to.not.include.locals([ 'name' ]);
      }).to.throw("expected { Object (name, csrfToken) } to not contain key 'name'");
      
      expect(function () {
        expect(res).to.include.any.locals([ 'username', 'email' ]);
      }).to.throw("expected { Object (name, csrfToken) } to have keys 'username', or 'email'");
      
      expect(function () {
        expect(res).to.not.include.any.locals([ 'username', 'name' ]);
      }).to.throw("expected { Object (name, csrfToken) } to not have keys 'username', or 'name'");
      
      expect(function () {
        expect(res).to.include.all.locals([ 'name' ]);
      }).to.throw("expected { Object (name, csrfToken) } to have key 'name'");
      
      expect(function () {
        expect(res).to.include.all.locals([ 'username', 'name', 'csrfToken' ]);
      }).to.throw("expected { Object (name, csrfToken) } to have keys 'username', 'name', and 'csrfToken'");
      
      expect(function () {
        expect(res).to.not.include.all.locals([ 'name', 'csrfToken' ]);
      }).to.throw("expected { Object (name, csrfToken) } to not have keys 'name', and 'csrfToken'");
      
      expect(function () {
        expect({}).to.have.locals({ foo: 'bar' });
      }).to.throw('expected {} to be an instance of Response');
      
      expect(function () {
        expect(new Response()).to.have.locals({ foo: 'bar' });
      }).to.throw("expected { Object (_events, _eventsCount, ...) } to have property 'locals'");
    }); // locals method
    
  }); // chai.Assertion
  
});
