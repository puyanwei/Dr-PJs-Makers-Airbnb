var expect = require('chai').expect,
assert = require('assert'),
Browser = require('zombie'),
browser = new Browser(),
url = 'http://localhost:1337/';
var Camo = require('camo');

var mongojs = require('mongojs');
var db = mongojs('makersbnb', ['rooms', 'users']);

describe('App', function() {



    describe('/', function() {

        it('works', function(done) {
            browser.visit(url, function() {
                expect(browser.text('body')).to.include('Welcome to Dr. PJs MakersBnB!');
                browser.assert.element('form button[type="submit"][name="Visit Rooms"]');
                browser.assert.element('form button[type="submit"][name="Sign Up"]');
                done();
            })
        });


        it('shows rooms when you click Visit Rooms', function(done) {
            browser.visit(url, function() {
                browser.pressButton('Visit Rooms', function() {
                    expect(browser.text('body')).to.include('London');
                    expect(browser.text('body')).to.include('Makers Academy');
                    expect(browser.text('body')).to.include('My lovely home');
                    expect(browser.text('body')).to.include('£200');
                    expect(browser.text('body')).to.include('Kay Lovelace');
                    done();
                });
            });
        });


        it('shows sign up page when you click Sign Up', function(done) {
            browser.visit(url, function() {
                browser.pressButton('Sign Up', function() {
                    browser.assert.element('form input[type="text"][name="name"]');
                    browser.assert.element('form input[type="text"][name="username"]');
                    browser.assert.element('form input[type="text"][name="password"]');
                    browser.assert.element('form input[type="text"][name="email"]');
                    browser.assert.element('form button[type="submit"][name="submit"]');
                    done();
                });
            });
        });
    });

    describe('/signup', function(){

        beforeEach(function() {
            db.users.remove({});
        });

        afterEach(function() {
            db.users.remove({});
        });


        it('goes to the room page after signing up', function(done){
            browser.visit(url + 'signup', function() {
                browser.fill('input[name=name]', 'Kay Lovelace')
                .fill('input[name=username]', 'kaylove')
                .fill('input[name=password]', 'ilovebluejuly')
                .fill('input[name=email]', 'klovelace@email.com')
                .pressButton('Submit', function() {
                    expect(browser.location.pathname).to.equal('/rooms');
                    done();
                });
            });

        });

        it('show the current user name', function(done){
            browser.visit(url + 'signup', function() {
                browser.fill('input[name=name]', 'Kay Lovelace')
                .fill('input[name=username]', 'kaylove')
                .fill('input[name=password]', 'ilovebluejuly')
                .fill('input[name=email]', 'klovelace@email.com')
                .pressButton('Submit', function() {
                  expect(browser.text('body')).to.include('Currently logged in as: Kay Lovelace');
                  done();
                });
            });
        });

        // it('can add user into the database', function(done) {
        // browser.visit(url + 'signup', function() {
        //     browser.fill('input[name=title]', 'Makers Academy')
        //     .fill('input[name=location]', 'London')
        //     .fill('input[name=description]', 'My lovely home')
        //     .fill('input[name=price]', '200')
        //     .fill('input[name=owner]', 'Kay Lovelace')
        //     .pressButton('Submit', function() {
        //         console.log('Form submitted ok!');
        //         expect(browser.text('body')).to.include('London');
        //         expect(browser.text('body')).to.include('Makers Academy');
        //         expect(browser.text('body')).to.include('My lovely home');
        //         expect(browser.text('body')).to.include('£200');
        //         expect(browser.text('body')).to.include('Kay Lovelace');
        //         done();
        //     });
        // });
        // });









        // it('should save a user to the database', function (done){

        //     Camo.connect('mongodb://localhost/users').then(function(db) {
        //         database = db;
        //         return database.dropDatabase();
        //     }).then(function() {}).then(done, done);



        //     done();



        // })
    });



    // console.log('here');
    // it('can add room with location, description and price', function(done) {
    //     browser.visit(url, function() {
    //         browser.fill('input[name=title]', 'Makers Academy')
    //         .fill('input[name=location]', 'London')
    //         .fill('input[name=description]', 'My lovely home')
    //         .fill('input[name=price]', '200')
    //         .fill('input[name=owner]', 'Kay Lovelace')
    //         .pressButton('Submit', function() {
    //             console.log('Form submitted ok!');
    //             expect(browser.text('body')).to.include('London');
    //             expect(browser.text('body')).to.include('Makers Academy');
    //             expect(browser.text('body')).to.include('My lovely home');
    //             expect(browser.text('body')).to.include('£200');
    //             expect(browser.text('body')).to.include('Kay Lovelace');
    //             done();
    //         });
    //     });
    // });

    // it('shows errors if not completing form', function(done) {
    //     browser.visit(url, function() {
    //         browser.fill('input[name=title]', 'Makers Academy')
    //             .fill('input[name=description]', 'My lovely home')
    //             .fill('input[name=price]', '200')
    //         .pressButton('Submit', function() {
    //             console.log('Form submitted ok!');
    //             expect(browser.text('body')).to.include('Location must be filled in');
    //             done();
    //         })
    //     });
    // })

});

// location, description and price
