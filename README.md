# Pryv Javascript tools to create checksums on Pryv.io data item 

It provides utility to 
1. Create a stable representation of a JSON object (all keys are ordered)
2. Makes a SHA256 string of this stable representation
3. Creates a unique key to finds back the data item

## Usage & Format

### stringify: `stableRepresentation.event.stringify(event)` 

Returns a "stable" JSON reprersentation of an event as described bellow.

### hash: `stableRepresentation.event.hash(event)` 

Returns a **hash** in **SHA256** of "stable" JSON reprersentation of an event.

### key: `stableRepresentation.event.key(event)` 

Returns a **unique key** for this event version.

### compute: `stableRepresentation.event.compute(event)` 

Returns an object equivalent of `{ key: key(event), hash: hash(event) }`

```
{
  key: 'EVENT:0:ckoxy0giw000hrs9yvi3rnlfm:1621578570.151',
  payload: 'EVENT:0:8171f041076763a068e6c373cd20ef62d5a3b564f3b0fa4cf233488549886e3d'
}
```

. `key`
  . structure: `{item code}:{item code version}:{item id}:{item version}` usually the item version is the `modified` date property
  . They key is unique it is used to find a corresponding checksum.
. `payload`
  . structure: `{item code}:{checksum version}:{checksum}`

## Item code versionning 

. `EVENT:0:` correspond to `item id = event.id` and `item version = event.modified`

## Ckecksum versionning 

. `EVENT:0:` correspond to **SHA 256** encoding of current implementation of `stableRepresentation.event.stringify(event)`

### General rules to create stable representation of Pryv data

In this example we will use javascript as pseudo code examples. 

 

- Representation is a valid JSON object. `JSON.parse(stableRep)` must be valid. (`stableRep;` is a stable representation of a JSON object as a string.)
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

Properties with a null values, will be ignored from the representation. 

Special attention is required for 

- **tags**: if `[]` (empty array) is ignored from the representation.
- **trashed**: if `false` is ignored from the representation.

**Example**

```javascript
{
  "id": "ciusga35r000sgwg4o1sr1j5q",
  "time": 1477575221.247,
  "streamId": "diary",
  "type": "picture/attached",
  "tags": [],
  "description":  "test\"te\"st",
  "attachments": [
    {
      "id": "ciusga35r000tgwg4hcz2i22u",
      "fileName": "photo.jpg",
      "type": "image/jpeg",
      "size": 2561
    },
    {
      "id": "ciusga35r000tgwg4hcz2i32u",
      "fileName": "photo.jpg",
      "type": "image/jpeg",
      "size": 2561
    }
  ],
  "created": 1477575221.247,
  "createdBy": "ciusga33w0004gwg436uhtqs2",
  "modified": 1477575221.247,
  "modifiedBy": "ciusga33w0004gwg436uhtqs2",
  "trashed": false,
  "clientData": {
    "key2": "value2",
    "key1": "value1"
  }
}
```

Stable representation:

```javascript
{"attachments":[{"fileName":"photo.jpg","id":"ciusga35r000tgwg4hcz2i22u","size":2561,"type":"image/jpeg"},{"fileName":"photo.jpg","id":"ciusga35r000tgwg4hcz2i32u","size":2561,"type":"image/jpeg"}],"clientData":{"key1":"value1","key2":"value2"},"created":1477575221.247,"createdBy":"ciusga33w0004gwg436uhtqs2","description":"test\"te\"st","id":"ciusga35r000sgwg4o1sr1j5q","modified":1477575221.247,"modifiedBy":"ciusga33w0004gwg436uhtqs2","streamId":"diary","time":1477575221.247,"type":"picture/attached"}
```





