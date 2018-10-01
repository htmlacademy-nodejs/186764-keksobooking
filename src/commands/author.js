'use strict';

const packageFile = require(`../../package.json`);
const colors = require(`colors`);

module.exports = {
  describe: `печатает имя автора;`,
  name: `--author`,
  execute() {
    console.log(colors.red(packageFile.author));
  }
};
