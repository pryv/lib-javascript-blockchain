const lib = require('./lib/');

module.exports.hash = function (event) {
  var e = stringifyEvent0(event);
  //console.log(e);
  return lib.hash(e);
};

module.exports.stringify = function (event) {
  return stringifyEvent0(event);
};


// -- add null properties of events

function stringifyEvent0(event) {
  // remove trashed property if false
  if (! event.trashed) { delete event.trashed; }
  // remove tags if array is empty
  if (event.tags && event.tags.length === 0) { delete event.tags; }
  return lib.stringify(event, true);
}



