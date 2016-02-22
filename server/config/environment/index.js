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
var _ = require('lodash');
var yamlConfig = require('node-yaml-config');

// Set default node environment to development
process.env.CONFIG_FILE = process.env.CONFIG_FILE ||  path.normalize(__dirname + '/../../../config/config.yml');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Try loading the configuration file, if exists
var conf = yamlConfig.load(process.env.CONFIG_FILE, process.env.NODE_ENV);

// Load other configuration from environment or config file
process.env.PORT = process.env.PORT || conf.port || 9000;
process.env.ADDRESS = process.env.ADDRESS || conf.address || 'localhost';
process.env.SEED_DB = process.env.SEED_DB || conf.seedDB || false;
process.env.MYSQL_URI = process.env.MYSQL_URI || conf.mysql.uri;

console.log();
console.log("===================================================================");
console.log("*** Meccano IoT Gateway Configuration ***")
console.log("NODE_ENV: " + process.env.NODE_ENV);
console.log("CONFIG_FILE: " + process.env.CONFIG_FILE);
console.log("PORT: " + process.env.PORT);
console.log("ADDRESS: " + process.env.ADDRESS);
console.log("SEED_DB: " + process.env.SEED_DB);
console.log("MYSQL_URI: " + process.env.MYSQL_URI);
console.log("===================================================================");
console.log();

// Merge of configuration (environment + yaml)
conf.port = process.env.PORT;
conf.address = process.env.ADDRESS;
conf.seedDB = process.env.SEED_DB;
conf.mysql.uri = process.env.MYSQL_URI;

var all = {
 env: process.env.NODE_ENV,

 api:{security:true},

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
};

module.exports = _.merge(all, conf || {});
