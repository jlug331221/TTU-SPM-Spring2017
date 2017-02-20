var should = require('should');
var request = require('request');
var expect = require('chai').expect;
var baseUrl = "http://localhost:3001";
var util = require('util');

describe('first test', function() {
    it('first test', function(done) {
        request.get({ url: baseUrl + '/api/dishes' }, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            console.log(body);
            done();
        });
    });
});
