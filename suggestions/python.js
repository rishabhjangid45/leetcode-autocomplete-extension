window.pythonKeywords = [
  "and","as","assert","async","await","break","class","continue",
  "def","del","elif","else","except","False","finally","for",
  "from","global","if","import","in","is","lambda","None",
  "nonlocal","not","or","pass","raise","return","True","try",
  "while","with","yield","list","dict","set","tuple","len","range"
];

window.pythonSnippets = [

{
label: "fori",
detail: "Loop with range",
insertText:
`for i in range(\${1:n}):
    \${2}`
},

{
label: "forrange",
detail: "Loop with start and end",
insertText:
`for i in range(\${1:start}, \${2:end}):
    \${3}`
},

{
label: "def",
detail: "Function definition",
insertText:
`def \${1:function_name}(\${2:args}):
    \${3}`
},

{
label: "ifmain",
detail: "Main entry point",
insertText:
`if __name__ == "__main__":
    \${1}`
},

{
label: "class",
detail: "Class definition with constructor",
insertText:
`class \${1:ClassName}:
    def __init__(self, \${2:args}):
        \${3}`
},

{
label: "list",
detail: "Initialize empty list",
insertText:
`\${1:list_name} = []`
},

{
label: "dict",
detail: "Initialize empty dictionary",
insertText:
`\${1:dict_name} = {}`
},

{
label: "set",
detail: "Initialize empty set",
insertText:
`\${1:set_name} = set()`
},

{
label: "listcomp",
detail: "List comprehension",
insertText:
`[\${1:x} for \${2:x} in \${3:iterable}]`
},

{
label: "try",
detail: "Try-except error handling",
insertText:
`try:
    \${1}
except \${2:Exception} as e:
    \${3}print(e)`
},

{
label: "inputint",
detail: "Read integer from input",
insertText:
`\${1:n} = int(input(\${2:"Enter value: "}))`
},

{
label: "inputlist",
insertText:
`\${1:arr} = list(map(int, input().split()))`
}

];