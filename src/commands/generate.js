'use strict';

const readline = require(`readline`);
const generateEntity = require(`../generator/generate-entity`);
const fs = require(`fs`);
const PROCESS_CODES = require(`../util/process-codes`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const getNumber = () => {
  return new Promise((resolve, reject) => {
    rl.question(`Сколько нужно сгенерировать объектов? `, (number) => {
      number = parseInt(number, 10);
      if (isNaN(number)) {
        return reject(`Введённое значение не является числом`);
      }
      const objects = generateEntity(number);
      console.log(`Сгенерирован массив с ${number} объектами`);
      return resolve(objects);
    });
  });
};

const getPath = (objects) => {
  return new Promise((resolve, reject) => {
    rl.question(`Как назвать файл? (по умолчанию announcer.json) `, (filePath) => {
      if (!filePath) {
        filePath = `announcer.json`;
      }
      filePath = `${process.cwd()}/${filePath}`;

      return fs.open(filePath, `wx`, (err) => {
        if (err) {
          if (err.code === `EEXIST`) {
            return resolve({
              objects,
              filePath,
              isRepeat: `true`
            });
          }
          return reject(err);
        }
        return resolve({objects, filePath});
      });
    });
  });
};

const saveQuestion = (data) => {
  const ANSWERS = {
    yes: `да`
  };

  return new Promise((resolve, reject) => {

    const saveFile = (filePath, objects) => {
      return fs.writeFile(filePath, JSON.stringify(objects), (error) => {
        if (error) {
          return reject(error);
        }
        console.log(`Файл успешно создан по адресу: ${filePath}`);
        return resolve();
      });
    };

    if (!data.isRepeat) {
      return saveFile(data.filePath, data.objects);
    }

    return rl.question(`Файл уже существует. Перезаписать его? да/нет `, (answer) => {
      if (answer.toLowerCase() !== ANSWERS.yes) {
        return reject(`Файл не был записан`);
      }
      return saveFile(data.filePath, data.objects);
    });
  });
};

module.exports = {
  describe: `Генерирует указанное количество объявлений в нужный файл;`,
  name: `--generate`,
  execute() {
    getNumber().then((objects) => {
      return getPath(objects);
    }).then((result) => {
      return saveQuestion(result);
    }).then(() => {
      return rl.close();
    }).catch((error) => {
      console.error(error);
      process.exit(PROCESS_CODES.ERROR_EXIT);
    });
  }
};
