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

var Registration = db.Registration;
var Announcement = db.Announcement;

exports.index = function(req, res) {
  db.page(Registration, req.query)
  .then(util.respondWithResult(res))
  .catch(util.handleError(res));
}


exports.show = function(req, res) {
  Registration.findOne({
      where: req.params
    })
    .then(util.handleEntityNotFound(res))
    .then(util.respondWithResult(res))
    .catch(util.handleError(res));
}

/**
 * Saves the object to the database
 */
exports.create = function(req, res) {


  return Registration.create(req.body, {
      logging: true
    }).then(util.respondWithResult(res, 201))
    .catch(util.handleError(res));
}

// Updates an existing Thing in the DB
exports.update = function(req, res) {
  if (req.body.device) {
    delete req.body.device;
  }
  Registration.find({
      where: {
        device: req.params.device
      }
    })
    .then(util.handleEntityNotFound(res))
    .then(util.saveUpdates(req.body))
    .then(util.respondWithResult(res))
    .catch(util.handleError(res));
}

// Deletes a Thing from the DB
exports.destroy = function(req, res) {

  Announcement.destroy({
      where: {
        device: req.params.device
      }
    }).then(function() {
      return Registration.find({
        where: {
          device: req.params.device
        }
      })
    })
    .then(util.handleEntityNotFound(res))
    .then(util.removeEntity(res))
    .catch(util.handleError(res));
}
