const crypto = require('crypto');

module.exports.hash = function (str) {
  return crypto.createHash('sha256').update(str).digest('hex');
};