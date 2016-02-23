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

var Message = db.Message;

exports.index = function(req, res) {
  db.page(Message, _.merge(req.query,req.params))
    .then(util.respondWithResult(res))
    .catch(util.handleError(res));
}


exports.show = function(req, res) {
  Message.findOne({
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

  return Message.create(req.body)
    .then(util.respondWithResult(res, 201))
    .catch(util.handleError(res));

}

// Updates an existing Message in the DB
exports.update = function(req, res) {
  if (req.body.ID) {
    delete req.body.ID;
  }
  Message.find({
      where: {
        ID: req.params.id
      }
    })
    .then(util.handleEntityNotFound(res))
    .then(util.saveUpdates(req.body))
    .then(util.respondWithResult(res))
    .catch(util.handleError(res));
}

// Deletes a Message from the DB
exports.destroy = function(req, res) {

  Message.find({
      where: {
        ID: req.params.id
      }
    })
    .then(util.handleEntityNotFound(res))
    .then(util.removeEntity(res))
    .catch(util.handleError(res));
}
