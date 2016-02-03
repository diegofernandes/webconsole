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
var pool = require('../../config/mysql');


exports.find = function(req, res) {

  console.log("Activity for device: " + req.params.device);

  var size = parseInt(req.query.size || req.query.s || 10);
  delete req.query.size;
  delete req.query.s;
  var page = parseInt(req.query.page || req.query.p || 1);
  delete req.query.page;
  delete req.query.p;
  var offset = (page -1) * size;

  var parameters = _.merge(req.query, req.params);

  query(parameters, offset, size, function(error, result, fields) {
    if (error) {
      console.error(error);
      res.status(500).json({
        'operation': 'GET',
        'status': 'INTERNAL_ERROR',
        'cause': error
      });
      return;
    }
    count(parameters, function(error, resultCount, fields) {
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
          size: size,
          totalElements: resultCount[0].totalElements,
          totalPages: Math.ceil(resultCount[0].totalElements / size),
          number: page
        }
      });
    });
  });
}

function query(parameters, offset, limit, cb) {
  _query(false, parameters, offset, limit, cb);
}

function count(parameters, cb) {
  _query(true, parameters, null, null, cb);
}

function _query(count, parameters, offset, limit, cb) {

  var sql = 'select ' + (count ? 'count(*) as totalElements ' : '*') + ' from `DeviceActivity` ';
  if(! _.isEmpty(parameters)) {
    sql += ' where ? ';
    for(var p=1; p<parameters; p++) {
      sql += " and ? ";
    }
  }
  sql += (count ? '' : ' limit ? offset ?');

  var queryParams = [];

  if (!_.isEmpty(parameters)) {
    queryParams.push(parameters);
  }
  if (!count) {
    queryParams.push(limit,offset);
  }

  pool.query(sql, queryParams, cb);
}
