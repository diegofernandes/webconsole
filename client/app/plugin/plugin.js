'use strict';

angular.module('meccanoAdminApp')
 .config(function($stateProvider) {
   $stateProvider
     .state('plugin', {
       url: '/plugin',
       abstract: true,
       templateUrl: 'app/plugin/plugin.html'
     })
     .state('plugin.list', {
       url: '',
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
       templateUrl: 'app/plugin/plugin.edit.html',
       controller: 'PluginEditCtrl'
     })
     .state('plugin.install', {
       url: '/install',
       authenticate: true,
       controller: 'PluginInstallCtrl',
       templateUrl: 'app/plugin/plugin.install.html'
     });
 });
