'use strict';

var app = require('../../app');
var sqldb = require('../../sqldb');
var HistoryStatus = sqldb.HistoryStatus;
var User = sqldb.User;
var request = require('supertest');

var newHistoryStatus;
var user;
var token;

describe('HistoryStatus API:', function() {

  // Mock users before testing
  before(function() {
    return User.destroy({
      where: {}
    }).then(function() {
      user = User.build({
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password'
      });

      return user.save();
    });
  });


  // Login
  before(function(done) {
    request(app)
      .post('/auth/local')
      .send({
        email: 'test@example.com',
        password: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  // Clear users after testing
  after(function() {
    return User.destroy({
      where: {}
    });
  });



  describe('GET /api/deviceStatus/history', function() {
    var historyStatus;

    beforeEach(function(done) {
      request(app)
        .get('/api/deviceStatus/history')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          historyStatus = res.body;
          done();
        });
    });

    it('should respond with JSON Array', function() {
      historyStatus.should.be.instanceOf(Array);
    });
  });
});
