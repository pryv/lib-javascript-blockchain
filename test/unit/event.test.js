/*global describe, it, before*/

var bcLib = require('../../src/');


describe('Event', function () {
  var validHash = 'fb14d357bfeb94ae66bb19e8a59a16f98f0409a65bc585bdf8342312d21ba62b';

  describe('Hash', function () {
    it('Compute as expected', function (done) {
      var hash = bcLib.event.hash(require('../data/eventA-v1-valid.json'));
      hash.should.equal(validHash);
      done();
    });

    it('Identical hash for two differtly shapped events json', function (done) {
      var hash1 = bcLib.event.hash(require('../data/eventA-v1-valid.json'));
      var hash2 = bcLib.event.hash(require('../data/eventA-v2-valid.json'));
      hash1.should.equal(hash2);
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

});

