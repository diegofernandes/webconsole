'use strict';

angular.module('meccanoAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('device', {
        url: '/device',
        abstract: true,
        templateUrl: 'app/device/device.html'
      })
      .state('device.list', {
        url: '',
        templateUrl: 'app/device/device.list.html',
        controller: 'DeviceListCtrl'
      })
      .state('device.register', {
        url: '/new',
        templateUrl: 'app/device/device.edit.html',
        controller: 'DeviceRegisterCtrl'
      })
      .state('device.edit', {
        url: '/{deviceId}/edit',
        templateUrl: 'app/device/device.edit.html',
        controller: 'DeviceEditCtrl'
      })
      .state('device.detail', {
        url: '/{deviceId}/detail',
        templateUrl: 'app/device/device.detail.html',
        controller: 'DeviceDetailCtrl'
      });
  });
