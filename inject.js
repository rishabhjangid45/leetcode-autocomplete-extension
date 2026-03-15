function waitForMonaco(callback) {

  const interval = setInterval(() => {

    if (window.monaco && monaco.editor.getModels().length > 0) {
      clearInterval(interval)
      callback()
    }

  }, 500)

}

waitForMonaco(initExtension)


function initExtension() {

  console.log("LeetCode IntelliSense initialized");

  registerProvider();
  enableSuggestions();

}


/* -------- COMPLETION PROVIDER -------- */

function registerProvider() {

  monaco.languages.registerCompletionItemProvider("*", {

    triggerCharacters: ["."],

    provideCompletionItems(model, position) {

      updateVariableTypes(model);

      const language = model.getLanguageId();

      const word = model.getWordUntilPosition(position);

      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      const suggestions = getSuggestions(range, model, position, language);

      return { suggestions };

    }

  });

}


/* -------- ENABLE AUTO SUGGESTIONS -------- */

function enableSuggestions() {

  const editors = monaco.editor.getEditors();

  editors.forEach(editor => {

    editor.updateOptions({
      quickSuggestions: {
        other: true,
        comments: false,
        strings: false
      },
      suggestOnTriggerCharacters: true
    });

  });

}