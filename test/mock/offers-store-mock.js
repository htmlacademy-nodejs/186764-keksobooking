'use strict';

const Cursor = require(`./cursor-mock`);
const generateEntity = require(`../../src/generator/generate-entity`);

class OffersStoreMock {
  constructor(data) {
    this.data = data;
  }

  async getAllOffers() {
    return new Cursor(this.data);
  }
}

module.exports = new OffersStoreMock(generateEntity());
