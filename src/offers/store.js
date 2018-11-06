'use strict';

const db = require(`../database/db`);


const setupCollection = async () => {
  const dBase = await db;

  const collection = dBase.collection(`offers`);

  return collection;
};

class OfferStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getAllOffers() {
    return (await this.collection).find();
  }

  async getOffer(date) {
    return (await this.collection).findOne({date});
  }

  async save(offerData) {
    return (await this.collection).insertOne(offerData);
  }
}

module.exports = new OfferStore(setupCollection().catch((err) => console.error(`Failed to set up 'offers' collection`, err)));
