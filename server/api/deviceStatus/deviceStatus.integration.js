'use strict';

var app = require('../../app');
var sqldb = require('../../sqldb');
var DeviceStatus = sqldb.DeviceStatus;
var User = sqldb.User;
var request = require('supertest');

var newDeviceStatus;
var user;
var token;

describe('DeviceStatus API:', function() {

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



  describe('GET /api/deviceStatus', function() {
    var deviceStatus;

    beforeEach(function(done) {
      request(app)
        .get('/api/deviceStatus')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          deviceStatus = res.body;
          done();
        });
    });

    it('should respond with JSON Object', function() {
      deviceStatus.should.be.instanceOf(Object);
      deviceStatus.data.should.be.instanceOf(Object);
      deviceStatus.data.NORMAL.should.be.equal(0);
      deviceStatus.data.FAIL.should.be.equal(0);
      deviceStatus.data.WARNING.should.be.equal(0);
      deviceStatus.data.WAITING_APPROVE.should.be.equal(0);
    });
  });


  describe('GET /api/deviceStatus/status', function() {
    var deviceStatus;

    beforeEach(function(done) {
      request(app)
        .get('/api/deviceStatus/status')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          deviceStatus = res.body;
          done();
        });
    });

    it('should respond with JSON Object', function() {
      deviceStatus.should.be.instanceOf(Object);
      deviceStatus.data.should.be.instanceOf(Array);
    });

  });


  describe('GET /api/deviceStatus/:device', function() {
    var deviceStatus;

    beforeEach(function(done) {
      request(app)
        .get('/api/deviceStatus/123')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          deviceStatus = res.body;
          done();
        });
    });

    it('should respond with JSON Object', function() {
      deviceStatus.should.be.instanceOf(Object);
      deviceStatus.data.should.be.instanceOf(Array);
    });

  });


  describe('GET /api/deviceStatus/status/:device', function() {
    var deviceStatus;

    beforeEach(function(done) {
      request(app)
        .get('/api/deviceStatus/status/NORMAL')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          deviceStatus = res.body;
          done();
        });
    });

    it('should respond with JSON Object', function() {
      deviceStatus.should.be.instanceOf(Object);
      deviceStatus.data.should.be.instanceOf(Array);
    });
  });
});
