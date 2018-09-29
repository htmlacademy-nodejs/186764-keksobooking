'use strict';

const packageFile = require(`../../package.json`);

module.exports = {
  describe: `печатает лицензию;`,
  name: `--license`,
  execute() {
    console.log(packageFile.license);
  }
};
