'use strict';

const colors = require('colors');

const packageFile = require(`../../package.json`);

module.exports = {
  describe: `печатает лицензию;`,
  name: `--license`,
  execute() {
    console.log(colors.green(packageFile.license));
  }
};
