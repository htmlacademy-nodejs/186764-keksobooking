'use strict';

const {MongoClient} = require(`mongodb`);

const DB_SETTINGS = {
  URL: `mongodb://localhost:27017`,
  DB_NAME: `keksobooking`

};

module.exports = MongoClient.connect(DB_SETTINGS.url).then((client) => client.db(DB_SETTINGS.DB_NAME)).catch((e) => {
  console.error(`Failed to connect Mongodb`, e);
  process.exit(1);
});
