'use strict';

angular.module('meccanoAdminApp')
  .service('DeviceStatus', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    	var self = {
    		all: function (){
    			return $resource('api/deviceStatus');
    		},
    		byStatus: function (){
    			return $resource('api/deviceStatus/status/:status?page=:page');
    		},
    		selectedDevice: null,
        history: function () {
          return $resource('api/deviceStatus/history');
        }
    	}

    	return self;

  });
