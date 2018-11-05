'use strict';

const express = require(`express`);
const offersRouter = new express.Router();
const generateEntity = require(`../generator/generate-entity`);
const offersCount = require(`../generator/announcer-settings`).OFFERS_COUNT;
const BadRequest = require(`../../src/error/bad-request`);
const NotFound = require(`../../src/error/not-found`);
const multer = require(`multer`);
const validate = require(`./validate`);
const NotValid = require(`../error/not-valid`);
// const offerStore = require(`./store`);

const jsonParser = express.json();
const upload = multer({storage: multer.memoryStorage()});

const offers = generateEntity();

const toPage = (data, skip, limit) => {
  return [...data].splice(skip, limit);
};

const asyncMiddleware = (fn) => (req, res, next) => fn(req, res, next).catch(next);

offersRouter.get(``, asyncMiddleware(async (req, res) => {
  const skip = parseInt(req.query.skip || 0, 10);
  const limit = parseInt(req.query.limit || offersCount, 10);

  if (isNaN(skip) || isNaN(limit)) {
    throw new BadRequest(`Неверное значение skip или limit`);
  }

  return res.send(toPage(offers, skip, limit));
}));

offersRouter.get(`/:date`, (req, res) => {
  const date = parseInt(req.params.date, 10);

  if (isNaN(date)) {
    throw new BadRequest(`Не корректный параметр "${req.params.date}". Данные должны быть в числовом формате.`);
  }

  const result = offers.filter((it) => it.date === date);

  if (!result.length) {
    throw new NotFound(`Отель с такой датой не найден`);
  }

  return res.send(result);
});

offersRouter.post(``, jsonParser, upload.single(`avatar`), (req, res) => {
  const body = req.body;
  const avatar = req.file;

  if (avatar) {
    body.avatar = {
      name: avatar.originalname
    };
  }
  res.send(validate(body));
});

offersRouter.use((err, req, res, _next) => {
  if (err instanceof NotValid) {
    return res.status(err.code).json(err.errors);
  }
  return _next(err);
});


module.exports = offersRouter;
