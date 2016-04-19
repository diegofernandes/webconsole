'use strict';

angular.module('meccanoAdminApp')
 .factory('Plugins', function($resource) {
   return $resource('api/plugins/:id',{},{
     'query':  {method:'GET', isArray:false},
     'update': {method: 'PUT'},
     'post': {method: 'POST'},
     'delete': {method: 'DELETE'}
   });
 });
