const lib = require('./lib/');

module.exports.hash = function hash(event) {
  var e = stringifyEvent0(event);
  //console.log(e);
  return lib.hash(e);
};

module.exports.stringify = function (event) {
  return stringifyEvent0(event);
};

module.exports.key = function key(event) {
  return 'EVENT:0:' + event.id + ':' + event.modified;
};

module.exports.compute = function (event) {
  return {key: this.key(event), payload: this.hash(event)}
};


// -- add null properties of events

function stringifyEvent0(event) {
  // costlty but portable cloning
  const e =  JSON.parse(JSON.stringify(event))
  // remove trashed property if false
  if (! e.trashed) { delete e.trashed; }
  // remove tags if array is empty
  if (e.tags && e.tags.length === 0) { delete e.tags; }
  // remove readToken from attachements
  if (e.attachments) { 
    for (attachment of e.attachments) {
      delete  attachment.readToken;
    }
  }
  return lib.stringify(e, true);
}



