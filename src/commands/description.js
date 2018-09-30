'use strict';

const packageFile = require(`../../package.json`);

module.exports = {
  describe: `печатает описание приложения;`,
  name: `--description`,
  execute() {
    console.log(packageFile.description);
  }
};
