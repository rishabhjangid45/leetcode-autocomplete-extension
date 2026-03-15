window.variableTypes = {};

function updateVariableTypes(model) {

const text = model.getValue();
const lines = text.split("\n");

const map = {};

for (const line of lines) {

let match;

/* -------- C++ TYPES -------- */

// vector
match = line.match(/vector<[^>]+>\s+(\w+)/);
if (match) map[match[1]] = "vector";

// map
match = line.match(/map<[^>]+>\s+(\w+)/);
if (match) map[match[1]] = "map";

// set
match = line.match(/set<[^>]+>\s+(\w+)/);
if (match) map[match[1]] = "set";

// queue
match = line.match(/queue<[^>]+>\s+(\w+)/);
if (match) map[match[1]] = "queue";

// stack
match = line.match(/stack<[^>]+>\s+(\w+)/);
if (match) map[match[1]] = "stack";

// string
match = line.match(/string\s+(\w+)/);
if (match) map[match[1]] = "string";


/* -------- PYTHON TYPES -------- */

// list
match = line.match(/(\w+)\s*=\s*\[/);
if (match) map[match[1]] = "list";

// list()
match = line.match(/(\w+)\s*=\s*list\(/);
if (match) map[match[1]] = "list";

// dict
match = line.match(/(\w+)\s*=\s*\{/);
if (match) map[match[1]] = "dict";

// set
match = line.match(/(\w+)\s*=\s*set\(/);
if (match) map[match[1]] = "set";

// string
match = line.match(/(\w+)\s*=\s*["']/);
if (match) map[match[1]] = "str";


/* -------- JAVA TYPES -------- */

// ArrayList
match = line.match(/ArrayList<[^>]+>\s+(\w+)/);
if (match) map[match[1]] = "arraylist";

// HashMap
match = line.match(/HashMap<[^>]+>\s+(\w+)/);
if (match) map[match[1]] = "hashmap";

// String
match = line.match(/String\s+(\w+)/);
if (match) map[match[1]] = "string";

}

window.variableTypes = map;

}