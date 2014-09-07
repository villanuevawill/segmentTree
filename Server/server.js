var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var tests = require('./files/test.js').testAnswers;
var interval = require('./files/calc.js').interval;

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'../client/index.html'));
});

app.get('/input/:id', function(req, res){
	console.log('request', req.params.id);
	var node = interval.find(req.params.id);
	res.json(node);
});

app.get('/test', function(req,res){
	res.json(tests());
})

app.post('/input/node', function(req, res){
	var node = req.body;
});

app.listen(8000);