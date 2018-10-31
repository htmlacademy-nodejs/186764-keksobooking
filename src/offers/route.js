'use strict';

const express = require(`express`);
// eslint-disable-next-line new-cap
const offersRouter = express.Router();
const generateEntity = require(`../generator/generate-entity`);
const offersCount = require(`../generator/announcer-settings`).OFFERS_COUNT;
const BadRequest = require(`../../src/error/bad-request`);

let offers = generateEntity();

offersRouter.get(``, (req, res) => {
  if (req.query.skip && req.query.limit) {
    return res.send([...offers].splice(0, req.query.limit).splice(req.query.skip));
  }

  if (req.query.skip) {
    const skip = parseInt(req.query.skip, 10);

    if (isNaN(skip)) {
      throw new BadRequest(`Query should be string`);
    }

    return res.send([...offers].splice(skip));
  }

  if (req.query.limit) {
    const limit = parseInt(req.query.limit, 10);

    if (isNaN(limit)) {
      throw new BadRequest(`Query should be string`);
    }

    if (limit > offersCount) {
      throw new BadRequest(`Too much limit`);
    }

    if (limit < 1) {
      return res.send([]);
    }

    return res.send([...offers].splice(0, limit));
  }

  return res.send(offers);
});

offersRouter.get(`/:date`, (req, res) => {
  const date = req.params.date;
  const result = offers.filter((it) => it.date === +date);
  return res.send(result);
});

module.exports = offersRouter;
