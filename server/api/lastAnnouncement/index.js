'use strict';

var express = require('express');
var controller = require('./lastAnnouncement.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(),controller.index);

module.exports = router;
