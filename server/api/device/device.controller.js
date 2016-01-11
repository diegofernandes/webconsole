'use strict';

var _ = require('lodash');

// Get list of devices
exports.index = function(req, res) {
  res.json([
    {"date":1451934641396,"device_group":666,"device":"18:fe:34:fd:b2:a8","status":"ok"},
    {"date":1451934641396,"device_group":666,"device":"18:fe:34:fd:b2:a8","status":"error"},
    {"date":1451934641396,"device_group":666,"device":"18:fe:34:fd:b2:a8","status":"warning"}
  ]);
};
