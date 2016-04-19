'use strict';

angular.module('meccanoAdminApp')
  .factory('Plugins', function () {
    var self = {
      loadPlugins: function () {
        return $resource('api/plugins')
      },
      plugins: function() {
        return $resource('api/plugins/:id', null,
        {
          'update': { method: 'PUT' },
          'delete': { method: 'DELETE' },
          'post': { method: 'POST' }
        });
      }
    }
    return self;
  });
