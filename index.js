'use strict';

const {commands} = require(`./src/commands/commands`);

const args = process.argv.slice(2);

const ExitStatus = {
  error: 1,
  success: 0,
};

if (!args.length) {
  console.log(`Привет пользователь! \nЭта программа будет запускать сервер «keksobooking». \nАвтор: Слава Милин.`);
  process.exit(ExitStatus.success);
}

for (const it of args) {
  const currentCommand = commands.find((el) => el.name === it);
  if (currentCommand) {
    currentCommand.execute();
    continue;
  }

  console.error(`Неизвестная команда ${it}.\nЧтобы прочитать правила использования приложения, наберите "--help"`);
  process.exit(ExitStatus.error);
}
