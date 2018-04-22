const matchRecursive = require('match-recursive');

let test = matchRecursive("4[abc]3[de5[f]]g",		"[...]"); 

let test2 = matchRecursive(test[1],		"[...]"); 

console.log(test2);

// function decompressor(string) {
	
// };
