const matchRecursive = require('match-recursive');
// npm package: puts elements in an array found between outer braces in a string while accounting for recursion
String.prototype.replaceBetween = function(start, end, what) {
    return this.substring(0, start) + what + this.substring(end);
};

module.exports = function decompressor(compressedStr) {
		//Example of compressed string: "1[abc]10[de2[f]]g"
		// should equate to "abcdeffdeffdeffdeffdeffdeffdeffdeffdeffdeffg"
	let outerBracketedStrs = matchRecursive(compressedStr,		"[...]"); 
		// Ex. outputs ["abc", "de10[f]"]
	let moddedStr = [ compressedStr ];
	let oneDecompression = [ compressedStr ];

	for (let reverseInnerStrs of outerBracketedStrs.reverse()) {
		// Array of strings found in outerBrackets is looped in reverse to easily edit the original string
		// from the end of the string, accounting for duplicate values while maintaining the character indeces throughout the string
		let strsNBrackets = "[" + reverseInnerStrs + "]";
		let strLength = reverseInnerStrs.length; 
			
		let leftBrackets = moddedStr[0].lastIndexOf(strsNBrackets);
		let rightBrackets = leftBrackets + strLength + 1;
		let clipStrs = moddedStr[0].slice(0, leftBrackets);
		moddedStr[0] = clipStrs + "*";
			// Locates the indeces of the last left bracket and right bracket found in the string with the specific substring between them.
			// The substring from the left bracket is removed and the "*" is appended to the end of the string 
			// to isolate the specific multiplier for the bracketed substring.	
			// Ex for first iteration: moddedStr[0] = "1[abc]10*"
		let multiplier = /(\d{1,})(?=\*)/g;
			// regex to find number of any length in string followed by "*", which is only the last number 
		let lastDgts = moddedStr[0].match( multiplier );
		let numIndeces = moddedStr[0].lastIndexOf(lastDgts);
		let clipNums = moddedStr[0].slice(0, numIndeces);
		moddedStr[0] = clipNums;
			// Similar to previous group of functions. Clips last number from string clipped by substring in brackets 
			// and finds index of the number in the edited string.
			// Ex for first iteration: moddedStr[0] = "1[abc]"
		let decompression = oneDecompression[0].replaceBetween(numIndeces, rightBrackets + 1, reverseInnerStrs.repeat(lastDgts[0]));
		oneDecompression[0] = decompression;
	}

	if (oneDecompression[0].includes("[")) {
		let nextDecompression = decompressor(oneDecompression[0]);
		oneDecompression[0] = nextDecompression;
	} else {
		console.log("Decompressed!");
	}
	return oneDecompression[0];
};




