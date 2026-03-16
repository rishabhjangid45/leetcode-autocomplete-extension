# LeetCode IntelliSense Extension

A Chrome extension that enhances the LeetCode coding editor with intelligent autocomplete suggestions, algorithm templates, and useful snippets for **C++, Python, and Java**.

The extension adds lightweight IntelliSense to the Monaco editor used by LeetCode, helping developers write code faster while solving problems.

---

# Features

## 1. Keyword Autocomplete

Automatically suggests language keywords while typing.

Example:

```
in → int
for → for, fori
```

Supported languages:

* C++
* Python
* Java

---

## 2. Snippet Suggestions

Provides commonly used code snippets.

Examples:

### C++

```
vec → vector<int> nums;
fori → for(int i=0;i<n;i++)
```

### Python

```
fori → for i in range(n):
```

### Java

```
fori → for(int i=0;i<n;i++)
```

Snippets speed up writing repetitive code structures.

---

## 3. Algorithm Templates

Provides ready-to-use templates for common algorithms.

Templates available:

* BFS
* DFS
* Binary Search
* Sliding Window
* Two Pointers

Example:

Typing:

```
bfs
```

Expands to a full BFS template.

Templates work for:

* C++
* Python
* Java

---

## 4. Method Suggestions

The extension suggests methods for common data structures.

Example:

```
vector<int> nums;
nums.
```

Suggestions:

```
push_back()
pop_back()
size()
clear()
```

Supported structures include:

### C++

* vector
* string
* map
* set
* queue
* stack

### Python

* list
* dict
* set
* str

### Java

* ArrayList
* HashMap
* String

---

## 5. Variable Type Detection

The extension automatically detects variable types from your code.

Example:

```
vector<int> nums;
nums.
```

The extension recognizes that `nums` is a vector and shows relevant methods.

---

# Installation

## Step 1: Download the Extension

Clone or download the repository.

```
git clone https://github.com/rishabhjangid45/leetcode-autocomplete-extension.git
```

Or download the ZIP and extract it.

---

## Step 2: Open Chrome Extensions

Go to:

```
chrome://extensions
```

Enable:

```
Developer Mode
```

(top right corner)

---

## Step 3: Load the Extension

Click:

```
Load Unpacked
```

Select the extension folder.

---

## Step 4: Open LeetCode

Visit:

```
https://leetcode.com/problems/*
```

The extension will automatically activate inside the coding editor.

---

# How to Use

### Autocomplete

Start typing code normally.

Suggestions will automatically appear.

Example:

```
for
vec
bfs
```

---

### Method Suggestions

Type a variable followed by `.`

Example:

```
nums.
```

The extension will suggest available methods.

---

### Algorithm Templates

Type the template name and select it from suggestions.

Examples:

```
bfs
dfs
binarysearch
slidingwindow
twopointers
```

---

# Adding New Snippets

Snippets are stored inside the `suggestions` folder.

Example:

```
suggestions/
 ├─ cpp.js
 ├─ python.js
 ├─ java.js
```

To add a new snippet, edit the relevant file.

Example (`cpp.js`):

```
window.cppSnippets = [

{
label: "vec",
insertText: "vector<int> ${1:name};"
}

];
```

---

# Adding New Algorithm Templates

Templates are located in:

```
suggestions/templates.js
```

Example template:

```
{
label: "bfs",
insertText: `
queue<int> q;
vector<bool> visited(n,false);
`
}
```

You can add new templates following the same structure.

---

# Adding Method Suggestions

Methods are defined in:

```
suggestions/methods.js
```

Example:

```
window.cppMethods = {

vector: [
"push_back",
"pop_back",
"size"
]

}
```

Add new methods to the corresponding data structure.

---

# Project Structure

```
extension/
│
├─ manifest.json
├─ content.js
├─ inject.js
│
├─ suggestions/
│   ├─ engine.js
│   ├─ cpp.js
│   ├─ python.js
│   ├─ java.js
│   ├─ methods.js
│   ├─ templates.js
│   └─ variableTracker.js
```

---

# Supported Languages

| Language | Support             |
| -------- | ------------------- |
| C++      | Full                |
| Python   | Full                |
| Java     | Full                |

---

# Limitations

This extension uses lightweight code analysis and regex detection.
It does not implement full language parsing like a full IDE.

Some complex declarations may not be detected.

Example:

```
auto nums = vector<int>();
```

---

# Future Improvements

Possible future enhancements:

* smarter variable type inference
* problem-aware algorithm suggestions
* more algorithm templates
* additional language support
* inline ghost suggestions

---

# License

This project is open source and free to use.
