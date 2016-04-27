'use strict';

var app = require('../../app');
var sqldb = require('../../sqldb');
var Release = sqldb.Release;
var User = sqldb.User;
var request = require('supertest');

var newRelease;
var user;
var token;

describe('Release API:', function() {

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

  before(function() {
    return Release.destroy({
      where: {}
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

  after(function() {
    return Release.destroy({
      where: {}
    });
  });


  describe('GET /api/releases', function() {
    var releases;

    beforeEach(function(done) {
      request(app)
        .get('/api/releases')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          releases = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      releases.should.be.instanceOf(Object);
      releases.data.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/releases', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/releases')
        .set('authorization', 'Bearer ' + token)
        .field('version', 'v0.0.1')
        .field('type', 'ESP8266')
        .field('description', 'New version')
        .attach('firmware', new Buffer('TESTE'), 'TESTE.bin')
        .send()
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRelease = res.body;
          done();
        });
    });

    it('should respond with the newly created release', function() {

      newRelease.should.be.instanceOf(Object);
      newRelease.should.have.property('id');
      newRelease.version.should.equal('0.0.1');
      newRelease.type.should.equal('ESP8266');

    });

  });

  describe('GET /api/releases/:id', function() {
    var release;

    beforeEach(function(done) {
      request(app)
        .get('/api/releases/' + newRelease.id)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          release = res.body;
          done();
        });
    });

    afterEach(function() {
      release = {};
    });

    it('should respond with the requested Release', function() {
      release.id.should.equal(newRelease.id);
      release.version.should.equal('0.0.1');
      release.type.should.equal('ESP8266');
    });

  });

  describe('GET /api/releases/:id/download', function() {
    it('should respond with download file', function(done) {
      request(app)
        .get('/api/releases/' + newRelease.id + '/download')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', 'application/octet-stream')
        .expect('Content-Disposition', 'attachment; filename=meccano-esp8266-0.0.1.bin')
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });



  describe('PUT /api/releases/:id', function() {
    var updatedRelease;

    beforeEach(function(done) {
      request(app)
        .put('/api/releases/' + newRelease.id)
        .set('authorization', 'Bearer ' + token)
        .send({
          description: 'UPDATE'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRelease = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRelease = {};
    });

    it('should respond with the updated release', function() {

      updatedRelease.description.should.equal('UPDATE');
    });

  });

  describe('DELETE /api/releases/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/releases/' + newRelease.id)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when release does not exist', function(done) {
      request(app)
        .delete('/api/releases/' + newRelease.id)
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
