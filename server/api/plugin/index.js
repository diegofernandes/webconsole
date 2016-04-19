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

router.get('/',pluginController.index);
router.get('/:id',pluginController.show);
router.post('/', pluginController.create);
router.delete('/:id',pluginController.destroy);
router.put('/:id', pluginController.update);

router.get('/:id/keys', pluginController.indexKey);
router.get('/:id/keys/:key', pluginController.showKey);
router.post('/:id/keys', pluginController.createKey);
router.delete('/:id/keys/:key', pluginController.destroyKey);
router.put('/:id/keys/:key', pluginController.updateKey);

module.exports = router;
