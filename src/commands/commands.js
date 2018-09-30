'use strict';

const helpCommand = require(`./help`);
const versionCommand = require(`./version`);
const authorCommand = require(`./author`);
const licenseCommand = require(`./license`);
const descriptionCommand = require(`./description`);

const commands = {
  [versionCommand.name]: versionCommand,
  [helpCommand.name]: helpCommand,
  [authorCommand.name]: authorCommand,
  [licenseCommand.name]: licenseCommand,
  [descriptionCommand.name]: descriptionCommand,
};

module.exports = {
  commands,
};
