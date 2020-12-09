const { getArrayOfFileContests } = require('./util');
const data = getArrayOfFileContests('./inputs/nine.txt').map(el => Number(el));

const PREAMBLE_LENGTH = 25;

const one = () => {
  const runningMap = {};
  const lastNumbers = []; //quueue length of preamble
  for (let i = 0; i < PREAMBLE_LENGTH; i++) {
    const num = data[i];
    runningMap[num] = true;
    lastNumbers.push(num);
  }

  // console.log(runningMap, lastNumbers);

  for (let i = PREAMBLE_LENGTH; i < data.length; i++) {
    const num = data[i]; // this is the goal
    // figure out if it works

    let isSummable = false;
    for (const lastNum of lastNumbers) {
      if (runningMap[num - lastNum] != undefined) isSummable = true;
    }

    if (!isSummable) return num;
    // clean up
    delete runningMap[data[i - PREAMBLE_LENGTH]];
    lastNumbers.shift();

    // add after calculations
    runningMap[num] = true;
    lastNumbers.push(num);
  }
};

console.log('one', one());

const two = () => {
  const oneAnswer = one();

  for (let i = 0; i < data.length; i++) {
    const iNum = data[i];
    let runningSum = iNum;
    let min = iNum;
    let max = iNum;
    for (let j = i + 1; j < data.length; j++) {
      const jNum = data[j];
      runningSum += jNum;

      if (min > jNum) min = jNum;
      if (max < jNum) max = jNum;
      if (runningSum > oneAnswer) break;
      if (runningSum === oneAnswer) return min + max;
    }
  }
};

console.log('two', two());
