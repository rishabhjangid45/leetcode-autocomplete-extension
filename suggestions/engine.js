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
    .filter(s => s.label.toLowerCase().includes(p))
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

  const lang = language.toLowerCase();

  let suggestions = [];

  if (lang === "cpp" || lang === "c++") {

    suggestions = [
      ...createSuggestions(window.cppKeywords, range),
      ...createSuggestions(window.cppSnippets, range)
    ];

  }

  if (lang.includes("python")) {

    suggestions = [
      ...createSuggestions(window.pythonKeywords, range),
      ...createSuggestions(window.pythonSnippets, range)
    ];

  }

  if (lang === "java") {

    suggestions = [
      ...createSuggestions(window.javaKeywords, range),
      ...createSuggestions(window.javaSnippets, range)
    ];

  }

  if (lang === "css") {

    suggestions = [
      ...createSuggestions(window.cssKeywords, range),
      ...createSuggestions(window.cssSnippets, range)
    ];

  }

  return rankSuggestions(suggestions, prefix);

}