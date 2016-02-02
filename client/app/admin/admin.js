'use strict';

angular.module('meccanoAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        authenticate: true
      })
      .state('usernew', {
        url: '/admin/new',
        templateUrl: 'app/admin/admin.new.html',
        controller: 'AdminNewCtrl',
        authenticate: true
      });
  });
