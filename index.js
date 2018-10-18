'use strict';

const {commands} = require(`./src/commands/commands`);

const args = process.argv.slice(2);

const ExitStatus = {
  error: 1,
  success: 0,
};

const HELP_COMMAND = `--help`;

if (!args.length) {
  console.log(`Привет, пользователь! \nЭта программа будет запускать сервер «keksobooking». \nАвтор: Слава Милин. \nДля генерации данных используйте ключ --generate `);
  process.exit(ExitStatus.success);
}

if (commands.hasOwnProperty(args[0])) {
  if (args.length > 1) {
    const values = args.slice(1).join(`, `);
    commands[args[0]].execute(values);
  } else {
    commands[args[0]].execute();
  }
} else {
  console.error(`Неизвестная команда ${args[0]}.`);
  commands[HELP_COMMAND].execute();
  process.exit(ExitStatus.error);
}
