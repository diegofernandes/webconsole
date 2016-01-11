'use strict';

var _ = require('lodash');

// Get list of lastAnnouncementss
exports.index = function(req, res) {
  res.json([
    {"channel":"humidity","date":1451934641396,"device_group":666,"device":"18:fe:34:fd:b2:a8","sensor":1,"data":30},
    {"channel":"humidity","date":1451934641396,"device_group":666,"device":"18:fe:34:fd:b2:a8","sensor":1,"data":37}
]);
};
