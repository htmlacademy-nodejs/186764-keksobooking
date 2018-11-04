'use strict';

module.exports = class NotValid extends Error {
  constructor(errors) {
    super(`Data validation errors`);
    this.errors = errors;
    this.code = 400;
  }
};
