'use strict';

angular.module('meccanoAdminApp')
  .factory('Devices', function ($resource) {
    return $resource('api/devices/:device', {}, {
      query: {method:'GET', params:{device:'@_device'}, isArray:true},
      byStatus: {method: 'GET',params:{satus:'devices'}, isArray:true}
    });
  });
