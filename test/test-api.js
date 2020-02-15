var expect  = require('chai').expect;
var request = require('request');
var DV = require('./../services/dv')

it('Main page content', function(done) {
    request('http://localhost:8080' , function(error, response, body) {
        expect(body).to.equal('Hello World');
        done();
    });
});