function createSuggestions(list, range, type) {

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

function filterSuggestions(list, prefix) {

  if (!prefix) return list;

  return list.filter(s =>
    s.label.toLowerCase().startsWith(prefix.toLowerCase())
  );

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

  return filterSuggestions(suggestions, prefix);

}