const fs = require('fs');

const getFileContents = path => {
  console.log('Getting from: ' + path);
  return fs.readFileSync(path, { encoding: 'utf8' });
};
const getArrayOfFileContests = path => getFileContents(path).split('\n');

module.exports = { getArrayOfFileContests, getFileContents };
