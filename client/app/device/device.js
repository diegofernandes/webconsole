'use strict';

angular.module('meccanoAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('device', {
        url: '/device',
        templateUrl: 'app/device/device.html',
        controller: 'DeviceCtrl'
      });
  });