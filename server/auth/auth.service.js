'use strict';


var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var validateJwt = expressJwt({
  secret: config.secrets.session,
  credentialsRequired: true,
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    } else if (req.query && req.query.hasOwnProperty('access_token')) {
      return req.query.access_token;
    }
    return null;

  }
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(validateJwt)
    .use(function(err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        res.status(403).send('invalid token.');
      }
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findOne({
        ID: req.user.ID
      }, function(err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);

        req.user = user;
        next();
      });
    });
}



/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(roleRequired) >= 0 && config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.send(403);
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({
    ID: id
  }, config.secrets.session, {
    expiresIn: '5m'
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user) return res.json(404, {
    message: 'Something went wrong, please try again.'
  });
  var token = signToken(req.user.ID, req.user.role);
  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
