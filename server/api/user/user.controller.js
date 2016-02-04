'use strict';

var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var util = require('../../components/util');

var db = require('../../sqldb');

var User = db.User;

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.findAll({
      attributes: [
        'ID',
        'name',
        'email',
        'role'
      ]
    })
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(util.handleError(res));
}

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
  var newUser = User.build(req.body);
  newUser.save()
    .then(function(user) {
      res.status(200).send();
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;

  User.find({
      where: {
        ID: userId
      }
    })
    .then(function(user) {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(function(err) {
      next(err);
    });
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.destroy({
      ID: req.params.id
    })
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user.ID;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.find({
      where: {
        ID: userId
      }
    })
    .then(function(user) {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(function() {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user.ID;

  return User.find({
      where: {
        ID: userId
      },
      attributes: [
        'ID',
        'name',
        'email',
        'role'
      ]
    })
    .then(function(user) {

      if (!user) {
        return res.status(401).end();
      }

      res.json(user);
    })
    .catch(next);
}
