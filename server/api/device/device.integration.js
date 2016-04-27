/*
* Meccano IOT Webconsole
*
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.

* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
*/

'use strict';

var app = require('../../app');
var sqldb = require('../../sqldb');
var Registration = sqldb.Registration;
var User = sqldb.User;
var request = require('supertest');

var newDevice;
var user;
var token;

describe('Device API:', function() {

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
    return Registration.destroy({ where: {} });
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
    return Registration.destroy({ where: {} });
  });


  describe('GET /api/devices', function() {
    var devices;

    beforeEach(function(done) {
      request(app)
        .get('/api/devices')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          devices = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      devices.should.be.instanceOf(Object);
      devices.data.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/devices', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/devices')
        .set('authorization', 'Bearer ' + token)
        .send({
          device: 'FF:FF:FF:FF:FF:FF',
          device_group: '666',
          memo: 'Memo'

        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDevice = res.body;
          done();
        });
    });

    it('should respond with the newly created device', function() {

      newDevice.should.be.instanceOf(Object);
      newDevice.device.should.equal('FF:FF:FF:FF:FF:FF');
      newDevice.device_group.should.equal('666');
      newDevice.memo.should.equal('Memo');
    });

  });

  describe('GET /api/devices/:device', function() {
    var device;

    beforeEach(function(done) {
      request(app)
        .get('/api/devices/' + newDevice.device)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          device = res.body;
          done();
        });
    });

    afterEach(function() {
      device = {};
    });

    it('should respond with the requested Device', function() {
      device.device.should.equal('FF:FF:FF:FF:FF:FF');
      device.device_group.should.equal('666');
      device.memo.should.equal('Memo');
    });

  });

  describe('PUT /api/devices/:device', function() {
    var updatedDevice;

    beforeEach(function(done) {
      request(app)
        .put('/api/devices/' + newDevice.device)
        .set('authorization', 'Bearer ' + token)
        .send({
            device_group: '999'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDevice = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDevice = {};
    });

    it('should respond with the updated device', function() {

      updatedDevice.device_group.should.equal('999');
    });

  });

  describe('DELETE /api/devices/:device', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/devices/' + newDevice.device)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when device does not exist', function(done) {
      request(app)
        .delete('/api/devices/' + newDevice.device)
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
