'use strict';

const StatusCode = require(`../util/status-code`);

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.code = StatusCode.NOT_FOUND;
  }
}

module.exports = NotFound;
