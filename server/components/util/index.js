'use strict';

module.exports.respondWithResult = function(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

module.exports.handleError = function(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.trace(err);
    res.status(statusCode).send(err);
  };
}


module.exports.saveUpdates = function(updates) {
  return function(entity) {
    if (entity) {
      return entity.updateAttributes(updates)
        .then(function(updated) {
          return updated;
        });
    }
  };
}


module.exports.handleEntityNotFound = function(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

module.exports.removeEntity = function(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}
