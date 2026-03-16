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

    registerProvider();
    enableSuggestions();

}


/* -------- COMPLETION PROVIDER -------- */

function registerProvider() {

    monaco.languages.registerCompletionItemProvider("*", {

        triggerCharacters: ["."],

        provideCompletionItems(model, position) {

            try {
                const language = model.getLanguageId();
                const word = model.getWordUntilPosition(position);

                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn
                };

                // Check if we're after a dot (method call context)
                const dotContext = detectDotContext(model, position);
                
                let suggestions = [];
                
                if (dotContext) {
                    // Always scan variables when looking for methods
                    updateVariableTypes(model);
                    const methods = getMethodSuggestions(dotContext, range, language);
                    if (methods.length > 0) {
                        suggestions = methods;
                    }
                } else {
                    suggestions = getSuggestions(range, model, position, language);
                }

                return { suggestions };
            } catch (e) {
                return { suggestions: [] };
            }

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