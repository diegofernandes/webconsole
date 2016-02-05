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
var DeviceActivity = db.DeviceActivity;

/**
 **  Filter devices by status
 **/
exports.show = function(req, res) {
  db.page(DeviceActivity, _.merge(req.query, req.params)).then(util.respondWithResult(res))
    .catch(util.handleError(res));

}
