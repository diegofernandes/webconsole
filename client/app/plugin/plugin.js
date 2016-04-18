'use strict';

angular.module('meccanoAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('plugin', {
        url: '/plugin',
        template: '<plugin></plugin>'
      });
  });
