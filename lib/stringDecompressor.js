const matchRecursive = require('match-recursive');
// npm package: puts elements in an array found between outer braces in a string while accounting for recursion
String.prototype.replaceBetween = function(start, end, what) {
    return this.substring(0, start) + what + this.substring(end);
};

function decompressor(compressedStr) {
		//Example of compressed string: "1[abc]10[de2[f]]g"
		// should equate to "abcdeffdeffdeffdeffdeffdeffdeffdeffdeffdeffg"
	let decompress0 = matchRecursive(compressedStr,		"[...]"); 
		// Ex. outputs ["abc", "de10[f]"]
	let strDecompression = [ compressedStr ];
	let oneDecompression = [ compressedStr ];


	for (let bracketsStrs of decompress0.reverse()) {
		let bracketedStrs = "[" + bracketsStrs + "]";
		let strL = bracketsStrs.length; 
			
		let lBracketIndeces = strDecompression[0].lastIndexOf(bracketedStrs);
		let rBracketIndeces = lBracketIndeces + strL + 1;
		let clippedStrs = strDecompression[0].slice(0, lBracketIndeces);
		strDecompression[0] = clippedStrs + "*";
			
		let multiplier = /(\d{1,})(?=\*)/g;
		let lastDgts = strDecompression[0].match( multiplier );
		let fNumIndeces = strDecompression[0].lastIndexOf(lastDgts);
		let clippedNum = strDecompression[0].slice(0, fNumIndeces);
		strDecompression[0] = clippedNum;
			
		let decompression = oneDecompression[0].replaceBetween(fNumIndeces, rBracketIndeces + 1, bracketsStrs.repeat(lastDgts[0]));
		oneDecompression[0] = decompression;
	}

	if (oneDecompression[0].includes("[")) {
		decompressor(oneDecompression[0]);
	} else {
		return console.log(oneDecompression[0]);
	}
};

decompressor(process.argv[2]);

