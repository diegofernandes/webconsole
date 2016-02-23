/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _ = require('lodash');
var db = require('../sqldb');

var User = db.User;

module.exports = function() {
  console.log('Seeding...');
  return User.sync().then(function() {
    return User.find({
        where: {
          role: 'admin'
        }
      })
      .then(function(users) {
        if (_.isEmpty(users)) {
          return User.create({
            role: 'admin',
            name: 'Admin',
            email: 'admin@admin.com',
            password: 'admin'
          }).then(function() {
            console.log('finished populating user admin');
          });
        } else {
          console.log('User admin found. Skiping...');
        }

      });
  }).catch(function(err) {
    console.error(err);
  });
}
