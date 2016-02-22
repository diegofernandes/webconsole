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

var express = require('express');
var deviceController = require('./device.controller');
var statisticController = require('./statistic.controller');
var activityController = require('./activity.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// Routes for /api/devices/
router.get('/',auth.isAuthenticated(),deviceController.index);
router.get('/:device', auth.isAuthenticated(),deviceController.show);
router.post('/', auth.isAuthenticated(),deviceController.create);
router.delete('/:device', auth.isAuthenticated(),deviceController.destroy);
router.put('/:device', auth.isAuthenticated(),deviceController.update);
router.patch('/:device', auth.isAuthenticated(),deviceController.update);

router.get('/:device/statistics',auth.isAuthenticated(),statisticController.index);
router.get('/:device/activity',auth.isAuthenticated(),activityController.index);

module.exports = router;
