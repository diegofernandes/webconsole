/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
console.log('Seeding...');
var _ = require('lodash');
var db = require('../sqldb');

var User = db.User;

User.sync().then(function() {
  return User.find({
      where: {
        role: 'admin'
      }
    })
    .then(function(users) {
      if (_.isEmpty(users)) {
        User.create({
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
