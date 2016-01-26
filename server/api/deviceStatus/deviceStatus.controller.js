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
var _ = require('lodash');

var config = require('../../config/environment');
var pool = require('../../config/mysql');

/**
**  Count the number of devices for each status
**/
exports.count = function(req, res) {

  var sql = "select 'NORMAL' as `status`, count(*) as `count` from `Announcement` where timestampdiff(minute, `lastAnnouncementDate`, now()) <= ? " +
  " union select 'WARNING' as `status`, count(*) as `count` from `Announcement` where timestampdiff(minute, `lastAnnouncementDate`, now()) between ? and ? " +
  " union select 'FAIL' as `status`, count(*) as `count` from `Announcement` where timestampdiff(minute, `lastAnnouncementDate`, now()) > 15 " +
  " union select 'WAITING_APPROVE' as `status`, count(*) as `count` from `Registration` where `registrationDate` is null ";

  pool.query(sql,
            [
              config.timeouts.warning,
              (config.timeouts.warning + 1),
              config.timeouts.fail,
              config.timeouts.fail
            ],
            function(error, result, fields) {
              if (error) {
                console.error(error);
                res.status(500).json({
                  'operation': 'GET',
                  'status': 'INTERNAL_ERROR',
                  'cause': error
                });
                return;
              }
              res.json({
                data: result,
                page: {
                  size: result.length,
                  totalElements: result.length,
                  totalPages: 1,
                  number: 1
                }
              });
  });
}


/**
**  Filter devices by status
**/
exports.status = function(req, res) {
  var sql = "";
  if(req.params.status === "NORMAL") {
    sql = "select r.* from `Announcement` a, `Registration` r where timestampdiff(minute, `lastAnnouncementDate`, now()) < " + config.timeouts.warning + " and a.device = r.device ";
  } else if (req.params.status === "WARNING") {
    sql = "select r.* from `Announcement` a, `Registration` r  where timestampdiff(minute, `lastAnnouncementDate`, now()) between " + (config.timeouts.warning + 1) + " and " + config.timeouts.fail + "  and a.device = r.device ";
  } else if (req.params.status === "FAIL") {
    sql = "select r.* from `Announcement` a, `Registration` r  where timestampdiff(minute, `lastAnnouncementDate`, now()) > " + config.timeouts.fail + " and a.device = r.device ";
  } else if (req.params.status === "WAITING_APPROVE") {
    sql = "select * from `Registration` where `registrationDate` is null ";
  } else {
    res.status(500).json({
      'operation': 'GET',
      'status': 'INVALID_PARAMETER',
      'cause': error
    });
    return;
  }

  // Calculates the parameters of pagination
  var size = parseInt(req.query.size || req.query.s || 10);
  delete req.query.size;
  delete req.query.s;
  var page = parseInt(req.query.page || req.query.p || 1);
  delete req.query.page;
  delete req.query.p;
  var offset = (page -1) * size;

  // Execute the query
  query(sql, offset, size, function(error, result, fields) {
      if (error) {
                console.error(error);
                res.status(500).json({
                  'operation': 'GET',
                  'status': 'INTERNAL_ERROR',
                  'cause': error
                });
                return;
              }
              res.json({
                data: result,
                page: {
                  size: result.length,
                  totalElements: result.length,
                  totalPages: 1,
                  number: 1
                }
              });
  });
}

function query(sql, offset, limit, cb) {
  _query(sql, false, offset, limit, cb);
}

function count(sql, cb) {
  _query(sql, true, null, null, cb);
}

function _query(sql, count, offset, limit, cb) {
  var queryParams = [];

  sql += (count ? '' : ' limit ? offset ?');

  if (!count) {
    queryParams.push(limit,offset);
  }

  pool.query(sql, queryParams, cb);
}
