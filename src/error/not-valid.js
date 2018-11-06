'use strict';

const STATUS_CODES = require(`../util/status-codes`);

module.exports = class NotValid extends Error {
  constructor(errors) {
    super(`Data validation errors`);
    this.errors = errors;
    this.code = STATUS_CODES.BAD_REQUEST;
  }
};
