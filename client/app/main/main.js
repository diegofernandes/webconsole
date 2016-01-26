'use strict';

angular.module('meccanoAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        abstract: true,
        templateUrl: 'app/main/main.html'
      })
      .state('main.dash', {
        url: '?status',
        views: {
          'charts@main': {
            templateUrl: 'app/main/chats.doughnut.html',
            controller: 'MainCtrl'
          },
          'data@main': {
            templateUrl: 'app/device/device.list.html',
            controller: 'DeviceListCtrl'
          }
        }
      });
  });
