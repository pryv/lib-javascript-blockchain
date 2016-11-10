const crypto = require('crypto');

module.exports = function (str) {
  return crypto.createHash('sha256').update(str).digest('hex');
};