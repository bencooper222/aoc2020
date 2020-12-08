const { getArrayOfFileContests } = require('./util');
const data = getArrayOfFileContests('./inputs/eight.txt').map(el => el.split(' '));

const runIt = (flipIndex = -1) => {
  const instrMap = {};
  let acc = 0;
  for (let i = 0; i < data.length; i += 0) {
    if (instrMap[i] != undefined) {
      return [false, acc];
    }
    instrMap[i] = true;

    let [instruction, numStr] = data[i];

    if (i === flipIndex) {
      if (instruction === 'nop') instruction = 'jmp';
      if (instruction === 'jmp') instruction = 'nop';
    }

    const num = Number(numStr);
    switch (instruction) {
      case 'nop':
        i++;
        break;
      case 'acc':
        acc += num;
        i++;
        break;
      case 'jmp':
        i += num;
        break;
    }
  }

  return [true, acc];
};

const one = () => runIt();

const two = () => {
  for (let i = 0; i < data.length; i++) {
    const [res, acc] = runIt(i);
    if (res) return acc;
  }
};

console.log('one', one());
console.log('two', two());
