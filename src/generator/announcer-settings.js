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
  DAY_SHIFT: 7,
  AVATAR_URL: `https://robohash.org/`,
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
  photos: [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
  ],
};

module.exports = AnnouncerSettings;
