var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var Room = require('./models/room');
var mongojs = require('mongojs');
var db = mongojs('makersbnb', ['rooms']);

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

var current_user = null;

app.get('/', function(req, res) {
    db.rooms.find(function (err, docs) {
        console.log(docs);
        res.render('index', {
            rooms: docs,
            current_user: current_user
        });
    });
});

app.post('/rooms/add', function(req, res) {

    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('location' , 'Location must be filled in').notEmpty();
    req.checkBody('description', 'Description must be filled in').notEmpty();
    req.checkBody('price'       , 'Price must be filled in').notEmpty();
    req.checkBody('owner'       , 'Owner must be filled in').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        db.rooms.find(function (err, docs) {
            console.log(docs);
            res.render('index', {
                rooms: docs,
                errors: errors
            });
        });
    } else {
        var newRoom = new Room(req.body.owner,
                                req.body.title,
                                req.body.location,
                                req.body.description,
                                req.body.price);
        db.rooms.insert(newRoom);
        db.rooms.find(function (err, docs) {
            console.log(docs);
            res.render('index', {
                rooms: docs
            });
        });
    }
});


var server = app.listen(1337, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app running at http://%s:%s', host, port);
});
