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
insertText:
`for i in range(\${1:n}):
    \${2}`
},

{
label: "forrange",
insertText:
`for i in range(\${1:start}, \${2:end}):
    \${3}`
},

{
label: "def",
insertText:
`def \${1:function_name}(\${2:args}):
    \${3}`
},

{
label: "ifmain",
insertText:
`if __name__ == "__main__":
    \${1}`
},

{
label: "class",
insertText:
`class \${1:ClassName}:
    def __init__(self, \${2:args}):
        \${3}`
},

{
label: "listcomp",
insertText:
`[\${1:x} for \${2:x} in \${3:iterable}]`
},

{
label: "try",
insertText:
`try:
    \${1}
except Exception as e:
    print(e)`
},

{
label: "inputint",
insertText:
`\${1:n} = int(input())`
},

{
label: "inputlist",
insertText:
`\${1:arr} = list(map(int, input().split()))`
}

];