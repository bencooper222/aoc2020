const { cpuUsage } = require('process');
const { start } = require('repl');
const { runInThisContext } = require('vm');
const { getArrayOfFileContests } = require('./util');
const data = getArrayOfFileContests('./inputs/seven.txt');

class GraphNode {
  constructor(color, parents, children) {
    this.color = color;
    this.parents = parents; // list of colors and quantities
    this.children = children; // list of colors and quantities
  }
}

const nodes = {};

for (const rule of data) {
  if (rule.includes('no other')) continue;

  const [parent, childrenStr] = rule.split(' bags contain ');

  const childrenParsed = childrenStr.split(', ').map(el => {
    const words = el.split(' ');
    const quantity = Number(words[0]);
    const color = words[1] + ' ' + words[2];
    // idt quantity matters for part 1?
    return [color, quantity];
  });

  if (nodes[parent]) {
    nodes[parent].children.push(...childrenParsed);
  } else {
    nodes[parent] = new GraphNode(parent, [], childrenParsed);
  }

  for (const child of childrenParsed.map(el => el[0])) {
    if (nodes[child]) {
      nodes[child].parents.push(parent);
    } else {
      nodes[child] = new GraphNode(child, [parent], []);
    }
  }
}

class GraphQueue {
  constructor(startingElements) {
    this.elements = {};

    this.addMany(startingElements);
  }

  add(el) {
    if (this.elements[el]) return false;

    this.elements[el] = false;
    return true;
  }

  //els is array
  addMany(els) {
    for (const el of els) this.add(el);
  }

  length() {
    return Object.values(this.elements).reduce((acc, el) => (el ? acc : acc + 1), 0);
  }

  getElement() {
    for (const [key, val] of Object.entries(this.elements)) {
      if (!val) {
        this.elements[key] = true;
        return key; // return first false
      }
    }
  }
}

const one = () => {
  const shinyGold = nodes['shiny gold'];
  const parentsQueue = new GraphQueue(shinyGold.parents);

  let count = 0;
  while (parentsQueue.length() > 0) {
    const el = nodes[parentsQueue.getElement()];
    count++;
    parentsQueue.addMany(el.parents);
  }
  return count;
};

console.log(one());

const visited = {};
const recurseTwo = color => {
  // stupid topology
  //   if (visited[color]) return 0;
  //   visited[color] = true;

  const node = nodes[color];
  let rtn = 0;

  for (const child of node.children) {
    rtn += child[1] * (1 + recurseTwo(child[0]));
  }

  console.log(color + ' contains: ' + rtn);
  return rtn;
};
const two = () => {
  return recurseTwo('shiny gold');
};

console.log(two());
