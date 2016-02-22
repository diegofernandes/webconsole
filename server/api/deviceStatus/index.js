'use strict';

var express = require('express');
var controller = require('./deviceStatus.controller');
var historyStatusController = require('./historyStatus.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

router.get('/', auth.isAuthenticated(),controller.index);
router.get('/status',auth.isAuthenticated(), controller.show);
router.get('/status/:status',auth.isAuthenticated(), controller.show);
router.get('/history', auth.isAuthenticated(), historyStatusController.index );

router.get('/:device',auth.isAuthenticated(), controller.show);



module.exports = router;
