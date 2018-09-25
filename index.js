const arguments = process.argv.slice(2);

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
      let message = [`Доступные команды:`];

      for (const it in Commands) {
        message.push(`${Commands[it].name} - ${Commands[it].describe}`);
      }
      message = message.join(`\n`);
      console.log(message);
    }
  },
};

if (!arguments.length) {
  console.log(
  `Привет пользователь! \nЭта программа будет запускать сервер «keksobooking». \nАвтор: Слава Милин.`
  );
  process.exit(0);
}

for (const it of arguments) {
  if (Commands[it]) {
    Commands[it].task();
  } else {
    console.error(`Неизвестная команда ${it}.\nЧтобы прочитать правила использования приложения, наберите "--help"`);
    process.exit(1);
  }
}

process.exit(0);
