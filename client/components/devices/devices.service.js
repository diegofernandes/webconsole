'use strict';

angular.module('meccanoAdminApp')
  .factory('Devices', function ($resource) {

  	var self = {
  		loadDevices: function(){
  			return $resource('api/devices/:device');
  		},
  		selected: null
  	}

  	return self;


    // return $resource('api/devices/:device', {}, {
    //   query: {method:'GET', params:{device:'@_device'}, isArray:true},
    //   byStatus: {method: 'GET',params:{satus:'devices'}, isArray:true}
    // });
  });
