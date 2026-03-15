const cppKeywords = [
  "int",
  "long",
  "long long",
  "double",
  "char",
  "bool",
  "vector",
  "map",
  "set",
  "queue",
  "stack",
  "unordered_map",
  "unordered_set"
];

const snippets = [
  {
    label: "fori",
    insertText:
`for(int i = 0; i < \${1:n}; i++){
    \${2}
}`,
    type: "snippet"
  },

  {
    label: "vec",
    insertText: "vector<int>",
    type: "snippet"
  },

  {
    label: "pq",
    insertText: "priority_queue<int>",
    type: "snippet"
  }
];

function createKeywordSuggestions(range) {
  return cppKeywords.map(word => ({
    label: word,
    kind: monaco.languages.CompletionItemKind.Keyword,
    insertText: word,
    range
  }));
}

function createSnippetSuggestions(range) {
  return snippets.map(snippet => ({
    label: snippet.label,
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: snippet.insertText,
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    range
  }));
}

function filterSuggestions(list, prefix) {
  if (!prefix) return list;

  return list.filter(item =>
    item.label.toLowerCase().startsWith(prefix.toLowerCase())
  );
}

function getSuggestions(range, model, position) {

  const wordInfo = model.getWordUntilPosition(position);
  const prefix = wordInfo.word;

  const keywordSuggestions = createKeywordSuggestions(range);
  const snippetSuggestions = createSnippetSuggestions(range);

  const allSuggestions = [
    ...keywordSuggestions,
    ...snippetSuggestions
  ];

  return filterSuggestions(allSuggestions, prefix);
}