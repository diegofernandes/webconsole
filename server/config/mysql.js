/**
 * Mysql configuration
 */

'use strict';


var config = require('./environment');
var mysql = require('mysql');
var pool = mysql.createPool(config.mysql);

module.exports = pool;
