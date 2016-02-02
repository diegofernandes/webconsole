'use strict';

var express = require('express');
var controller = require('./lastAnnouncements.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
// router.get('/', auth.isAuthenticated(),controller.index);

module.exports = router;
