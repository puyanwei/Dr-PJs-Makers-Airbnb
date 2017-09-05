var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();

// app.get(path, callback function).

var logger = function(req, res, next) {
  console.log('logging');
  next()
};

// Logger is referred to as middleware, all logger stuff needs to be above path definitions
// 'app.use' runs whatever inside it runs every time you run a page
app.use(logger);

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Set Static Path
// app.use(express.static(path.join(__dirname, 'public')));

// Global vars
app.use(function(req, res, next) {
  res.locals.errors = null;
  next()
});

// Sets up error formatting when things aren't inputted correctly
app.use(expressValidator());

// view engine, accesses files within the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var rooms = [];

// Our paths!
app.get('/', function(req, res) {
    res.render('index', {
      rooms: rooms
    })
});

app.post('/rooms/add', function(req, res) {

    var newRoom = {
      title         : req.body.title,
      location      : req.body.location,
      description   : req.body.description,
      price         : req.body.price

    };

    rooms.push(newRoom);
    console.log(rooms);

    res.render('index', {
      rooms: rooms
    })
});



var server = app.listen(1337, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app running at http://%s:%s', host, port);
});
