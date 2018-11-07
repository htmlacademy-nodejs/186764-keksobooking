'use strict';

const generateEntity = require(`../generator/generate-entity`);
const offerStore = require(`../offers/store`);
const logger = require(`../util/logger`);
const ProcessCodes = require(`../util/process-code`);

module.exports = {
  describe: `заполняет базу данных случайными объявлениями;`,
  name: `--fill`,
  async execute() {
    await offerStore.saveMany(generateEntity()).then(() => logger.info(`Данные успешно записаны в базу`)).
    catch((err) => logger.error(err));
    process.exit(ProcessCodes.CORRECT_EXIT);
  }
};

