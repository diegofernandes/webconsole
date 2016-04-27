/**
 * Sequelize initialization module
 */

'use strict';

var path = require('path');
var config = require('../config/environment');
var Sequelize = require('sequelize');
var P = require('bluebird');
var util = require('util');

var db = {
  sequelize: initSequelize()
};

function initSequelize() {
  if (util.isNullOrUndefined(config.mysql.uri)) {
    return new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, config.mysql.options)
  } else {
    return new Sequelize(config.mysql.uri, config.mysql.options);
  }

}

// Insert models below
db.Fact = db.sequelize.import('../model/fact.model');
db.DeviceStatus = db.sequelize.import('../model/deviceStatus.model');
db.Registration = db.sequelize.import('../model/registration.model');
db.Announcement = db.sequelize.import('../model/announcement.model');
db.DeviceStatistics = db.sequelize.import('../model/deviceStatistics.model');
db.Message = db.sequelize.import('../model/message.model');
db.User = db.sequelize.import('../model/user.model');
db.DeviceHistoryStatus = db.sequelize.import('../model/deviceHistoryStatus.model');
db.DeviceActivity = db.sequelize.import('../model/deviceActivity.model');
db.Release = db.sequelize.import('../model/release.model');
// Plugin and PluginConfiguration
db.Plugin = db.sequelize.import('../model/plugin.model');
db.PluginConfiguration = db.sequelize.import('../model/pluginConfiguration.model');
db.Plugin.hasMany(db.PluginConfiguration);

db.page = function(Model, params, attributes) {
  var size = parseInt(params.size || params.s || 10);
  delete params.size;
  delete params.s;
  var page = parseInt(params.page || params.p || 1);
  delete params.page;
  delete params.p;
  var offset = (page - 1) * size;

  return Model.findAndCountAll({
    where: params,
    offset: offset,
    limit: size,
    attributes: attributes
  }).then(
    function(result) {
      return {
        data: result.rows,
        page: {
          'size': size,
          'totalElements': result.count,
          'totalPages': Math.ceil(result.count / size),
          'number': page
        }
      };
    });
}

module.exports = db;
