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
        url: '?status&device&device_group&page&size',
        authenticate: true,
        views: {
          'index': {
            templateUrl: 'app/device/device.list.html',
            controller: 'DeviceListCtrl'
          },
          'details-device': {
            templateUrl: 'app/device/device.detail.html',
            controller: 'DeviceDetailCtrl'
          }
        }
      })
      .state('device.register', {
        url: '/new',
        authenticate: true,
        templateUrl: 'app/device/device.edit.html',
        controller: 'DeviceRegisterCtrl'
      })
      .state('device.edit', {
        url: '/{deviceId}/edit',
        authenticate: true,
        views: {
          'index': {
            templateUrl: 'app/device/device.edit.html',
            controller: 'DeviceEditCtrl'
          }
        }
      })
      .state('device.detail', {
        url: '/{deviceId}/detail',
        authenticate: true,
        templateUrl: 'app/device/device.detail.html',
        controller: 'DeviceDetailCtrl'
      });
  });
