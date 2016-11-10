/**
 * Credits to substack
 * https://github.com/substack/jsonify/blob/master/lib/stringify.js
 */

var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
  meta = {    // table of character substitutions
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"' : '\\"',
    '\\': '\\\\'
  };

function quote(string) {
  // If the string contains no control characters, no quote characters, and no
  // backslash characters, then we can safely slap some quotes around it.
  // Otherwise we must also replace the offending characters with safe escape
  // sequences.

  escapable.lastIndex = 0;
  return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
    var c = meta[a];
    return typeof c === 'string' ? c :
      '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
  }) + '"' : '"' + string + '"';
}

/**
 *
 * @param item
 * @param ignoreNullProperties
 * @returns {*}
 */
module.exports = function stringify(item, ignoreNullProperties) {
  var type = typeof item;

  // does the definition allows null?
  if (item === null || type === 'undefined') {
    return 'null';
  }


  switch (type) {
    case 'string':
      return quote(item);

    case 'number':
      // JSON numbers must be finite. Encode non-finite numbers as null.
      return isFinite(item) ? String(item) : '';

    case 'boolean':
      return item ? 'true' : 'false';

    case 'object':

      if (item.aPropertyToDetectCycles) {
        throw new Error('Stringify does not support cycles');
      }


      // Array.isArray
      if (Object.prototype.toString.apply(item) === '[object Array]') {
        item.aPropertyToDetectCycles = true;
        var resA = '[';
        item.forEach(function (arrayItem) {
          if (resA !== '[') { resA += ','; }
          resA += stringify(arrayItem, ignoreNullProperties);
        });
        delete item.aPropertyToDetectCycles;
        return resA + ']';
      }

      // isObject
      var res = '{';
      var itemOrderedKeys = Object.keys(item).sort(utf16StrCompare);
      item.aPropertyToDetectCycles = true;
      itemOrderedKeys.forEach(function (keyA) {
        var strRes = stringify(item[keyA], ignoreNullProperties);
        if (! ignoreNullProperties || strRes !== 'null') {
          if (res !== '{') { res += ','; }
          res += quote(keyA) + ':' + strRes;
        }
      });
      delete item.aPropertyToDetectCycles;
      return res += '}';

    default:
      throw new Error('Type [' + type + '] unsupported');
  }
};


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
  if (lA > lB) { l = lB; dres = 1; }
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
