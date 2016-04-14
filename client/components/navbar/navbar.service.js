'use strict';

angular.module('meccanoAdminApp')
  .factory('NavBar', function($resource) {
    return $resource('/nav',null,{query:{isArray:false}});
  });
