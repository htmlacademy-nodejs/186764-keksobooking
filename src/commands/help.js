'use strict';

const colors = require('colors');

const helpCommand = {
  describe: `Показывает список доступных комманд;`,
  name: `--help`,
};

module.exports = {
  describe: helpCommand.describe,
  name: helpCommand.name,
  execute() {
    const {commands} = require(`./commands`);
    console.log(`Доступные команды:\n${Object.values(commands).map((it) => `${colors.grey(it.name)} - ${colors.green(it.describe)}`).join(`\n`)}`);
  }
};
