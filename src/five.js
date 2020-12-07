const { getArrayOfFileContests } = require('./util');
const data = getArrayOfFileContests('./inputs/five.txt');

const calculateSeatId = (row, col) => row * 8 + col;
const errCheck = arr => arr[0] === arr[1];
const narrowRange = (currRange, side) => {
  const [lower, upper] = currRange;

  const bound = lower + (upper - lower) / 2;
  if (side) {
    return [lower, bound - 1 / 2];
  } else {
    return [bound + 1 / 2, upper];
  }
};

const getListOfRowCol = input => {
  const rtn = [];
  for (const seat of data) {
    const seatArr = seat.split('');

    let rowRange = [0, 127];
    for (const letter of seatArr.slice(0, -3)) {
      rowRange = narrowRange(rowRange, letter === 'F');
    }

    if (!errCheck(rowRange)) throw new Error('Row');
    const [row] = rowRange;

    let colRange = [0, 7];
    for (const letter of seatArr.slice(-3)) {
      colRange = narrowRange(colRange, letter === 'L');
    }

    if (!errCheck(colRange)) throw new Error('Col');
    const [col] = colRange;

    rtn.push([row, col]);
  }
  return rtn;
};

const one = () => {
  const ids = getListOfRowCol(data).map(([row, col]) => calculateSeatId(row, col));

  return ids.reduce((acc, el) => (acc > el ? acc : el), 0);
};

console.log(one());

const two = () => {
  const seats = getListOfRowCol(data);

  const idSeatMapping = {};
  for (const [row, col] of seats) {
    idSeatMapping[calculateSeatId(row, col)] = [row, col];
  }

  const FIRST_ROW = seats.reduce((acc, [row]) => (acc < row ? acc : row), Number.MAX_SAFE_INTEGER);
  const LAST_ROW = seats.reduce((acc, [row]) => (acc > row ? acc : row), 0);

  const possibilitySpace = [FIRST_ROW * 8, LAST_ROW * 8 + 7];

  for (let id = possibilitySpace[0]; id <= possibilitySpace[1]; id++) {
    // check -1
    if (idSeatMapping[id - 1] == undefined) continue;
    // check +1
    if (idSeatMapping[id + 1] == undefined) continue;

    if (idSeatMapping[id] != undefined) continue;
    return id;
  }
};

console.log(two());
