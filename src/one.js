const { getArrayOfFileContests } = require('./util');

const data = getArrayOfFileContests('./inputs/one.txt').map(el => Number(el));

// part one
let breakFirstLoop = false;
for (let i = 0; i < data.length; i++) {
  if (breakFirstLoop) break;
  if (data[i] >= 2020) continue; // skip outer loop
  for (let j = 0; j < data.length; j++) {
    if (i === j) continue; // skip inner loops

    if (data[i] + data[j] === 2020) {
      console.log(data[i], data[j], data[i] * data[j]);
      breakFirstLoop = true;
    }
  }
}

// part two
let breakSecondLoop = false;

for (let i = 0; i < data.length; i++) {
  if (breakSecondLoop) break;
  if (data[i] >= 2020) continue;
  for (let j = 0; j < data.length; j++) {
    if (i === j) continue;

    for (let k = 0; k < data.length; k++) {
      if (j === k || i === k) continue;

      if (data[i] + data[j] + data[k] === 2020) {
        console.log(data[i], data[j], data[k], data[i] * data[j] * data[k]);
        breakSecondLoop = true;
      }
    }
  }
}
