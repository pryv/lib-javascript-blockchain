var fs = require('fs');

var config = require('./config.js');

module.exports.error = function (error, detail) {
  if (config.logger.logToFile) {
    var strLine = error ? JSON.stringify(error) : '';
    return logToFile(strLine + ' ---- ' + detail);
  }
  console.error(error, detail);
};

var log_file;

function logToFile(str) {
  if (! log_file) {
    log_file = fs.createWriteStream(config.logger.logToFile, {flags : 'w'});
  }
  log_file.write(str + '\n');
}