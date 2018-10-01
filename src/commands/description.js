'use strict';

const colors = require(`colors`);

const packageFile = require(`../../package.json`);

module.exports = {
  describe: `печатает описание приложения;`,
  name: `--description`,
  execute() {
    console.log(colors.gray(packageFile.description));
  }
};
