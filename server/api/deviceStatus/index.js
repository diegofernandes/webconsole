'use strict';

var express = require('express');
var controller = require('./deviceStatus.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(),controller.count);
router.get('/status/:status', auth.isAuthenticated(),controller.status);

module.exports = router;
