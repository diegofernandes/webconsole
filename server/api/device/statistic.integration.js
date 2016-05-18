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
var DeviceStatistics = sqldb.DeviceStatistics;
var User = sqldb.User;
var request = require('supertest');

var newDeviceStatistics;
var user;
var token;

describe('DeviceStatistics API:', function() {

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



  describe('GET /api/device/:device/statistics', function() {
    var deviceStatistics;

    beforeEach(function(done) {
      request(app)
        .get('/api/devices/FF:FF:FF:FF:FF:FF/statistics')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          deviceStatistics = res.body;
          done();
        });
    });

    it('should respond with JSON Array', function() {
      deviceStatistics.should.be.instanceOf(Object);
      deviceStatistics.data.should.be.instanceOf(Array);
    });
  });
});
