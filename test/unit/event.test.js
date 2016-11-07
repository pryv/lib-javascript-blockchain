/*global describe, it, before*/

var bcLib = require('../../src/');


describe('Event', function () {
  var validHash = '0c8ddc65165a751d5c6bf7602bcf7680d8b9b8700a1454b1bc7f3ae8dec65a5f';

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

});

