/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
console.log('Seeding...');
var _ = require('lodash');
var User = require('../api/user/user.model');

User.find({
  role: 'admin'
}, function(err, users) {
  if (err) return console.error(err);
  if (_.isEmpty(users)) {
    User.create({
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }, function() {
      console.log('finished populating user admin');
    });
  }else{
    console.log('User admin found. Skiping...');
  }

});
