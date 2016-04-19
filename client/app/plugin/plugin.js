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
      })
      .state('plugin.edit', {
        url: '/{id}/edit',
        authenticate: true,
        views: {
          'edit-plugin': {
            templateUrl: 'app/plugin/plugin.edit.html',
            controller: 'PluginEditCtrl'
          }
        }
      })
      .state('plugin.install', {
        url: '/install',
        authenticate: true,
        views: {
          'install-plugin': {
            templateUrl: 'app/plugin/plugin.install.html',
            controller: 'PluginInstallCtrl'
          }
        }
      });
});
