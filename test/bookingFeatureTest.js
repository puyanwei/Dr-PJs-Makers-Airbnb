var expect = require('chai').expect,
    assert = require('assert'),
    Browser = require('zombie'),
    browser = new Browser(),
    url = 'http://localhost:1337/';


describe('Booking a Room', function() {



    describe('/rooms', function() {

        it('has a "Book This Room" button', function(done) {
            browser.visit(url + 'rooms', function() {
                browser.assert.elements('form button[type="submit"][name="bookThisRoom"]');
                done()
            })
        });

        // it('');



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
                    console.log('Form submitted ok!');
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
                    console.log('Form submitted ok!');
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

        it('creates a new user when you sign up', function(done){
            browser.visit(url + 'signup', function() {
                browser.fill('input[name=name]', 'Kay Lovelace')
                    .fill('input[name=username]', 'kaylove')
                    .fill('input[name=password]', 'ilovebluejuly')
                    .fill('input[name=email]', 'klovelace@email.com')
                    .pressButton('Submit', function() {
                    });
                expect(browser.location.pathname).to.equal('/rooms');
                console.log('this is the url');
                console.log(browser.location.pathname);
                done();
            });
        });
    });
});