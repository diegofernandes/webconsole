'use strict';

angular.module('meccanoAdminApp')
  .factory('Reports', function($resource) {
    return $resource('/api/reports/plugins/:plugin/:version/:controller/:output.:format', null, {
      output: {
        method: 'GET',
        params: {
          controller: 'assets',
          output: 'output',
          format: 'png'
        }
      },
      details: {
        method: 'GET',
        params: {
          controller: 'plugin',
          format: 'json'
        }
      }
    });
  });
