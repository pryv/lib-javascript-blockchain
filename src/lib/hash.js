/**
 * @license
 * Copyright (C) 2020-2021 Pryv S.A. https://pryv.com 
 * This file is part of Open-Pryv.io and released under BSD-Clause-3 License
 * SPDX-License-Identifier: BSD-3-Clause
 */
const crypto = require('crypto');

module.exports = function (str, algorithm = 'sha256') {
  return algorithm + '-' + crypto.createHash(algorithm).update(str).digest('base64');
};