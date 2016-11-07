var config = require('../src/utils/config.js');
config.logger.logToFile = './last-test.log';

console.log('### Running tests, all errors logged to ./last-test.log');