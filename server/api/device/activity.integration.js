'use strict';

var app = require('../../app');
var sqldb = require('../../sqldb');
var DeviceActivity = sqldb.DeviceActivity;
var User = sqldb.User;
var request = require('supertest');

var newDeviceActivity;
var user;
var token;

describe('DeviceActivity API:', function() {

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



  describe('GET /api/device/:device/activity', function() {
    var deviceActivity;

    beforeEach(function(done) {
      request(app)
        .get('/api/devices/FF:FF:FF:FF:FF:FF/activity')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          deviceActivity = res.body;
          done();
        });
    });

    it('should respond with JSON Array', function() {
      deviceActivity.should.be.instanceOf(Object);
      deviceActivity.data.should.be.instanceOf(Array);
    });
  });
});
