const { getFileContents } = require('./util');

const data = getFileContents('./inputs/four.txt')
  .split('\n\n')
  .map(el => el.split(/[ \n]/));

class FieldTracker {
  constructor() {
    this.validationFunctions = {
      byr: str => {
        const num = Number(str);
        return str.match(/^\d{4}$/) !== null && num >= 1920 && num <= 2002;
      },
      iyr: str => {
        const num = Number(str);
        return str.match(/^\d{4}$/) !== null && num >= 2010 && num <= 2020;
      },
      eyr: str => {
        const num = Number(str);
        return str.match(/^\d{4}$/) !== null && num >= 2020 && num <= 2030;
      },
      hgt: str => {
        const unit = str.slice(-2);
        const num = Number(str.slice(0, -2));
        switch (unit) {
          case 'in':
            return num >= 59 && num <= 76;

          case 'cm':
            return num >= 150 && num <= 193;

          default:
            return false;
        }
      },
      hcl: str => {
        return str.match(/^#(?:[0-9a-f]){6}$/) !== null;
      },
      ecl: str => {
        return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some(el => el === str);
      },
      pid: str => {
        return str.match(/^\d{9}$/) !== null;
      },
    };

    this.requiredFields = Object.keys(this.validationFunctions);

    this.fields = {};
    for (const field of this.requiredFields) this.fields[field] = false;
  }

  add(field, value = false) {
    if (field === 'cid') return;
    if (!value) this.fields[field] = true;
    else {
      this.fields[field] = this.validationFunctions[field](value);
    }
  }

  isValid() {
    for (const field of this.requiredFields) if (!this.fields[field]) return false;

    return true;
  }
}

const main = (isOne = true) => {
  let count = 0;

  for (const passport of data) {
    const fieldTracker = new FieldTracker();
    for (const field of passport) {
      const [key, val] = field.split(':');
      fieldTracker.add(key, isOne ? false : val);
    }
    if (fieldTracker.isValid()) count++;
  }

  return count;
};

const one = () => {
  console.log('ONE: ' + main());
};
const two = () => {
  console.log('TWO: ' + main(false));
};

one();
two();
