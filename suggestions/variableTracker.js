window.variableTypes = {};

function updateVariableTypes(model) {

const text = model.getValue();
const lines = text.split("\n");

const map = {};

for (const line of lines) {

let match;

/* -------- C++ TYPES -------- */

// vector - declaration and assignment
match = line.match(/vector\s*<[^>]*>\s*(\w+)/);
if (match) map[match[1]] = "vector";
match = line.match(/(\w+)\s*=\s*vector\s*<[^>]*/);
if (match) map[match[1]] = "vector";

// map
match = line.match(/map\s*<[^>]*>\s*(\w+)/);
if (match) map[match[1]] = "map";
match = line.match(/(\w+)\s*=\s*map\s*<[^>]*/);
if (match) map[match[1]] = "map";

// set
match = line.match(/set\s*<[^>]*>\s*(\w+)/);
if (match) map[match[1]] = "set";
match = line.match(/(\w+)\s*=\s*set\s*<[^>]*/);
if (match) map[match[1]] = "set";

// queue
match = line.match(/queue\s*<[^>]*>\s*(\w+)/);
if (match) map[match[1]] = "queue";
match = line.match(/(\w+)\s*=\s*queue\s*<[^>]*/);
if (match) map[match[1]] = "queue";

// stack
match = line.match(/stack\s*<[^>]*>\s*(\w+)/);
if (match) map[match[1]] = "stack";
match = line.match(/(\w+)\s*=\s*stack\s*<[^>]*/);
if (match) map[match[1]] = "stack";

// string
match = line.match(/string\s+(\w+)/);
if (match) map[match[1]] = "string";
match = line.match(/(\w+)\s*=\s*["'][^"']*["']/);
if (match) map[match[1]] = "string";

// function params & auto refs
match = line.match(/vector[^}]*&?\s*(\w+)/);
if (match) map[match[1]] = "vector";
match = line.match(/auto\s*&?\s*(\w+)\s*=\s*\w+\./);
if (match) map[match[1]] = "vector";


/* -------- PYTHON TYPES -------- */

// list - assignment and comprehension
match = line.match(/(\w+)\s*=\s*\[/);
if (match) map[match[1]] = "list";
match = line.match(/(\w+)\s*=\s*list\(/);
if (match) map[match[1]] = "list";

// dict
match = line.match(/(\w+)\s*=\s*\{/);
if (match) map[match[1]] = "dict";
match = line.match(/(\w+)\s*=\s*dict\(/);
if (match) map[match[1]] = "dict";

// set
match = line.match(/(\w+)\s*=\s*set\(/);
if (match) map[match[1]] = "set";

// string
match = line.match(/(\w+)\s*=\s*["'][^"']*["']/);
if (match) map[match[1]] = "str";


/* -------- JAVA TYPES -------- */

// ArrayList - declaration and new
match = line.match(/ArrayList\s*<[^>]*>\s*(\w+)/);
if (match) map[match[1]] = "arraylist";
match = line.match(/(\w+)\s*=\s*new\s*ArrayList\s*</);
if (match) map[match[1]] = "arraylist";

// HashMap
match = line.match(/HashMap\s*<[^>]*>\s*(\w+)/);
if (match) map[match[1]] = "hashmap";
match = line.match(/(\w+)\s*=\s*new\s*HashMap\s*</);
if (match) map[match[1]] = "hashmap";

// String
match = line.match(/String\s+(\w+)/);
if (match) map[match[1]] = "string";
match = line.match(/(\w+)\s*=\s*new\s*String/);
if (match) map[match[1]] = "string";

}

window.variableTypes = map;

}