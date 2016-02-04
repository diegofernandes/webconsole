'use strict';


var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var db = require('../sqldb');
var User = db.User;

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
 * Otherwise returns 401
 */
function isAuthenticated() {
  if (config.api.security) {
    return compose()
      // Validate jwt
      .use(validateJwt)
      .use(function(err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
          res.status(401).send('invalid token.');
        }
      })
      // Attach user to request
      .use(function(req, res, next) {
        User.find({
            where: {
              ID: req.user.ID
            }
          })
          .then(function(user) {
            if (!user) {
              return res.status(401).end();
            }
            req.user = user;

          })
          .then(next)
          .catch(function(err) {
            next(err);
          });
      });

  } else {
    return compose();
  }

}



/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');
  if (config.api.security) {
    return compose()
      .use(isAuthenticated())
      .use(function meetsRequirements(req, res, next) {
        if (config.userRoles.indexOf(roleRequired) >= 0 && config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
          return next();
        } else {
          res.send(403);
        }
      });
  } else {
    return compose();
  }
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
