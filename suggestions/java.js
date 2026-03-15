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
insertText:
`for(int i = 0; i < \${1:n}; i++){
    \${2}
}`
},

{
label:"main",
insertText:
`public static void main(String[] args){
    \${1}
}`
},

{
label:"array",
insertText:
`int[] arr = new int[\${1:n}];`
},

{
label:"arraylist",
insertText:
`ArrayList<Integer> list = new ArrayList<>();`
},

{
label:"hashmap",
insertText:
`HashMap<Integer,Integer> map = new HashMap<>();`
},

{
label:"ifelse",
insertText:
`if(\${1:condition}){

}else{

}`
}

];