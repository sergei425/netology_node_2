const fs = require("fs");
const path = require("path");
const readlineSync = require ('readline-sync') ; 

let file = process.argv.slice(2)[0];
let number = readlineSync.question("Enter the number 1 or 2 ");

let num = Math.random() > 0.5 ? 1 : 2;

if (number == 1 || number == 2) {
  if (+number === num) {
    console.log("Вы угадали");
  } else {
    console.log("Вы не угадали");
  }
} else {
  console.log("Введите корректное значение");
}

fs.appendFile(
  file,
  `${num} ${+number === num ? 'truthy' : 'falsy'} ${new Date().toISOString()}` + "\n",
  (err) => {
    if (err) {
      throw new Error(err);
    }
  }
);

fs.readFile(file, "utf8", (_err, data) => {
  data = data.trim().split("\n");
  console.log("Количество партий: " + data.length);
  let countRound = data.filter((el) => el.split(' ')[1] === 'truthy').length;
  console.log(
    "количество выигранных / проигранных партий : " +
      countRound +
      " / " +
      (data.length - countRound)
  );
  console.log(
    "Процентное соотношение выигранных партий: " +
      Math.round((countRound / data.length) * 100)
  );
});
