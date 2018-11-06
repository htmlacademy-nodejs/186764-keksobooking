'use strict';

const ProcessCode = require(`../util/process-code`);
const logger = require(`../util/logger`);

const {MongoClient} = require(`mongodb`);

const {
  DB_HOST = `localhost:27017`,
  DB_PATH = `keksobooking`
} = process.env;

const URL = `mongodb://${DB_HOST}`;

module.exports = MongoClient.connect(URL, {useNewUrlParser: true})
  .then((client) => client.db(DB_PATH))
  .catch((err) => {
    logger.error(`Failed to connect Mongodb`, err);
    process.exit(ProcessCode.ERROR_EXIT);
  });
