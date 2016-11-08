# Pryv Javascript tools for blockchain

Tools to interact with Pryv blockchain

### General rules to create stable representation of Pryv data

In this example we will use javascript as pseudo code examples. 

`var rep;`: represent the stable representation of a JSON object. 

- Representation is a valid JSON object. `JSON.parse(rep)` must be valid.
- JSON representation should not have any 'spaces' between seprators. 
`{"keyA":"valueA","keyB":["item0B","item1B"]}` is valid,   
while `{"keyA": "valueA", "keyB": ["item0B", "item1B"]}` is not. 
- Numbers fields are represented without `"`.  
`{"keyForNumericalValue":12.23}` is valid,  
while `{"keyForNumericalValue":"12.23"}` is not.
- Boolean fields are represented without `"`.  
`{"keyForBooleanValue":false}` is valid,  
while `{"keyForBooleanValue":"false"}` is not.
- Array are kept is their original order. If order is modified stable representation differs. 
- Object fields are ordered by their UTF16 characters codes value.
The folowing code exposes the logic implemented in javascript to be consumed by a `sort()` function. 

```javascript
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
```


## Event scheme hash: v0

### Key

### Hash

Be sure that every implementation of this hash follow the very same scheme.

**Properties expected in an event object**

```javascript
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
```
