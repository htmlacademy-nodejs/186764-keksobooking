'use strict';

const STATUS_CODES = require(`../util/status-codes`);

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.code = STATUS_CODES.NOT_FOUND;
  }
}

module.exports = NotFound;
