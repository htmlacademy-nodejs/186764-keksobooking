'use strict';

const assert = require(`assert`);
const generateEntity = require(`../src/generator/generate-entity`);
const AnnouncerSettings = require(`../src/generator/announcer-settings`);

describe(`Generate object of announcement`, () => {
  it(`should generate array of objects`, () => {
    const testData = generateEntity(1);
    assert.equal(Array.isArray(testData), true);
  });

  it(`should generate basic length objects`, () => {
    const testData = generateEntity();
    assert.equal(testData.length, AnnouncerSettings.OFFERS_COUNT);
  });

  it(`should return empty array if incoming number is negative`, () => {
    const testData = generateEntity(-1);
    assert.equal(testData.length, 0);
  });
});
describe(`Check author`, () => {
  it(`should have avatar key`, () => {
    const testData = generateEntity(1)[0];
    assert.equal(testData.author !== `undefined`, true);
  });
  it(`should be correct format of avatar`, () => {
    const testData = generateEntity(1)[0];
    assert.equal(typeof testData.author.avatar, `string`);
  });
});

describe(`Check offer`, () => {
  it(`should have offer key`, () => {
    const testData = generateEntity(1)[0];
    assert.equal(testData.offer !== undefined, true);
  });
  it(`should have correct format of title`, () => {
    const testData = generateEntity(100);
    testData.forEach((it) => {
      assert.equal(AnnouncerSettings.titles.includes(it.offer.title), true);
    });
  });
  it(`should have correct format of address`, () => {
    const testData = generateEntity(1)[0];
    assert.equal(typeof testData.offer.address, `string`);
  });
  it(`should have correct format of locations `, () => {
    const testData = generateEntity(1)[0];
    assert.equal(typeof testData.offer.price, `number`);
  });
  it(`price should be in correct range`, () => {
    const testData = generateEntity(300);
    testData.forEach((it) => {
      assert.equal(it.offer.price >= AnnouncerSettings.MIN_PRICE && it.offer.price <= AnnouncerSettings.MAX_PRICE, true);
    });
  });
  it(`should have correct format of type`, () => {
    const testData = generateEntity(100);
    testData.forEach((it) => {
      assert.equal(AnnouncerSettings.types.includes(it.offer.type), true);
    });
  });
  it(`should generate correct count of rooms `, () => {
    const testData = generateEntity(50);
    testData.forEach((it) => {
      assert.equal(it.offer.rooms >= AnnouncerSettings.MIN_ROOMS && it.offer.rooms <= AnnouncerSettings.MAX_ROOMS, true);
    });
  });
  it(`should generate correct count of guests `, () => {
    const testData = generateEntity(50);
    testData.forEach((it) => {
      assert.equal(it.offer.guests >= AnnouncerSettings.MIN_GUESTS && it.offer.guests <= AnnouncerSettings.MAX_GUESTS, true);
    });
  });
  it(`should have correct format of checkin and checkout`, () => {
    const testData = generateEntity(100);
    testData.forEach((it) => {
      assert.equal(AnnouncerSettings.checkins.includes(it.offer.checkin), true);
      assert.equal(AnnouncerSettings.checkouts.includes(it.offer.checkout), true);
    });
  });
  it(`should have correct format of features`, () => {
    const testData = generateEntity(50);
    testData.forEach((it) => {
      for (let i = 0; i < it.offer.features.length; i++) {
        assert.equal(AnnouncerSettings.features.includes(it.offer.features[i]), true);
      }
    });
  });
  it(`description should be empty`, () => {
    const testData = generateEntity(1)[0];
    assert.equal(testData.offer.description.length === 0, true);
  });
  it(`photos shouldn't be empty`, () => {
    const testData = generateEntity(1)[0];
    assert.equal(testData.offer.photos.length > 0, true);
  });
});

describe(`Check location`, () => {
  it(`should have location key`, () => {
    const testData = generateEntity(1)[0];
    assert.equal(!!testData.location, true);
  });
  it(`should have correct format of locations `, () => {
    const testData = generateEntity(1)[0];
    assert.equal(typeof testData.location.x, `number`);
    assert.equal(typeof testData.location.y, `number`);
  });
  it(`pin should be in correct range `, () => {
    const testData = generateEntity(300);
    testData.forEach((it) => {
      assert.equal(it.location.x >= AnnouncerSettings.MIN_X && it.location.x <= AnnouncerSettings.MAX_X, true);
      assert.equal(it.location.y >= AnnouncerSettings.MIN_Y && it.location.y <= AnnouncerSettings.MAX_Y, true);
    });
  });
});

describe(`Check date`, () => {
  it(`should be number`, () => {
    const testData = generateEntity(1)[0];
    assert.equal(typeof testData.date, `number`);
  });
});

