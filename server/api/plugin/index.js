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
var pluginController = require('./plugin.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// Routes for /api/devices/
// router.get('/',auth.isAuthenticated(),pluginController.index);
// router.get('/:plugin/:version', auth.isAuthenticated(),pluginController.show);
// router.post('/', auth.hasRole('user'),pluginController.create);
// router.delete('/:plugin/:version', auth.hasRole('user'),pluginController.destroy);
// router.put('/:plugin/:version', auth.hasRole('user'),pluginController.update);
// router.patch('/:plugin/:version', auth.hasRole('user'),pluginController.update);

router.get('/',pluginController.index);
router.get('/:id',pluginController.show);
router.post('/', pluginController.create);
router.delete('/:id',pluginController.destroy);
router.put('/:id', pluginController.update);

module.exports = router;
