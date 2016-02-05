'use strict';

var express = require('express');
var controller = require('./lastAnnouncements.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(),controller.show);

module.exports = router;
