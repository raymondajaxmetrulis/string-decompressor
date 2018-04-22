const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');

const stringDecompressor = require('./lib/stringDecompressor');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.static(__dirname));

app.get('/', function(request, response) {
	response.render('index');
});

app.get('*', function(request, response) {
	response.status(400).send('Wrong url');
});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});