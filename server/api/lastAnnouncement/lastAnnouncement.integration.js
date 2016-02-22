'use strict';

var app = require('../../app');
var sqldb = require('../../sqldb');
var Fact = sqldb.Fact;
var User = sqldb.User;
var request = require('supertest');

var newMessage;
var user;
var token;

describe('Message API:', function() {

  // Mock users before testing
  before(function() {
    return User.destroy({ where: {} }).then(function() {
      user = User.build({
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password'
      });

      return user.save();
    });
  });

  before(function() {
    return Fact.destroy({ where: {} });
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
    return User.destroy({ where: {} });
  });

  after(function() {
    return Fact.destroy({ where: {} });
  });


  describe('GET /api/lastAnnouncements', function() {
    var lastAnnouncements;

    beforeEach(function(done) {
      request(app)
        .get('/api/lastAnnouncements')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          lastAnnouncements = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      lastAnnouncements.should.be.instanceOf(Object);
      lastAnnouncements.data.should.be.instanceOf(Array);
    });

  });


});
