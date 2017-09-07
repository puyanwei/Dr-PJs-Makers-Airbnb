var expect = require('chai').expect,
    chai = require('chai'),
    assert = require('assert'),
    should = require('chai').should,
    Browser = require('zombie'),
    browser = new Browser(),
    url = 'http://localhost:1337/';

var mongojs = require('mongojs');
var db = mongojs('makersbnb', ['rooms']);

chai.use(require('chai-dom'));



describe('Booking a Room', function() {



    describe('/rooms', function() {

        beforeEach(function() {
            db.rooms.update({}, {$set : {booked : false}}, { multi: true});
        });

        afterEach(function() {
            db.rooms.update({}, {$set : {booked : false}}, { multi: true});
        });


        it('has a "Book This Room" button', function(done) {
            browser.visit(url + 'rooms', function() {
                browser.assert.element('#BookmyRoom');
                done()
            })
        });

        it('can change a room to booked', function(done) {
            browser.visit(url + 'rooms', function() {
                browser.pressButton('form button[type="submit"][value="myRoom"]', function() {
                    assert.equal(browser.text('#BookmyRoom'), '- This room has been booked');
                    done()
                })
            })
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
                        expect(browser.location.pathname).to.equal('/rooms');
                        console.log(browser.location.pathname);
                        done();
                    });
            });
        });
    });
});