/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var proxy = require('express-http-proxy');
var config = require('./config/environment');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/devices', require('./api/device'));
  app.use('/api/deviceStatus', require('./api/deviceStatus'));
  app.use('/api/lastAnnouncements', require('./api/lastAnnouncement'));
  app.use('/api/messages', require('./api/message'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/releases', require('./api/release'));
  app.use('/api/plugins', require('./api/plugin'));

  if (config.servicemaneger && config.servicemaneger.url) {
    app.use('/api/reports', proxy(config.servicemaneger.url, {
      forwardPath: function(req, res) {
        return require('url').parse(req.url).path;
      }
    }));
  }

  app.use('/auth', require('./auth'));
  app.use('/nav', require('./nav'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile('index.html', {
        root: app.get('appPath')
      });
    });
};
