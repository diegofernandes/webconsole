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


exports.statistics = function(req, res) {
  var size = parseInt(req.query.size || req.query.s || 10);
  delete req.query.size;
  delete req.query.s;
  var page = parseInt(req.query.page || req.query.p || 1);
  delete req.query.page;
  delete req.query.p;
  var offset = (page -1) * size;

  query(req.query, offset, size, function(error, result, fields) {
    if (error) {
      console.error(error);
      res.status(500).json({
        'operation': 'GET',
        'status': 'INTERNAL_ERROR',
        'cause': error
      });
      return;
    }
    count(req.query, function(error, resultCount, fields) {
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

function query(params, offset, limit, cb) {
  _query(false, params, offset, limit, cb);
}

function count(params, cb) {
  _query(true, params, null, null, cb);
}

function _query(count, params, offset, limit, cb) {

  var sql = 'select ' + (count ? 'count(*) as totalElements' : '*');
  sql += ' from `DeviceStatistics` ';
  if(! _.isEmpty(params)) sql += 'where ? ';
  sql += (count ? '' : ' limit ? offset ?');


  var queryParamns = [];
  if (!_.isEmpty(params)) {
    queryParamns.push(params);
  }
  if (!count) {
    queryParamns.push(limit,offset);
  }

  pool.query(sql, queryParamns, cb);
}
