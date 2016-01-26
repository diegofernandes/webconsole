'use strict';

angular.module('meccanoAdminApp')
  .factory('Registration', function($resource) {
    return $resource('/api/registration/:device', {device: '@device'}, {
      'update': { method:'PUT' },
      'query': {isArray:false,cache:false}
    });
  });
