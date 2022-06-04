const fs = require("fs");
const path = require("path");

console.log("После пути к файлу введите число 1 или 2");

let file = process.argv.slice(2)[0];
let number = process.argv.slice(2)[1];

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
  `${String(num)} ${new Date().toISOString()}` + "\n",
  (err) => {
    if (err) {
      throw new Error(err);
    }
  }
);

fs.readFile(file, "utf8", (_err, data) => {
  data = data.trim().split("\n");
  console.log("Количество партий: " + data.length);
  let countRound = data.filter((el) => +el[0] === 1).length;
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
