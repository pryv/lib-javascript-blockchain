/*global describe, it, before*/

var bcLib = require('../../src/');
var should = require('should');


describe('Event', function () {
  var validHash = 'EVENT:0:fb14d357bfeb94ae66bb19e8a59a16f98f0409a65bc585bdf8342312d21ba62b';

  describe('Hash', function () {
    it('Compute as expected', function (done) {
      var { payload }  = bcLib.event.compute(require('../data/eventA-v1-valid.json'));
      validHash.should.equal(payload);
      done();
    });

    it('Identical hash for two differtly shapped events json', function (done) {
      var hash1 = bcLib.event.hash(require('../data/eventA-v1-valid.json'));
      var hash2 = bcLib.event.hash(require('../data/eventA-v2-valid.json'));
      hash1.should.equal(hash2);
      done();
    });
  });

  describe('Key', function () {
    it('event.key()', function (done) { 
      var key = bcLib.event.key(require('../data/eventA-v1-valid.json'));
      ('EVENT:0:ciusga35r000sgwg4o1sr1j5q:1477575221.247').should.equal(key);
      done();
    });
  });


  describe('Stringify', function () {

    it('Valid JSON', function (done) {
      var original = require('../data/eventA-v1-valid.json');
      var resultStr = bcLib.event.stringify(original);
      JSON.parse(resultStr);
      // TODO test could be completed with deep equals

      done();
    });

  });



  describe('Stringfy', function () {

    it('Valid JSON', function (done) {
      var original = require('../data/eventB-valid.json');
      var resultStr = bcLib.event.stringify(original);
      JSON.parse(resultStr);
      // TODO test could be completed with deep equals

      done();
    });
  });


  describe('Compute', function () {
    it('Valid Object', function (done) {
      var original = require('../data/eventA-v1-valid.json');
      var result = bcLib.event.compute(original);
      should.exist(result.key);
      ('EVENT:0:ciusga35r000sgwg4o1sr1j5q:1477575221.247').should.equal(result.key);
      should.exist(result.payload);
      result.payload.should.equal(validHash);


      done();
    });
  });

});

