'use strict';

const AnnouncerSettings = {
  MIN_X: 300,
  MAX_X: 900,
  MIN_Y: 150,
  MAX_Y: 500,
  MIN_PRICE: 1000,
  MAX_PRICE: 1000000,
  MIN_ROOMS: 1,
  MAX_ROOMS: 5,
  MIN_GUESTS: 1,
  MAX_GUESTS: 10,
  titles: [
    `Большая уютная квартира`,
    `Маленькая неуютная квартира`,
    `Огромный прекрасный дворец`,
    `Маленький ужасный дворец`,
    `Красивый гостевой домик`,
    `Некрасивый негостеприимный домик`,
    `Уютное бунгало далеко от моря`,
    `Неуютное бунгало по колено в воде`,
  ],
  types: [
    `flat`,
    `palace`,
    `house`,
    `bungalo`,
  ],
  checkins: [
    `12:00`,
    `13:00`,
    `14:00`,
  ],
  checkouts: [
    `12:00`,
    `13:00`,
    `14:00`,
  ],
  features: [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`,
  ],
};

const generateRandomString = () => {
  return Math.random().toString(36).substring(2);
};

const getRandomValue = (maxValue, minValue = 0) => {
  return Math.floor(Math.random() * (maxValue - minValue) + minValue);
};

const randomShuffle = (getArray) => {
  const array = [...getArray];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateEntity = () => {
  const pinValues = {
    x: getRandomValue(AnnouncerSettings.MAX_X, AnnouncerSettings.MIN_X),
    y: getRandomValue(AnnouncerSettings.MAX_Y, AnnouncerSettings.MIN_Y),
  };

  return {
    author: {
      avatar: `https://robohash.org/${generateRandomString()}`
    },
    offer: {
      title: AnnouncerSettings.titles[getRandomValue(AnnouncerSettings.titles.length)],
      address: `${pinValues.x}, ${pinValues.y}`,
      price: getRandomValue(AnnouncerSettings.MAX_PRICE, AnnouncerSettings.MIN_PRICE),
      type: AnnouncerSettings.types[getRandomValue(AnnouncerSettings.types.length)],
      rooms: getRandomValue(AnnouncerSettings.MAX_ROOMS, AnnouncerSettings.MIN_ROOMS),
      guests: getRandomValue(AnnouncerSettings.MAX_GUESTS, AnnouncerSettings.MIN_GUESTS),
      checkin: AnnouncerSettings.checkins[getRandomValue(AnnouncerSettings.checkins.length)],
      checkout: AnnouncerSettings.checkouts[getRandomValue(AnnouncerSettings.checkouts.length)],
      features: randomShuffle(AnnouncerSettings.features).slice(0, getRandomValue(AnnouncerSettings.features.length, 1)),
      description: ``,
      photos: ``,
    },
    location: {
      x: pinValues.x,
      y: pinValues.y,
    },
  };
};

module.exports = {
  generateEntity,
  AnnouncerSettings,
};
