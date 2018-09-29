'use strict';

const helpCommand = require(`./help`);
const versionCommand = require(`./version`);

const commands = {
  [versionCommand.name]: versionCommand,
  [helpCommand.name]: helpCommand,
};

module.exports = {
  commands,
};
