/**
 * @license
 * Copyright (C) 2020-2021 Pryv S.A. https://pryv.com 
 * This file is part of Open-Pryv.io and released under BSD-Clause-3 License
 * SPDX-License-Identifier: BSD-3-Clause
 */
/*global describe, it, before*/

var lib = require('../../src/lib');
var should = require('should');

describe('Stringfy', function () {

  describe('Error on invalid types', function () {
    it('On functions', function (done) {

      var functionObject = {a: 'a', b: function () {} };

      var err = null;
      try {
        lib.stringify(functionObject);
      } catch (e) {
        err = e;
      }
      should.exist(err);
      done();
    });
  });

  describe('Errors on cycles ', function () {
    it('In objects', function (done) {

      var objectWithCycles = { a: 'a'};
      objectWithCycles.me = objectWithCycles;
      var err = null;
      try {
        lib.stringify(objectWithCycles);
      } catch (e) {
        err = e;
      }
      should.exist(err);
      done();
    });

    it('In Array', function (done) {
      var arrayWithCycles = ['a'];
      arrayWithCycles.push(arrayWithCycles);

      var err = null;
      try {
        lib.stringify(arrayWithCycles);
      } catch (e) {
        err = e;
      }
      should.exist(err);

      done();
    });
  });


});

