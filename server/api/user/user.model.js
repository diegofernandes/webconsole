'use strict';

var pool = require('../../config/mysql');
var crypto = require('crypto');
var _ = require('lodash');

/**
 * Methods
 */
var methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports.find = function() {
  var params = arguments[0];
  var options;
  var cb;
  if (_.isFunction(arguments[1])) {
    options = {
      safe: true
    };
    cb = arguments[1];
  } else {
    options = arguments[1];
    cb = arguments[2];
  }

  var sql = 'select ID,name,email,role';
  if (!options.safe) {
    sql += ',hashedPassword,salt';
  }
  sql += ' from `User`';

  if (!_.isEmpty(params)) {
    sql += ' where ?';
  }

  pool.query(sql, params, function(error, results, fields) {
    cb(error, results);
  });
};
module.exports.findOne = function() {
  var params = arguments[0];
  var options;
  var cb;
  if (_.isFunction(arguments[1])) {
    options = {
      safe: true
    };
    cb = arguments[1];
  } else {
    options = arguments[1];
    cb = arguments[2];
  }

  var sql = 'select ID,name,email,role';
  if (!options.safe) {
    sql += ',hashedPassword,salt';
  }
  sql += ' from `User` where ?';

  pool.query(sql, params, function(error, results, fields) {
    cb(error, _.merge(results[0], methods));
  });
};

function preSalve(user) {
  var validatePresenceOf = function(value) {
    return value && value.length;
  };

  user = _.merge(user, methods);

  var _password = user.password;
  delete user.password;
  user.salt = user.makeSalt();
  user.hashedPassword = user.encryptPassword(_password);

  return validatePresenceOf(user.hashedPassword) === -1;
}

module.exports.create = function(user, cb) {
  if (preSalve(user)) {
    return cb(new Error('Invalid password'));
  } else {

    pool.query('insert into `User` set ?', user, function(error, results, fields) {
      if(error && error.code === 'ER_DUP_ENTRY'){
        cb({errors:{email:{message:'Email is already in use.',error:error}}});
      }else{
        cb(error, results);
      }
    });
  }
};



module.exports.deleteByid = function(id, cb) {
  if (id) {
    pool.query('DELETE FROM `User` WHERE ?', {
      ID: id
    }, function(error, result, fields) {
      if (result.affectedRows > 0) {
        cb(null, true);
      } else {
        cb(null, false);
      }

    });
  } else {
    cb(new Error('Invalid password'));
  }
}

module.exports.update = function(user, cb) {
  if (preSalve(user)) {
    return cb(new Error('Invalid password'));
  } else {
    pool.query('UPDATE `User` SET ? WHERE `ID` = ?', [user, user.ID], function(error, result, fields) {
      cb(error, result);
    });
  }
}
