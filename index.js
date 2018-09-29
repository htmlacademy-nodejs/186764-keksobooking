'use strict';

const {commands} = require(`./src/commands/commands`);

const args = process.argv.slice(2);

const ExitStatus = {
  error: 1,
  success: 0,
};

const HELP_COMMAND = `--help`;

if (!args.length) {
  console.log(`Привет пользователь! \nЭта программа будет запускать сервер «keksobooking». \nАвтор: Слава Милин.`);
  process.exit(ExitStatus.success);
}

for (const it of args) {
  if (commands[it]) {
    commands[it].execute();
    continue;
  }

  console.error(`Неизвестная команда ${it}.`);
  commands[HELP_COMMAND].execute();
  process.exit(ExitStatus.error);
}
