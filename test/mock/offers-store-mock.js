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

  async getOffer(date) {
    return this.data.filter((it) => it.date === date);
  }

  async save() {
    return {
      insertId: 666
    };
  }
}

module.exports = new OffersStoreMock(generateEntity());
