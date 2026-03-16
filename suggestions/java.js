window.javaKeywords = [
"int","long","double","float","boolean","char","String",
"ArrayList","HashMap","HashSet","Queue","Stack","List","Map",
"if","else","while","for","return","class","public","private",
"protected","static","void","new","switch","case","break",
"continue","import","package"
];

window.javaSnippets = [

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
label:"main",
detail:"Main method entry point",
insertText:
`public static void main(String[] args){
    \${1}
}`
},

{
label:"array",
detail:"Initialize integer array",
insertText:
`int[] \${1:arr} = new int[\${2:n}];`
},

{
label:"arraylist",
detail:"Dynamic array list",
insertText:
`ArrayList<\${1:Integer}> \${2:list} = new ArrayList<>();`
},

{
label:"hashmap",
detail:"Key-value pair map",
insertText:
`HashMap<\${1:Integer},\${2:Integer}> \${3:map} = new HashMap<>();`
},

{
label:"hashset",
detail:"Unique values set",
insertText:
`HashSet<\${1:Integer}> \${2:set} = new HashSet<>();`
},

{
label:"string",
detail:"String variable declaration",
insertText:
`String \${1:name} = \${2:""};`
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
label:"class",
detail:"Class definition",
insertText:
`public class \${1:ClassName}{
    \${2}
}`
}

];