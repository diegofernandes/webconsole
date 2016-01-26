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

exports.index = function(req, res) {

  var sql = "select 'NORMAL' as `status`, count(*) as `count` from `IOTDB`.`Announcement` where timestampdiff(minute, `lastAnnouncementDate`, now()) <= ? " +
  " union select 'WARNING' as `status`, count(*) as `count` from `IOTDB`.`Announcement` where timestampdiff(minute, `lastAnnouncementDate`, now()) between ? and ? " +
  " union select 'FAIL' as `status`, count(*) as `count` from `IOTDB`.`Announcement` where timestampdiff(minute, `lastAnnouncementDate`, now()) > 15 " +
  " union select 'WAITING_APPROVE' as `status`, count(*) as `count` from `IOTDB`.`Registration` where `registrationDate` is null ";

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
