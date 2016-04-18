/*
* Meccano IOT Gateway
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
var path = require('path');
var util = require('util');
var _ = require('lodash');
var yamlConfig = require('./yml');

// Set default node environment to development
process.env.CONFIG_FILE = process.env.CONFIG_FILE || path.normalize(__dirname + '/../../../config/config.yml')
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var all = {
  env: process.env.NODE_ENV,

  api: {
    security: true
  },

  showConfig: true,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),


  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'meccano-webconsole-secret',
    sessionTime: '30m'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  port: 9000,
  address: 'localhost',
  mysql: {
    uri: undefined,
    username: undefined,
    password: undefined,
    database: undefined,
    options: {
      dialect: 'mysql',
      logging: false,
      pool: {
        maxConnections: 5,
        minConnections: 1
      },
      host: undefined,
      port: undefined
    }
  },
  servicemaneger: {
    url: undefined
  }
};

var config = _.merge(all, yamlConfig(), require('./env'));

if (config.showConfig) {
  console.log();
  console.log("===================================================================");
  console.log("*** Meccano IoT Webconsole Configuration ***")
  console.log("NODE_ENV: " + process.env.NODE_ENV);
  console.log("CONFIG_FILE: " + process.env.CONFIG_FILE);
  show(config);
  console.log("===================================================================");
  console.log();
}

function show(object, parent) {
  _.forIn(object, function(value, key) {
    var completeKey;
    if (parent) {
      completeKey = parent + '_' + key;
    } else {
      completeKey = key;
    }
    if (util.isArray(value)) {
      console.log(completeKey.toUpperCase(), value);
    } else if (util.isObject(value)) {
      show(value, completeKey);
    } else {
      if (util.isNullOrUndefined(value)) {
        delete object[key];
      } else {
        console.log('%s: %s', completeKey.toUpperCase(), value);
      }
    }
  });
}

if ((config.mysql.uri && (config.mysql.database || config.mysql.username || config.mysql.password || config.mysql.options.host || config.mysql.options.port))) {
  console.error('CONFIG ERROR!!\n\tYou should only specify MYSQL_URI and MYSQL_[DATABASE,USERNAME,PASSWORD,HOST,PORT]');
  process.exit(1);
}

if (config.mysql.options.logging) {
  config.mysql.options.logging = console.log;
} else {
  config.mysql.options.logging = false
}

module.exports = config;
