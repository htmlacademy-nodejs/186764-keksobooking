'use strict';

const express = require(`express`);
const offersRouter = new express.Router();
const offersCount = require(`../generator/announcer-settings`).OFFERS_COUNT;
const BadRequest = require(`../../src/error/bad-request`);
const NotFound = require(`../../src/error/not-found`);
const multer = require(`multer`);
const toStream = require(`buffer-to-stream`);

const validate = require(`./validate`);
const NotValid = require(`../error/not-valid`);

const jsonParser = express.json();
const upload = multer({storage: multer.memoryStorage()});

const toPage = async (cursor, skip = 0, limit = offersCount) => {
  return await cursor.skip(skip).limit(limit).toArray();
};

const asyncMiddleware = (fn) => (req, res, next) => fn(req, res, next).catch(next);

offersRouter.get(``, asyncMiddleware(async (req, res) => {
  const skip = parseInt(req.query.skip || 0, 10);
  const limit = parseInt(req.query.limit || offersCount, 10);

  if (isNaN(skip) || isNaN(limit)) {
    throw new BadRequest(`Неверное значение skip или limit`);
  }

  return res.send(await toPage(await offersRouter.offerStore.getAllOffers(), skip, limit));
}));

offersRouter.get(`/:date`, asyncMiddleware(async (req, res) => {
  const date = parseInt(req.params.date, 10);

  if (isNaN(date)) {
    throw new BadRequest(`Не корректный параметр "${req.params.date}". Данные должны быть в числовом формате.`);
  }

  const result = await offersRouter.offerStore.getOffer(date);

  if (!result) {
    throw new NotFound(`Отель с такой датой не найден`);
  }

  return res.send(result);
}));

offersRouter.post(``, jsonParser, upload.single(`avatar`), asyncMiddleware(async (req, res) => {
  const body = req.body;
  const avatar = req.file;

  if (avatar) {
    body.avatar = {
      name: avatar.originalname
    };
  }

  const validated = validate(body);

  const result = await offersRouter.offerStore.save(validated);
  const insertId = result.insertId;

  if (avatar) {
    await offersRouter.imageStore.save(insertId, toStream(avatar.buffer));
  }
  res.send(validate(validated));
}));

offersRouter.use((err, req, res, _next) => {
  if (err instanceof NotValid) {
    return res.status(err.code).json(err.errors);
  }
  return _next(err);
});

offersRouter.use((err, req, res, _next) => {
  if (err) {
    // console.error(err);
    res.status(err.code || 500).send(err.message);
  }
});


module.exports = (offerStore, imagesStore) => {
  offersRouter.offerStore = offerStore;
  offersRouter.imageStore = imagesStore;
  return offersRouter;
};
