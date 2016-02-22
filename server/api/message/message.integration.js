'use strict';

var app = require('../../app');
var sqldb = require('../../sqldb');
var Message = sqldb.Message;
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
    return Message.destroy({ where: {} });
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
    return Message.destroy({ where: {} });
  });


  describe('GET /api/messages', function() {
    var messages;

    beforeEach(function(done) {
      request(app)
        .get('/api/messages')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          messages = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      messages.should.be.instanceOf(Object);
      messages.data.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/messages', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/messages')
        .set('authorization', 'Bearer ' + token)
        .send({
          device: 'FF:FF:FF:FF:FF:FF',
          sender: 'Webconsole',
          delivery_type: 'TRANSIENT',
          message: 'reboot'

        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMessage = res.body;
          done();
        });
    });

    it('should respond with the newly created message', function() {

      newMessage.should.be.instanceOf(Object);
      newMessage.should.have.property('ID');
      newMessage.device.should.equal('FF:FF:FF:FF:FF:FF');
      newMessage.sender.should.equal('Webconsole');
      newMessage.delivery_type.should.equal('TRANSIENT');
      newMessage.message.should.equal('reboot');
    });

  });

  describe('GET /api/messages/:id', function() {
    var message;

    beforeEach(function(done) {
      request(app)
        .get('/api/messages/' + newMessage.ID)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          message = res.body;
          done();
        });
    });

    afterEach(function() {
      message = {};
    });

    it('should respond with the requested Message', function() {
      message.device.should.equal('FF:FF:FF:FF:FF:FF');
      message.sender.should.equal('Webconsole');
      message.delivery_type.should.equal('TRANSIENT');
      message.message.should.equal('reboot');
    });

  });

  describe('PUT /api/messages/:id', function() {
    var updatedMessage;

    beforeEach(function(done) {
      request(app)
        .put('/api/messages/' + newMessage.ID)
        .set('authorization', 'Bearer ' + token)
        .send({
            message: 'blink'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMessage = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMessage = {};
    });

    it('should respond with the updated message', function() {

      updatedMessage.message.should.equal('blink');
    });

  });

  describe('DELETE /api/messages/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/messages/' + newMessage.ID)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when message does not exist', function(done) {
      request(app)
        .delete('/api/messages/' + newMessage.ID)
        .set('authorization', 'Bearer ' + token)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
