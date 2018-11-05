'use strict';

const request = require(`supertest`);
const assert = require(`assert`);
const express = require(`express`);

const offersStoreMock = require(`./mock/offers-store-mock`);
const imagesStoreMock = require(`./mock/images-store-mock`);
const offersRoute = require(`../src/offers/route`)(offersStoreMock, imagesStoreMock);

const app = express();

app.use(`/api/offers`, offersRoute);

describe(`POST api/offers`, () => {
  const validData = {
    name: `Pavel`,
    title: `Маленькая квартирка рядом с парком`,
    address: `570, 472`,
    description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
    price: 30000,
    type: `flat`,
    rooms: 1,
    guests: 1,
    checkin: `9:00`,
    checkout: `7:00`,
    features: [`elevator`, `conditioner`]
  };

  const invalidData = {
    title: `Маленькая квартирка`,
    type: `flats`,
    price: 0,
    address: `dom`,
    checkin: `nine'o'clock`,
    checkout: `seven'o'clock`,
    rooms: 1001,
    features: [`elevator`, `feature`],
    name: 123,
    description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
    guests: 1
  };

  const invalidAnswers = [
    `Длинна заголовка должна быть от 30 до 140 символов`,
    `Неизвестный тип flats`,
    `Цена должна быть в диапозоне от 1 до 100 000`,
    `Адрес должен быть в формате координат: x, y`,
    `Дата въезда должна быть в формате HH:mm`,
    `Дата выезда должна быть в формате HH:mm`,
    `Количество комнат должно быть от 1 до 1000`,
    `Неизвестная особенность 'feature'`,
    `Имя должно быть в текстовом формате`
  ];

  const withoutRequireData = {
    name: `Pavel`,
    description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
    guests: 1,
    features: [`elevator`, `conditioner`]
  };

  const withoutRequireAnswers = [
    `title - обязательный пункт для заполнения`,
    `type - обязательный пункт для заполнения`,
    `price - обязательный пункт для заполнения`,
    `address - обязательный пункт для заполнения`,
    `checkin - обязательный пункт для заполнения`,
    `checkout - обязательный пункт для заполнения`,
    `rooms - обязательный пункт для заполнения`,
  ];

  it(`send offer as json`, async () => {
    const response = await request(app).
      post(`/api/offers`).
      send(validData).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const offer = response.body;
    const testData = Object.assign({}, validData);
    testData.date = offer.date;
    assert.deepEqual(offer, testData);
  });

  it(`send offer as multipart/form-data`, async () => {
    const response = await request(app).
      post(`/api/offers`).
      field(`title`, validData.title).
      field(`name`, validData.name).
      field(`address`, validData.address).
      field(`description`, validData.description).
      field(`price`, validData.price).
      field(`type`, validData.type).
      field(`rooms`, validData.rooms).
      field(`guests`, validData.guests).
      field(`checkin`, validData.checkin).
      field(`checkout`, validData.checkout).
      field(`features`, validData.features).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `multipart/form-data`).
      expect(200).
      expect(`Content-Type`, /json/);

    const offer = response.body;
    const testData = Object.assign({}, validData);
    testData.date = offer.date;
    assert.deepEqual(offer, testData);
  });

  it(`send offer with avatar as multipart/form-data`, async () => {
    const response = await request(app).
      post(`/api/offers`).
      field(`title`, validData.title).
      field(`name`, validData.name).
      field(`address`, validData.address).
      field(`description`, validData.description).
      field(`price`, validData.price).
      field(`type`, validData.type).
      field(`rooms`, validData.rooms).
      field(`guests`, validData.guests).
      field(`checkin`, validData.checkin).
      field(`checkout`, validData.checkout).
      field(`features`, validData.features).
      attach(`avatar`, `test/img/default.png`).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `multipart/form-data`).
      expect(200).
      expect(`Content-Type`, /json/);

    const offer = response.body;
    const testData = Object.assign({}, validData, {
      avatar: {
        name: `default.png`
      }
    });
    testData.date = offer.date;
    assert.deepEqual(offer, testData);
  });

  it(`should validate json format data`, async () => {
    const response = await request(app).
      post(`/api/offers`).
      send(invalidData).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `application/json`).
      expect(400).
      expect(`Content-Type`, /json/);

    const answers = response.body;
    assert.deepEqual(answers, invalidAnswers);
  });

  it(`should validate required data`, async () => {
    const response = await request(app).
    post(`/api/offers`).
    send(withoutRequireData).
    set(`Accept`, `application/json`).
    set(`Content-Type`, `application/json`).
    expect(400).
    expect(`Content-Type`, /json/);

    const answers = response.body;
    assert.deepEqual(answers, withoutRequireAnswers);
  });
});
