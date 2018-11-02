'use strict';

const request = require(`supertest`);
const assert = require(`assert`);
const AnnouncerSettings = require(`../src/generator/announcer-settings`);
const {app} = require(`../src/commands/server`);

describe(`POST api/offers`, () => {
  it(`send offer as json`, async () => {
    const sent = {
      date: AnnouncerSettings.FIRST_DATE
    };

    const response = await request(app).
      post(`/api/offers`).
      send(sent).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const offer = response.body;
    assert.deepEqual(offer, sent);
  });

  it(`send offer as multipart/form-data`, async () => {
    const offerDate = AnnouncerSettings.FIRST_DATE;

    const response = await request(app).
      post(`/api/offers`).
      field(`date`, offerDate).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `multipart/form-data`).
      expect(200).
      expect(`Content-Type`, /json/);

    const date = response.body;
    assert.deepEqual(date, {date: offerDate});
  });

  it(`send offer with avatar as multipart/form-data`, async () => {
    const offerDate = AnnouncerSettings.FIRST_DATE;
    const response = await request(app).
      post(`/api/offers`).
      field(`date`, offerDate).
      attach(`avatar`, `test/img/default.png`).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `multipart/form-data`).
      expect(200).
      expect(`Content-Type`, /json/);

    const offer = response.body;
    assert.deepEqual(offer, {
      date: offerDate,
      avatar: {
        name: `default.png`
      }
    });
  });
});
