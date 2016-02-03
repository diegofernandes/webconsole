'use strict';

angular.module('meccanoAdminApp')
  .factory('Announcements', function ($resource) {

  	var self = {
  		lastAnnouncements: function(){
  			return $resource('api/lastAnnouncements');
  		}
  	}

  	return self;

  });
