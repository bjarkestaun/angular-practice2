var express = require('express');
var path = require('path');

var app = express();

var port = 4568;

app.listen(port);

app.use(express.static(path.join(__dirname, '/')));
