'use strict';
const versionCommand = require(`./version`);
const authorCommand = require(`./author`);
const descriptionCommand = require(`./description`);
const licenseCommand = require(`./license`);

const helpCommand = {
  describe: `Показывает список доступных комманд;`,
  name: `--help`,
};

const commands = [
  versionCommand,
  helpCommand,
  authorCommand,
  descriptionCommand,
  licenseCommand,
];

module.exports = {
  describe: helpCommand.describe,
  name: helpCommand.name,
  execute() {
    console.log(`Доступные команды:\n${commands.map((it) => `${it.name} - ${it.describe}`).join(`\n`)}`);
  }
};
