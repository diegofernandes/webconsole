'use strict';

var _ = require('lodash');

// Get list of deviceStatuss
exports.index = function(req, res) {
  res.json({
    'ok': Math.random(),
    'warning': Math.random(),
    'error': Math.random()
  });
};
