const bcLib = require('./lib.js');

module.exports.hash = function (event) {
  var e = stringifyEvent0(event);
  return bcLib.hash(e);
};

module.exports.stringify = function (event) {
  return stringifyEvent0(event);
};


// -- add null properties of events

function stringifyEvent0(event) {
  var res = '{';
  itemsKey.forEach(function (key) {
    if (res !== '{') { res += ','; }
    res += '"' + key + '":' +
      objectStr(key, event[key], items[key]);
  });
  return res += '}';
}


function objectStr(key, item, definition) {
  if (! definition) { definition = {type: 'any', nullValue: null}; }

  var type = typeof item;


  // does the definition allows null?
  if (item === null || type === 'undefined') {
    if (typeof definition.nullValue === 'undefined') {
      throw new Error('property [' + key + '] cannot be null');
    }
    return definition.nullValue;
  }


  if (Array.isArray(item)) {
    type = 'array';
  }


  // is the type the expected by the definition
  if (definition.type !== 'any' && definition.type !== type) {
    throw new Error('property [' + key + '] is not of expected type [' + definition.type + ']');
  }


  if (type === 'number') { return '' + item; }
  if (type === 'boolean') { return item ? 'true' : 'false'; }
  if (type === 'string') {
    return '"' + item.replace(/"/g, '\\"') + '"';
  }

  if (type === 'array') { // take it in order
    var resA = '[';
    var i = 0;
    item.forEach(function (arrayItem) {
      if (resA !== '[') { resA += ','; }
      resA += objectStr(key + '[' + i++ + ']', arrayItem);
    });
    return resA + ']';
  }

  var res = '{';
  var itemOrderedKeys = Object.keys(item).sort(utf16StrCompare);
  itemOrderedKeys.forEach(function (keyA) {
    if (res !== '{') { res += ','; }
    res += '"' + keyA + '":' + objectStr(key + '.' + keyA, item[keyA], null);
  });
  return res += '}';
}

/**
 * Compare two strings based on the UTF16 code value of their characters.
 * Characters are consumed one by one on each string.
 * if the shortest string equals the first characters of the longest one, the shortest is before.
 * @param a
 * @param b
 * @returns {number} -1 if a is before b, 1 if b is before a, 0 if they are equals.
 */
function utf16StrCompare(a, b) {
  var lA = a.length;
  var lB = b.length;
  // default A is shorter and equals firstsB chars: A first
  var l = lA;
  var dres = -1;
  // B is shorter and equals firstsA chars: B first
  if (lA > lB) { l = lB; dres = -1; }
  // A and B are the same size
  if (lA === lB) {dres = 0; }

  var res;
  for (var i = 0; i < l; i++) {
    res = a.charCodeAt(i) - b.charCodeAt(i);
    if (res !== 0) {
      return res;
    }
  }
  return dres;
}

// ordered alphanumerically
var items = {
  'created': {type: 'number'},
  'createdBy': {type: 'string'},
  'id': {type: 'string'},
  'modified': {type: 'number'},
  'modifiedBy': {type: 'string'},
  'streamId': {type: 'string'},
  'time': {type: 'number'},
  'type': {type: 'string'},
  'attachments': {type: 'array', nullValue: null},
  'clientData': {type: 'object', nullValue: null},
  'content': {type: 'any', nullValue: null},
  'description': {type: 'string', nullValue: null},
  'duration': {type: 'number', nullValue: null},
  'references': {type: 'array', nullValue: null},
  'tags': {type: 'array', nullValue: '[]'},
  'trashed': {type: 'boolean', nullValue: false}
};

var itemsKey = Object.keys(items).sort(utf16StrCompare);



