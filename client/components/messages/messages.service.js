'use strict';

angular.module('meccanoAdminApp')
  .factory('Messages', function($resource) {
    return $resource('api/messages/:id', {
      id: '@ID'
    });
  });
