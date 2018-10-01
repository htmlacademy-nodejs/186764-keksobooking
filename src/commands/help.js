'use strict';

const colors = require('colors');

const helpCommand = {
  describe: `Показывает список доступных комманд;`,
  name: `--help`,
};
let availableCommands;

const setAvailableCommands = (commands) => {
  availableCommands = commands;
};

module.exports = {
  setAvailableCommands,
  describe: helpCommand.describe,
  name: helpCommand.name,
  execute() {
    console.log(`Доступные команды:\n${Object.values(availableCommands).map((it) => `${colors.grey(it.name)} - ${colors.green(it.describe)}`).join(`\n`)}`);
  }
};
