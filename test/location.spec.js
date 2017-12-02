var app = require('./server');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('/locations', function() {

  it('should return 200 with location id 1', function(done) {
    request(app)
      .get('/api/rest/v1/locations/1')
      .end(function(err, res) {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
  });

  it('should return 404 with non existent menu 9000', function(done) {
    request(app)
      .get('/api/rest/v1/locations/9000')
      .end(function(err, res) {
        expect(res.statusCode).to.be.equal(404);
        done();
    });
  });

  it('should return 200 for all menu', function(done) {
    request(app)
      .get('/api/rest/v1/locations')
      .end(function(err, res) {
        expect(res.statusCode).to.be.equal(200);
        done();
    });
  });

});