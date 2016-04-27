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
var Plugin = sqldb.Plugin;
var PluginConfiguration = sqldb.PluginConfiguration;
var User = sqldb.User;
var request = require('supertest');

var newPlugin;
var user;
var token;

describe('Plugin API:', function() {

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
    return Plugin.destroy({ where: {} });
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
    var deleted = PluginConfiguration.destroy({ where: {} }) &&
                Plugin.destroy({ where: {} });
    return deleted;
  });

  describe('GET /api/plugins', function() {
    var plugins;

    beforeEach(function(done) {
      request(app)
        .get('/api/plugins')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          plugins = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      plugins.should.be.instanceOf(Object);
      plugins.data.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/plugins', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/plugins')
        .set('authorization', 'Bearer ' + token)
        .send({
                "id": "test",
                "name": "test",
                "version": "1.0.0",
                "engine": "R",
                "enabled": true,
                "schedule": "* * * * *",
                "description": "Automated test for plugin API (version 1.0)",
                "type": "worker",
                "executionContext": "both",
                "author": "Meccano-IoT",
                "authorContact": "http://www.meccano-iot.com",
                "documentation": "https://github.com/meccano-iot/docs/blob/master/README.md",
                "repository": "https://github.com/meccano-iot/docs/",
                "release": "https://github.com/meccano-iot/docs/releases/download/v1.0.0/meccano-docs-v1.0.0.zip",
                "parameters": "PARAMETER_A:ALL,PARAMETER_B:NONE"
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPlugin = res.body;
          done();
        });
    });

    it('should respond with the newly created plugin', function() {
      newPlugin.should.be.instanceOf(Object);
      newPlugin.should.have.property('name');
      newPlugin.name.should.equal('test');
      newPlugin.version.should.equal('1.0.0');
    });

  });

  /*

  describe('GET /api/plugins/:id', function() {
    var plugin;

    beforeEach(function(done) {
      request(app)
        .get('/api/plugins/' + newplugin.id)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          plugin = res.body;
          done();
        });
    });

    afterEach(function() {
      plugin = {};
    });

    it('should respond with the requested Plugin', function() {
      plugin.id.should.equal('test');
      plugin.version.should.equal('1.0.0');
      plugin.author.should.equal('Meccano-IoT');
    });

  });

  describe('PUT /api/plugins/:id', function() {
    var updatedPlugin;

    beforeEach(function(done) {
      request(app)
        .put('/api/plugins/' + newPlugin.id)
        .set('authorization', 'Bearer ' + token)
        .send({
            engine: 'Python'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPlugin = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPlugin = {};
    });

    it('should respond with the updated plugin', function() {
      updatedPlugin.engine.should.equal('Python');
    });

  });

  describe('DELETE /api/plugins/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/plugins/' + newPlugin.id)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when plugin does not exist', function(done) {
      request(app)
        .delete('/api/plugins/' + newPlugin.id)
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
*/
});
