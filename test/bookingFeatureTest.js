var expect = require('chai').expect,
    assert = require('assert'),
    Browser = require('zombie'),
    browser = new Browser(),
    url = 'http://localhost:1337/';


describe('Booking a Room', function() {



    describe('/rooms', function() {

        it('has a "Book This Room" button', function(done) {
            browser.visit(url + 'rooms', function() {
                browser.pressButton('form button[type="submit"][name="bookmyRoom"]');
                expect(browser.assert.element('form button[type="submit"][name="bookmyRoom"]')).to.be.undefined;
                done()
            })
        });

        it('can change a room to booked', function() {
            browser.visit(url + 'rooms', function() {
                browser.pressButton('form button[type="submit"][name="bookmyRoom"]', function() {
                    expect(browser.text('body')).to.include('form button[type="submit"][name="bookJohnnyroom"]');
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
                    });
                expect(browser.location.pathname).to.equal('/rooms');
                console.log('this is the url');
                console.log(browser.location.pathname);
                done();
            });
        });
    });
});