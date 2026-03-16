window.cppKeywords = [
"int","long","long long","double","float","char","bool",
"vector","map","set","queue","stack","priority_queue",
"unordered_map","unordered_set","pair","string",
"if","else","while","for","return","class","struct",
"public","private","protected","switch","case","break",
"continue","auto","const","static","void"
];

window.cppSnippets = [

{
label:"fori",
detail:"Loop from 0 to n",
insertText:
`for(int i = 0; i < \${1:n}; i++){
    \${2}
}`
},

{
label:"forj",
detail:"Loop from 0 to n (j variable)",
insertText:
`for(int j = 0; j < \${1:n}; j++){
    \${2}
}`
},

{
label:"vector",
detail:"Dynamic array",
insertText:"vector<\${1:int}> \${2:vec};"
},
{
label:"stack",
detail:"LIFO container (Last-In-First-Out)",
insertText:"stack<\${1:int}> \${2:st};"
},
{
label:"queue",
detail:"FIFO container (First-In-First-Out)",
insertText:"queue<\${1:int}> \${2:q};"
},
{
label:"map",
detail:"Key-value pair container (sorted)",
insertText:"map<\${1:int},\${2:int}> \${3:mp};"
},

{
label:"pq",
detail:"Priority queue (max heap by default)",
insertText:"priority_queue<\${1:int}> \${2:pq};"
},

{
label:"pair",
detail:"Store two values together",
insertText:"pair<\${1:int},\${2:int}> \${3:p};"
},

{
label:"fastio",
detail:"Fast input/output for competitive programming",
insertText:
`ios::sync_with_stdio(false);
cin.tie(NULL);`
},

{
label:"ifelse",
detail:"If-else conditional block",
insertText:
`if(\${1:condition}){
    \${2}
}else{
    \${3}
}`
},

{
label:"main",
detail:"Main function entry point",
insertText:
`int main(){
    \${1}
    return 0;
}`
}

];

