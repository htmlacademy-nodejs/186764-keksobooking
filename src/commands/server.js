'use strict';

const express = require(`express`);
const offersStore = require(`../offers/store`);
const imageStore = require(`../images/store`);
const offersRouter = require(`../offers/route`)(offersStore, imageStore);
const logger = require(`../util/logger`);

const ServerSettings = {
  PORT: 3000,
  STATIC_FOLDER: `static`,
};

const {
  SERVER_PORT = 3000,
  SERVER_HOST = `localhost`
} = process.env;

const app = express();
app.use(express.static(ServerSettings.STATIC_FOLDER));

app.use(`/api/offers`, offersRouter);

const startServer = (port, host) => {
  app.listen(port, () => logger.info(`Сервер запущен: http://${host}:${port}`));
};

module.exports = {
  describe: `Стартует сервер на заданном порте. По умолчанию порт запуска - ${SERVER_PORT}`,
  name: `--server`,
  app,
  execute(port = SERVER_PORT, host = SERVER_HOST) {
    startServer(port, host);
  },
};
