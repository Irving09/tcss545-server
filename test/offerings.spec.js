var app = require('./server');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('/offerings', function() {

  it('should return 200 with offering id 1', function(done) {
    request(app)
      .get('/api/rest/v1/offerings/1')
      .end(function(err, res) {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
  });

  it('should return 404 with non existent offering i', function(done) {
    request(app)
      .get('/api/rest/v1/offerings/9000')
      .end(function(err, res) {
        expect(res.statusCode).to.be.equal(404);
        done();
    });
  });

  it('should return 200 for all offerings', function(done) {
    request(app)
      .get('/api/rest/v1/offerings')
      .end(function(err, res) {
        expect(res.statusCode).to.be.equal(200);
        done();
    });
  });

});