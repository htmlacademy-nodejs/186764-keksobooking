'use strict';

const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const mime = require(`mime-types`);
const {promisify} = require(`util`);
const readFile = promisify(fs.readFile);

const ServerSettings = {
  HOSTNAME: `127.0.0.1`,
  PORT: 3000,
  STATIC_PATH: `${process.cwd()}/static`,
  ENTRY_POINT: `/index.html`,
};

const StatusCodes = {
  SERVER_ERROR: 500,
  NOT_FOUND: 404,
  ACCESS_DENIED: 403,
  OK: 200,
};

const startServer = (port = ServerSettings.PORT) => {
  const server = http.createServer((req, res) => {
    const relativePath = url.parse(req.url).pathname;
    const absolutePath = relativePath === `/` ? `${ServerSettings.STATIC_PATH}${ServerSettings.ENTRY_POINT}` : `${ServerSettings.STATIC_PATH}${relativePath}`;

    (async () => {
      try {
        const file = await readFile(absolutePath);
        const mimeType = mime.lookup(absolutePath);

        res.statusCode = StatusCodes.OK;
        res.statusMessage = http.STATUS_CODES[StatusCodes.OK];
        res.setHeader(`content-type`, mimeType);
        res.end(file);
      } catch (e) {
        res.writeHead(StatusCodes.NOT_FOUND, http.STATUS_CODES[StatusCodes.NOT_FOUND]);
        res.end();
      }

    })().catch((e) => {
      res.writeHead(StatusCodes.SERVER_ERROR, e.message, {
        'content-type': `text/plain`
      });
      res.end(e.message);
    });
  });

  server.listen(port, ServerSettings.HOSTNAME, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`Server running at http://${ServerSettings.HOSTNAME}:${port}`);
  });
};


module.exports = {
  describe: `Стартует сервер на заданном порте. По умолчанию порт запуска - ${ServerSettings.PORT}`,
  name: `--server`,
  execute(port) {
    startServer(port);
  }
};
