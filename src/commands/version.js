'use strict';

const colors = require('colors');

const packageFile = require(`../../package.json`);

module.exports = {
  describe: `печатает версию приложения;`,
  name: `--version`,
  execute() {
    const version = packageFile.version.split(`.`);
    const MAJOR = colors.red(version[0]);
    const MINOR = colors.green(version[1]);
    const PATCH = colors.blue(version[2]);
    console.log(`${MAJOR}.${MINOR}.${PATCH}`);
  }
};
