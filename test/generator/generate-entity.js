'use strict';

const {assert} = require(`chai`);
const {generateEntity, AnnouncerSettings} = require(`../../src/generator/generate-entity`);

describe(`Generate object of announcement`, () => {
  it(`should generate object`, () => {
    const testData = generateEntity();
    assert.isObject(testData);
  });

  describe(`Check author`, () => {
    it(`should have avatar key`, () => {
      const testData = generateEntity();
      assert.exists(testData.author);
    });
    it(`should be correct format of avatar`, () => {
      const testData = generateEntity();
      assert.isString(testData.author.avatar);
      assert.isNotEmpty(testData.author.avatar);
    });
  });

  describe(`Check offer`, () => {
    it(`should have offer key`, () => {
      const testData = generateEntity();
      assert.exists(testData.offer);
    });
    it(`should have correct format of title`, () => {
      for (let i = 0; i < 100; i++) {
        const testData = generateEntity();
        assert.include(AnnouncerSettings.titles, testData.offer.title);
      }
    });
    it(`should have correct format of address`, () => {
      const testData = generateEntity();
      assert.isString(testData.offer.address);
      assert.isNotEmpty(testData.offer.address);
    });
    it(`should have correct format of locations `, () => {
      const testData = generateEntity();
      assert.isNumber(testData.offer.price);
    });
    it(`price should be in correct range`, () => {
      for (let i = 0; i < 300; i++) {
        const testData = generateEntity();
        assert.operator(testData.offer.price, `>=`, AnnouncerSettings.MIN_PRICE);
        assert.operator(testData.offer.price, `<=`, AnnouncerSettings.MAX_PRICE);
      }
    });
    it(`should have correct format of type`, () => {
      for (let i = 0; i < 100; i++) {
        const testData = generateEntity();
        assert.include(AnnouncerSettings.types, testData.offer.type);
      }
    });
    it(`should generate correct count of rooms `, () => {
      for (let i = 0; i < 50; i++) {
        const testData = generateEntity();
        assert.operator(testData.offer.rooms, `>=`, AnnouncerSettings.MIN_ROOMS);
        assert.operator(testData.offer.rooms, `<=`, AnnouncerSettings.MAX_ROOMS);
      }
    });
    it(`should generate correct count of guests `, () => {
      for (let i = 0; i < 50; i++) {
        const testData = generateEntity();
        assert.operator(testData.offer.guests, `>=`, AnnouncerSettings.MIN_GUESTS);
        assert.operator(testData.offer.guests, `<=`, AnnouncerSettings.MAX_GUESTS);
      }
    });
    it(`should have correct format of checkin and checkout`, () => {
      for (let i = 0; i < 100; i++) {
        const testData = generateEntity();
        assert.include(AnnouncerSettings.checkins, testData.offer.checkin);
        assert.include(AnnouncerSettings.checkouts, testData.offer.checkout);
      }
    });
    it(`should have correct format of features`, () => {
      for (let i = 0; i < 50; i++) {
        const testData = generateEntity();
        assert.includeMembers(AnnouncerSettings.features, testData.offer.features);
      }
    });
    it(`description should be empty`, () => {
      const testData = generateEntity();
      assert.isEmpty(testData.offer.description);
    });
  });

  describe(`Check location`, () => {
    it(`should have location key`, () => {
      const testData = generateEntity();
      assert.exists(testData.location);
    });
    it(`should have correct format of locations `, () => {
      const testData = generateEntity();
      assert.isNumber(testData.location.x);
      assert.isNumber(testData.location.y);
    });
    it(`pin should in correct range `, () => {
      for (let i = 0; i < 300; i++) {
        const testData = generateEntity();
        assert.operator(testData.location.x, `>=`, AnnouncerSettings.MIN_X);
        assert.operator(testData.location.x, `<=`, AnnouncerSettings.MAX_X);
        assert.operator(testData.location.y, `>=`, AnnouncerSettings.MIN_Y);
        assert.operator(testData.location.y, `<=`, AnnouncerSettings.MAX_Y);
      }
    });
  });

});

