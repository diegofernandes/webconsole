'use strict';

angular.module('meccanoAdminApp')
  .factory('Devices', function ($resource) {

  	var self = {
      loadDevices: function () {
        return $resource('api/deviceStatus/status/:status');
      },
  		devices: function(){
  			return $resource('api/devices/:device', null,
  				{
  					'update': {method: 'PUT'},
  					'delete': {method: 'DELETE'},
            'post': {method: 'POST'}
  				});
  		},
  		selected: null
  	}

  	return self;

  });
