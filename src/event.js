/**
 * @license
 * Copyright (C) 2020-2021 Pryv S.A. https://pryv.com 
 * This file is part of Open-Pryv.io and released under BSD-Clause-3 License
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lib = require('./lib/');

module.exports.hash = function hash(event, algorithm) {
  var e = stringifyEvent0(event);
  return 'EVENT:0:' + lib.hash(e, algorithm);
};

module.exports.stringify = function (event) {
  return stringifyEvent0(event);
};

module.exports.key = function key(event) {
  if (event.modified == null) {
    var deletedTime = cleanDeleted(event.deleted)
    return 'EVENT:0:' + event.id + ':' + deletedTime;
  }
  return 'EVENT:0:' + event.id + ':' + event.modified;
};

module.exports.compute = function (event) {
  return { key: this.key(event), integrity: this.hash(event) }
};

// -- Internal to Pryv.io 
function cleanDeleted(deleted) {
  return (deleted instanceof Date) ? deleted.getTime() / 1000 : deleted;
}

// -- add null properties of events

function stringifyEvent0(event) {
  // costlty but portable cloning
  var e = JSON.parse(JSON.stringify(event));
  // remove integrity for computation :) 
  delete e.integrity;
  // remove eventual "headId" (Internal state of Pryv.io for history tracking)
  delete e.headId;

  // remove eventual "endTime" (Internal state of Pryv.io - duration in API)
  if (e.endTime === null) {
    e.duration = null;
  } else if (e.endTime !== undefined) { // not undefinied, not null
    e.duration = e.endTime - e.time;
  }
  delete e.endTime;

  // force duration property undefined if 0
  if (e.duration === 0) { delete e.duration; }

  // remove trashed property if false
  if (!e.trashed) { delete e.trashed; }
  // remove tags if array is empty
  if (e.tags && e.tags.length === 0) { delete e.tags; }
  // remove readToken from attachements
  if (e.attachments) {
    for (attachment of e.attachments) {
      delete attachment.readToken;
    }
  }
  // remove null deleted property
  if (e.deleted == null) {
    delete e.deleted;
  } else {
    e.deleted = cleanDeleted(event.deleted)
  }
  // make signature on streamIds not streamId
  if (e.streamId != null) {
    if (e.streamIds != null) { // e.streamIds[0] should be equal to e.streamId
      if (e.streamId != e.streamIds[0]) throw (new Error('streamId should equal to first streamIds[] item'));
    } else {
      e.streamIds = [e.streamId];
    }
    delete e.streamId;
  }

  return lib.stringify(e, true);
}