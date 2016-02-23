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

var util = require('../../components/util');

var db = require('../../sqldb');
var DeviceStatus = db.DeviceStatus;

/**
 **  Count the number of devices for each status
 **/
exports.index = function(req, res) {

  return DeviceStatus.findAll({
      attributes: [
        'status', [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'numberOfDevices']
      ],
      group: 'status'
    }).then(function(data) {
      var result = _.chain(data).transform(function(result,item) {
        return (result[item.status] = item.dataValues.numberOfDevices);
      },{NORMAL:0,FAIL:0,WARNING:0,WAITING_APPROVE:0}).value();
      res.json({data: result});
    })
    .catch(util.handleError(res));

}


/**
 **  Filter devices by status
 **/
exports.show = function(req, res) {
  db.page(DeviceStatus, _.merge(req.query, req.params)).then(util.respondWithResult(res))
    .catch(util.handleError(res));
}
