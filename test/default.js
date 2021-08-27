/**
 * @license
 * Copyright (C) 2020-2021 Pryv S.A. https://pryv.com 
 * This file is part of Open-Pryv.io and released under BSD-Clause-3 License
 * SPDX-License-Identifier: BSD-3-Clause
 */
var config = require('../src/utils/config.js');
config.logger.logToFile = './last-test.log';

console.log('### Running tests, all errors logged to ./last-test.log');