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
var Plugin = db.Plugin;
var PluginConfiguration = db.PluginConfiguration;

exports.index = function(req, res) {
  db.page(Plugin, req.query)
  .then(util.respondWithResult(res))
  .catch(util.handleError(res));
}

exports.show = function(req, res) {
  Plugin.findOne({
      where: req.params,
      include: [
          { model: PluginConfiguration }
      ]
    })
    .then(util.handleEntityNotFound(res))
    .then(util.respondWithResult(res))
    .catch(util.handleError(res));
}

/**
 * Saves the object to the database
 */
exports.create = function(req, res) {
  return Plugin.create(req.body, {
      logging: true,
      include: [
          { model: PluginConfiguration }
      ]
    }).then(util.respondWithResult(res, 201))
    .catch(util.handleError(res));
}

// Updates an existing Thing in the DB
exports.update = function(req, res) {
  if (req.body.id) {
    delete req.body.id;
  }
  Plugin.find({
      where: {
        id: req.params.id
      },
      include: [
          { model: PluginConfiguration }
      ]
    })
    .then(util.handleEntityNotFound(res))
    .then(util.saveUpdates(req.body))
    .then(util.respondWithResult(res))
    .catch(util.handleError(res));
}

// Deletes a Thing from the DB
exports.destroy = function(req, res) {
  Plugin.destroy({
      where: {
        id: req.params.id
      },
      include: [
          { model: PluginConfiguration }
      ]
    }).then(function() {
      return Plugin.find({
        where: {
          id: req.params.id
        }
      })
    })
    .then(util.handleEntityNotFound(res))
    .then(util.removeEntity(res))
    .catch(util.handleError(res));
}
