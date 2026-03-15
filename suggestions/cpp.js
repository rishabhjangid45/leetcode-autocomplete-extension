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
insertText:
`for(int i = 0; i < \${1:n}; i++){
    \${2}
}`
},

{
label:"forj",
insertText:
`for(int j = 0; j < \${1:n}; j++){
    \${2}
}`
},

{
label:"vec",
insertText:"vector<int>"
},

{
label:"pq",
insertText:"priority_queue<int>"
},

{
label:"pair",
insertText:"pair<int,int>"
},

{
label:"fastio",
insertText:
`ios::sync_with_stdio(false);
cin.tie(NULL);`
},

{
label:"ifelse",
insertText:
`if(\${1:condition}){

}else{

}`
},

{
label:"main",
insertText:
`int main(){
    \${1}
    return 0;
}`
}

];