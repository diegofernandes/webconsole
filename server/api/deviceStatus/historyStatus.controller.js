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


var util = require('../../components/util');

var _ = require('lodash');

var db = require('../../sqldb');
var DeviceHistoryStatus = db.DeviceHistoryStatus;

/**
 **  Filter devices by status
 **/
exports.show = function(req, res) {
  var size = parseInt(req.query.size || 20);
  delete  req.query.size
  DeviceHistoryStatus.findAll({where:req.query,limit:size}).then(util.respondWithResult(res))
    .catch(util.handleError(res));
}
