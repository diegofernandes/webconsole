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
var devicesController = require('./devices.controller');
var statisticsController = require('./statistics.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// Routes for /api/registration/
router.get('/',devicesController.find);
router.get('/:device', auth.isAuthenticated(),devicesController.load);
router.post('/', auth.isAuthenticated(),devicesController.saveRegistration);
router.delete('/:device', auth.isAuthenticated(),devicesController.deleteRegistration);
router.put('/:device', auth.isAuthenticated(),devicesController.update);
router.patch('/:device', auth.isAuthenticated(),devicesController.update);
router.put('/ack', devicesController.acknowledgeRegistration);
router.get('/:device/statistics',statisticsController.statistics);


module.exports = router;
