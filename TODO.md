# Fix Method Detection Issue - Robust Type Inference

Current Issue: Method suggestions fail when variableTracker misses declarations or var names lack type substrings (e.g., `vector<int> data; data.` → no methods)

## Approved Plan Steps (Breakdown)

### Step 1: Create Robust TODO tracking [IN PROGRESS]

### Step 2: Enhance variableTracker.js
- Add declaration patterns: function params, assignments, templates
- Test: vector<int> data; → track 'data':'vector'

### Step 3: Add fallback type inference to engine.js
- New `getTypeFromContext(varName, lineContent, language)`
- Line scan: look backward for type keywords
- Common var guessing: nums/arr → vector/list

### Step 4: Update content.js calls
- Ensure updateVariableTypes runs reliably before lookups

### Step 5: Test cases
```
CPP: vector<int> data; data. → push_back, size, empty
PY: nums = []; nums. → append, pop, sort  
JAVA: List<Integer> list = new ArrayList<>(); list. → add, get, size
```

### Step 6: Verify + attempt_completion

Progress: 5/6 completed (All code changes implemented: enhanced tracker + fallback inference)
