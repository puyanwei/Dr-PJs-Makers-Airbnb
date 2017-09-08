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
            db.rooms.insert({"title" : "myRoom", "location" : "Bethnal Green", "description" : "Not worth it", "price" : "200", "owner" : "sgeller", "booked" : false });

        });

        afterEach(function() {
            db.rooms.remove({"title" : "myRoom"});
        });


        it('has a "Book This Room" button', function(done) {
            browser.visit(url + 'rooms', function() {
                browser.assert.element('#BookmyRoom');
                done()
            })
        });

        it('takes you to a page showing room details and availability', function(done) {
            browser.visit(url + 'rooms', function() {
                browser.pressButton('form button[type="submit"][value="myRoom"]', function() {
                    expect(browser.location.pathname).to.equal('/rooms/book');
                    expect(browser.text('body')).to.include('myRoom');
                    expect(browser.text('body')).to.include('sgeller');
                    expect(browser.text('body')).to.include('Bethnal Green');
                    expect(browser.text('body')).to.include('Not worth it');
                    browser.assert.element('form button[type="submit"][name="bookRoomName"]');
                    browser.assert.element('form button[type="submit"][name="viewRooms"]');
                    done()
                })
            })
        });

        it('shows that a room has been booked', function(done) {
          browser.visit(url + 'rooms', function() {
            browser.pressButton('form button[type="submit"][value="myRoom"]', function() {
              browser.pressButton('form button[type="submit"][name="bookRoomName"]', function() {
                expect(browser.location.pathname).to.equal('/rooms');
                assert.equal(browser.text('#BookmyRoom'), '- This room has been booked');
                done()
              })
            })
          });
        });

        it('takes you back to the rooms page and ', function(done) {
          browser.visit(url + 'rooms', function() {
            browser.pressButton('form button[type="submit"][value="myRoom"]', function() {
              browser.pressButton('form button[type="submit"][name="viewRooms"]', function() {
                expect(browser.location.pathname).to.equal('/rooms');
                browser.assert.element('#BookmyRoom');
                done()
              })
            })
          });
        });

        // it('can change a room to booked', function(done) {
        //     browser.visit(url + 'rooms', function() {
        //         browser.pressButton('form button[type="submit"][value="myRoom"]', function() {
        //             assert.equal(browser.text('#BookmyRoom'), '- This room has been booked');
        //             done()
        //         })
        //     })
        // });
    });
});
