'use strict';

angular.module('meccanoAdminApp')
  .factory('Plugins', function ($resource) {
    var self = {
      loadPlugins: function () {
        return $resource('api/plugins/:id');
      },
      plugins: function(){
        return $resource('api/devices/:device', null,
          {
            'update': {method: 'PUT'},
            'delete': {method: 'DELETE'},
            'post': {method: 'POST'},
            'get': {method: 'GET'}
          });
      }
    };
    return self;
});
