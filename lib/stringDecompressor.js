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
	let decompressedStrs = [];
	let lNumberIndeces = [];
	let rBracketIndeces = [];

	for (let bracketsStrs of decompress0.reverse()) {
		let strL = bracketsStrs.length;
		let bracketLIndex = compressedStr.indexOf(bracketsStrs) - 1;
		let bracketRIndex = bracketLIndex + strL + 1;
		rBracketIndeces.push(bracketRIndex);
		let removeOuterBracketed = compressedStr.replace("[" + bracketsStrs + "]", " ".repeat(strL + 2));
			// replaces all outer bracketed elements with blank spaces from the original string
			// console.log(bracketLIndex);
		let digitsSpaces = /(\d{1,})(?=\s{1,})+/g; 
		let multiDgt = /(\d)+/g;

		let findDgts = removeOuterBracketed.match( digitsSpaces );
			//outputs ["1     "] ["10        "] 
		
		let numberLIndex = bracketLIndex - findDgts.length; 
		lNumberIndeces.push(numberLIndex);
		let decompressStrs = bracketsStrs.repeat(findDgts);
		decompressedStrs.push(decompressStrs);

		let lastDecompression = decompressedStrs[decompressedStrs.length - 1];
		let lastLBracket = lNumberIndeces[lNumberIndeces.length - 1] - 1;
		let lastRBracket = rBracketIndeces[rBracketIndeces.length - 1] + 1;
		let decompressed = strDecompression[0].replaceBetween(lastLBracket, lastRBracket, lastDecompression);
		strDecompression[0] = decompressed;
	}
	
	console.log(strDecompression[0]);
};

decompressor("1[abc]yyy10[de2[f]]zzz");