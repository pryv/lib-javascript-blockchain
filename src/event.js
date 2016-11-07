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
    res += safeStr(key) + ':' + items[key](event[key]);
  });
  return res += '}';
}

function escapeStr(item) {
  if (! item) { return 'null'; }
  return '"' + item.replace(/"/g, '\"') + '"';
}
function safeStr(item) {
  if (! item) { return 'null'; }
  return '"' + item + '"';
}
function numStr(item) {
  if (! item) { return 'null'; }
  return item;
}



function objectStr(item) {
  if (item === null) { return null; }
  if (typeof item === 'undefined') { return null; }
  if (typeof item === 'number') { return '' + item; }
  if (typeof item === 'boolean') { return item ? 'true' : 'false'; }
  if (typeof item === 'string') { return escapeStr(item); }
  if (Array.isArray(item)) { // take it in order
    var resA = '[';
    item.forEach(function (arrayItem) {
      if (resA !== '[') { resA += ','; }
      resA += objectStr(arrayItem);
    });
    return resA + ']';
  }

  var res = '{';
  var itemOrderedKeys = Object.keys(item).sort(utf16StrCompare);
  itemOrderedKeys.forEach(function (key) {
    if (res !== '{') { res += ','; }
    res += safeStr(key) + ':' + objectStr(item[key]);
  });
  return res += '}';
}


function trashedStr(item) {
  return item ? 'true' : 'false';
}



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
  'created': function (item) { return numStr(item); },
  'createdBy': function (item) { return escapeStr(item); },
  'id': function (item) { return safeStr(item); },
  'modified': function (item) { return item; },
  'modifiedBy': function (item) { return safeStr(item); },
  'streamId': function (item) { return safeStr(item); },
  'time': function (item) { return numStr(item); },
  'type': function (item) { return safeStr(item); },
  'attachments': function (item) { return objectStr(item); },
  'clientData': function (item) { return objectStr(item); },
  'content': function (item) { return escapeStr(item); },
  'description': function (item) { return escapeStr(item); },
  'duration': function (item) { return numStr(item); },
  'references': function (item) { return objectStr(item); },
  'tags': function (item) { return objectStr(item); },
  'trashed': function (item) { return trashedStr(item); }
};

var itemsKey = Object.keys(items).sort(utf16StrCompare);



