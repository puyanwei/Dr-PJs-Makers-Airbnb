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
app.use(express.static(path.join(__dirname, 'public')));

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

var users = [{
    first_name: 'Jeff',
    last_name: 'Goldblum',
    age: 30
  },
  {
    first_name: 'Sarah',
    last_name: 'Connor',
    age: 23
  },
  {
    first_name: 'John',
    last_name: 'Doe',
    age: 12
  }
];


app.get('/', function(req, res) {
  res.render('index', {
    title: 'Customers',
    users: users
  });
});

app.post('/users/add', function(req, res) {

  // Set some rules for this field
  req.checkBody('first_name', 'First name is Required').notEmpty();
  req.checkBody('last_name', 'Last name is Required').notEmpty();
  req.checkBody('age', 'Age is Required').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.render('index', {
      title: 'Customers',
      users: users,
      errors: errors
    });
  } else {
    var newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      age: req.body.age
    };

    console.log('SUCCESS!');
    res.render('index', {
      title: 'Customers',
      users: users
    });
  }

  console.log(newUser);
  users.push(newUser);

});

app.get('/goodbye', function(req, res) {
  // renders the file 'index.ejs' from views
  res.render('index', {
    title: 'other title!',
    users: users
  })
});


var server = app.listen(1337, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app running at http://%s:%s', host, port);
});
