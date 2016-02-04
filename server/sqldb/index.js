/**
 * Sequelize initialization module
 */

'use strict';

var path = require('path');
var config = require('../config/environment');
var Sequelize = require('sequelize');

var db = {
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.LastAnnouncements = db.sequelize.import('../api/lastAnnouncements/lastAnnouncements.model');
db.DeviceStatus = db.sequelize.import('../api/deviceStatus/deviceStatus.model');
db.Registration = db.sequelize.import('../api/devices/registration.model');
db.Announcement = db.sequelize.import('../api/devices/announcement.model');
db.DeviceStatistics = db.sequelize.import('../api/devices/deviceStatistics.model');
db.Message = db.sequelize.import('../api/messages/messages.model');
db.User = db.sequelize.import('../api/user/user.model');


db.page = function(Model, params) {
  var size = parseInt(params.size || params.s || 10);
  delete params.size;
  delete params.s;
  var page = parseInt(params.page || params.p || 1);
  delete params.page;
  delete params.p;
  var offset = (page - 1) * size;

  return Promise.join(
    function() {
      return Model.findAll({
        where: params,
        offset: offset,
        limit: size
      })
    },
    function() {
      return Model.count({
        where: params
      })
    },
    function(data, total) {
      return {
        data: data,
        page: {
          'size': size,
          'totalElements': total,
          'totalPages': Math.ceil(total / size),
          'number': page
        }
      };
    });
}


module.exports = db;
