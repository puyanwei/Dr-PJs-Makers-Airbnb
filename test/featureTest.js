var expect = require('chai').expect,
assert = require('assert'),
Browser = require('zombie'),
browser = new Browser(),
url = 'http://localhost:1337/';
var Camo = require('camo');

var mongojs = require('mongojs');
var db = mongojs('makersbnb', ['rooms', 'users']);
var sess;

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

    describe('/signup', function() {

        beforeEach(function () {
            db.users.remove({});
            db.users.insert({'name' : 'test', username : 'testuser', password : 'testpass', email: 'test@email.com'})

        });

        afterEach(function () {
            db.users.remove({});
            db.users.insert({'name' : 'test', username : 'testuser', password : 'testpass', email: 'test@email.com'})
        });


        it('goes to the room page after signing up', function (done) {
            browser.visit(url + 'signup', function () {
                browser.fill('input[name=name]', 'Kay Lovelace')
                    .fill('input[name=username]', 'kaylove')
                    .fill('input[name=password]', 'ilovebluejuly')
                    .fill('input[name=email]', 'klovelace@email.com')
                    .pressButton('Submit', function () {
                        expect(browser.location.pathname).to.equal('/rooms');
                        done();
                    });
            });
        });

        it('show the current user name', function (done) {
            browser.visit(url + 'signup', function () {
                browser.fill('input[name=name]', 'Kay Lovelace')
                    .fill('input[name=username]', 'kaylove')
                    .fill('input[name=password]', 'ilovebluejuly')
                    .fill('input[name=email]', 'klovelace@email.com')
                    .pressButton('Submit', function () {
                        expect(browser.text('body')).to.include('Currently logged in as: Kay Lovelace');
                        done();
                    });
            });
        });
    });
});

// location, description and price
