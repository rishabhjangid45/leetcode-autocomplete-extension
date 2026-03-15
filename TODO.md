# LeetCode IntelliSense Extension – Project TODO

## Project Goal

Create a Chrome extension that enhances the LeetCode coding editor with IntelliSense-style autocomplete using Monaco Editor APIs. The extension should provide useful suggestions, competitive programming snippets, and developer-friendly shortcuts.

---

# Phase 1 — Research & Setup

## Completed

* [x] Confirm LeetCode uses Monaco Editor
* [x] Access Monaco object via `window.monaco`
* [x] Investigate editor models using `monaco.editor.getModels()`
* [x] Decide to use Monaco's built-in IntelliSense system
* [x] Define extension goal and architecture

## Remaining

* [x] Create Chrome extension folder structure
* [x] Create `manifest.json`
* [x] Create `content.js`
* [x] Inject script into page context (`inject.js`)
* [x] Detect Monaco editor initialization

---

# Phase 2 — Basic Autocomplete System

## Core Feature

Implement a Monaco completion provider.

Tasks:

* [x] Detect when Monaco is loaded
* [ ] Register `CompletionItemProvider`
* [ ] Detect current language (C++, Python, Java, etc.)
* [ ] Extract current word being typed
* [ ] Return suggestion list

Basic test suggestions:

* [ ] `int`
* [ ] `vector`
* [ ] `long long`
* [ ] `unordered_map`

Goal:
Working autocomplete dropdown inside LeetCode editor.

---

# Phase 3 — Competitive Programming Snippets

Add snippets that expand into useful code.

Examples:

### Loop snippets

* [ ] `fori`
* [ ] `forj`
* [ ] `forn`

### Data structures

* [ ] `vec` → `vector<int>`
* [ ] `pq` → `priority_queue<int>`
* [ ] `ll` → `long long`

### Algorithms

* [ ] `bfs`
* [ ] `dfs`
* [ ] `binsearch`
* [ ] `twoPointers`
* [ ] `slidingWindow`

Goal:
Make coding faster during contests and practice.

---

# Phase 4 — Smart Suggestions

Improve autocomplete quality.

Tasks:

* [ ] Suggest STL methods
* [ ] Suggest container functions
* [ ] Context-based suggestions
* [ ] Improve suggestion ranking
* [ ] Filter suggestions by prefix

Example:

Typing:

```
v.
```

Should suggest:

```
push_back
size
begin
end
```

---

# Phase 5 — UI Improvements

Improve user experience.

Tasks:

* [ ] Better suggestion descriptions
* [ ] Add documentation text
* [ ] Add icons for keywords/functions
* [ ] Add snippet preview

Optional:

* [ ] Dark mode styling
* [ ] Custom suggestion panel design

---

# Phase 6 — Advanced Features (Optional)

Future improvements if the basic extension works well.

### AI Suggestions

* [ ] Integrate AI completion API
* [ ] Provide code hints
* [ ] Provide algorithm hints

### Competitive Programming Tools

* [ ] Insert common templates
* [ ] Fast IO template
* [ ] Union-Find template
* [ ] Segment Tree template

### LeetCode Enhancements

* [ ] Show runtime complexity hints
* [ ] Detect problem type
* [ ] Suggest algorithm patterns

---

# Phase 7 — Testing

Tasks:

* [ ] Test on C++ problems
* [ ] Test on Python problems
* [ ] Test snippet expansion
* [ ] Check performance
* [ ] Ensure extension does not break editor

---

# Phase 8 — Packaging

Prepare for distribution.

Tasks:

* [ ] Clean project structure
* [ ] Add README.md
* [ ] Add usage instructions
* [ ] Add screenshots
* [ ] Publish on Chrome Web Store

---

# Project Folder Structure

```
leetcode-intellisense-extension
│
├── manifest.json
├── content.js
├── inject.js
├── snippets.js
├── suggestions.js
├── styles.css
└── TODO.md
```

---

# Success Criteria

The extension is considered successful when:

* Autocomplete works reliably inside LeetCode editor
* Snippets expand correctly
* Suggestions appear instantly
* Extension does not interfere with editor performance

---

# Future Vision

Turn this into a full **LeetCode productivity extension** with:

* Smart autocomplete
* Competitive programming templates
* Algorithm hints
* Code shortcuts
* Optional AI assistance
