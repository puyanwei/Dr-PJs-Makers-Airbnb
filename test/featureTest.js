var expect = require('chai').expect,
    Browser = require('zombie'),
    browser = new Browser(),
    url = 'http://localhost:1337/';


describe('App', function() {



    describe('/', function() {

        it('works', function(done) {
            browser.visit(url, function() {
                expect(browser.text('body')).to.include('Welcome to Dr. PJs MakersBnB!');
                done();
            })
        });

        console.log('here');
        it('can add room with location, description and price', function(done) {
            browser.visit(url, function() {
                browser.fill('input[name=title]', 'Makers Academy')
                .fill('input[name=location]', 'London')
                .fill('input[name=description]', 'My lovely home')
                .fill('input[name=price]', '200')
                .fill('input[name=owner]', 'Kay Lovelace')
                .pressButton('Submit', function() {
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

        it('shows errors if not completing form', function(done) {
            browser.visit(url, function() {
                browser.fill('input[name=title]', 'Makers Academy')
                    .fill('input[name=description]', 'My lovely home')
                    .fill('input[name=price]', '200')
                .pressButton('Submit', function() {
                    console.log('Form submitted ok!');
                    expect(browser.text('body')).to.include('Location must be filled in');
                    done();
                })
            });
        })
    })
});

// location, description and price
