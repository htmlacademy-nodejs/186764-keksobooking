'use strict';

const STATUS_CODES = require(`../util/status-codes`);

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.code = STATUS_CODES.BAD_REQUEST;
  }
}

module.exports = BadRequest;
