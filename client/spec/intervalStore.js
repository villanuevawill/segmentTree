/* global intervalStore.js, describe, it, expect, should */
var testArray = [];
var respArray;

describe('IntervalStore()', function () {
  'use strict';
  it('exists', function () {
    expect(IntervalStore).to.be.a('function');
    for (var i = 0; i < 100; i++) {
    $.get('/input/' + i*100, function(resp) {
      testArray.push("Clicking at point " + this + ": " + JSON.stringify(resp));
    }.bind(i));
    }
$.get('/test', function(resp) {  
  respArray = resp; 
});

  });

  it('Test Array is equal to real Array', function () {

  });


  it('does something else', function () {
    expect(true).to.equal(false);
  });

  // Add more assertions here
});
