'use strict';

const AnnouncerSettings = require(`./announcer-settings`);

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

const getDate = (dayShift = 0) => {
  const MILLISECONDS_IN_DAY = 3600 * 24 * 1000;
  const timeShift = MILLISECONDS_IN_DAY * dayShift;
  const maxValue = new Date();
  const minValue = maxValue - timeShift;

  return getRandomValue(maxValue, minValue);
};

const generateEntity = () => {
  const pinValues = {
    x: getRandomValue(AnnouncerSettings.MAX_X, AnnouncerSettings.MIN_X),
    y: getRandomValue(AnnouncerSettings.MAX_Y, AnnouncerSettings.MIN_Y),
  };

  return {
    author: {
      avatar: `${AnnouncerSettings.AVATAR_URL}${generateRandomString()}`
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
      photos: randomShuffle(AnnouncerSettings.photos),
    },
    location: {
      x: pinValues.x,
      y: pinValues.y,
    },
    date: getDate(AnnouncerSettings.DAY_SHIFT),
  };
};

module.exports = {
  generateEntity,
};
