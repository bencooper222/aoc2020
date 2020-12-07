const { getFileContents } = require('./util');
const data = getFileContents('inputs/six.txt');
const groups = data.split('\n\n');

const one = () => {
  let sum = 0;
  for (const group of groups) {
    const people = group.split('\n');

    const questionMap = {};
    for (const person of people) {
      const answers = person.split('');
      for (const answer of answers) {
        questionMap[answer] = true;
      }
    }
    const groupSum = Object.keys(questionMap).length;
    sum += groupSum;
  }

  return sum;
};

console.log(one());

const two = () => {
  let sum = 0;
  for (const group of groups) {
    const people = group.split('\n');

    const questionMap = {};
    for (const person of people) {
      const answers = person.split('');
      for (const answer of answers) {
        if (questionMap[answer]) questionMap[answer]++;
        else questionMap[answer] = 1;
      }
    }
    let groupSum = 0;
    for (const count of Object.values(questionMap)) {
      if (count === people.length) groupSum++;
    }
    sum += groupSum;
  }

  return sum;
};
console.log(two());
