const { getArrayOfFileContests } = require('./util');

const data = getArrayOfFileContests('./inputs/three.txt').map(el => el.split(''));

const addOnPattern = (input, addon) => {
  for (let i = 0; i < input.length; i++) {
    input[i] = [...input[i], ...addon[i]];
  }
};

const calc = (xIter, yIter) => {
  const trees = data.slice();

  let treeCount = 0;
  let x = 0,
    y = 0;

  while (y < data.length) {
    if (x >= trees[0].length) addOnPattern(trees, data);
    if (trees[y][x] === '#') treeCount++;

    x += xIter;
    y += yIter;
  }

  return treeCount;
};

const one = () => {
  console.log(calc(3, 1));
};

// one();

const two = () => {
  const pairs = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  let rtn = 1;
  for (const pair of pairs) {
    console.log('Start ' + pair);
    rtn *= calc(...pair);
  }
  console.log(rtn);
};

two();
