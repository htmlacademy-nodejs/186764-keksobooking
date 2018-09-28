'use strict';

const args = process.argv.slice(2);

const Commands = {
  '--version': {
    describe: `печатает версию приложения;`,
    name: `--version`,
    task: () => {
      console.log(`v0.0.1`);
    }
  },
  '--help': {
    describe: `печатает этот текст;`,
    name: `--version`,
    task: () => {
      const message = Object.keys(Commands).map((it, i) => {
        let letter = `${it} - ${Commands[it].describe}`;
        if (!i) {
          letter = `Доступные команды:\n` + letter;
        }
        return letter;
      }).join(`\n`);
      console.log(message);
    }
  },
};

const ExitStatus = {
  error: () => {
    return process.exit(1);
  },
  correct: () => {
    return process.exit(0);
  }
};

if (!args.length) {
  console.log(`Привет пользователь! \nЭта программа будет запускать сервер «keksobooking». \nАвтор: Слава Милин.`);
  ExitStatus.correct();
}

for (const it of args) {
  if (Commands[it]) {
    Commands[it].task();
    continue;
  }
  console.error(`Неизвестная команда ${it}.\nЧтобы прочитать правила использования приложения, наберите "--help"`);
  ExitStatus.error();
}
