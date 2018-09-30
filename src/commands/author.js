'use strict';

const packageFile = require(`../../package.json`);

module.exports = {
  describe: `печатает имя автора;`,
  name: `--author`,
  execute() {
    console.log(packageFile.author);
  }
};
