const matchRecursive = require('match-recursive');

let test = matchRecursive("4[abc]3[de5[f]]g",		"[...]"); 

let test2 = matchRecursive(test[1],		"[...]"); 

// console.log(test2);

// console.log("4[abc]3[de5[f]]g".indexOf("[abc]"));

function decompressor(compressedStr) {
	let decompress0 = matchRecursive(compressedStr,		"[...]"); 
	for (let strInBrackets of decompress0) {
		let bracketLIndex = compressedStr.indexOf(strInBrackets) - 1;
		let bracketRIndex = bracketLIndex + strInBrackets.length + 1;
		let removeOuterBracketed = compressedStr.replace("[" + strInBrackets + "]", " ".repeat(strInBrackets.length + 2));
		console.log(bracketLIndex);
		console.log(bracketRIndex);
		console.log(removeOuterBracketed);
	}
	 
};

decompressor("4[abc]4");