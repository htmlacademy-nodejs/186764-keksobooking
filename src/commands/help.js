'use strict';
const versionCommand = require(`./version`);

const helpCommand = {
  describe: `Показывает список доступных комманд;`,
  name: `--help`,
};

const commands = [
  versionCommand,
  helpCommand
];

module.exports = {
  ...helpCommand,
  execute() {
    console.log(`Доступные команды:\n${commands.map((it) => `${it.name} - ${it.describe}`).join(`\n`)}`);
  }
};
