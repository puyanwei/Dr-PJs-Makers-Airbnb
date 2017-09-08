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



describe('Signing up', function() {



    describe('/rooms', function() {

        beforeEach(function() {
            db.rooms.update({}, {$set : {booked : false}}, { multi: true});
        });

        afterEach(function() {
            db.rooms.update({}, {$set : {booked : false}}, { multi: true});
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
