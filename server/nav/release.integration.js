'use strict';

var app = require('../app');
var sqldb = require('../sqldb');
var User = sqldb.User;
var request = require('supertest');

var user;
var token;

describe('Nav API:', function() {

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
    return Nav.destroy({ where: {} });
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
    return Nav.destroy({ where: {} });
  });


  describe('GET /nav', function() {
    var navConfig;

    beforeEach(function(done) {
      request(app)
        .get('/nav')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          navConfig = res.body;
          done();
        });
    });

    it('should respond with reports false', function() {
      navConfig.should.be.instanceOf(Object);
      navConfig.reports.should.be.false;
    });

  });

});
