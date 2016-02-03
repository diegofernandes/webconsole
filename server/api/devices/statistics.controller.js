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

  console.log("Statistics for device: " + req.params.device);
  var size = parseInt(req.query.size || req.query.s || 10);
  delete req.query.size;
  delete req.query.s;
  var page = parseInt(req.query.page || req.query.p || 1);
  delete req.query.page;
  delete req.query.p;
  var offset = (page -1) * size;

  query(req.query, req.params, offset, size, function(error, result, fields) {
    if (error) {
      console.error(error);
      res.status(500).json({
        'operation': 'GET',
        'status': 'INTERNAL_ERROR',
        'cause': error
      });
      return;
    }
    count(req.query, req.params, function(error, resultCount, fields) {
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

function query(queryParams, urlParams, offset, limit, cb) {
  _query(false, queryParams, urlParams, offset, limit, cb);
}

function count(queryParams, urlParams, cb) {
  _query(true, queryParams, urlParams, null, null, cb);
}

function _query(count, queryParams, urlParams, offset, limit, cb) {

  var sql = 'select ' + (count ? 'count(*) as totalElements' : '*');
  sql += " from `DeviceStatistics` where device = '" + urlParams.device + "'";
  if(! _.isEmpty(queryParams)) sql += ' and ? ';
  sql += (count ? '' : ' limit ? offset ?');

  var parameters = [];

  if (!_.isEmpty(queryParams)) {
    parameters.push(queryParams);
  }
  if (!count) {
    parameters.push(limit,offset);
  }

  console.log(sql);
  console.log("parameters: " + parameters);

  pool.query(sql, parameters, cb);
}
