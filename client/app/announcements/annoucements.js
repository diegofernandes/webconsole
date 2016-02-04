'use strict';

angular.module('meccanoAdminApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('announcements', {
        url: '/activity',
        abstract: true,
        templateUrl: 'app/announcements/announcements.html'
      })
      .state('announcements.list', {
        url: '?channel&device&device_group&page&size&sensor&data&creationdate',
        authenticate: true,
        views: {
          'index': {
            templateUrl: 'app/announcements/announcements.list.html',
            controller: 'AnnouncementsCtrl'
          }
        }
      });
  });
