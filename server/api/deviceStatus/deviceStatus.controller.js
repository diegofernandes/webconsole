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
  " union select 'WAITING_APPROVE' as `status`, count(*) as `count` from `Registration` where `device_group` is null ";

  pool.query(sql,
            [
              5,
              6,
              15,
              15
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

  // Calculates the parameters of pagination
  var size = parseInt(req.query.size || req.query.s || 10);
  delete req.query.size;
  delete req.query.s;
  var page = parseInt(req.query.page || req.query.p || 1);
  delete req.query.page;
  delete req.query.p;
  var offset = (page -1) * size;

  var sql = "select s.* from `DeviceStatus` s where s.status = ?";
  var params = [req.params.status];

  // Execute the query
  query(sql, params, offset, size, function(error, result, fields) {
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

function query(sql, params, offset, limit, cb) {
  _query(sql, params, false, offset, limit, cb);
}

function count(sql, cb) {
  _query(sql, params, true, null, null, cb);
}

function _query(sql, params, count, offset, limit, cb) {

  var queryParams = [];

  if (!_.isEmpty(params)) {
    queryParams.push(params);
  }

  sql += (count ? '' : ' limit ? offset ?');

  if (!count) {
    queryParams.push(limit,offset);
  }

  pool.query(sql, queryParams, cb);
}
