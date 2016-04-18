'use strict';

angular.module('meccanoAdminApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('plugin', {
        url: '/plugin',
        abstract: true,
        templateUrl: 'app/plugin/plugin.html'
      })
      .state('plugin.list', {
        url: '?page&size',
        authenticate: true,
        views: {
          'index': {
            templateUrl: 'app/plugin/plugin.list.html',
            controller: 'PluginListCtrl'
          },
          'details-plugin': {
            templateUrl: 'app/plugin/plugin.detail.html',
            controller: 'PluginDetailCtrl'
          }
        }
      });
})
.controller('PluginDetailCtrl', function($scope, $http, $state, $stateParams, $rootScope, Plugins, $uibModal, Messages,Auth, Modal,alertsPanel) {
  $scope.series = ['Updates'];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.Plugins = Plugins;
});
