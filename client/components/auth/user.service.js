'use strict';

angular.module('meccanoAdminApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@ID'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
