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
  return Plugin.create(req.body, {
      logging: true
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
      }
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
      }
    })
    .then(util.handleEntityNotFound(res))
    .then(util.respondWithResult(res, 200))
    .catch(util.handleError(res));
}

// Lists the keys for a configuration
exports.indexKey = function(req, res) {
  db.page(PluginConfiguration, req.query, {
    where: {
      id: req.params.id
    }
  })
  .then(util.respondWithResult(res))
  .catch(util.handleError(res));
}


// Shows a configuration key
exports.showKey = function(req, res) {
  PluginConfiguration.findOne({
      where: req.params
    })
    .then(util.handleEntityNotFound(res))
    .then(util.respondWithResult(res))
    .catch(util.handleError(res));
}

/**
 * Saves the object to the database
 */
exports.createKey = function(req, res) {
  return PluginConfiguration.create(req.body, {
      logging: true
    }).then(util.respondWithResult(res, 201))
    .catch(util.handleError(res));
}

// Updates an existing Thing in the DB
exports.updateKey = function(req, res) {
  PluginConfiguration.find({
      where: {
        id: req.params.id,
        key: req.params.key
      }
    })
    .then(util.handleEntityNotFound(res))
    .then(util.saveUpdates(req.body))
    .then(util.respondWithResult(res))
    .catch(util.handleError(res));
}

// Deletes a Thing from the DB
exports.destroyKey = function(req, res) {
  PluginConfiguration.destroy({
      where: {
        id:  req.params.id,
        key: req.params.key
      }
    }).then(function() {
      return PluginConfiguration.find({
        where: {
          id: req.params.id,
          key: req.params.key
        }
      })
    })
    .then(util.respondWithResult(res, 200))
    .catch(util.handleError(res));
}
