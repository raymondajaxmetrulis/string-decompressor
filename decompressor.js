const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(require('less-middleware')(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, '/static')));

let routes = require('./routes/calculate');

app.use('/', routes);

app.get('*', function(request, response) {
	response.status(400).send('Wrong url');
});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});