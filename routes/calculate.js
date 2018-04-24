var express = require('express');
var router = express.Router();
const stringDecompressor = require('../static/lib/stringDecompressor');

router.get('/', function(req, res, next) {
	res.render('index');
});

router.post('/', function(req, res, next) {
	let compressed = req.body.compression.toString();
	let result = stringDecompressor(compressed);
	res.render('result', {
		result: result
	});	
});

module.exports = router;