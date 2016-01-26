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

console.log(pool);

exports.find = function(req, res) {
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
  sql += ' from `IOTDB`.`Registration`' + ((_.isEmpty(params)) ? '' : ' where ?');
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

/**
 * Saves the object to the database
 */
exports.saveRegistration = function(req, res) {
  console.log("Persisting registration information to the database...");
  var op = pool.query('insert into `IOTDB`.`Registration` set ?', req.body, function(error, result) {
    if (error) {
      console.error('Error persisting object:', error);
      res.status(500).json({
        operation: 'POST',
        status: 'INTERNAL_ERROR',
        cause: error
      });
    } else {
      console.log("Data successfuly persisted to database...");
      res.status(200).json({
        operation: 'POST',
        status: 'WAITING_ACKNOWLEDGEMENT'
      });
    }
  });
}

exports.update = function(req, res) {

  var newValues = {};
  if (req.body.device_group) {
    newValues.device_group = req.body.device_group;
  }
  if (req.body.memo) {
    newValues.memo = req.body.memo;
  }


  var op = pool.query('update Registration set ? where `device` = ? ', [newValues, req.params.device], function(error, result) {
    if (error) {
      console.error('Error persisting object:', error);
      res.status(500).json({
        operation: 'PUT',
        status: 'INTERNAL_ERROR',
        cause: error
      });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({
          operation: 'PUT',
          status: 'OK'
        });
      } else {
        res.status(404).json({
          operation: 'PUT',
          status: 'UNKNOWN_DEVICE'
        });
      }
    }
  });
}

/**
 * Get the object to the database
 */
exports.load = function(req, res) {
  var device = req.params.device;
  var op = pool.query('select * from `IOTDB`.`Registration` where `device` = ?', device, function(error, result, fields) {
    if (error) {
      res.status(500).json({
        'operation': 'GET',
        'status': 'INTERNAL_ERROR',
        'cause': error
      });
      return;
    }
    if (result.length === 0) {
      // Unknown device
      res.status(404).json({
        'operation': 'GET',
        'device': 'UNKNOWN',
        'device_group': 'UNKNOWN',
        'status': 'UNKNOWN_DEVICE'
      });
    } else {
      var r = result[0];
      var response = {
        'operation': 'GET',
        'device': r.device,
        'device_group': r.device_group,
        'submissionDate': r.creationDate,
        'registrationDate': r.registrationDate,
        'status': (r.registrationDate !== null) ? 'REGISTERED' : 'WAITING_ACKNOWLEDGEMENT',
        'memo': r.memo
      };
      res.status(200).json(r);
    }
  });
}

/**
 * Unregister Device
 */
exports.deleteRegistration = function(req, res) {
  var device = req.params.device;
  deleteAnnouncement(device);
  console.log("Unregistering device...");
  var op = pool.query('delete from `IOTDB`.`Registration` where `device` = ?', device, function(error, result, fields) {
    if (error) {
      res.json({
        'operation': 'DELETE',
        'status': 'INTERNAL_ERROR',
        'cause': error
      });
    } else {
      // Unknown device
      res.json({
        'operation': 'DELETE',
        'device': device,
        'status': 'UNREGISTERED'
      });
    }
  });
}

/**
 * Unregister Device
 */
function deleteAnnouncement(device) {
  console.log("Removing Announcement data for device " + device + "...");
  var op = pool.query('delete from `IOTDB`.`Announcement` where `device` = ?', device, function(error, result, fields) {
    if (error) {
      console.log("Announcement data could not be removed.");
      console.log(error);
    } else {
      console.log("Announcement data removed from database.");
    }
  });
}


/**
 * Acknowledge registration
 */
exports.acknowledgeRegistration = function(req, res) {
  console.log("Acknowledging registration information...");
  var qu = pool.query("select * from Registration where `device` = ?", req.body.device, function(errorq, results, fields) {
    if (!errorq && results.length === 1) {
      console.log(results);
      var op = pool.query({
          sql: 'update `Registration` set `registrationDate` = ? where `device` = ? ',
          values: [(new Date()), req.body.device]
        },
        function(error, result) {
          if (error) {
            console.error('Error updating object:', error);
            res.send("INTERNAL_ERROR");
          } else {
            console.log("Data successfuly updated to database...");
            res.send(results[0].device_group);
          }
        });
    } else {
      res.json("UNKNOWN_DEVICE");
    }
  });
}
