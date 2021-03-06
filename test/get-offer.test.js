'use strict';

const request = require(`supertest`);
const assert = require(`assert`);
const express = require(`express`);
const AnnouncerSettings = require(`../src/generator/announcer-settings`);

const app = express();
const offersStoreMock = require(`./mock/offers-store-mock`);
const offersRoute = require(`../src/offers/route`)(offersStoreMock);

app.use(`/api/offers`, offersRoute);

describe(`GET api/offers`, () => {
  it(`should get all offers`, async () => {
    const responce = await request(app).
      get(`/api/offers`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const offers = responce.body;
    assert.equal(offers.length, AnnouncerSettings.OFFERS_COUNT);
  });

  it(`should process limit parameters`, async () => {
    const responce = await request(app).
    get(`/api/offers?limit=6`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offers = responce.body;
    assert.equal(offers.length, 6);
  });

  it(`should process skip parameters`, async () => {
    const responce = await request(app).
    get(`/api/offers?skip=4`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offers = responce.body;
    assert.equal(offers.length, AnnouncerSettings.OFFERS_COUNT - 4);
  });

  it(`should return empty array if < 1 limit`, async () => {
    const responce = await request(app).
    get(`/api/offers?limit=0`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offers = responce.body;
    assert.equal(offers.length, 0);
  });

  it(`should return empty array to much skip`, async () => {
    const responce = await request(app).
    get(`/api/offers?skip=${AnnouncerSettings.OFFERS_COUNT + 1}`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offers = responce.body;
    assert.equal(offers.length, 0);
  });

  it(`should process skip and limit parameters`, async () => {
    const responce = await request(app).
    get(`/api/offers?skip=4&limit=10`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offers = responce.body;
    assert.equal(offers.length, 10);
  });

  it(`should process big limit parameter`, async () => {
    const responce = await request(app).
    get(`/api/offers?limit=${AnnouncerSettings.OFFERS_COUNT + 1}`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offers = responce.body;
    assert.equal(offers.length, 20);
  });

  it(`query should be number`, async () => {
    return await request(app).
    get(`/api/offers?limit=hello`).
    set(`Accept`, `application/json`).
    expect(400).
    expect(`Неверное значение skip или limit`).
    expect(`Content-Type`, /html/);
  });

  it(`query should be number`, async () => {
    return await request(app).
    get(`/api/offers?skip=hello`).
    set(`Accept`, `application/json`).
    expect(400).
    expect(`Неверное значение skip или limit`).
    expect(`Content-Type`, /html/);
  });
});

describe(`GET /api/:date`, () => {
  const mockDate = AnnouncerSettings.FIRST_DATE;

  it(`should check date`, async () => {
    const response = await request(app).
    get(`/api/offers/${mockDate}`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const offers = response.body;
    assert.equal(offers.length > 0, true);
  });

  it(`should throw error if date is invalid`, async () => {
    return await request(app).
    get(`/api/offers/hello`).
    set(`Accept`, `application/json`).
    expect(400).
    expect(`Не корректный параметр "hello". Данные должны быть в числовом формате.`).
    expect(`Content-Type`, /html/);
  });

  it(`should throw 404 error if result not found`, async () => {
    return await request(app).
    get(`/api/offers/1231`).
    set(`Accept`, `application/json`).
    expect(404).
    expect(`Отель с такой датой не найден`).
    expect(`Content-Type`, /html/);
  });
});
