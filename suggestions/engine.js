function createSuggestions(list, range) {

    return list.map(item => {

        if (typeof item === "string") {
            return {
                label: item,
                insertText: item,
                kind: monaco.languages.CompletionItemKind.Keyword,
                range
            };
        }

        return {
            label: item.label,
            insertText: item.insertText,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range
        };

    });

}


function rankSuggestions(list, prefix) {

    if (!prefix) return list;

    const p = prefix.toLowerCase();

    return list
        .filter(s => {
            const label = s.label.toLowerCase();
            return label.includes(p) || label.startsWith(p);
        })
        .sort((a, b) => {

            const aStarts = a.label.toLowerCase().startsWith(p);
            const bStarts = b.label.toLowerCase().startsWith(p);

            // Priority 1: Exact prefix match
            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;

            // Priority 2: Snippets (includes templates and boilerplate)
            if (a.kind === monaco.languages.CompletionItemKind.Snippet &&
                b.kind !== monaco.languages.CompletionItemKind.Snippet)
                return -1;

            if (b.kind === monaco.languages.CompletionItemKind.Snippet &&
                a.kind !== monaco.languages.CompletionItemKind.Snippet)
                return 1;

            // Priority 3: Methods over keywords
            if (a.kind === monaco.languages.CompletionItemKind.Method &&
                b.kind !== monaco.languages.CompletionItemKind.Method)
                return -1;

            if (b.kind === monaco.languages.CompletionItemKind.Method &&
                a.kind !== monaco.languages.CompletionItemKind.Method)
                return 1;

            // Priority 4: Shorter labels (less typing needed)
            return a.label.length - b.label.length;
        });

}


function getSuggestions(range, model, position, language) {

    const wordInfo = model.getWordUntilPosition(position);
    const prefix = wordInfo.word;
    const line = model.getLineContent(position.lineNumber).trim();

    if (line.startsWith("//") || line.startsWith("#")) {
        return [];
    }

    const lang = language.toLowerCase();

    let suggestions = [];

    /* -------- ALGORITHM TEMPLATES -------- */

    if (window.algorithmTemplates && prefix.length >= 2) {

        let templates = [];

        if (lang === "cpp" || lang === "c++") {
            templates = window.algorithmTemplates.cpp || [];
        }

        if (lang.includes("python")) {
            templates = window.algorithmTemplates.python || [];
        }
        if (lang.includes("java")) {
            templates = window.algorithmTemplates.java || [];
        }

        const templateSuggestions = templates
            .filter(t => t.label.toLowerCase().startsWith(prefix.toLowerCase()))
            .map(t => ({
                label: t.label,
                insertText: t.insertText,
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range
            }));

        suggestions.push(...templateSuggestions);

    }

    /* -------- KEYWORDS + SNIPPETS -------- */

    if (lang === "cpp" || lang === "c++") {

        suggestions.push(
            ...createSuggestions(window.cppKeywords, range),
            ...createSuggestions(window.cppSnippets, range)
        );

    }

    if (lang.includes("python")) {

        suggestions.push(
            ...createSuggestions(window.pythonKeywords, range),
            ...createSuggestions(window.pythonSnippets, range)
        );

    }

    if (lang === "java") {

        suggestions.push(
            ...createSuggestions(window.javaKeywords, range),
            ...createSuggestions(window.javaSnippets, range)
        );

    }

    /* -------- FILTER + SORT -------- */

    return removeDuplicates(rankSuggestions(suggestions, prefix));

}

function detectDotContext(model, position) {

    const line = model.getLineContent(position.lineNumber);
    const fullLine = line;  // Keep full line for context analysis

    // Don't suggest methods in comments
    if (line.trim().startsWith("//") || line.trim().startsWith("#")) {
        return null;
    }

    const left = line.substring(0, position.column - 1);

    // Check if we're inside a string (odd number of quotes = inside string)
    const doubleQuotes = (left.match(/"/g) || []).length;
    const singleQuotes = (left.match(/'/g) || []).length;
    const backticks = (left.match(/`/g) || []).length;

    // If inside any type of string, don't suggest methods
    if (doubleQuotes % 2 !== 0 || singleQuotes % 2 !== 0 || backticks % 2 !== 0) {
        return null;
    }

    const match = left.match(/([a-zA-Z_][a-zA-Z0-9_]*)\.$/);

    if (!match) return null;

    const candidate = match[1].toLowerCase();
    // Skip known non-container globals
    const skipGlobals = ['cout', 'cin', 'cerr', 'clog', 'printf', 'scanf', 'endl', 'this'];
    if (skipGlobals.includes(candidate)) return null;

    return {
        object: match[1].toLowerCase(),
        lineContext: fullLine
    };
}

function getTypeFromContext(object, lineContext, language) {
    const lineLower = lineContext.toLowerCase();
    const objectLower = object.toLowerCase();
    
    // Common LeetCode variable name heuristics
    const commonArrayVars = ['nums', 'arr', 'data', 'nodes', 'intervals'];
    if (commonArrayVars.includes(objectLower)) {
        if (language === 'cpp' || language === 'c++') return 'vector';
        if (language.includes('python')) return 'list';
        if (language === 'java') return 'arraylist';
    }
    
    // Scan line context backward for type keywords
    const cppTypes = ['vector<', 'map<', 'set<', 'queue<', 'stack<', 'string'];
    const pyTypes = ['list(', '[', 'dict(', 'set('];
    const javaTypes = ['arraylist<', 'hashmap<', 'list<', 'string'];
    
    const types = language === 'cpp' || language === 'c++' ? cppTypes :
                  language.includes('python') ? pyTypes : javaTypes;
    
    for (const type of types) {
        if (lineLower.includes(type)) {
            // Map to canonical type name
            if (type === '[' || type === 'list(') return 'list';
            if (type === 'vector<' || type === 'arraylist<') return language === 'java' ? 'arraylist' : 'vector';
            if (type === 'map<' || type === 'dict(' || type === 'hashmap<') return language === 'java' ? 'hashmap' : 'map';
            return type.replace(/[<\(]/, '');
        }
    }
    
    return null;
}

function getMethodSuggestions(context, range, language) {
    let object = typeof context === 'string' ? context.trim().toLowerCase() : context.object.toLowerCase();
    const lineContext = typeof context === 'string' ? '' : context.lineContext;

    let detectedType = null;
    let methods = [];

    /* -------- VARIABLE TYPE (tracked) -------- */
    if (window.variableTypes && window.variableTypes[object]) {
        detectedType = window.variableTypes[object];
    } 
    /* -------- FALLBACK: Context inference -------- */
    else if (lineContext) {
        detectedType = getTypeFromContext(object, lineContext, language);
    }

    /* -------- METHOD LOOKUP -------- */
    if (detectedType) {
        const methodsMap = language === "cpp" || language === "c++" ? window.cppMethods :
                          language.includes("python") ? window.pythonMethods :
                          language === "java" ? window.javaMethods : {};
        methods = methodsMap[detectedType] || [];
    }

    /* -------- RETURN SUGGESTIONS -------- */
    const suggestions = [];
    for (const m of methods) {
        suggestions.push({
            label: m,
            detail: detectedType ? detectedType.charAt(0).toUpperCase() + detectedType.slice(1) + " method" : "Method",
            insertText: m + "()",
            kind: monaco.languages.CompletionItemKind.Method,
            range: range
        });
    }
    
    return suggestions;
}

function removeDuplicates(list) {

    const seen = new Map(); // label -> item

    for (const item of list) {
        const existing = seen.get(item.label);
        
        if (!existing) {
            seen.set(item.label, item);
        } else {
            // Prefer snippets over keywords
            if (item.kind === monaco.languages.CompletionItemKind.Snippet &&
                existing.kind !== monaco.languages.CompletionItemKind.Snippet) {
                seen.set(item.label, item);
            }
        }
    }
    
    return Array.from(seen.values());

}