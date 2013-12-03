/* global describe, it, expect */

var express = require('..');

describe('chai-express-handler', function() {
  
  it('should export function', function() {
    expect(express).to.be.a('function');
  });
  
});
