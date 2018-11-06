'use strict';

const PRECESS_CODES = require(`../util/process-codes`);

const {MongoClient} = require(`mongodb`);

const DB_SETTINGS = {
  URL: `mongodb://localhost:27017`,
  DB_NAME: `keksobooking`
};

module.exports = MongoClient.connect(DB_SETTINGS.URL, {useNewUrlParser: true})
  .then((client) => client.db(DB_SETTINGS.DB_NAME))
  .catch((err) => {
    console.error(`Failed to connect Mongodb`, err);
    process.exit(PRECESS_CODES.ERROR_EXIT);
  });
