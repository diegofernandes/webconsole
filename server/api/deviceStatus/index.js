'use strict';

var express = require('express');
var controller = require('./deviceStatus.controller');

var router = express.Router();

router.get('/', controller.count);
router.get('/status/:status', controller.status);

module.exports = router;
