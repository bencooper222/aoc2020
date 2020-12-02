const { count } = require('console');
const { getArrayOfFileContests } = require('./util');

const data = getArrayOfFileContests('./inputs/two.txt').map(el => el.split(': '));

// ex of str: 1-4 j
const parsePolicy = str => {
  const [nums, letter] = str.split(' ');
  const [lower, upper] = nums.split('-').map(el => Number(el));

  return { lower, upper, letter };
};

const checkPasswordPartOne = (password, parsedPolicy) => {
  let count = 0;
  for (let i = 0; i < password.length; i++) {
    if (password[i] === parsedPolicy.letter) count++;
  }

  // if out of bounds, return false
  return !(count < parsedPolicy.lower || count > parsedPolicy.upper);
};

const partOne = () => {
  let countValid = 0;
  for (const [policy, password] of data) {
    const parsedPolicy = parsePolicy(policy);
    const valid = checkPasswordPartOne(password, parsedPolicy);

    if (valid) countValid++;
  }

  console.log(countValid);
};

const xor = (one, two) => {
  return (one || two) && one !== two;
};

const checkPasswordPartTwo = (password, parsedPolicy) => {
  const { lower, upper, letter } = parsedPolicy;
  return xor(password[lower - 1] === letter, password[upper - 1] === letter);
};

const partTwo = () => {
  let countValid = 0;
  for (const [policy, password] of data) {
    const parsedPolicy = parsePolicy(policy);
    const valid = checkPasswordPartTwo(password, parsedPolicy);

    if (valid) countValid++;
  }

  console.log(countValid);
};
