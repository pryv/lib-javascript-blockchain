/*global describe, it, before*/

var bcLib = require('../../src/');


describe('Event', function () {
  var validHash = 'd86f39ccf5451e78ecf9d5f06c62e3b5ffa9115e801ba1806ec0ce704d99943a';

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

