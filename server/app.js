/**
 * Main application file
 */

'use strict';


var path = require('path');

// Set default node environment to development
process.env.CONFIG_FILE = process.env.CONFIG_FILE ||  path.normalize(__dirname + '/../config/config.yml');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/environment');

if(!config.api.security){
  console.warn('Be carrefull!! API security turned OFF!!!');
}

var sqldb = require('./sqldb');
if (config.seedDB) {
  require('./config/seed')();
}



var express = require('express');


// Setup server
var app = express();
var server = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);


// Start server
function startServer() {
  server.listen(config.port, config.address, function() {
    console.log('Meccano IoT Webconsole listening on %d, in %s mode', config.port, app.get('env'));
  });
}

sqldb.sequelize.sync()
  .then(startServer)
  .catch(function(err) {
    console.log('Server failed to start due to error: %s', err);
  });

// Expose app
exports = module.exports = app;
