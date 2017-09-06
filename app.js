var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var signup = require('./routes/signup');
var index = require('./routes/index');
var rooms = require('./routes/rooms');
var users = require('./routes/users');

var app = express();

// var logger = function(req, res, next) {
//   console.log('logging...');
//   next()
// };
// app.use(logger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(function(req, res, next) {
  res.locals.errors = null;
  next()
});
app.use(expressValidator());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', index);
app.use('/signup', signup);
app.use('/rooms', rooms);
app.use('/users', users);

var server = app.listen(1337, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app running at http://%s:%s', host, port);
});
