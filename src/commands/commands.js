'use strict';

const helpCommand = require(`./help`);
const versionCommand = require(`./version`);
const authorCommand = require(`./author`);
const licenseCommand = require(`./license`);
const descriptionCommand = require(`./description`);
const generateCommand = require(`./generate`);

const commands = {
  [versionCommand.name]: versionCommand,
  [helpCommand.name]: helpCommand,
  [authorCommand.name]: authorCommand,
  [licenseCommand.name]: licenseCommand,
  [descriptionCommand.name]: descriptionCommand,
  [generateCommand.name]: generateCommand,
};

helpCommand.setAvailableCommands(commands);

module.exports = {
  commands,
};
