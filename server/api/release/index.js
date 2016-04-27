/*
* Meccano IOT Gateway
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
var controller = require('./release.controller');
var auth = require('../../auth/auth.service');

var multer = require('multer');
var upload = multer({
  storage: multer.memoryStorage()
});


var router = express.Router();

// Routes for /api/releases/
router.get('/', auth.isAuthenticated(),controller.index);
router.get('/:id/download',controller.download);
router.get('/:id', auth.isAuthenticated(),controller.show);
router.post('/', auth.hasRole('user'), upload.single('firmware'),controller.create);
router.put('/:id', auth.hasRole('user'),controller.update);
router.patch('/:id', auth.hasRole('user'),controller.update);
router.delete('/:id', auth.hasRole('user'),controller.destroy);

module.exports = router;
