'use strict';

const packageFile = require(`../../package.json`);

module.exports = {
  describe: `печатает версию приложения;`,
  name: `--version`,
  execute() {
    console.log(packageFile.version);
  }
};
