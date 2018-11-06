'use strict';

const StatusCode = require(`./src/util/status-code`);

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.code = StatusCode.BAD_REQUEST;
  }
}

module.exports = BadRequest;
