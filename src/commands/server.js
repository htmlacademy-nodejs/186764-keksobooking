'use strict';

const express = require(`express`);
const offersRouter = require(`../offers/route`);

const ServerSettings = {
  PORT: 3000,
  STATIC_FOLDER: `static`,
};

// const StatusCodes = {
//   SERVER_ERROR: 500,
//   NOT_FOUND: 404,
//   ACCESS_DENIED: 403,
//   OK: 200,
// };

const app = express();
app.use(express.static(ServerSettings.STATIC_FOLDER));

app.use(`/api/offers`, offersRouter);

app.use((err, req, res, _next) => {
  if (err) {
    // console.error(err);
    res.status(err.code || 500).send(err.message);
  }
});

const startServer = (port) => {
  app.listen(port, () => console.log(`Сервер запущен: http://localhost:${port}`));
};


module.exports = {
  describe: `Стартует сервер на заданном порте. По умолчанию порт запуска - ${ServerSettings.PORT}`,
  name: `--server`,
  app,
  execute(port = ServerSettings.PORT) {
    startServer(port);
  },
};
