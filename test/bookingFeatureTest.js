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

        // it('takes you to a page showing room details and availability', function(done) {
        //     browser.visit(url + 'rooms', function() {
        //         browser.pressButton('form button[type="submit"][value="myRoom"]', function() {
        //             expect(browser.location.pathname).to.equal('/rooms/book');
        //             expect(browser.text('body')).to.include('myRoom');
        //             expect(browser.text('body')).to.include('Stephen');
        //             expect(browser.text('body')).to.include('Bethnal Green');
        //             expect(browser.text('body')).to.include('Not worth it');
        //             browser.assert.element('form button[type="submit"][name="Book"]');
        //             done()
        //         })
        //     })
        // });

        it('can change a room to booked', function(done) {
            browser.visit(url + 'rooms', function() {
                browser.pressButton('form button[type="submit"][value="myRoom"]', function() {
                    assert.equal(browser.text('#BookmyRoom'), '- This room has been booked');
                    done()
                })
            })
        });
    });
});