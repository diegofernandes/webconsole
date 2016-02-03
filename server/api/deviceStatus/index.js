'use strict';

var express = require('express');
var controller = require('./deviceStatus.controller');
var historyStatusController = require('./historyStatus.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

router.get('/', auth.isAuthenticated(),controller.count);
router.get('/status/:status', auth.isAuthenticated(),controller.status);
router.get('/history', auth.isAuthenticated(), historyStatusController.history );

module.exports = router;
