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

            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;

            if (a.kind === monaco.languages.CompletionItemKind.Snippet &&
                b.kind !== monaco.languages.CompletionItemKind.Snippet)
                return -1;

            if (b.kind === monaco.languages.CompletionItemKind.Snippet &&
                a.kind !== monaco.languages.CompletionItemKind.Snippet)
                return 1;

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

    if (window.algorithmTemplates) {

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
            .filter(t => t.label.startsWith(prefix))
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

    return rankSuggestions(removeDuplicates(suggestions), prefix);

}

function detectDotContext(model, position) {

    const line = model.getLineContent(position.lineNumber);

    const left = line.substring(0, position.column - 1);

    const match = left.match(/([a-zA-Z_][a-zA-Z0-9_]*)\.$/);

    if (!match) return null;

    return match[1].toLowerCase();
}

function getMethodSuggestions(object, range, language) {

    object = object.trim().toLowerCase();

    let detectedType = null;
    let methods = [];

    /* -------- VARIABLE TRACKER -------- */

    if (window.variableTypes && window.variableTypes[object]) {
        detectedType = window.variableTypes[object];
    }

    /* -------- FALLBACK HEURISTICS -------- */

    if (!detectedType) {

        if (language === "cpp" || language === "c++") {

            for (const type in window.cppMethods) {
                if (object === type || object.includes(type)) {
                    detectedType = type;
                    break;
                }
            }

        }

        if (language.includes("python")) {

            for (const type in window.pythonMethods) {
                if (object === type || object.includes(type)) {
                    detectedType = type;
                    break;
                }
            }

        }

        if (language === "java") {

            for (const type in window.javaMethods) {
                if (object === type || object.includes(type)) {
                    detectedType = type;
                    break;
                }
            }

        }

    }

    /* -------- RESOLVE METHODS -------- */

    if (detectedType) {

        if (language === "cpp" || language === "c++") {
            methods = window.cppMethods[detectedType] || [];
        }

        if (language.includes("python")) {
            methods = window.pythonMethods[detectedType] || [];
        }

        if (language === "java") {
            methods = window.javaMethods[detectedType] || [];
        }

    }

    /* -------- RETURN MONACO SUGGESTIONS -------- */

    return methods.map(m => ({
        label: m,
        insertText: m + "()",
        kind: monaco.languages.CompletionItemKind.Method,
        range
    }));

}

function removeDuplicates(list) {

    const seen = new Set();

    return list.filter(item => {

        if (seen.has(item.label)) return false;

        seen.add(item.label);
        return true;

    });

}